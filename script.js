const API_URL = "https://script.google.com/macros/s/AKfycbyL6HxmrZeRUORAuShXV1ViJakWvId4SawEukSWASqfxx3OOYyRh7OnC5eRi5sco8go3g/exec";
let database = {};

// PAGE INITIALIZATION DELAY
window.onload = function() {
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 2500);

  loadData();
};

// FETCH DATA RECORDS
async function loadData() {
  try {
    const response = await fetch(API_URL + "?action=getData");
    database = await response.json();
    console.log(database);
    updateDashboard();
  } catch(error) {
    console.error("Data load error:", error);
  }
}

// COMPUTE METRICS 
function updateDashboard() {
  if (!database.projects) return;

  let total = 0;
  let ongoing = 0;
  let completed = 0;

  database.projects.forEach((row, index) => {
    if (index === 0) return; // Skip headers
    total++;
    if (row[7] === "In Progress") ongoing++;
    if (row[7] === "Completed") completed++;
  });

  document.getElementById("toolCount").innerText = total;
  document.getElementById("ongoingCount").innerText = ongoing;
  document.getElementById("completedCount").innerText = completed;
}

// DATA SEARCH PIPELINE
function searchProject() {
  if (!database.projects) return;

  const value = document.getElementById("searchInput").value.toLowerCase().trim();
  let html = "";

  database.projects.forEach((row, index) => {
    if (index === 0) return;
    const projectName = String(row[1]).toLowerCase();
    if (projectName.includes(value)) {
      html += createProjectCard(row);
    }
  });

  if (html === "") {
    html = `<div class="project-card"><h2>No Projects Found</h2></div>`;
  }

  document.getElementById("results").innerHTML = html;
}

// INLINE FILTER ELEMENT BUILDER
function showProjects() {
  if (!database.projects) return;

  let html = "";
  database.projects.forEach((row, index) => {
    if (index === 0) return;
    html += createProjectCard(row);
  });

  document.getElementById("results").innerHTML = html;
  
  // Smooth scroll down to components panel view
  document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
}

function createProjectCard(row) {
  return `
    <div class="project-card">
      <h2>${row[1]}</h2>
      <p><b>Leader:</b> ${row[2]}</p>
      <p><b>Year:</b> ${row[3]}</p>
      <p><b>Status:</b> <span class="status-badge">${row[7]}</span></p>
      <p><b>Current Stage:</b> ${row[25]}</p>
    </div>
  `;
}

// SECURE USER ACCESS GATEWAY LINK
document.getElementById("loginBtn").addEventListener("click", () => {
  alert("Login System Coming Next");
});
