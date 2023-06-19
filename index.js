//Clock///

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

// ADD TASK

const newTaskText = document.querySelector(".new__task");
const selectElement = document.querySelector(".task__options");
const addTaskBtn = document.querySelector(".new__task-btn");
const incompleteTasksList = document.querySelector(".incomplete__tasks");

// додаємо елемент до списку завдань
addTaskBtn.addEventListener("click", function () {

     const newTask = document.createElement("li");
     newTask.classList.add("list__item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const taskLabel = document.createElement("label");
  taskLabel.textContent = newTaskText.value;

  const inputText = document.createElement("input");
  inputText.type = "text";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  

  newTask.appendChild(checkbox);
  newTask.appendChild(taskLabel);
  newTask.appendChild(inputText);
    newTask.appendChild(deleteButton);

  incompleteTasksList.appendChild(newTask);

  newTaskText.value = ""; // зачистка поля для введення нового завдання
});

// додаємо можливість обрати завдання з запропонованого списку
selectElement.addEventListener("change", function () {
  const selectedOption = selectElement.options[selectElement.selectedIndex].textContent;
  newTaskText.value = selectedOption;
});

//Delete task.

const deleteBtns = document.querySelectorAll(".delete");

deleteBtns.forEach(deleteBtn => {
  deleteBtn.addEventListener("click", function () {
    const listItem = this.parentNode;
    const list = listItem.parentNode;
    list.removeChild(listItem);
    console.log("Delete Task...");
  });
});

//REMOVE tasks to completed

const checkboxes = document.querySelectorAll("input[type='checkbox']");
const completedTasksList = document.querySelector(".completed__tasks");

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", function () {
    const listItem = this.parentNode;
    
    if (this.checked) {
      listItem.classList.add("completed");
      completedTasksList.appendChild(listItem);
    } else {
      listItem.classList.remove("completed");
    }
  });
});



