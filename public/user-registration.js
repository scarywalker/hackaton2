document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const full_name = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const contact_telephone = document.getElementById("contactTelephone").value;
        const areas_of_interest = document.getElementById("areasOfInterest").value
        const available_locations = document.getElementById("availableLocations").value

        const formData = {
            username,
            password,
            full_name,
            email,
            contact_telephone,
            areas_of_interest,
            available_locations,
        };

        try {
            const response = await fetch("/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("User registered successfully:", responseData);
                window.location.href = `http://localhost:5000/`;
                // Add any additional logic or redirect to another page as needed
            } else {
                console.error("Failed to register user");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    });
});
