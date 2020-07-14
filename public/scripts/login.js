//const { getCheckedBooks } = require("../../models/librarymodels");

function login() {
	var username = $("#username").val();
	var password = $("#password").val();

	var params = {
		username: username,
		password: password
    };
    
	$.post("/login", params, function(result) {
		if (result && result.success) {
			$("#message").empty();
			$("#error").empty();
			$('#username').val("");
        	$('#password').val("");
			$("#status").text("Successfully logged in.");
			getBooks();
			getCheckedBooks();
			getReadBooks();
		} else {
			$("#status").text("Error logging in.");
		}
	});
}

function logout() {
	$.post("/logout", function(result) {
		if (result && result.success) {
			$("#checkResults").empty();
			$("#readResults").empty();
			$("#status").text("Successfully logged out.");
			getBooks();
			
		} else {
			$("#status").text("Error logging out.");
		}
	});
}

function getServerTime() {
	$.get("/getServerTime", function(result) {
		if (result && result.success) {
			$("#status").text("Server time: " + result.time);
		} else {
			$("#status").text("Got a result back, but it wasn't a success. Your reponse should have had a 401 status code.");
		}
	}).fail(function(result) {
		$("#status").text("Could not get server time.");
	});
}

function register() {
    var username = $("#rusername").val();
    var password = $("#rpassword").val();
    
	var params = {
		username: username,
		password: password
    };

	$.post("/register", params, function(result) {
        console.log(result);
		if (result) {
			$("#status").text("Successfully registered.");
		} else {
			$("#status").text("Error registering.");
		}
	});
}