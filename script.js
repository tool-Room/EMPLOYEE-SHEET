const API_URL =
"https://script.google.com/macros/s/AKfycbz0sF1Wz-bOTteVvLaAox19C-B7A41WRqhKmjlZPpbVAMJAJhbxBWCxFmUv7pjEu9i5Ow/exec";

let database = {};

window.onload = async function(){

  await loadData();

  setTimeout(()=>{

    document.getElementById(
      "loading-screen"
    ).style.display = "none";

    document.getElementById(
      "main-content"
    ).style.display = "block";

  },2500);

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

  }

  catch(error){

    console.log(error);

  }
}

// SEARCH

function searchData(){

  const value =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  let html = "";

  if(!database.projects){
    return;
  }

  database.projects.forEach((row,index)=>{

    if(index === 0) return;

    const projectName =
      String(row[1]).toLowerCase();

    if(projectName.includes(value)){

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

    if(index === 0) return;

    const overallStatus = row[6];

    if(filter && overallStatus != filter){
      return;
    }

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

    <div class="project-card">

      <h2>${row[1]}</h2>

      <p>
        <b>Leader:</b>
        ${row[2]}
      </p>

      <p>
        <b>Start Date:</b>
        ${row[3]}
      </p>

      <p>
        <b>Expected End:</b>
        ${row[4]}
      </p>

      <p>
        <b>Status:</b>
        ${row[6]}
      </p>

      <!-- DESIGN -->

      <div class="progress-section">

        <p>
          Designing
          (${row[8]}%)
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[8]}%">

            ${row[8]}%

          </div>

        </div>

      </div>

      <!-- AUTOMATION -->

      <div class="progress-section">

        <p>
          Automation
          (${row[10]}%)
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[10]}%">

            ${row[10]}%

          </div>

        </div>

      </div>

      <!-- MANUFACTURING -->

      <div class="progress-section">

        <p>
          Manufacturing
          (${row[12]}%)
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[12]}%">

            ${row[12]}%

          </div>

        </div>

      </div>

      <p>
        <b>Current Stage:</b>
        ${row[23]}
      </p>

      <p>
        <b>Remarks:</b>
        ${row[25]}
      </p>

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

      alert("Login Successful");

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
