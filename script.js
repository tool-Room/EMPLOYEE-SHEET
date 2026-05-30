// script.js

document.addEventListener("DOMContentLoaded", () => {

  // DUMMY DATA

  const totalProjects = 24;
  const ongoingProjects = 8;
  const completedProjects = 16;

  // SET VALUES

  document.getElementById("totalProjects").innerText = totalProjects;

  document.getElementById("ongoingProjects").innerText = ongoingProjects;

  document.getElementById("completedProjects").innerText = completedProjects;

});


// SEARCH BUTTON

document.getElementById("searchBtn")
.addEventListener("click", () => {

  let searchText =
    document.getElementById("searchInput").value;

  if(searchText === ""){

    alert("Please enter project name");

  }
  else{

    alert("Searching for : " + searchText);

  }

});


// LOGIN BUTTON

document.querySelector(".login-btn")
.addEventListener("click", () => {

  alert("Login System Coming Soon");

});


// MODULE CARDS

const cards = document.querySelectorAll(".module-card");

cards.forEach((card) => {

  card.addEventListener("click", () => {

    const title =
      card.querySelector(".module-title").innerText;

    alert(title + " Module Opening");

  });

});
