/*
 validation.js| Checks the form, shows errors, and saves the data and display ticket
*/
// Information that is given in the form  and where the photo is stored 
const form = document.getElementById("registerForm");
let photo = "";
 
// ---------- Function check for the form ----------
 
// Name must not be empty 
function isValidName(name) {
  return name !== "";
}
 
// Email must be user@domain.com for it to be validated
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
 
// GitHub must start with @ followed by letters, numbers or - to be validated
function isValidGithub(github) {
  const pattern = /^@[a-zA-Z0-9-]+$/;
  return pattern.test(github);
}
 
// Photo must be a JPG or PNG and maximum of 500KB
function isImage(file) {
  return file.type === "image/jpeg" || file.type === "image/png";
}
 
function isSmallEnough(file) {
  return file.size <= 500 * 1024;
}
 
 
// Display a preview of photo chosen by the user
document.getElementById("avatar").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      photo = reader.result; // the photo as text, so it can be saved
      document.getElementById("preview").src = photo;
    };
    reader.readAsDataURL(file);
  }
});
 

 
form.addEventListener("submit", function (event) {
  event.preventDefault(); // sprevents the page from reloading
 
  // 1. Get the information the user type
  const file = document.getElementById("avatar").files[0];
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const github = document.getElementById("github").value.trim();
 
  // 2. Get the error boxes and clear any old messages
  const avatarError = document.getElementById("avatarError");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const githubError = document.getElementById("githubError");
  avatarError.textContent = "";
  nameError.textContent = "";
  emailError.textContent = "";
  githubError.textContent = "";
 
  // 3. Check functions. If one fails and show a message
  let formOk = true;
 
  if (!file) {
    avatarError.textContent = "Please upload a photo.";
    formOk = false;
  } else if (!isImage(file)) {
    avatarError.textContent = "Please upload a JPG or PNG file only.";
    formOk = false;
  } else if (!isSmallEnough(file)) {
    avatarError.textContent = "File too large. Please upload a photo under 500KB.";
    formOk = false;
  }
 
  if (!isValidName(name)) {
    nameError.textContent = "Please enter your full name.";
    formOk = false;
  }
 
  if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    formOk = false;
  }
 
  if (!isValidGithub(github)) {
    githubError.textContent = "Username must start with @ e.g. @revapark";
    formOk = false;
  }
 
  // Once everything is correct it submits the ticket and displays it
  if (formOk) {
    const ticket = {
      name: name,
      email: email,
      github: github,
      avatar: photo,
      serial: Math.floor(10000 + Math.random() * 90000)
    };
    sessionStorage.setItem("ticket", JSON.stringify(ticket));
    window.location.href = "ticket.html";
  }
});