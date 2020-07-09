const librarymodels = require("../models/librarymodels.js");
const bcrypt = require('bcrypt');

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
            
            result = {success: true}; 
            res.json(result); 
    }); 
  }

  function addAuthor(req, res) {
    var author = req.body.author;
    console.log("Adding a new author: " + author);
  
     librarymodels.insertAuthor(author, function(results) {
        result = {success: true};     
        res.json(result); 
    }); 
  }

  function removeBook(req, res) {
    var id = req.query.id;
    console.log("Removing Book");
   librarymodels.removeBook(id, function(error, results) {
        result = {success: true};     
        res.json(result); 
   });

  }

  function checkInOut(req, res) {
    var id = req.query.id;
    var status = req.query.out;
    console.log("Checking Book " + status);

     if(status == 'false') {
      librarymodels.checkOut(id, function(error, results) {
        console.log('Checked out');
        res.json({success: true, out:true}); 
      });
    } else {
      librarymodels.checkIn(id, function(error, results) {
        console.log('Checked In');
        res.json({success: true, out:false}); 
      });
    } 
  
  }




    //Functions For Logging in and Out

  function register(req, res) {
    var username = req.body.username;
    var ptpassword = req.body.password;
    const saltRounds = 10;

    const hash = bcrypt.hashSync(ptpassword, saltRounds);

   
      librarymodels.insertUser(username, hash, function(error, results) {
        res.json(results); 
  });

  }


  function handleLogin(request, response) {
    var username = request.body.username;

    if(username) {
      librarymodels.check(username, function(error, results) {
        //res.json(results); 
        console.log(results);
  
        //Get the results from database and test hash
        for (var i = 0; i < results.rows.length; i++) {
          var info = results.rows[i];
          console.log(info);
        }
        var user = info.username;
        var hash = info.password;
        var password = request.body.password;
        var test = bcrypt.compareSync(password, hash);
        
        var result = {success: false};
        // We should do better error checking here to make sure the parameters are present
        if (request.body.username == user && test == true) {
          request.session.user = request.body.username;
          result = {success: true};
        }
        response.json(result); 
      }); 
    } else {
      result = 0;
      response.json(result);
    }
      
  }

  // If a user is currently stored on the session, removes it
function handleLogout(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.session.user) {
		request.session.destroy();
		result = {success: true};
	} else {
    result = 0;
  }

	response.json(result);
}

// This function returns the current server time
function getServerTime(request, response) {
	var time = new Date();
	
	var result = {success: true, time: time};
	response.json(result); 
}

// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(request, response, next) {
	if (request.session.user) {
		// They are logged in!
		// pass things along to the next function
		next();
	} else {
		// They are not logged in
    // Send back an unauthorized status
		var result = {success:false, message: "Access Denied"};
    //response.status(401).json(result);
    response.json(result);
	}
}

// This middleware function simply logs the current request to the server
function logRequest(request, response, next) {
	console.log("Received a request for: " + request.url);

	// don't forget to call next() to allow the next parts of the pipeline to function
	next();
}




  module.exports = {
    checkInOut: checkInOut,
    removeBook: removeBook,
    register: register,
    logRequest: logRequest,
    verifyLogin: verifyLogin,
    getServerTime: getServerTime,
    handleLogout: handleLogout,
    handleLogin: handleLogin,
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