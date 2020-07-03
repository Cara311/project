const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString, ssl: {rejectUnauthorized: false}});


//Get a list of all the books
function getBooks(callback) {
    const sql = "SELECT book_id, title, blurb, name FROM book as b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id;";

    pool.query(sql, function(err, result) {
        if (err) {
          //console.log("An error with the database occurred");
          //console.log(err);
          callback(err, null);
        } else {
        //console.log(result);    
        callback(null, result);
        }
      })     
}

//Find the book by searching for the title
function getBookByTitle(title, callback) {
    const sql = "SELECT book_id, title, blurb, name FROM book as b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id AND b.title=$1::text";
    var params = [title];
    console.log(params);
    pool.query(sql, params, function(err, result) {
        if (err) {
          console.log("An error with the database occurred");
          console.log(err);
          callback(err, null);
        } else {
        //console.log(result);    
        callback(null, result.rows);
        }
    })  
}

function getBookByAuthor(name, callback) {
    const sql = "SELECT book_id, title, blurb, name FROM book as b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id AND authors.name=$1::text";
    var params = [name];
    console.log(params);
    console.log(params);
    pool.query(sql, params, function(err, result) {
        if (err) {
          console.log("An error with the database occurred");
          console.log(err);
          callback(err, null);
        } else {
        console.log(result);    
        callback(null, result.rows);
        }
    }) 
}

function getBookByGenre(genre, callback) {
    const sql = "SELECT * FROM book AS b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id JOIN book_genre AS bg ON bg.book_id = b.id JOIN genres AS g ON g.id = bg.genre_id AND g.genre=$1::text";
    var params = [genre];
    console.log(params);
    console.log(params);
    pool.query(sql, params, function(err, result) {
        if (err) {
          console.log("An error with the database occurred");
          console.log(err);
          callback(err, null);
        } else {
        console.log(result);    
        callback(null, result.rows);
        }
    }) 
}

function insertBook(name, blurb, callback) {
    //Create new book with info.
    var results = {success: true};
    callback(results);
}

function searchByTitle(title, callback) {
    console.log("searching for " + title);
    var results = {
        books: [
            {id: 1, title:title, blurb: "The book"},
            {id: 2, title:"Book2", blurb: "The book2"}
        ]
    };
    callback(results);
}

function searchByAuthor(authorId, callback) {
    var results = {
        books: [
            {id: 1, name:"Book1", blurb: "The book"},
            {id: 2, name:"Book2", blurb: "The book2"}
        ]
    };
    callback(results);

}

function searchByGenre(genreId, callback) {
    var results = {
        books: [
            {id: 1, name:"Book1", blurb: "The book"},
            {id: 2, name:"Book2", blurb: "The book2"}
        ]
    };
    callback(results);

}

module.exports = {
    searchByTitle: searchByTitle,
    searchByAuthor: searchByAuthor,
    searchByGenre: searchByGenre,
    getBooks: getBooks,
    getBookByTitle: getBookByTitle,
    getBookByAuthor: getBookByAuthor,
    getBookByGenre: getBookByGenre,
    insertBook: insertBook
};