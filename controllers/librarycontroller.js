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

  //Get all the authors
function getAuthors(req,res) {
    console.log("Getting Authors"); 

    librarymodels.getAuthors(function(error, results) {
        if (!error) {
            res.json(results); //This is the callback function
        }
    }) 
  }

    //Get all the genres
function getGenres(req,res) {
    console.log("Getting Genres"); 

    librarymodels.getGenres(function(error, results) {
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

  //Get Book Details
  function getDetails(req,res) {
    var id = req.query.id;
    console.log("Getting book details");
   librarymodels.getDetails(id, function(error, results) {
    if (!error) {
        res.json(results); //This is the callback function
    }
   }); 
  }

  function addBook(req, res) {
    var title = req.body.title;
    var blurb = req.body.blurb;
    var author = req.body.author;
    var genre = req.body.genre;
    var user = req.body.user;

    console.log("Adding a new book: " + title);
    console.log(author);
    console.log(genre);

     librarymodels.insertBook(title, blurb, author, genre, user, function(results) {
            res.json(results);  
    }); 
  }

  function addAuthor(req, res) {
    var author = req.body.author;
    console.log("Adding a new author: " + author);
  
     librarymodels.insertAuthor(author, function(results) {
            res.json(results); 
            console.log(results); 
    }); 
  }


  module.exports = {
      addAuthor: addAuthor,
      getAuthors: getAuthors,
      getGenres: getGenres,
      getDetails: getDetails,
      getBooks: getBooks,
      getBookByTitle: getBookByTitle,
      getBookByAuthor: getBookByAuthor,
      getBookByGenre: getBookByGenre,
      addBook: addBook
  };