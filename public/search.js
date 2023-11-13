function updateInformation() {
  // Add logic for updating information
  console.log("Updating Information");
}

function addProject() {
  // Add logic for adding a project
  console.log("Adding Project");
}

function deleteProject() {
  // Add logic for deleting a project
  console.log("Deleting Project");
}

function updateProject() {
  // Add logic for updating a project
  console.log("Updating Project");
}

function performSearch() {
  // Add logic for performing search
  console.log("Performing Search");
}

const resultsDiv = document.querySelector(".search-results");

function appendBoxes(dataArray) {
  dataArray.forEach((obj) => {
    const box = document.createElement("div");

    if (obj.organization_id !== undefined) {
      const { title, location, description } = obj;
      box.innerHTML = `<p>Title: ${title}</p><p>Location: ${location}</p><p>Description: ${description}</p>`;
      box.className = "result-box project";
    } else if (obj.available_locations !== undefined) {
      const {
        id,
        username,
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
    areas_of_interest: '{"Environmental Conservation","Wildlife Protection"}',
  },
  {
    id: 1,
    username: "user2",
    full_name: "John Doe",
    email: "john@example.com",
    contact_telephone: "123-456-7890",
    areas_of_interest: '{"Education","Community Service"}',
    available_locations: '{"CityA","CityB"}',
  },
];

const searchType = document.getElementById("searchType");
const searchInput = document.getElementById("searchInput");

function filterType() {
    list = resultsDiv.children
  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("correct")) {list[i].classList.remove("correct")}
    if (list[i].classList.contains(`${searchType.value}`)) {list[i].classList += " correct"};
  }
}

appendBoxes(data);

filterType();
searchType.addEventListener("input", filterType);

console.log(resultsDiv.children[0]);
