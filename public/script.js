document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userType = document.querySelector(
      "input[name='userType']:checked"
    ).value;

    let loginURL;
    if (userType === "user") {
      loginURL = "/users/login";
    } else if (userType === "organization") {
      loginURL = "/orgs/login";
    } else {
      console.error("Invalid user type selected");
      return;
    }

    try {
      const response = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login success:", data);
      window.location.href = `http://localhost:5000/search.html?username=${username}&userType=${userType}`;
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid Credentials");
    }
  });
});
