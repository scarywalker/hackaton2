document.addEventListener("DOMContentLoaded", function () {
    const organizationRegistrationForm = document.getElementById("organizationRegistrationForm");

    organizationRegistrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Add your form submission logic here
        // You can use Fetch API to send the form data to the server
    });
});
