document.addEventListener("DOMContentLoaded", function () {
    const organizationRegistrationForm = document.getElementById("organizationRegistrationForm");

    organizationRegistrationForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const full_name = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const contact_telephone = document.getElementById("contactTelephone").value;
        const areas_of_interest = document.getElementById("areasOfInterest").value

        const formData = {
            username,
            password,
            full_name,
            email,
            contact_telephone,
            areas_of_interest,
        };

        try {
            const response = await fetch("/orgs/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Org registered successfully:", responseData);
                window.location.href = `http://localhost:5000/`;
            } else {
                console.error("Failed to register user");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    });
});
