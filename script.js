// script.js

// DUMMY COUNTS

document.addEventListener("DOMContentLoaded", () => {

  // Dummy project data

  let totalProjects = 18;
  let ongoingProjects = 7;
  let completedProjects = 11;

  // Display data

  document.getElementById("totalProjects").innerText = totalProjects;
  document.getElementById("ongoingProjects").innerText = ongoingProjects;
  document.getElementById("completedProjects").innerText = completedProjects;

});


// SEARCH BUTTON

document.getElementById("searchBtn").addEventListener("click", () => {

  let searchValue = document
    .getElementById("searchInput")
    .value;

  if(searchValue === ""){
    alert("Please enter project name");
  }
  else{
    alert("Searching for : " + searchValue);
  }

});


// MODULE BUTTONS

const moduleButtons = document.querySelectorAll(".module-btn");

moduleButtons.forEach((button) => {

  button.addEventListener("click", () => {

    let moduleName = button
      .parentElement
      .querySelector("h2")
      .innerText;

    alert(moduleName + " Module Opening...");

  });

});


// LOGIN BUTTON

document.querySelector(".login-btn")
.addEventListener("click", () => {

  alert("Login Page Coming Soon");

});


// HOVER SOUND EFFECT STYLE

const cards = document.querySelectorAll(
  ".module-card, .status-card"
);

cards.forEach((card) => {

  card.addEventListener("mouseenter", () => {

    card.style.boxShadow =
      "0 20px 40px rgba(0,0,0,0.35)";

  });

  card.addEventListener("mouseleave", () => {

    card.style.boxShadow =
      "0 15px 35px rgba(0,0,0,0.2)";

  });

});
