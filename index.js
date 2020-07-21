require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require("express-session");


//const bcrypt = require('bcrypt');
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
//var session = require('express-session'); //Use sessions
//app.use(expressValidator());

//Set Up Sessions
app.use(session({
  secret: 'my-super-secret-secret!',
  resave: false,
  saveUninitialized: true
}));

/* app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  return next();
}); */

app.use(libraryController.logRequest);

// Setup our routes
app.post('/login', libraryController.handleLogin);
app.post('/logout', libraryController.handleLogout);
app.post('/register', libraryController.register);

// This method has a middleware function "verifyLogin" that will be called first
app.get('/getServerTime', libraryController.verifyLogin, libraryController.getServerTime);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('/pages/index'));

//Get all books but verify if user is logged in to determine info to display
app.get("/books", libraryController.verifySession, libraryController.getBooks);

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

//Check to see if book has been read
app.get("/checkRead", libraryController.checkRead);

//Check to see what user has book checked out
app.get("/checkUser", libraryController.checkUser);

//Add books
app.post("/add", libraryController.verifyLogin, libraryController.verifyAdmin, libraryController.addBook);

//Remove Books
app.get("/remove", libraryController.verifyLogin, libraryController.verifyAdmin, libraryController.removeBook);

//Check books in or out
app.get("/checkInOut", libraryController.verifyLogin, libraryController.checkInOut);

//Mark book as read
app.get("/markRead", libraryController.verifyLogin, libraryController.markRead);

//Add author
app.post("/addauthor", libraryController.verifyLogin, libraryController.verifyAdmin, libraryController.addAuthor);

//Get books checked out by user
app.get("/getCheckedBooks", libraryController.verifyLogin, libraryController.getCheckedBooks);

//Get books read by user
app.get("/getReadBooks", libraryController.verifyLogin, libraryController.getReadBooks);

//Get a book suggestion
app.get("/suggestion", libraryController.verifyLogin, libraryController.getSuggestion);

//Get library page with all books listed
//app.get('/library', getBooks);

//Get book details
app.get('/details', libraryController.getDetails);

//Get the user id for the session
app.get('/session_id', libraryController.getSessionId);



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
    console.log("Back from DB with result:");
    console.log(result.rows);
});  */
});
    
 