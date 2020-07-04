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


function getDetails(id, callback) {
    const sql = "SELECT * FROM book AS b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id JOIN status as s ON s.book_id = b.id JOIN users as u ON u.id = s.user_id JOIN book_genre AS bg ON bg.book_id = b.id JOIN genres AS g ON g.id = bg.genre_id AND b.id=$1::int;";
    var params = [id];
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

function insertBook(title, blurb, author, genre, user, callback) {
    const sql = "WITH first_insert AS (INSERT INTO book(title, blurb) VALUES($1::text, $2::text) RETURNING id), second_insert AS (INSERT INTO authors(name)VALUES($3::text) ON CONFLICT (name) DO NOTHING RETURNING id), third_insert AS (INSERT INTO book_genre(genre_id, book_id) VALUES ( $4::INT, (SELECT id FROM first_insert))), fourth_insert AS (INSERT INTO status(out, book_id, user_id) VALUES(false, (SELECT id FROM first_insert), $5::INT)), fifth_insert AS (INSERT INTO read(read, book_id, user_id) VALUES(false, (SELECT id FROM first_insert), $5::INT)) INSERT INTO book_author(author_id ,book_id)VALUES((SELECT author_id FROM book_author JOIN authors ON authors.id = book_author.author_id WHERE authors.name=$3::TEXT), (SELECT id FROM first_insert));";
    //var params = [title, blurb, author, genre, user];
    var params = [title, blurb, author, genre, user];
    console.log(params);
    pool.query(sql, params, function(err, result) {
        if (err) {
          console.log("An error with the database occurred");
          console.log(err);
          callback(err, null);
        } else {
         var success = true;   
        console.log(result);    
        callback(null, success);
        }
    }) 
}

module.exports = {
    getDetails: getDetails,

    getBooks: getBooks,
    getBookByTitle: getBookByTitle,
    getBookByAuthor: getBookByAuthor,
    getBookByGenre: getBookByGenre,
    insertBook: insertBook
};