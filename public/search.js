const resultsDiv = document.querySelector(".search-results");
const searchType = document.getElementById("searchType");
const searchInput = document.getElementById("searchInput");
const isOrg = false;
const data = [
  {
    organization_id: 1,
    title: "Education Initiative",
    description:
      "Providing educational resources for underprivileged children.",
    location: "CityA",
  },
  {
    id: 1,
    username: "org1",
    full_name: "Environmental Advocates",
    email: "environment@example.com",
    contact_telephone: "444-555-6666",
    areas_of_interest: ["Environmental Conservation", "Wildlife Protection"],
  },
  {
    id: 1,
    username: "user2",
    full_name: "John Doe",
    email: "john@example.com",
    contact_telephone: "123-456-7890",
    areas_of_interest: ["Education", "Community Service"],
    available_locations: ["CityA", "CityB"],
  },
  {
    organization_id: 2,
    title: "Community Outreach",
    description: "Engaging with local communities to address their needs.",
    location: "CityB",
  },
  {
    id: 2,
    username: "org2",
    full_name: "Health for All",
    email: "healthforall@example.com",
    contact_telephone: "111-222-3333",
    areas_of_interest: ["Healthcare", "Community Wellness"],
  },
  {
    id: 2,
    username: "user3",
    full_name: "Alice Johnson",
    email: "alice@example.com",
    contact_telephone: "555-123-4567",
    areas_of_interest: ["Technology", "Youth Development"],
    available_locations: ["CityC", "CityD"],
  },
  {
    organization_id: 3,
    title: "Empowerment Program",
    description: "Empowering individuals through skill development programs.",
    location: "CityC",
  },
  {
    organization_id: 4,
    title: "Green Spaces Project",
    description:
      "Creating and maintaining green spaces for a healthier environment.",
    location: "CityD",
  },
  {
    organization_id: 5,
    title: "Digital Literacy Campaign",
    description: "Promoting digital literacy in underserved communities.",
    location: "CityE",
  },
  {
    id: 3,
    username: "org3",
    full_name: "Animal Guardians",
    email: "animalguardians@example.com",
    contact_telephone: "777-888-9999",
    areas_of_interest: ["Animal Welfare", "Pet Adoption"],
  },
  {
    id: 4,
    username: "org4",
    full_name: "Community Health Initiatives",
    email: "healthinitiatives@example.com",
    contact_telephone: "333-444-5555",
    areas_of_interest: ["Public Health", "Health Education"],
  },
  {
    id: 5,
    username: "org5",
    full_name: "Education for All",
    email: "educationforall@example.com",
    contact_telephone: "999-000-1111",
    areas_of_interest: ["Education Access", "Literacy Programs"],
  },
  {
    id: 3,
    username: "user4",
    full_name: "Bob Smith",
    email: "bob@example.com",
    contact_telephone: "888-777-6666",
    areas_of_interest: ["Community Service", "Technology"],
    available_locations: ["CityF", "CityG"],
  },
  {
    id: 4,
    username: "user5",
    full_name: "Eva Martinez",
    email: "eva@example.com",
    contact_telephone: "666-555-4444",
    areas_of_interest: ["Environment", "Youth Development"],
    available_locations: ["CityH", "CityI"],
  },
  {
    id: 5,
    username: "user6",
    full_name: "Charlie Brown",
    email: "charlie@example.com",
    contact_telephone: "444-333-2222",
    areas_of_interest: ["Technology", "Community Wellness"],
    available_locations: ["CityJ", "CityK"],
  },
];

function appendBoxes(dataArray) {
  dataArray.forEach((obj) => {
    const box = document.createElement("div");

    if (obj.organization_id !== undefined) {
      const { title, location, description } = obj;
      box.innerHTML = `<p>Title: ${title}</p><p>Location: ${location}</p><p>Description: ${description}</p>`;
      box.className = "result-box project";
    } else if (obj.available_locations !== undefined) {
      const {
        full_name,
        email,
        contact_telephone,
        areas_of_interest,
        available_locations,
      } = obj;
      box.innerHTML = `<p>Name: ${full_name}</p><p>Email: ${email}</p><p>Contact Telephone: ${contact_telephone}</p><p>Areas of Interest: ${areas_of_interest}</p><p>Available Locations: ${available_locations}</p>`;
      box.className = "result-box person";
    } else if (obj.full_name !== undefined) {
      const { full_name, email, contact_telephone, areas_of_interest } = obj;
      box.innerHTML = `<p>Name: ${full_name}</p><p>Email: ${email}</p><p>Contact Telephone: ${contact_telephone}</p><p>Areas of Interest: ${areas_of_interest}</p>`;
      box.className = "result-box organization";
    }

    resultsDiv.appendChild(box);
  });
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

appendBoxes(data);

filterInput();
searchType.addEventListener("input", filterInput);
searchInput.addEventListener("input", filterInput);
createRegistrationPopup();
