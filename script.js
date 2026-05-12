const API_URL =
"https://script.google.com/macros/s/AKfycbxKdn_Lgsnw2G7b5xPnaPoeZBFa6kfrOjpaodBJXP24MvKPPnbItaoGVPgbbbjYyWc8Rw/exec";

let database = {};

let isLoggedIn = false;

// LOAD

window.onload = function(){

  // SHOW MAIN PAGE AFTER 2.5 SEC

  setTimeout(()=>{

    document.getElementById(
      "loading-screen"
    ).style.display = "none";

    document.getElementById(
      "main-content"
    ).style.display = "block";

  },2500);

  // LOAD DATABASE SEPARATELY

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
    .toLowerCase();

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

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

  let html = "";

  database.projects.forEach((row,index)=>{

    if(index == 0) return;

    html += createProjectCard(row);

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
        Status:
        ${row[6]}
      </p>

      <p>
        Current Stage:
        ${row[23]}
      </p>

    </div>
  `;
}

// LOGIN

document
.getElementById("loginBtn")
.addEventListener("click",()=>{

  const email =
    prompt("Enter Company Email");

  let valid = false;

  database.users.forEach((row,index)=>{

    if(index == 0) return;

    if(
      row[0] == email &&
      row[2] == "Active"
    ){

      valid = true;
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

// OPEN/CLOSE MODALS

function openProjectModal(){

  document
    .getElementById("projectModal")
    .style.display = "block";
}

function closeProjectModal(){

  document
    .getElementById("projectModal")
    .style.display = "none";
}

function openUserModal(){

  document
    .getElementById("userModal")
    .style.display = "block";
}

function closeUserModal(){

  document
    .getElementById("userModal")
    .style.display = "none";
}

// LOGOUT

function logout(){

  isLoggedIn = false;

  document
    .getElementById("navbar")
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
      .getElementById("projectName")
      .value,

    projectLeader:
      document
      .getElementById("projectLeader")
      .value,

    startDate:
      document
      .getElementById("startDate")
      .value,

    expectedEndDate:
      document
      .getElementById("expectedEndDate")
      .value,

    budget:
      document
      .getElementById("budget")
      .value,

    remarks:
      document
      .getElementById("remarks")
      .value

  };

  await fetch(API_URL,{

    method:"POST",

    body:JSON.stringify(data)

  });

  alert("Project Added");

  closeProjectModal();

  loadData();
}

// ADD USER

async function addUser(){

  const data = {

    action:"addUser",

    email:
      document
      .getElementById("newUserEmail")
      .value,

    role:
      document
      .getElementById("newUserRole")
      .value
  };

  await fetch(API_URL,{

    method:"POST",

    body:JSON.stringify(data)

  });

  alert("User Added");

  closeUserModal();

  loadData();
}
