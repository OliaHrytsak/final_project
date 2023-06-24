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
    tempTaskContainer.innerHTML = `<input type="checkbox"/><label>${taskHTML}</label><input type="text" /><button class="delete">Delete</button>`;
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
      attachDeleteButtonEvent();
    }
  }

  // Викликати функцію завантаження при завантаженні сторінки
window.addEventListener("load", function () {
    loadTasks();
    // saveTasks();
  });