require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//Connection Pool
// Following the "Single query" approach from: https://node-postgres.com/features/pooling#single-query
const { Pool } = require("pg");  // This is the postgres database connection module.
const { response } = require('express');
//Connection String to Database
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString, ssl: {rejectUnauthorized: false}});
const libraryController = require("./controllers/librarycontroller.js");

app.use(express.static(__dirname + '/public'));
app.use(express.json()); //Support json encoded body
app.use(express.urlencoded({extended: true})); //Support url encoded body

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('/pages/index'));

//Get all books
app.get("/books", libraryController.getBooks);

//Get book by title
app.get("/title", libraryController.getBookByTitle);

//Get book by author
app.get("/author", libraryController.getBookByAuthor);

//Get Authors
app.get("/authors", libraryController.getAuthors);

//Get book by genre
app.get("/genre", libraryController.getBookByGenre);

//Get genres
app.get("/genres", libraryController.getGenres);

//Add books
app.post("/add", libraryController.addBook);

//Get library page with all books listed
//app.get('/library', getBooks);

//Get book details
app.get('/details', libraryController.getDetails);



// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);

  //Test databse connection
/* var sql = "SELECT * FROM book";
pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows);
});  */
});
    
 