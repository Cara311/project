
    function getBooks() {
        console.log("Searching for books...");
       
        $.get("/books", function(data) { 
            //console.log("Back with: ");
            //console.log(data);
            $("#tableResults").empty();
            for (var i = 0; i < data.rows.length; i++) {
                var book = data.rows[i];
                //console.log(book);
                //$("#ulBooks").append("<li>" + book.title + " " + book.name + "</li>");

                $("#tableResults").append("<tr id='bookRow'><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn btn-warning' id='" + book.book_id + "'>Get Details</button></td>");
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

            for (var i = 0; i < data.length; i++) {
                $("#tableResults").empty();
                var book = data[i];
                //console.log(book);
                $("#tableResults").append("<tr><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn btn-warning' id='" + book.book_id + "'>Get Details</button></td>");
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

             for (var i = 0; i < data.length; i++) {
                $("#tableResults").empty();
                var book = data[i];
                //console.log(book);
                $("#tableResults").append("<tr><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn btn-warning' id='" + book.book_id + "'>Get Details</button></td>");
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

            $("#tableResults").empty();
            for (var i = 0; i < data.length; i++) {
                var book = data[i];
                //console.log(book);
                $("#tableResults").append("<tr><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn btn-warning' id='" + book.book_id + "'>Get Details</button></td>");
            }
            
        })
    }
