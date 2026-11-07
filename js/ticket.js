/*
 ticket.js | Input information in the ticket that is displayed
*/

// Get the data that is saved and places a piece of text into the elemwent with the ID
function showText(id, text) {
  document.getElementById(id).textContent = text;
}
 
// Turns the github username @revapark "https://github.com/@revapark"
function makeGithubLink(github) {
  return "https://github.com/" + github.substring(1); // removes the @
}
 
// Fills in the whole ticket using the saved data with name, email, GitHub handle and serial number
function showTicket(ticket) {
  showText("bannerName", ticket.name);
  showText("bannerEmail", ticket.email);
  showText("ticketName", ticket.name);
  showText("ticketHandle", ticket.github);
  showText("ticketSerial", "#" + ticket.serial);
 
  // The user photo / avatar chosen
  const avatar = document.getElementById("ticketAvatar");
  avatar.src = ticket.avatar;
  avatar.alt = "Photo of " + ticket.name;
 
  // Create the github link
  document.getElementById("ticketGithub").href = makeGithubLink(ticket.github);
}
 
 
// Get the data saved by validation.js
const saved = sessionStorage.getItem("ticket");
 
// 2. If the form is skipped it goes back the homepage, however if the form is filled out it turns the text into an object
if (saved === null) {
  window.location.href = "index.html";
} else {
  showTicket(JSON.parse(saved));
}