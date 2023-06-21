const currentTime = new Date();
const timeString = currentTime.toLocaleTimeString("uk");
const greeting = document.querySelector(".greeting");
const newParagraph = document.createElement("p");

switch (true) {
  case timeString >= "23:00:00" || timeString < "05:00:00":
    newParagraph.textContent = "Good night!";
    greeting.appendChild(newParagraph);
    break;
  case timeString >= "05:00:00" && timeString < "11:00:00":
    newParagraph.textContent = "Good morning!";
    greeting.appendChild(newParagraph);
    break;
  case timeString >= "11:00:00" && timeString < "17:00:00":
    newParagraph.textContent = "Good afternoon!";
    greeting.appendChild(newParagraph);
    break;
  case timeString > "17:00:00" && timeString < "23:00:00":
    newParagraph.textContent = "Good evening!";
    greeting.appendChild(newParagraph);
}

console.log(timeString);


