document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Add your form submission logic here
        // You can use Fetch API to send the form data to the server
    });
});
