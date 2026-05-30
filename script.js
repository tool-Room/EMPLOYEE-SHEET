const API_URL =
"YOUR_APPS_SCRIPT_URL";

let database = {};

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

    updateDashboard();

  }

  catch(error){

    console.log(error);

  }

}

// UPDATE DASHBOARD

function updateDashboard(){

  if(!database.projects){
    return;
  }

  let total = 0;

  let ongoing = 0;

  let completed = 0;

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    total++;

    // STATUS COLUMN

    const status =
      String(row[8]);

    if(status == "In Progress"){

      ongoing++;

    }

    if(status == "Completed"){

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

// SEARCH SYSTEM

function searchProject(){

  if(!database.projects){
    return;
  }

  const value =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    // COLUMN REFERENCES

    const toolNumber =
      String(row[0]).toLowerCase();

    const projectID =
      String(row[1]).toLowerCase();

    const projectName =
      String(row[2]).toLowerCase();

    const leader =
      String(row[3]).toLowerCase();

    // SEARCH MATCH

    if(

      toolNumber.includes(value) ||

      projectID.includes(value) ||

      projectName.includes(value) ||

      leader.includes(value)

    ){

      html += createProjectCard(row);

    }

  });

  // NO RESULT

  if(html == ""){

    html = `

      <div class="project-card">

        <h2>
          No Matching Projects Found
        </h2>

      </div>

    `;

  }

  document
    .getElementById("results")
    .innerHTML = html;

  // SCROLL TO RESULTS

  document
    .getElementById("results")
    .scrollIntoView({

      behavior:"smooth"

    });

}

// SHOW ALL PROJECTS

function showProjects(){

  if(!database.projects){
    return;
  }

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    html += createProjectCard(row);

  });

  document
    .getElementById("results")
    .innerHTML = html;

}

// CREATE PROJECT CARD

function createProjectCard(row){

  return `

    <div class="project-card"
         onclick="openProjectDetails('${row[1]}')">

      <h2>
        ${row[2]}
      </h2>

      <p>

        <b>Tool Number:</b>

        ${row[0]}

      </p>

      <p>

        <b>Project ID:</b>

        ${row[1]}

      </p>

      <p>

        <b>Leader:</b>

        ${row[3]}

      </p>

      <p>

        <b>Year:</b>

        ${row[4]}

      </p>

      <p>

        <b>Status:</b>

        ${row[8]}

      </p>

      <p>

        <b>Current Stage:</b>

        ${row[26]}

      </p>

      <!-- DESIGN -->

      <div class="progress-section">

        <p>
          Designing
          (${row[10]}%)
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[10]}%">

            ${row[10]}%

          </div>

        </div>

      </div>

      <!-- AUTOMATION -->

      <div class="progress-section">

        <p>
          Automation
          (${row[12]}%)
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[12]}%">

            ${row[12]}%

          </div>

        </div>

      </div>

      <!-- MANUFACTURING -->

      <div class="progress-section">

        <p>
          Manufacturing
          (${row[14]}%)
        </p>

        <div class="progress-bar">

          <div class="progress-fill"
               style="width:${row[14]}%">

            ${row[14]}%

          </div>

        </div>

      </div>

    </div>

  `;

}

// PROJECT DETAILS

function openProjectDetails(projectID){

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    if(row[1] == projectID){

      html = `

        <div class="project-card">

          <h2>${row[2]}</h2>

          <p>

            <b>Tool Number:</b>

            ${row[0]}

          </p>

          <p>

            <b>Leader:</b>

            ${row[3]}

          </p>

          <p>

            <b>Status:</b>

            ${row[8]}

          </p>

          <p>

            <b>Current Stage:</b>

            ${row[26]}

          </p>

          <p>

            <b>Remarks:</b>

            ${row[28]}

          </p>

          <hr>

          <h3>
            Project Documents
          </h3>

          <p>

            <a href="${row[29]}"
               target="_blank">

              Material Status

            </a>

          </p>

          <p>

            <a href="${row[30]}"
               target="_blank">

              Electrical Drawings

            </a>

          </p>

          <p>

            <a href="${row[31]}"
               target="_blank">

              Operation Manuals

            </a>

          </p>

          <p>

            <a href="${row[32]}"
               target="_blank">

              P&ID Drawings

            </a>

          </p>

          <p>

            <a href="${row[33]}"
               target="_blank">

              Other Documents

            </a>

          </p>

        </div>

      `;

    }

  });

  document
    .getElementById("results")
    .innerHTML = html;

  document
    .getElementById("results")
    .scrollIntoView({

      behavior:"smooth"

    });

}

// LOGIN

document
.getElementById("loginBtn")
.addEventListener("click",()=>{

  alert(
    "Login System Will Be Added Next"
  );

});
