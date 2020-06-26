const path = require('path');
const express = require('express');
require('dotenv').config();
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
/* var sql = "SELECT * FROM test";
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
//app.get('/library', getBooks);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
    
  /**********************************************************************
   * Functions
   **********************************************************************/

