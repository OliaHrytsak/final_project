const currentDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthIndex = currentDate.getMonth();
const monthName = months[monthIndex];
const day = currentDate.getDate();
const dateElement = document.getElementById("date");
dateElement.textContent = monthName + " " + day;

const clockContainer = document.querySelector(".big__clock");

function updateClock() {
  clockContainer.innerText = new Date().toLocaleTimeString("uk");
}

setInterval(updateClock, 1000);

