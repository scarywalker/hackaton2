document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Add your login logic here
        // You can use Fetch API to send the login data to the server
    });
});
