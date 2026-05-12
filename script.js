const API_URL =
"https://script.google.com/macros/s/AKfycbz0sF1Wz-bOTteVvLaAox19C-B7A41WRqhKmjlZPpbVAMJAJhbxBWCxFmUv7pjEu9i5Ow/exec";

let database = {};

let isLoggedIn = false;

// LOAD

window.onload = async function(){

  setTimeout(()=>{

    document.getElementById(
      "loading-screen"
    ).style.display = "none";

    document.getElementById(
      "main-content"
    ).style.display = "block";

  },2000);

  await loadData();

  // AUTO REFRESH

  setInterval(loadData,5000);
};

// LOAD DATABASE

async function loadData(){

  const response =
    await fetch(
      API_URL + "?action=getData"
    );

  database =
    await response.json();
}

// SEARCH

function searchData(){

  const value =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index==0) return;

    if(
      row[1]
      .toLowerCase()
      .includes(value)
    ){

      html += createProjectCard(row);
    }

  });

  document
    .getElementById("results")
    .innerHTML = html;
}

// SHOW DEPARTMENT

function showDepartment(dept){

  let html =
    `<h2>${dept} Projects</h2>`;

  const filter =
    document
    .getElementById("statusFilter")
    .value;

  database.projects.forEach((row,index)=>{

    if(index==0) return;

    // DESIGNING

    if(
      dept=="Designing" &&
      row[7]
    ){

      if(filter &&
         row[6] != filter){
        return;
      }

      html += createProjectCard(row);
    }

    // AUTOMATION

    if(
      dept=="Automation" &&
      row[9]
    ){

      if(filter &&
         row[6] != filter){
        return;
      }

      html += createProjectCard(row);
    }

    // MANUFACTURING

    if(
      dept=="Manufacturing" &&
      row[11]
    ){

      if(filter &&
         row[6] != filter){
        return;
      }

      html += createProjectCard(row);
    }

  });

  document
    .getElementById("results")
    .innerHTML = html;
}

// PROJECT CARD

function createProjectCard(row){

  return `

    <div class="project-card">

      <h2>${row[1]}</h2>

      <p>
        Leader:
        ${row[2]}
      </p>

      <p>
        Start:
        ${row[3]}
      </p>

      <p>
        Expected End:
        ${row[4]}
      </p>

      <p>
        Overall Status:
        ${row[6]}
      </p>

      <!-- DESIGN -->

      <div class="progress-container">

        <p>
          Designing:
          ${row[8]}%
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[8]}%">

            ${row[8]}%

          </div>

        </div>

      </div>

      <!-- AUTOMATION -->

      <div class="progress-container">

        <p>
          Automation:
          ${row[10]}%
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[10]}%">

            ${row[10]}%

          </div>

        </div>

      </div>

      <!-- MANUFACTURING -->

      <div class="progress-container">

        <p>
          Manufacturing:
          ${row[12]}%
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[12]}%">

            ${row[12]}%

          </div>

        </div>

      </div>

      <!-- DETAILS -->

      <p>
        Budget:
        ${row[22]}
      </p>

      <p>
        Current Stage:
        ${row[23]}
      </p>

      <p>
        Remarks:
        ${row[25]}
      </p>

      <!-- TIMELINE -->

      <div class="timeline">

        <div class="timeline-item">

          ✔ ${row[24]}

        </div>

      </div>

    </div>
  `;
}

// LOGIN

document
  .getElementById("loginBtn")
  .addEventListener("click",()=>{

    const email =
      prompt(
        "Enter Forbes Marshall Email"
      );

    if(
      email &&
      email.endsWith(
        "@forbesmarshall.com"
      )
    ){

      isLoggedIn = true;

      alert("Login Success");

      document
        .getElementById(
          "adminPanel"
        )
        .style.display = "block";

    }

    else{

      alert("Access Denied");
    }

  });

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

    actualEndDate:"",

    overallStatus:
      "In Progress",

    designStatus:
      "Started",

    designProgress:0,

    automationStatus:
      "Pending",

    automationProgress:0,

    manufacturingStatus:
      "Pending",

    manufacturingProgress:0,

    designType:"Inhouse",

    designVendorName:"",

    designVendorContact:"",

    automationType:"Inhouse",

    automationVendorName:"",

    automationVendorContact:"",

    manufacturingType:"Inhouse",

    manufacturingVendorName:"",

    manufacturingVendorContact:"",

    budget:"",

    currentStage:
      "Project Started",

    completedStages:
      "Project Created",

    remarks:""
  };

  await fetch(API_URL,{

    method:"POST",

    body:JSON.stringify(data)

  });

  alert("Project Added");

  loadData();
}
