const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString, ssl: {rejectUnauthorized: false}});


//Get a list of all the books
function getBooks(callback) {
    const sql = "SELECT a.book_id, title, blurb, name, read, user_id FROM book as b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id JOIN read ON read.book_id = b.id LEFT JOIN read_status ON read.id = read_status.read_id;";

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

function getAuthors(callback) {
    const sql = "SELECT id, name FROM authors;";

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

function getGenres(callback) {
    const sql = "SELECT id, genre FROM genres;";

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
    const sql = "SELECT * FROM book AS b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id JOIN status as s ON s.book_id = b.id JOIN book_genre AS bg ON bg.book_id = b.id JOIN genres AS g ON g.id = bg.genre_id AND b.id=$1::int;";
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

function removeBook(id, callback) {
  const sql ="WITH first_delete AS (DELETE FROM book_author WHERE book_id = $1::int), second_delete AS (DELETE FROM book_genre WHERE book_id = $1::int), third_delete AS (DELETE FROM status WHERE book_id = $1::int), fourth_delete AS (DELETE FROM read WHERE book_id = $1::int) DELETE FROM book WHERE id = $1::int;";
  var params = [id];
    console.log(params);
    pool.query(sql, params, function(err, result) {
        if (err) {
          console.log("An error with the database occurred");
          console.log(err);
          callback(err, null);
        } else {
        console.log(result);    
        callback(null, result);
        }
    }) 
}

function checkOut(id, user_id, callback) {
  const sql ="WITH first_update AS (UPDATE status SET out = 'true' WHERE book_id=$1::INT RETURNING id) INSERT INTO checked(status_id, user_id) VALUES((SELECT id FROM first_update), $2::INT);";
  var params = [id, user_id];
    console.log(params);
    pool.query(sql, params, function(err, result) {
        if (err) {
          console.log("An error with the database occurred");
          console.log(err);
          callback(err, null);
        } else {
        console.log(result);    
        callback(null, result);
        }
    }) 
}

function checkIn(id, user_id, callback) {
  const sql ="WITH first_update AS (UPDATE status SET out = 'false' WHERE book_id=$1::INT RETURNING id) DELETE FROM checked WHERE status_id=(SELECT id FROM first_update) AND user_id=$2::INT;";
  var params = [id, user_id];
    console.log(params);
    pool.query(sql, params, function(err, result) {
        if (err) {
          console.log("An error with the database occurred");
          console.log(err);
          callback(err, null);
        } else {
        console.log(result);    
        callback(null, result);
        }
    }) 
}

function insertBook(title, blurb, author, genre, callback) {
    const sql = "WITH first_insert AS (INSERT INTO book(title, blurb) VALUES($1::text, $2::text) RETURNING id), third_insert AS (INSERT INTO book_genre(genre_id, book_id) VALUES ( $4::INT, (SELECT id FROM first_insert))), fourth_insert AS (INSERT INTO status(out, book_id) VALUES(false, (SELECT id FROM first_insert))), fifth_insert AS (INSERT INTO read(read, book_id) VALUES(false, (SELECT id FROM first_insert))) INSERT INTO book_author(author_id ,book_id)VALUES($3::INT, (SELECT id FROM first_insert));";

    var params = [title, blurb, author, genre];
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

function insertAuthor(author, callback) {
    const sql = "INSERT INTO authors(name) VALUES($1::TEXT)";
    var params = [author];
    console.log(params);
    pool.query(sql, params, function(err, result) {
        if (err) {
          console.log("An error with the database occurred");
          console.log(err);
          callback(err, null);
        } else {  
        var success = true;
        callback(null, success);
        }
    }) 
}

function insertUser(username, hash, callback) {
  const sql = "INSERT INTO users(username, password) VALUES ($1::TEXT, $2::TEXT);";
  var params = [username, hash];
  //console.log(params);
  pool.query(sql, params, function(err, result) {
      if (err) {
        console.log("An error with the database occurred");
        console.log(err);
        callback(err, null);
      } else {  
      var success = true;
      callback(null, success);
      }
  }) 
}

function check(username, callback) {
  const sql = "SELECT id, username, password FROM users WHERE username=$1::TEXT;";
  var params = [username];

  pool.query(sql, params, function(err, result) {
      if (err) {
        callback(err, null);
      } else {
      //console.log(result);    
      callback(null, result);
      }
    }) 
}



module.exports = {
    checkOut: checkOut,
    checkIn: checkIn,
    removeBook: removeBook,
    insertUser: insertUser,
    check: check,
    insertAuthor: insertAuthor,
    getDetails: getDetails,
    getGenres: getGenres,
    getAuthors: getAuthors,
    getBooks: getBooks,
    getBookByTitle: getBookByTitle,
    getBookByAuthor: getBookByAuthor,
    getBookByGenre: getBookByGenre,
    insertBook: insertBook
};