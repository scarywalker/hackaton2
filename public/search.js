const resultsDiv = document.querySelector(".search-results");
const searchType = document.getElementById("searchType");
const searchInput = document.getElementById("searchInput");
const addButton = document.getElementById("add");
const deleteButton = document.getElementById("delete");
const updateButton = document.getElementById("update");
let userType, username;
const isOrg = !(userType === "user");
let data;

const fetchData = async () => {
  try {
    const usersResponse = await fetch("/users/");
    const usersData = await usersResponse.json();

    const orgsResponse = await fetch("/orgs/");
    const orgsData = await orgsResponse.json();

    const projectsResponse = await fetch("/projects/");
    const projectsData = await projectsResponse.json();

    return [...usersData, ...orgsData, ...projectsData];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  fetchData().then((fetchedData) => {

    const urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get("username");
    let userType = urlParams.get("userType");

    let data = fetchedData;
    appendBoxes(data);

    if (userType !== "user") {
      addButton.style.display = "block";
      deleteButton.style.display = "block";
      updateButton.style.display = "block";
    }

    return { username: username, userType: userType };
  });
});

function appendBoxes(dataArray) {
  if (dataArray) {
    dataArray.forEach((obj) => {
      const box = document.createElement("div");
      if (obj.title) {
        const { username, title, location, description } = obj;
        box.innerHTML = `<p>Organization: ${username}</p><p>Title: ${title}</p><p>Location: ${location}</p><p>Description: ${description}</p>`;
        box.className = "result-box project";
      } else if (obj.available_locations) {
        const {
          full_name,
          email,
          contact_telephone,
          areas_of_interest,
          available_locations,
        } = obj;
        box.innerHTML = `<p>Name: ${full_name}</p><p>Email: ${email}</p><p>Contact Telephone: ${contact_telephone}</p><p>Areas of Interest: ${areas_of_interest}</p><p>Available Locations: ${available_locations}</p>`;
        box.className = "result-box person";
      } else if (obj.full_name) {
        const { full_name, email, contact_telephone, areas_of_interest } = obj;
        box.innerHTML = `<p>Name: ${full_name}</p><p>Email: ${email}</p><p>Contact Telephone: ${contact_telephone}</p><p>Areas of Interest: ${areas_of_interest}</p>`;
        box.className = "result-box organization";
      }

      resultsDiv.appendChild(box);
    });
  }
}

function filterInput() {
  const list = resultsDiv.children;
  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("correct")) {
      list[i].classList.remove("correct");
    }
    if (
      list[i].innerHTML
        .toLowerCase()
        .includes(`${searchInput.value.toLowerCase()}`) &&
      list[i].classList.contains(`${searchType.value}`)
    ) {
      list[i].classList += " correct";
    }
  }
}

function closePopup() {
  const container = document.querySelector(".popup-container");
  document.body.removeChild(container);
  document.body.classList.remove("no-scroll");
}

function updateInformation() {
  const container = document.createElement("div");
  container.className = "popup-container";
  const content = document.createElement("div");
  content.className = "container";
  userText = `
    <label for="availableLocations">Available Locations:</label>
    <input type="text" id="availableLocations">
    `;
  if (isOrg) userText = "";

  content.innerHTML = `
      <button class="close-button" onclick="closePopup()">&times;</button>
      <h1>Organization Registration</h1>
      <form id="organizationRegistrationForm">
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" required>  
        <label for="email">Email:</label>
        <input type="email" id="email" required>  
        <label for="contactTelephone">Contact Telephone:</label>
        <input type="tel" id="contactTelephone" required>  
        <label for="areasOfInterest">Areas of Interest:</label>
        <input type="text" id="areasOfInterest">${userText}
        <button type="submit">Register</button>
      </form>
    `;

  container.appendChild(content);
  document.body.appendChild(container);
  document.body.classList.add("no-scroll");
}

async function fetchDataChange(username) {
  const baseUrl = isOrg ? "/orgs" : "/users";

  try {
    const response = await fetch(`${baseUrl}/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
}

async function updateData(id, newData) {
  try {
    const response = await fetch(`/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const updatedData = await response.json();
    console.log("Updated data:", updatedData);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update data");
  }
}

async function performUpdate(newData) {
  try {
    const fetchedData = await fetchData(username);
    const id = fetchedData.id;
    await updateData(id, newData);
  } catch (error) {
    console.error(error.message);
  }
}

function addProject() {
  const container = document.createElement("div");
  container.className = "popup-container";
  const content = document.createElement("div");
  content.className = "container";
  content.innerHTML = `
        <button class="close-button" onclick="closePopup()">&times;</button>
        <h1>Add Project</h1>
        <form id="addProjectForm">
          <label for="title">Title:</label>
          <input type="text" id="title" required>
          <label for="description">Description:</label>
          <textarea rows="4" cols="50" id="description" required>  </textarea>
          <label for="areasOfInterest">Areas of Interest:</label>
          <input type="text" id="areasOfInterest">
          <label for="availableLocations">Available Locations:</label>        
          <input type="text" id="availableLocations">
          <button type="submit">Register</button>
        </form>
      `;

  container.appendChild(content);
  document.body.appendChild(container);
  document.body.classList.add("no-scroll");
}

function deleteProject() {
  const projects = [
    { title: "thing 1" },
    { title: "thing 2" },
    // Add more objects as needed
  ];

  const container = document.createElement("div");
  container.className = "popup-container";
  const content = document.createElement("div");
  content.className = "container";

  const checkboxes = projects.map((project) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = project.title.toLowerCase().replace(/\s/g, ""); // Generate unique IDs
    checkbox.value = project.title;
    const label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.innerText = `${project.title}`;

    return [checkbox, label];
  });

  content.innerHTML = `
        <button class="close-button" onclick="closePopup()">&times;</button>
        <h1>Delete Project</h1>
        <form id="addProjectForm">            
            <div id="projectCheckboxes">
                ${checkboxes
                  .map((checkbox) =>
                    checkbox.map((el) => el.outerHTML).join("")
                  )
                  .join("")}
            </div>
            <button type="submit">Delete</button>
        </form>
    `;

  container.appendChild(content);
  document.body.appendChild(container);
  document.body.classList.add("no-scroll");
}

function updateProject() {
  const projects = [
    { title: "project 1" },
    { title: "project 2" },
    // Add more objects as needed
  ];

  const container = document.createElement("div");
  container.className = "popup-container";
  const content = document.createElement("div");
  content.className = "container";

  const radioButtons = projects.map((project, index) => {
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "project"; // Ensure they share the same name to make them exclusive
    radioButton.id = `project-${index}`;
    radioButton.value = project.title;
    const label = document.createElement("label");
    label.setAttribute("for", radioButton.id);
    label.innerText = `${project.title}`;

    return [radioButton, label];
  });

  content.innerHTML = `
        <button class="close-button" onclick="closePopup()">&times;</button>
        <h1>Add Project</h1>
        <form id="addProjectForm">
        <div id="projectRadioButtons">
            ${radioButtons
              .map((radioButton) =>
                radioButton.map((el) => el.outerHTML).join("")
              )
              .join("")}
        </div>
            <label for="title">New Title:</label>
            <input type="text" id="title" required>
            <label for="description">New Description:</label>
            <textarea rows="4" cols="50" id="description" required></textarea>
            <label for="areasOfInterest">New Areas of Interest:</label>
            <label for="availableLocations">Available Locations:</label>        
            <input type="text" id="availableLocations">
            <button type="submit">Register</button>
        </form>
    `;

  container.appendChild(content);
  document.body.appendChild(container);
  document.body.classList.add("no-scroll");
}

filterInput();
searchType.addEventListener("input", filterInput);
searchInput.addEventListener("input", filterInput);
