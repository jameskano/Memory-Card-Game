// jshint esversion:9

const startButton = document.querySelector(".start");
const startLink = document.querySelector("#start-link");
const name = document.querySelector(".username");
const error = document.querySelector(".error");

// username requirement
function nameRequired() {
  let required = false;

  if(name.value.trim() === "") {
    error.innerText = "Enter your name";
    error.classList.add("failure");
  }
  else {
    error.innerText = "";
    error.classList.remove("failure");
    required = true;
  }

  return required;
}

function nameLength() {
  let required = false;

  if(name.value.length >= 15) {
    error.innerText = "Name must be less than 15 characters";
    error.classList.add("failure");
  }
  else {
    error.innerText = "";
    error.classList.remove("failure");
    required = true;
  }

  return required;
}

function validation() {
  if(nameRequired()) {
    nameLength();
  }
}


// Start Game
startButton.addEventListener("click", function() {
  validation();

  if(!error.classList.contains("failure")) {
    localStorage.setItem("usernameMemGame", name.value);
    startLink.click();
  }
});
