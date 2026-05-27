const API_URL =
"https://script.google.com/macros/s/AKfycbwhpyhV5ly5gVzDOJjR8WyO3p3bfr8U7t_IaV3oeqHom67nMFJLXnMyyyYf4sL8ISfx6A/exec";

let database = {};

// PAGE LOAD

window.onload = function(){

  // SHOW MAIN CONTENT

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

// SHOW PROJECTS

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

// CREATE CARD

function createProjectCard(row){

  return `

    <div class="project-card">

      <h2>
        ${row[1]}
      </h2>

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

    </div>

  `;

}

// LOGIN

document
.getElementById("loginBtn")
.addEventListener("click",()=>{

  alert(
    "Login System Coming Next"
  );

});
