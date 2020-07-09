$(document).ready(function(){
        $('#btitle').val("");
        $('#bblurb').val("");
        $('#bauthor').val("");
        $('#aname').val("");
        $('#title').val("");
        $('#author').val("");
        $('#genre').val("");
        $('#uid').val("");

    $.get("/authors", function(data) { 
        //console.log("Back with: ");
        //console.log(data);
        $("#error").empty();
        if(data < 1) {
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

    $.get("/genres", function(data) { 
        //console.log("Back with: ");
        //console.log(data);
        $("#error").empty();
        if(data < 1) {
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
        console.log("Searching for books...");
        $("#error").empty();
        $('.success').empty();
        $("#detailResults").empty();
        $("#checked").empty();
       
        $.get("/books", function(data) { 
            //console.log("Back with: ");
            //console.log(data);
            $("#error").empty();
            if(data < 1) {
                $('#error').append("<p class='error'>Unable to find any books</p>")
            }
            $("#tableResults").empty();
            for (var i = 0; i < data.rows.length; i++) {
                var book = data.rows[i];
                //console.log(book);
                //$("#ulBooks").append("<li>" + book.title + " " + book.name + "</li>");

                $("#tableResults").append("<tr id='bookRow'><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn tableBtn' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td><td><button class='btn removeBtn' id='" + book.book_id + "'onclick='removeBook(this.id)'> X </button></td>");
            }
        })
    }

    function searchByTitle() {
        //console.log("Searching by title...");
        var title = $("#title").val();
        //console.log(title);
        $.get("/title", {title:title}, function(data) { //Do the ajax request then do this when you come back.
            //console.log("Back with: ");
            //console.log(data);
            $("#error").empty();
            if(data < 1) {
                $('#error').append("<p class='error'>Unable to find title</p>")
            }

            for (var i = 0; i < data.length; i++) {
                $("#tableResults").empty();
                $("#detailResults").empty();
                $('#title').val("");
                var book = data[i];
                //console.log(book);
                $("#tableResults").append("<tr><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn tableBtn' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td><td><button class='btn removeBtn' id='" + book.book_id + "'onclick='removeBook(this.id)'> X </button></td>");
            }
            
        })
    }

    function searchByAuthor() {
        //console.log("Searching by author...");
        var author = $("#author").val();
        //console.log(author);
        $.get("/author", {author:author}, function(data) { //Do the ajax request then do this when you come back.
            //console.log("Back with: ");
            //console.log(data);
            $("#error").empty();
            if(data < 1) {
                $('#error').append("<p class='error'>Unable to find author</p>")
            }
            $("#detailResults").empty();
            $("#tableResults").empty();
            $('#author').val("");
             for (var i = 0; i < data.length; i++) {
                var book = data[i];
                //console.log(book);
                $("#tableResults").append("<tr><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn tableBtn' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td><td><button class='btn removeBtn' id='" + book.book_id + "'onclick='removeBook(this.id)'> X </button></td>");
            } 
            
        })
    }

    function searchByGenre() {
        //console.log("Searching by title...");
        var genre = $("#genre").val();
        //console.log(title);
        $.get("/genre", {genre:genre}, function(data) { //Do the ajax request then do this when you come back.
            //console.log("Back with: ");
            //console.log(data);
            $("#error").empty();
            if(data < 1) {
                $('#error').append("<p class='error'>Unable to find genre</p>")
            }
            $("#detailResults").empty();
            $("#tableResults").empty();
            $('#genre').val("");
            for (var i = 0; i < data.length; i++) {
                var book = data[i];
                //console.log(book);
                $("#tableResults").append("<tr><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn tableBtn' id='" + book.book_id + "' onclick='getDetails(this.id)'>Get Details</button></td><td><button class='btn removeBtn' id='" + book.book_id + "'onclick='removeBook(this.id)'> X </button></td>");
            }
            
        })
    }

    function getDetails(id) {
        var id = id;
        console.log(id);
        $.get("/details", {id:id}, function(data) { //Do the ajax request then do this when you come back.
            console.log("Back with: ");
            console.log(data);
            $("#error").empty();

            if(data < 1) {
                $('#error').append("<p class='error'>Unable to get details</p>")
            }
            $("#detailResults").show();
             $("#detailResults").empty();
            for (var i = 0; i < data.length; i++) {
                var book = data[i];
                console.log(book);
                if(book.out === false) {
                    $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td>" + book.out + "</td><td><button class='btn tableBtn' id='" + book.book_id + "' onclick='checkInOut(this.id," + book.out + ")'>Check Out</button></td>");
                } else {
                    $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td>" + book.out + "</td><td><button class='btn tableBtn' id='" + book.book_id + "' onclick='checkInOut(this.id," + book.out + ")'>Check In</button></td>");
                }
                
            } 
        })
    }

    function removeBook(id) {
        var id = id;
        console.log(id);
        $.get("/remove", {id:id}, function(result) { //Do the ajax request then do this when you come back.
            console.log("Back with: ");
            console.log(result);
            $("#error").empty();

            if (result && result.success) {
                $('#message').append("<p class='success'>Book removed</p>");
                getBooks();
            } else {
                $("#error").text("Please log in to remove book.");
            }
        }).fail(function(result) {
            $("#error").text("Please log in to remove book.");
        
        })
    }

    function addBook() {
        var title = $("#btitle").val();
        var blurb = $("#bblurb").val();
        var author = $("#bauthor").val();
        var genre = $("#bgenre").val();
        var user = $("#uid").val();

         $.post('/add', {title:title, blurb:blurb, author:author, genre:genre, user:user}, function(result) {

            if (result && result.success) {
                $(".success").text("Book added.");
                console.log("Back with: " + result.success);
                $('.success').empty();
                $('.success').append("<p>Book has been added</p>");
                $('#btitle').val("");
                $('#bblurb').val("");
                $('#bauthor').val("");
                $('#uid').val("");
                getBooks();
            } else {
                $(".success").text("Please log in to add book.");
            }
        }).fail(function(result) {
            $(".success").text("Please log in to add book.");
        
        }) 
    }

    function addAuthor() {
        var author = $("#aname").val();

         $.post('/addauthor', {author:author}, function(result) {

            if (result && result.success) {
                $('.success').empty();
                $('.success').append("<p>Author has been added</p>");
                //Clear form fields
                $('#aname').val("");

            } else {
                $(".success").text("Please log in to add author.");
            }
        }).fail(function(result) {
            $(".success").text("Please log in to add author.");

        }) 
    }

    //Check a book in or out
    function checkInOut(id, out) {
        var id = id;
        var out = out;
      
       $.get("/checkInOut", {id:id, out:out}, function(result) { //Do the ajax request then do this when you come back.

            $("#checked").empty();
            getDetails(id);

            if (result && result.success) {
                if(result.out) {
                    $('#checked').append("<p class='success' id='checkedstat'>Book checked out</p>");
                } else if(!result.out) {
                    $('#checked').append("<p class='success' id='checkedstat'>Book checked in</p>"); 
                } else {
                    $('#checked').append("<p class='success' id='checkedstat'>Unable to process book</p>");  
                } 

            } else {
                $("#checked").append("<p class='error'>Please log in to check books in or out.</p>");
            }
        }).fail(function(result) {
            $("#checked").append("<p class='error'>Please log in to check books in or out.</p>");
           
        }) 
    }



