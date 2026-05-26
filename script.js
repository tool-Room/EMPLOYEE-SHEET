const API_URL =
"https://script.google.com/macros/s/AKfycbwhpyhV5ly5gVzDOJjR8WyO3p3bfr8U7t_IaV3oeqHom67nMFJLXnMyyyYf4sL8ISfx6A/exec";

let database = {};

let isLoggedIn = false;

let currentUser = "";

// PAGE LOAD

window.onload = function(){

  // SHOW MAIN PAGE

  setTimeout(()=>{

    document.getElementById(
      "loading-screen"
    ).style.display = "none";

    document.getElementById(
      "main-content"
    ).style.display = "block";

  },2500);

  // LOAD DATABASE

  loadData();

  // AUTO REFRESH

  setInterval(loadData,5000);

};

// LOAD DATABASE

async function loadData(){

  try{

    const response =
      await fetch(
        API_URL + "?action=getData"
      );

    database =
      await response.json();

    console.log(database);

    const projects =
      database.projects.slice(1);

    updateDashboard(projects);

  }

  catch(error){

    console.log(error);

  }

}

// DASHBOARD ANALYTICS

function updateDashboard(projects){

  let ongoing = 0;

  let completed = 0;

  let total = projects.length;

  projects.forEach(row=>{

    if(row[7] == "In Progress"){

      ongoing++;

    }

    if(row[7] == "Completed"){

      completed++;

    }

  });

  document
    .getElementById("toolCount")
    .innerText = total;

  document
    .getElementById("ongoingCount")
    .innerText = ongoing;

  document
    .getElementById("completedCount")
    .innerText = completed;

}

// SEARCH PROJECT

function searchData(){

  const value =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    const projectName =
      String(row[1]).toLowerCase();

    if(projectName.includes(value)){

      html += createProjectCard(row);

    }

  });

  if(html == ""){

    html = `
      <div class="project-card">

        <h2>
          No Projects Found
        </h2>

      </div>
    `;

  }

  document
    .getElementById("results")
    .innerHTML = html;

}

// SHOW DEPARTMENT

function showDepartment(dept){

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    // DESIGNING

    if(
      dept == "Designing"
    ){

      html += createProjectCard(row);

    }

    // AUTOMATION

    if(
      dept == "Automation"
    ){

      html += createProjectCard(row);

    }

    // MANUFACTURING

    if(
      dept == "Manufacturing"
    ){

      html += createProjectCard(row);

    }

  });

  document
    .getElementById("results")
    .innerHTML = html;

}

// CREATE PROJECT CARD

function createProjectCard(row){

  return `

    <div class="project-card"
         onclick="openProjectDetails('${row[0]}')">

      <h2>${row[1]}</h2>

      <p>
        <b>Leader:</b>
        ${row[2]}
      </p>

      <p>
        <b>Year:</b>
        ${row[3]}
      </p>

      <p>
        <b>Status:</b>
        ${row[7]}
      </p>

      <p>
        <b>Current Stage:</b>
        ${row[25]}
      </p>

      <!-- DESIGN -->

      <div class="progress-section">

        <p>
          Designing
          (${row[9]}%)
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[9]}%">

            ${row[9]}%

          </div>

        </div>

      </div>

      <!-- AUTOMATION -->

      <div class="progress-section">

        <p>
          Automation
          (${row[11]}%)
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[11]}%">

            ${row[11]}%

          </div>

        </div>

      </div>

      <!-- MANUFACTURING -->

      <div class="progress-section">

        <p>
          Manufacturing
          (${row[13]}%)
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[13]}%">

            ${row[13]}%

          </div>

        </div>

      </div>

    </div>

  `;

}

// PROJECT DETAILS MODAL

function openProjectDetails(projectID){

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    if(row[0] == projectID){

      html = `

        <h2>${row[1]}</h2>

        <p>
          <b>Leader:</b>
          ${row[2]}
        </p>

        <p>
          <b>Year:</b>
          ${row[3]}
        </p>

        <p>
          <b>Start Date:</b>
          ${row[4]}
        </p>

        <p>
          <b>Expected End:</b>
          ${row[5]}
        </p>

        <p>
          <b>Status:</b>
          ${row[7]}
        </p>

        <p>
          <b>Current Stage:</b>
          ${row[25]}
        </p>

        <p>
          <b>Completed Stages:</b>
          ${row[26]}
        </p>

        <p>
          <b>Remarks:</b>
          ${row[27]}
        </p>

        <hr>

        <h3>Documents</h3>

        <p>

          <a href="${row[28]}"
             target="_blank">

            Material Status

          </a>

        </p>

        <p>

          <a href="${row[29]}"
             target="_blank">

            Electrical Drawings

          </a>

        </p>

        <p>

          <a href="${row[30]}"
             target="_blank">

            Operation Manuals

          </a>

        </p>

        <p>

          <a href="${row[31]}"
             target="_blank">

            P&ID Drawings

          </a>

        </p>

        <p>

          <a href="${row[32]}"
             target="_blank">

            Other Documents

          </a>

        </p>

      `;

    }

  });

  document
    .getElementById(
      "projectDetailsContent"
    )
    .innerHTML = html;

  document
    .getElementById(
      "projectDetailsModal"
    )
    .style.display = "block";

}

// CLOSE PROJECT DETAILS

function closeProjectDetails(){

  document
    .getElementById(
      "projectDetailsModal"
    )
    .style.display = "none";

}

// LOGIN

document
.getElementById("loginBtn")
.addEventListener("click",()=>{

  const email =
    prompt(
      "Enter Company Email"
    );

  const password =
    prompt(
      "Enter Password"
    );

  let valid = false;

  database.users.forEach((row,index)=>{

    if(index == 0) return;

    if(

      row[0] == email &&
      row[1] == password &&
      row[3] == "Approved"

    ){

      valid = true;

      currentUser = email;

    }

  });

  if(valid){

    isLoggedIn = true;

    alert("Login Success");

    document
      .getElementById("navbar")
      .style.display = "block";

  }

  else{

    alert("Access Denied");

  }

});

// REGISTER BUTTON

document
.getElementById("registerBtn")
.addEventListener("click",()=>{

  document
    .getElementById(
      "registerModal"
    )
    .style.display = "block";

});

// CLOSE REGISTER MODAL

function closeRegisterModal(){

  document
    .getElementById(
      "registerModal"
    )
    .style.display = "none";

}

// REGISTER USER

async function registerUser(){

  const data = {

    action:"register",

    email:
      document
      .getElementById(
        "registerEmail"
      ).value,

    password:
      document
      .getElementById(
        "registerPassword"
      ).value,

    role:
      document
      .getElementById(
        "registerRole"
      ).value

  };

  await fetch(API_URL,{

    method:"POST",

    body:JSON.stringify(data)

  });

  alert(
    "Registration Request Sent"
  );

  closeRegisterModal();

}

// OPEN PROJECT MODAL

function openProjectModal(){

  document
    .getElementById(
      "projectModal"
    )
    .style.display = "block";

}

// CLOSE PROJECT MODAL

function closeProjectModal(){

  document
    .getElementById(
      "projectModal"
    )
    .style.display = "none";

}

// LOGOUT

function logout(){

  isLoggedIn = false;

  currentUser = "";

  document
    .getElementById(
      "navbar"
    )
    .style.display = "none";

}

// ADD PROJECT

async function addProject(){

  const data = {

    action:"addProject",

    projectID:
      "P" + Date.now(),

    projectName:
      document
      .getElementById(
        "projectName"
      ).value,

    projectLeader:
      document
      .getElementById(
        "projectLeader"
      ).value,

    projectYear:
      document
      .getElementById(
        "projectYear"
      ).value,

    startDate:
      document
      .getElementById(
        "startDate"
      ).value,

    expectedEndDate:
      document
      .getElementById(
        "expectedEndDate"
      ).value,

    budget:
      document
      .getElementById(
        "budget"
      ).value,

    remarks:
      document
      .getElementById(
        "remarks"
      ).value,

    materialStatus:"",
    electricalDrawings:"",
    operationManuals:"",
    pidDrawings:"",
    otherDocuments:""

  };

  await fetch(API_URL,{

    method:"POST",

    body:JSON.stringify(data)

  });

  alert("Project Added");

  closeProjectModal();

  loadData();

}

// FILTER BY YEAR

function filterByYear(){

  const year =
    document
    .getElementById(
      "yearFilter"
    ).value;

  let filtered = [];

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    if(year == "All"){

      filtered.push(row);

    }

    else if(row[3] == year){

      filtered.push(row);

    }

  });

  updateDashboard(filtered);

}
