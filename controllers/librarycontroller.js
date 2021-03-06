const librarymodels = require("../models/librarymodels.js");
const bcrypt = require('bcrypt');


//Get all the books
function getBooks(req, res) {
  console.log("Getting Books");


  librarymodels.getBooks(function (error, results) {
    if (!error) {
      res.json(results); //This is the callback function
    }
  })
}

function getSuggestion(req, res) {
  librarymodels.getSuggestion(function (error, results) {
    if (!error) {
      res.json(results);
    } else {
      results = {
        error: true
      };
    }
  })
}

//Get the session id
function getSessionId(req, res) {
  var user_id = req.session.userid;
  //console.log("Getting session id: " + user_id);
  res.json(user_id);
}

//Get all the authors
function getAuthors(req, res) {
  //console.log("Getting Authors"); 

  librarymodels.getAuthors(function (error, results) {
    if (!error) {
      res.json(results); //This is the callback function
    }
  })
}

//Get all the genres
function getGenres(req, res) {
  //console.log("Getting Genres"); 

  librarymodels.getGenres(function (error, results) {
    if (!error) {
      res.json(results); //This is the callback function
    }
  })
}


//Get the book by title
function getBookByTitle(req, res) {
  var title = req.query.title;
  console.log("Getting Title: " + title);

  librarymodels.getBookByTitle(title, function (error, results) {
    console.log(results);
    if (!error) {
      res.json(results); //This is the callback function
    } else {
      results = {
        error: true
      };
      res.json(results);
    }

  });
}

//Find book by author search
function getBookByAuthor(req, res) {
  var name = req.query.author;
  console.log("Getting books by author" + name); 
  librarymodels.getBookByAuthor(name, function (error, results) {
    if (!error) {
      res.json(results); //This is the callback function
    } else {
      results = {
        error: true
      };
      res.json(results);
    }

  });
}
//Find book by a genre search
function getBookByGenre(req, res) {
  var genre = req.query.genre;
  //console.log("Getting books by genre: " + genre);
  librarymodels.getBookByGenre(genre, function (error, results) {
    console.log(results);
    if (!error) {
      res.json(results); //This is the callback function
    } else {
      results = {
        error: true
      };
      res.json(results);
    }
  });
}

//Get Book Details
function getDetails(req, res) {
  var id = req.query.id;
  //console.log("Getting book details" + id);
  librarymodels.getDetails(id, function (error, results) {
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

  //console.log("Adding a new book: " + title);
  librarymodels.insertBook(title, blurb, author, genre, function (error, results) {
    if (!error) {
      result = {
        success: true
      };
      res.json(result);
    }

  });
}

function addAuthor(req, res) {

  var author = req.body.author;
  //console.log("Adding a new author: " + author);

  librarymodels.insertAuthor(author, function (error, results) {
    if (!error) {
      result = {
        success: true
      };
      res.json(result);
    }
  });
}

function removeBook(req, res) {
  var id = req.query.id;
  //console.log("Removing Book");
  librarymodels.removeBook(id, function (error, results) {
    result = {
      success: true
    };
    res.json(result);
  });

}

function checkInOut(req, res) {
  var id = req.query.id;
  var status = req.query.out;
  var user_id = req.session.userid;
  //console.log("Checking Book for: " + user_id);

  if (status == 'false') {
    librarymodels.checkOut(id, user_id, function (error, results) {
      //console.log('Checked out');
      res.json({
        success: true,
        out: true
      });
    });
  } else {
    librarymodels.checkIn(id, user_id, function (error, results) {
      //console.log('Checked In');
      res.json({
        success: true,
        out: false
      });
    });
  }

}


//Mark a book as read
function markRead(req, res) {
  var id = req.query.id;
  var user_id = req.session.userid;
  //console.log("Marking read for: " + user_id);

  librarymodels.markRead(id, user_id, function (error, results) {
    // console.log('Marked as read');
    res.json({
      success: true,
      read: true
    });
  });
}

function checkRead(req, res) {

  var user_id = req.session.userid;
  var book_id = req.query.id;
  //console.log("Checking if book has been read by: " + user_id);

  librarymodels.checkRead(user_id, book_id, function (error, results) {
    //console.log("Back from database with read results" + results);
    if (!error) {
      res.json(results);
    } else {
      console.log("Error getting read status");
    }
  });
}



function getCheckedBooks(req, res) {
  var user_id = req.session.userid;
  //console.log("Getting checked out books for: " + user_id);

  librarymodels.getCheckedBooks(user_id, function (error, results) {
    //console.log(results);
    res.json(results);
  });
}

function getReadBooks(req, res) {
  var user_id = req.session.userid;
  //console.log("Getting read books for: " + user_id);

  librarymodels.getReadBooks(user_id, function (error, results) {
    //console.log(results);
    res.json(results);
  });
}

function checkUser(req, res) {
  var id = req.query.id;
  librarymodels.checkUser(id, function (error, result) {
    //console.log('The checked user result from database is: ' + result);
    res.json(result);
  });
}


//Functions For Logging in and Out

function register(req, res) {
  var username = req.body.username;
  var ptpassword = req.body.password;
  const saltRounds = 10;

  const hash = bcrypt.hashSync(ptpassword, saltRounds);


  librarymodels.insertUser(username, hash, function (error, results) {
    res.json(results);
  });

}


function handleLogin(request, response) {
  var username = request.body.username;

  librarymodels.check(username, function (error, results) {
    //res.json(results); 
    console.log(results);
    if (results.rowCount > 0) {
      //Get the results from database and test hash
      for (var i = 0; i < results.rows.length; i++) {
        var info = results.rows[i];
        console.log(info);
      }
      //var id = info.id;
      var user = info.username;
      var hash = info.password;
      var id = info.id;
      var password = request.body.password;
      var test = bcrypt.compareSync(password, hash);

      var result = {
        success: false
      };

      if (request.body.username == user && test == true) {
        request.session.user = request.body.username;
        request.session.userid = id;
        result = {
          success: true
        };
      }
      response.json(result);
    } else {
      var result = {
        error: true
      };
      response.json(result);
    }

  });
}

// If a user is currently stored on the session, removes it
function handleLogout(request, response) {
  var result = {
    success: false
  };

  if (request.session.user) {
    request.session.destroy();
    result = {
      success: true
    };
  } else {
    result = 0;
  }

  response.json(result);
}

// This function returns the current server time
function getServerTime(request, response) {
  var time = new Date();

  var result = {
    success: true,
    time: time
  };
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
    var result = {
      success: false,
      message: "Access Denied"
    };
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

function verifySession(request, response, next) {
  if (request.session.userid) {
    // They are logged in!
    // pass things along to the next function
    next();
  } else {
    request.session.userid = 0;
    next();
  }
}

function verifyAdmin(req, res, next) {
  if (req.session.userid == 1) {
    next();
  } else {
    var result = {
      success: false
    };
    res.json(result);

  }
}

/* 

const { body } = require('express-validator');

function validate(req, res, next) {
     next([body('author', 'must be alphabet characters').isAlpha,
    ]);        
} */
/* 
const { check, validationResult } = require('express-validator');

function checkAuthor(req, res, next) {
  var checking = [check('author').exists().isLength({min: 5}).escape().withMessage('Name must have more than 5 characters')];
   try {
     console.log("At Check");
      const errors = validationResult(checking); 
      console.log(errors);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
     next();
   } catch(err) {
     return next(err)
   }
}  */



module.exports = {
  getSuggestion: getSuggestion,
  verifyAdmin: verifyAdmin,
  checkUser: checkUser,
  checkRead: checkRead,
  getReadBooks: getReadBooks,
  getCheckedBooks: getCheckedBooks,
  markRead: markRead,
  getSessionId: getSessionId,
  verifySession: verifySession,
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