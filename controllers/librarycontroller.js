const librarymodels = require("../models/librarymodels.js");

//Get all the books
function getBooks(req,res) {
    console.log("Getting Books"); 

    librarymodels.getBooks(function(error, results) {
        if (!error) {
            res.json(results); //This is the callback function
        }
    }) 
  }
//Get the book by title
function getBookByTitle(req,res) {
    var title = req.query.title;
    console.log("Getting Title: " + title); 

   librarymodels.getBookByTitle(title, function(error, results) {
    if (!error) {
        res.json(results); //This is the callback function
    }
        
   });
  }

  //Find book by author search
  function getBookByAuthor(req,res) {
    console.log("Getting books by author"); 
    var name = req.query.author;

    librarymodels.getBookByAuthor(name, function(error, results) {
        if (!error) {
            res.json(results); //This is the callback function
        }
            
       });
  }
//Find book by a genre search
  function getBookByGenre(req,res) {
    var genre = req.query.genre;
    console.log("Getting books by genre");
   librarymodels.getBookByGenre(genre, function(error, results) {
    if (!error) {
        res.json(results); //This is the callback function
    }
   }); 
  }

  function addBook(req, res) {
    var name = req.body.name;
    var blurb = req.body.blurb;
    console.log("Adding a new book: " + name);
    librarymodels.insertBook(name, blurb, function(results) {
        res.json(results);
    });
  }

  function search(req, res) {
      //TODO: check if book id, author id, or genre id and call appropriate function
      var title = req.query.title; //TODO: from query
      librarymodels.searchByTitle(title, function(results) {
          res.json(results);
      });

     /*  var authorid;
      librarymodels.searchByAuthor(authorId, function(results) {
        res.json(results);
    });

    var genreid;
    librarymodels.searchByGenre(genreId, function(results) {
        res.json(results);
    }); */

  }

  module.exports = {
      search: search,
      getBooks: getBooks,
      getBookByTitle: getBookByTitle,
      getBookByAuthor: getBookByAuthor,
      getBookByGenre: getBookByGenre,
      addBook: addBook
  };