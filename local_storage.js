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
  function createTaskElement(taskHTML, incompleteTasksList, isCompleted = false) {
    const tempTaskContainer = document.createElement("li");
    tempTaskContainer.classList.add("list__item");
    tempTaskContainer.innerHTML = `<input type="checkbox"/><label>${taskHTML}</label><input type="text" /><button class="delete">Delete</button>`;
    const taskElement = tempTaskContainer;
  
    // Set the checkbox's checked property based on isCompleted
  const checkbox = taskElement.querySelector("input[type='checkbox']");
  checkbox.classList.add("checkbox");
  checkbox.checked = isCompleted;

  // Add the task element to the appropriate task list
  if (isCompleted) {
    taskElement.classList.add("completed");
    completedTasksList.appendChild(taskElement);
    taskElement.style.textDecoration = "line-through";
  } else {
    incompleteTasksList.appendChild(taskElement);
  }

  return taskElement;
}
  
  // Завантажити список завдань з локального сховища браузера
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.incomplete.forEach((task) => {
        const newTask = createTaskElement(task.text, incompleteTasksList, false); // Передаємо false, якщо завдання не виконано
        incompleteTasksList.appendChild(newTask);
      });
  
      tasks.completed.forEach((task) => {
        const newTask = createTaskElement(task.text, completedTasksList, true); // Передаємо true, якщо завдання вже виконано
        newTask.classList.add("completed");
        completedTasksList.appendChild(newTask);
        newTask.style.textDecoration = "line-through";
      });

      
    }
    // обробник події для кожної кнопки видалення i чекбоксу
      attachEventHandlers();
  }

  // Викликати функцію завантаження при завантаженні сторінки
window.addEventListener("load", function () {
    loadTasks();
  });