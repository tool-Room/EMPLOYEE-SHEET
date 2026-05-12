const API_URL = "https://script.google.com/macros/s/AKfycbxNOLsZNwrIKWKAT10k15zmHjc3NeaFSgh6892v_yGfvdPwsfQnyyge0dzwTohB-jB11Q/exec";

let database = {};

// LOADING SCREEN

window.onload = function(){

  setTimeout(() => {

    document.getElementById("loading-screen")
      .style.display = "none";

    document.getElementById("main-content")
      .style.display = "block";

  }, 3000);

  loadData();

};

// LOAD DATA

async function loadData(){

  const response = await fetch(API_URL);

  database = await response.json();

}

// SHOW DEPARTMENT

function showDepartment(dept){

  let html = `<h2>${dept} Department</h2>`;

  database.employees.forEach((row,index)=>{

    if(index===0) return;

    if(row[2] === dept){

      html += `
        <div class="employee-card ${row[3]=='Active' ? 'active':'inactive'}">

          <h2>${row[1]}</h2>

          <p>Status: ${row[3]}</p>

          <p>Project: ${row[4]}</p>

          <p>Role: ${row[5]}</p>

        </div>
      `;
    }

  });

  document.getElementById("departmentData")
    .innerHTML = html;

}

// SEARCH

function searchData(){

  const value = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  let html = "";

  // EMPLOYEE SEARCH

  database.employees.forEach((row,index)=>{

    if(index===0) return;

    if(row[1].toLowerCase().includes(value)){

      html += `
        <div class="employee-card ${row[3]=='Active' ? 'active':'inactive'}">

          <h2>${row[1]}</h2>

          <p>Department: ${row[2]}</p>

          <p>Status: ${row[3]}</p>

          <p>Current Project: ${row[4]}</p>

        </div>
      `;
    }

  });

  // PROJECT SEARCH

  database.projects.forEach((row,index)=>{

    if(index===0) return;

    if(row[1].toLowerCase().includes(value)){

      html += `
        <div class="employee-card active">

          <h2>${row[1]}</h2>

          <p>Designer: ${row[2]}</p>

          <p>Automation: ${row[3]}</p>

          <p>Manufacturing: ${row[4]}</p>

          <p>Budget: ${row[5]}</p>

          <p>Outsourced: ${row[6]}</p>

          <p>Vendor Support: ${row[7]}</p>

          <p>Advantages: ${row[8]}</p>

        </div>
      `;
    }

  });

  document.getElementById("searchResults")
    .innerHTML = html;

}
