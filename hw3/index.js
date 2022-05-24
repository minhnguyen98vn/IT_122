import * as book from "../lib/book.js";
import express from 'express';


const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded());
app.use(express.json());


app.set("view engine", "ejs");

app.get('/', (req,res) => {
    res.render('home', {books: book.getAll()});
});


app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page');
});


app.get('/delete', (req,res) => {
    let result = book.deleteItem(req.query.title); 
    res.render('delete', {title: req.query.title, result: result});
});

app.get('/detail', (req,res) => {
    console.log(req.query)
    let result = book.getItem(req.query.title);
    res.render("details", {
        title: req.query.title, 
        result
        }
    );
});


app.post('/detail', (req,res) => {
    console.log(req.body)
    let found = book.getItem(req.body.title);
    res.render("details", {title: req.body.title, result: found, books: book.getAll()});
});


app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});