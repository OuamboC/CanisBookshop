let a = window.location.href;
let b = a.replace(/.*=/, "");
document.getElementById("lastfour").innerHTML = " **** **** **** " + b;

// Ensure Feather icons are initialized
document.addEventListener("DOMContentLoaded", () => {
  feather.replace();
});
