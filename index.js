// ADD TASK

const newTaskText = document.querySelector(".new__task");
const selectElement = document.querySelector(".task__options");
const addTaskBtn = document.querySelector(".new__task-btn");
const incompleteTasksList = document.querySelector(".incomplete__tasks");
const completedTasksList = document.querySelector(".completed__tasks");

const messageContainer = document.createElement("div");
messageContainer.classList.add("message");
const addTask = document.querySelector(".add__task");

// Оголошення змінної deleteButton
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.classList.add("delete");
console.log(deleteButton)

// Зберегти список завдань у локальне сховище браузера
function saveTasks() {
  const incompleteTasks = Array.from(incompleteTasksList.children).map(
    (task) => {
      return {
        text: task.querySelector("label").textContent,
        completed: false,
      };
    }
  );

  const completedTasks = Array.from(completedTasksList.children).map((task) => {
    return {
      text: task.querySelector("label").textContent,
      completed: true,
    };
  });

  const tasks = {
    incomplete: incompleteTasks,
    completed: completedTasks,
  };

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Оголошення функції createTaskElement
function createTaskElement(taskHTML, incompleteTasksList) {
  const tempTaskContainer = document.createElement("li");
  tempTaskContainer.classList.add("list__item");
  tempTaskContainer.innerHTML = `<input type="checkbox" checked /><label>${taskHTML}</label><input type="text" /><button class="delete">Delete</button>`;
  const taskElement = tempTaskContainer;
  
  // Додати створений елемент до контейнера завдань
  incompleteTasksList.appendChild(taskElement);

  return taskElement;
}

// Завантажити список завдань з локального сховища браузера
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.incomplete.forEach((task) => {
      const newTask = createTaskElement(task.text, incompleteTasksList);
      incompleteTasksList.appendChild(newTask);
    });

    tasks.completed.forEach((task) => {
      const newTask = createTaskElement(task.text, completedTasksList);
      newTask.classList.add("completed");
      completedTasksList.appendChild(newTask);
      newTask.style.textDecoration = "line-through";
    });
    // обробник події для кожної кнопки видалення
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", function () {
        const listItem = this.parentNode;
        const list = listItem.parentNode;
        list.removeChild(listItem);
        saveTasks();
      });
    });
  }
}

// Викликати функцію завантаження при завантаженні сторінки
window.addEventListener("load", function () {
  loadTasks();
  // saveTasks();
});

// Додаємо елемент до списку завдань
addTaskBtn.addEventListener("click", function () {
  // Перевірка, чи введено значення у поле для нового завдання
  if (newTaskText.value.trim() !== "") {
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
    
    
    // Oбробник події для чекбоксу
    checkbox.addEventListener("change", function () {
      const listItem = this.parentNode;

      if (this.checked) {
        listItem.classList.add("completed");
        completedTasksList.appendChild(listItem);
        listItem.style.textDecoration = "line-through";
      } else {
        listItem.classList.remove("completed");
      }
      saveTasks();
    });

     // Обробник події для кнопки видалення
    deleteButton.addEventListener("click", function () {
      const listItem = this.parentNode;
      const list = listItem.parentNode;
      list.removeChild(listItem);
      console.log("Delete Task...");
      // saveTasks();
    });
    incompleteTasksList.appendChild(newTask);
    newTaskText.value = ""; // зачистка поля для введення нового завдання
    saveTasks();
  } else {
    messageContainer.textContent = "Please enter a task!";
    addTaskBtn.insertAdjacentElement("afterend", messageContainer);
    setTimeout(function () {
      messageContainer.remove();
    }, 3000);
  }
});
    
// додаємо можливість обрати завдання з запропонованого списку
selectElement.addEventListener("change", function () {
  const selectedOption =
    selectElement.options[selectElement.selectedIndex].textContent;
  newTaskText.value = selectedOption;
});

//Delete task.
const deleteBtns = document.querySelectorAll(".delete");

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", function () {
    const listItem = this.parentNode;
    const list = listItem.parentNode;
    list.removeChild(listItem);
    console.log("Delete Task...");
    saveTasks();
  });
});

//REMOVE tasks to completed
const checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const listItem = this.parentNode;

    if (this.checked) {
      listItem.classList.add("completed");
      completedTasksList.appendChild(listItem);
      listItem.style.textDecoration = "line-through";
    } else {
      listItem.classList.remove("completed");
    }
    saveTasks();
  });
});


/// Функція для видалення виконаних завдань з локального сховища
function deleteCompletedTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    tasks.completed = []; // Очистити масив виконаних завдань
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Зберегти зміни у локальне сховище
  }
}

// Обробник події для кнопки видалення всіх виконаних завдань
const completedTaskDelete = document.querySelector(".delete__all");
completedTaskDelete.addEventListener("click", function () {
  deleteCompletedTasksFromLocalStorage();
  completedTasksList.innerHTML = ""; // Очистити список виконаних завдань на сторінці
});

// localStorage.clear();