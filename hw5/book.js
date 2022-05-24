var Book = require("../models/book");
exports.getAll = () => { 
    console.log('getall')
    return Book.find({}, (err, result) => {
        console.log(err)
        console.log(result)
        if (err) {
            console.log(err);
        } else {
            return result;
        }
    });
};

exports.get = (title) => {
    return books.find((item) => {
        return item.title.toLowerCase() === title.toLowerCase();
    });
};

exports.delete = (title) => {

    const oldLength = books.length;
    books = books.filter((item) => {
        return item.title !== title;
    });
 
    return {deleted: oldLength !== books.length, total: books.length };
};

exports.add = (newBook) => {
    const oldLength = books.length;
    let found = this.get(newBook.title);
    if (!found) {
        books.push(newBook);
    }
    return {added: oldLength !== books.length, total: books.length };
};