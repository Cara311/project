
$(document).ready(function () {
    $('#btitle').val("");
    $('#bblurb').val("");
    $('#bauthor').val("");
    $('#aname').val("");
    $('#title').val("");
    $('#author').val("");
    $('#genre').val("");
    $('#uid').val("");
    $("#logout").hide();
    getBooks();


    //Get the list of authors to populate drop-down
    $.get("/authors", function (data) {
        //console.log("Back with: ");
        //console.log(data);
        $("#error").empty();
        if (data < 1) {
            $('#error').append("<p class='error'>Unable to find any authors</p>")
        }
        $("#bauthor").empty();
        for (var i = 0; i < data.rows.length; i++) {
            var author = data.rows[i];
            //console.log(book);
            //$("#ulBooks").append("<li>" + book.title + " " + book.name + "</li>");

            $("#bauthor").append("<option value='" + author.id + "'>" + author.name + "</option>");
        }
    })
    //Get the list of genres to populate genres
    $.get("/genres", function (data) {
        //console.log("Back with: ");
        //console.log(data);
        $("#error").empty();
        if (data < 1) {
            $('#error').append("<p class='error'>Unable to find any genres</p>")
        }
        $("#bgenre").empty();

        for (var i = 0; i < data.rows.length; i++) {
            var genre = data.rows[i];
            //console.log(book);
            //$("#ulBooks").append("<li>" + book.title + " " + book.name + "</li>");

            $("#bgenre").append("<option value='" + genre.id + "'>" + genre.genre + "</option>");
        }
    })

});

function getBooks() {
    //console.log("Searching for books...");
    $("#error").empty();
    $('.success').empty();
    $("#detailResults").empty();
    $("#checked").empty();
    //Get the information about the books
    $.get("/books", function (data) {
        //console.log("Back with: ");
        //console.log(data);
        //Get the userid from the session
        $.get("/session_id", function (user) {
            var user_id = user;
            //Empty the error message
            $("#error").empty();
            if (data < 1) {
                $('#error').append("<p class='error'>Unable to find any books</p>")
            } else {
                $("#tableResults").empty(); //Empty the table
                for (var i = 0; i < data.rows.length; i++) {
                    var book = data.rows[i];
                    $("#tableResults").append("<tr id='bookRow'><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn tableBtn' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td><td><button class='btn removeBtn' id='" + book.book_id + "'onclick='removeBook(this.id)'> X </button></td>");

                }
            }
        })
    })
}

function searchByTitle() {
    //console.log("Searching by title...");
    var checkTitle = $("#title").val();
    var title = checkSearchInput(checkTitle);
    //console.log(title);
    $.get("/title", {
        title: title
    }, function (results) { 
        //console.log("Back with: ");
        //console.log(results);
        $("#status").empty();
        if (results != null) {
            $("#tableResults").empty();
            $("#detailResults").empty();
            $('#title').val("");
            for (var i = 0; i < results.length; i++) {

                var book = results[i];
                $("#tableResults").append("<tr id='bookRow'><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn tableBtn' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td><td><button class='btn removeBtn' id='" + book.book_id + "'onclick='removeBook(this.id)'> X </button></td>");
            }
        } else {
            $("#status").append("<p class='error'>Title not found.</p>");
        }


    })
}

function searchByAuthor() {
    //console.log("Searching by author...");
    var checkAuthor = $("#author").val();
    var author = checkSearchInput(checkAuthor);

    //console.log(author);
    $.get("/author", {
        author: author
    }, function (results) { 
        //console.log("Back with author books: ");
        //console.log(data);
        $("#status").empty();
        if (results != null) {
            $("#tableResults").empty();
            $("#detailResults").empty();
            $('#author').val("");
            for (var i = 0; i < results.length; i++) {
                var book = results[i];
                $("#tableResults").append("<tr id='bookRow'><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn tableBtn' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td><td><button class='btn removeBtn' id='" + book.book_id + "'onclick='removeBook(this.id)'> X </button></td>");
            }
        } else {
            $("#status").append("<p class='error'>Author not found.</p>");
        }


    })
}

function searchByGenre() {
    //console.log("Searching by title...");
    var checkGenre = $("#genre").val();
    var genre = checkSearchInput(checkGenre);
    //console.log(title);
    $.get("/genre", {
        genre: genre
    }, function (results) {
        $("#status").empty();
        if (results != null) {
            $("#tableResults").empty();
            $("#detailResults").empty();
            $('#genre').val("");
            for (var i = 0; i < results.length; i++) {
                var book = results[i];
                $("#tableResults").append("<tr id='bookRow'><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn tableBtn' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td><td><button class='btn removeBtn' id='" + book.book_id + "'onclick='removeBook(this.id)'> X </button></td>");
            }
        } else {
            $("#status").append("<p class='error'>Genre not found.</p>");
        }

    })
}

function getDetails(id) {
    var id = id;
    //console.log(id);
    $.get("/details", {
        id: id
    }, function (data) { 
        //console.log("Back with: ");
        //console.log(data);
        $("#error").empty();

        if (data < 1) {
            $('#error').append("<p class='error'>Unable to get details</p>")
        }
        //Get the session id 
        $.get("/session_id", function (user) {
            var user_id = user;
            //console.log("the get details user id is:" + user_id);
            //Check to see if this book has been read 
            $.get("/checkRead", {
                id: id
            }, function (read) {
                //console.log("Read status is: " + read);
                var readstatus = read;
                //Check to see if this user has the book checked out.
                $.get("/checkUser", {
                    id: id
                }, function (check) {
                    //console.log(check);
                    if (check.rowCount > 0) {
                        for (var i = 0; i < check.rows.length; i++) {
                            var checked = check.rows[i];
                            var checkedUser = checked.user_id;
                        }
                    } else {
                        var checked = 0;
                        //console.log("Checked status is: " + checked);
                    }

                    $("#detailResults").show();
                    $("#detailResults").empty();
                    for (var i = 0; i < data.length; i++) {
                        var book = data[i];
                        // console.log(book.user_id);
                        //console.log(book.out);
                        if (user_id > 0) {
                            $("#detailResults").empty();
                            if (book.out === false && readstatus === true) {
                                $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td>Book Read</td><td><button class='btn tableBtn' id='" + book.book_id + "' onclick='checkInOut(this.id," + book.out + ")'>Check Out</button></td>");
                            } else if (book.out === true && readstatus === true && user_id === checkedUser) {
                                $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td>Book Read</td><td><button class='btn tableBtn' id='" + book.book_id + "' onclick='checkInOut(this.id," + book.out + ")'>Check In</button></td>");
                            } else if (book.out === false && readstatus === false) {
                                $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td><button class='btn checkBtn' id='" + book.book_id + "' onclick='markRead(this.id," + book.out + ")'>&#10004;</button></td><td><button class='btn tableBtn' id='" + book.book_id + "' onclick='checkInOut(this.id," + book.out + ")'>Check Out</button></td>");
                            } else if (book.out === true && readstatus === false && user_id === checkedUser) {
                                $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td><button class='btn checkBtn' id='" + book.book_id + "' onclick='markRead(this.id," + book.out + ")'>&#10004;</button></td><td><button class='btn tableBtn' id='" + book.book_id + "' onclick='checkInOut(this.id," + book.out + ")'>Check In</button></td>");
                            } else if (user_id === checkedUser) {
                                $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td>N/A</td><td><button class='btn tableBtn' id='" + book.book_id + "' onclick='checkInOut(this.id," + book.out + ")'>Check In</button></td>");
                            } else {
                                $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td>N/A</td><td>Book checked out by another user</td>");
                            }

                        } else {
                            $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td>N/A</td><td><button class='btn tableBtn' id='" + book.book_id + "' onclick='checkInOut(this.id," + book.out + ")'>Check Out</button></td>");
                        }
                    }
                })
            })
        })
    })
}

function removeBook(id) {
    var id = id;
    console.log(id);
    $.get("/remove", {
        id: id
    }, function (result) { 
        //console.log("Back with: ");
        //console.log(result);
        $("#error").empty();

        if (result && result.success) {
            $('#message').append("<p class='success'>Book removed</p>");
            getBooks();
            getReadBooks();
            getCheckedBooks();
        } else {
            $("#error").text("Please log into admin account to remove book.");
        }
    }).fail(function (result) {
        $("#error").text("Please log in to admin account to remove book.");

    })
}

function addBook() {
    $('#addBook').empty();

    var btitle = $("#btitle").val();
    var bblurb = $("#bblurb").val();
    var bauthor = $("#bauthor").val();
    var bgenre = $("#bgenre").val();


    var book = checkInputBook(btitle, bblurb, bauthor, bgenre);
    var title = book[0];
    var blurb = book[1];
    var author = book[2];
    var genre = book[3];

    if (book != false) {
        $.post('/add', {
            title: title,
            blurb: blurb,
            author: author,
            genre: genre
        }, function (result) {

            if (result && result.success) {
                //console.log("Back with: " + result.success);
                $('#addBook').empty();
                $('#addBook').append("<p class='success'>Book has been added</p>");
                $('#btitle').val("");
                $('#bblurb').val("");
                $('#bauthor').val("");
                $('#uid').val("");
                getBooks();
            } else {
                $('#addBook').append("<p class='error'>Please log in to admin account to add book</p>");
            }
        }).fail(function (result) {
            $('#addBook').empty();
            $('#addBook').append("<p class='error'>Please log in to admin account to add book</p>");

        })
    } else {
        $("#addBook").empty();
        $('#addBook').append("<p class='error'>Please fill out all fields.</p>");
    }


}

function addAuthor() {
    var name = $("#aname").val();
    $('#addAuthor').empty();
    var author = checkInput(name);

    $.post('/addauthor', {
        author: author
    }, function (result) {

        if (result && result.success) {
            $('#addAuthor').empty();
            $('#addAuthor').append("<p class='success'>Author has been added</p>");
            //Clear form fields
            $('#aname').val("");
            //Reload Author
            $.get("/authors", function (data) {
                //console.log("Back with: ");
                //console.log(data);
                $("#error").empty();
                if (data < 1) {
                    $('#error').append("<p class='error'>Unable to find any authors</p>")
                }
                $("#bauthor").empty();
                for (var i = 0; i < data.rows.length; i++) {
                    var author = data.rows[i];
                    //console.log(book);
                    //$("#ulBooks").append("<li>" + book.title + " " + book.name + "</li>");

                    $("#bauthor").append("<option value='" + author.id + "'>" + author.name + "</option>");
                }
            })


        } else {
            $('#addAuthor').empty();
            $('#addAuthor').append("<p class='error'>Please log in to admin account to add author.</p>");
        }
    }).fail(function (result) {
        $('#addAuthor').append("<p class='error'>Please log in to admin account to add author.</p>");

    })
}


//Check a book in or out
function checkInOut(id, out) {
    var id = id;
    var out = out;

    $.get("/checkInOut", {
        id: id,
        out: out
    }, function (result) { //Do the ajax request then do this when you come back.
        $("#checked").empty();

        if (result && result.success) {
            if (result.out) {
                $('#checked').append("<p class='success' id='checkedstat'>Book checked out</p>");
                getDetails(id);
                getCheckedBooks();
            } else if (!result.out) {
                $('#checked').append("<p class='success' id='checkedstat'>Book checked in</p>");
                getDetails(id);
                getCheckedBooks();
            } else {
                $('#checked').append("<p class='success' id='checkedstat'>Unable to process book</p>");
            }

        } else {
            $("#checked").append("<p class='error'>Please log in to check books in or out.</p>");
        }
    }).fail(function (result) {
        $("#checked").append("<p class='error'>Please log in to check books in or out.</p>");

    })
}

//Mark a book as read
function markRead(id) {
    var id = id;

    $.get("/markRead", {
        id: id
    }, function (data) {
        $("#checked").empty();
        getDetails(id);
        //console.log("Data for read is: " + data);

        if (data && data.success) {
            $('#checked').append("<p class='success' id='checkedstat'>Book marked as read</p>");
            getDetails(id);
            getBooks();
            getReadBooks();
        } else {
            $("#checked").append("<p class='error'>Please log in to mark books as read.</p>");
        }
    }).fail(function (result) {
        $("#checked").append("<p class='error'>Unable to mark book as read.</p>");
    })
}

function getCheckedBooks() {
    $.get("/getCheckedBooks", function (result) {
        if (result) {
            //console.log("Back with checked out books: ");
            //console.log(result);
            $("#checkResults").empty();
            for (var i = 0; i < result.rows.length; i++) {
                var book = result.rows[i];
                $("#checkResults").append("<tr><td>" + book.title + "</td></tr>");
            }
        } else {
            $("#checkResults").append("<tr><td>Log in to view checked out books</td></tr>");
            //$("#checked").append("<p class='error'>Must log in before viewing checked out books.</p>");
        }

    }).fail(function (result) {
        $("#checked").append("<p class='error'>Unable to get checked out books.</p>");
    })

}


function getReadBooks() {
    $.get("/getReadBooks", function (result) {
        if (result) {
            //console.log("Back with read books: ");
            //console.log(result);
            $("#readResults").empty();
            for (var i = 0; i < result.rows.length; i++) {
                var book = result.rows[i];
                $("#readResults").append("<tr><td>" + book.title + "</td></tr>");
            }
        } else {
            $("#readResults").append("<tr><td>Log in to view checked out books</td></tr>");
            //$("#checked").append("<p class='error'>Must log in before viewing checked out books.</p>");
        }
    }).fail(function (result) {
        $("#checked").append("<p class='error'>Unable to get checked out books.</p>");
    })
}


function checkInput(name) {
    if (name == "") {
        $("#addAuthor").empty();
        $("#addAuthor").append("<p class='error'>Please enter an author's name.</</p>");
        return false;
    } else {
        return name;
    }
}

function checkInputBook(btitle, bblurb, bauthor, bgenre) {
    if (btitle == "" || bblurb == "" || bauthor == "" || bgenre == "") {
        $("#addBook").empty();
        $("#addBook").append("<p class='error'>Please fill out all fields.</</p>");
        return false;
    } else {
        var books = [btitle, bblurb, bauthor, bgenre];
        return books;
    }
}

function checkSearchInput(input) {
    if (input == "") {
        $("#status").empty();
        $("#status").append("<p class='error'>Please enter search term.</</p>");
        return false;
    } else {
        return input;
    }
}

function suggestion() {
    $.get("/suggestion", function (results) {
        if (result) {
            //console.log("Back with checked out books: ");
            //console.log(result);
            $("#checkResults").empty();
            for (var i = 0; i < result.rows.length; i++) {
                var book = result.rows[i];
                $("#checkResults").append("<tr><td>" + book.title + "</td></tr>");
            }
        } else {
            $("#status").append("<tr><td>Log in to view checked out books</td></tr>");
        }

    })
}