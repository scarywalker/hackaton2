const resultsDiv = document.querySelector(".search-results");
const searchType = document.getElementById("searchType");
const searchInput = document.getElementById("searchInput");
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

appendBoxes(data);

filterInput();
searchType.addEventListener("input", filterInput);
searchInput.addEventListener("input", filterInput);
