//const { getCheckedBooks } = require("../../models/librarymodels");

function login() {
	$("#status").empty();
	if ($("#username").val() == "" || $("#password").val() == "") {
		$("#status").append("<p class='error'>Fill in all fields.</p>");
	} else {
		var username = $("#username").val();
		var password = $("#password").val();

		var params = {
			username: username,
			password: password
		};

		$.post("/login", params, function (result) {
			if (result && result.success) {
				$("#message").empty();
				$("#error").empty();
				$('#username').val("");
				$('#password').val("");
				$("#status").text("Successfully logged in.");
				$("#login").hide();
				$("#logout").show();
				getBooks();
				getCheckedBooks();
				getReadBooks();
			} else {
				$('#username').val("");
				$('#password').val("");
				$("#status").append("<p class='error'>Error logging in.</p>");
			}
		});
	}
}

function logout() {
	$.post("/logout", function (result) {
		if (result && result.success) {
			$("#checkResults").empty();
			$("#readResults").empty();
			$("#login").show();
			$("#logout").hide();
			$("#status").text("Successfully logged out.");
			getBooks();

		} else {
			$("#status").text("Error logging out.");
		}
	});
}


function register() {
	var username = $("#rusername").val();
	var password = $("#rpassword").val();

	var params = {
		username: username,
		password: password
	};

	$.post("/register", params, function (result) {
		//console.log(result);
		if (result) {
			$("#status").text("Successfully registered.");
		} else {
			$("#status").text("Error registering.");
		}
	});
}