import express from 'express';
import handlebars from "express-handlebars"
import { Book } from "../models/book.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded()); 
app.use(express.json());
import cors from 'cors';
app.use('/api', cors());
app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

app.get('/', (req,res) => {
    Book.find({}).lean()
        .then((books) => {
            res.render('home', { books });
        })
        .catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/detail', (req,res,next) => {
    Book.findOne({ title:req.query.title }).lean()
        .then((book) => {
            res.render('details', {result: book} );
        })
        .catch(err => next(err));
});

app.post('/detail', (req,res, next) => {
    Book.findOne({ title:req.body.title }).lean()
        .then((book) => {
            res.render('details', {result: book} );
        })
        .catch(err => next(err));
});

app.get('/delete', (req,res) => {
    Book.remove({ title:req.query.title }, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0;
        Book.count((err, total) => {
            res.type('text/html');
            res.render('delete', {title: req.query.title, deleted: result.result.n !== 0, total: total } );    
        });
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});