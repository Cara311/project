require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
//Connection Pool
// Following the "Single query" approach from: https://node-postgres.com/features/pooling#single-query
const { Pool } = require("pg");  // This is the postgres database connection module.
const { response } = require('express');
//Connection String to Database
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString, ssl: {rejectUnauthorized: false}});
// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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



app.get('/', (req, res) => res.render('pages/index'));
//app.get('/library', (req, res) => res.render('pages/library'));
app.get('/library', getBooks);
app.get('/details', getDetails);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
    
  /**********************************************************************
   * Functions
   **********************************************************************/

  function getBooks(req, res) {
    console.log("Getting book info.");
   
    getBooksFromDB(function(error, result) {
      // This is the callback function that will be called when the DB is done.
      // Make sure we got a row with the person, then prepare JSON to send back
      if (error || result == null) {
        res.status(500).json({success:false, data:error});
      } else {
        console.log("Back from the database with result: ", result);
        const books = result;
        //const books = results;
        //console.log(books);

        //res.status(200).json(books);;
        res.render('pages/library', {books: books});
        //res.end(JSON.stringify(books));
      
        //res.json(result[0]);
      }

    })
  }

  function getBooksFromDB(callback) {
    

    const sql = "SELECT book_id, title, blurb, name FROM book as b JOIN book_author AS a ON a.book_id = b.id JOIN authors ON authors.id = a.author_id;"; 
 
    //Postgres module, run this query with these parameters and when it's done call this callback function
    // This runs the query, and then calls the provided anonymous callback function
	// with the results.
    pool.query(sql, function(err, result) {
      if (err) {
        console.log("An error with the database occurred");
        console.log(err);
        callback(err, null);
      }
      //console.log("Found DB result: " + JSON.stringify(result.rows));

		// (The first parameter is the error variable, so we will pass null.)
      callback(null, result.rows);
    })

  }

  function getDetails(req, res){
    const id = req.query.id;
    console.log(id);

    getDetailsFromDB(id, function(error, result) {
  
      if (error || result == null) {
        res.status(500).json({success:false, data:error});
      } else {
        console.log("Back from the database with details: ", result);
        const details = result;
        console.log(details);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(details));
        //res.render('pages/library', {details: details});
        //res.end(JSON.stringify(books));
      
        //res.json(result[0]);
      }

    })

  }

  function getDetailsFromDB(id, callback) {
    
    const sql = "SELECT title FROM book WHERE ID = $1::int"; // Note that we can make
    var params = [id];
    
    pool.query(sql, params, function(err, result) {
      if (err) {
        console.log("An error with the database occurred");
        console.log(err);
        callback(err, null);
      }
      console.log("Found DB result: " + JSON.stringify(result.rows));

		// (The first parameter is the error variable, so we will pass null.)
      callback(null, result.rows);
    })

  }