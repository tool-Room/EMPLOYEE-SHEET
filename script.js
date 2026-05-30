const API_URL =
"https://script.google.com/macros/s/AKfycbwHoa5IIGWsrQh2UG0qlxuNtQ6dJF6c0BhdS59NUL2G2Fnqaq-nGIyzp1N-W4LNMNDFgw/exec";

let database = {};

// PAGE LOAD

window.onload = function(){

  // SHOW MAIN CONTENT

  setTimeout(()=>{

    const loading =
      document.getElementById(
        "loading-screen"
      );

    const main =
      document.getElementById(
        "main-content"
      );

    if(loading){
      loading.style.display = "none";
    }

    if(main){
      main.style.display = "block";
    }

  },2500);

  // LOAD DATA

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

    console.log(
      "Database Error",
      error
    );

  }

}

// DASHBOARD UPDATE

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

    const status =
      String(row[8] || "");

    if(status == "In Progress"){
      ongoing++;
    }

    if(status == "Completed"){
      completed++;
    }

  });

  // SAFE UPDATE

  const tool =
    document.getElementById(
      "toolCount"
    );

  const ongoingEl =
    document.getElementById(
      "ongoingCount"
    );

  const completedEl =
    document.getElementById(
      "completedCount"
    );

  if(tool){
    tool.innerText = total;
  }

  if(ongoingEl){
    ongoingEl.innerText = ongoing;
  }

  if(completedEl){
    completedEl.innerText = completed;
  }

}

// SEARCH PROJECT

function searchProject(){

  if(!database.projects){
    return;
  }

  const input =
    document.getElementById(
      "searchInput"
    );

  if(!input){
    return;
  }

  const value =
    input.value
    .toLowerCase()
    .trim();

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    const toolNumber =
      String(row[0] || "")
      .toLowerCase();

    const projectID =
      String(row[1] || "")
      .toLowerCase();

    const projectName =
      String(row[2] || "")
      .toLowerCase();

    const leader =
      String(row[3] || "")
      .toLowerCase();

    if(

      toolNumber.includes(value) ||

      projectID.includes(value) ||

      projectName.includes(value) ||

      leader.includes(value)

    ){

      html += createProjectCard(row);

    }

  });

  if(html == ""){

    html = `

      <div class="project-card">

        <h2>
          No Matching Projects Found
        </h2>

      </div>

    `;

  }

  const results =
    document.getElementById(
      "results"
    );

  if(results){

    results.innerHTML = html;

    results.scrollIntoView({

      behavior:"smooth"

    });

  }

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

  const results =
    document.getElementById(
      "results"
    );

  if(results){

    results.innerHTML = html;

  }

}

// PROJECT CARD

function createProjectCard(row){

  return `

    <div class="project-card">

      <h2>
        ${row[2] || ""}
      </h2>

      <p>
        <b>Tool Number:</b>
        ${row[0] || ""}
      </p>

      <p>
        <b>Project ID:</b>
        ${row[1] || ""}
      </p>

      <p>
        <b>Leader:</b>
        ${row[3] || ""}
      </p>

      <p>
        <b>Status:</b>
        ${row[8] || ""}
      </p>

    </div>

  `;

}

// LOGIN

const loginBtn =
  document.getElementById(
    "loginBtn"
  );

if(loginBtn){

  loginBtn.addEventListener(
    "click",
    ()=>{

      alert(
        "Login System Coming Next"
      );

    }
  );

}
