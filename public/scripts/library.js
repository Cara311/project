
    $("#bookForm").hide();
    $("detailResults").hide();

    function getBooks() {
        console.log("Searching for books...");
       
        $.get("/books", function(data) { 
            //console.log("Back with: ");
            //console.log(data);
            if(data < 1) {
                $('#error').append("<p class='error'>Unable to find any books</p>")
            }
            $("#tableResults").empty();
            for (var i = 0; i < data.rows.length; i++) {
                var book = data.rows[i];
                //console.log(book);
                //$("#ulBooks").append("<li>" + book.title + " " + book.name + "</li>");

                $("#tableResults").append("<tr id='bookRow'><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn btn-warning' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td>");
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
            if(data < 1) {
                $('#error').append("<p class='error'>Unable to find title</p>")
            }

            for (var i = 0; i < data.length; i++) {
                $("#tableResults").empty();
                var book = data[i];
                //console.log(book);
                $("#tableResults").append("<tr><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn btn-warning' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td>");
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
            if(data < 1) {
                $('#error').append("<p class='error'>Unable to find author</p>")
            }

             for (var i = 0; i < data.length; i++) {
                $("#tableResults").empty();
                var book = data[i];
                //console.log(book);
                $("#tableResults").append("<tr><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn btn-warning' id='" + book.book_id + "'onclick='getDetails(this.id)'>Get Details</button></td>");
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
            if(data < 1) {
                $('#error').append("<p class='error'>Unable to find genre</p>")
            }

            $("#tableResults").empty();
            for (var i = 0; i < data.length; i++) {
                var book = data[i];
                //console.log(book);
                $("#tableResults").append("<tr><td>" + book.title + "</td><td>" + book.name + "</td><td><button class='btn btn-warning' id='" + book.book_id + "' onclick='getDetails(this.id)'>Get Details</button></td>");
            }
            
        })
    }

    function getDetails(id) {
        var id = id;
        console.log(id);
        $.get("/details", {id:id}, function(data) { //Do the ajax request then do this when you come back.
            console.log("Back with: ");
            console.log(data);

            if(data < 1) {
                $('#error').append("<p class='error'>Unable to get details</p>")
            }
            $("#detailResults").show();
             $("#detailResults").empty();
            for (var i = 0; i < data.length; i++) {
                var book = data[i];
                console.log(book);
                $("#detailResults").append("<tr><td>" + book.title + "</td><td>" + book.blurb + "</td><td>" + book.name + "</td><td>" + book.genre + "</td><td>" + book.out + "</td>");
            } 
            
        })
       
    }

    function addBook() {
        console.log("Here");
        var title = $("#btitle").val();
        var blurb = $("#bblurb").val();
        var author = $("#bauthor").val();
        var genre = $("#bgenre").val();
        var user = $("#uid").val();

         $.post('/add', {title:title, blurb:blurb, author:author, genre:genre, user:user}, function(data) {
            console.log("Back with: " + data);
        }) 
    }

    /* $('#bookForm').on('submit', function(e) {
        e.preventdefault();
        console.log("Here")
        var title = $("#btitle").val();
        var blurb = $("#bblurb").val();
        var author = $("#bauthor").val();
        var genre = $("#bgenre").val();
        var user = $("#uid").val();
        console.log(title);

        $.post('/add', {title:title, blurb:blurb, author:author, genre:genre, user:user}, function(data) {
            console.log("Back with: " + data);
        })
    }) */
