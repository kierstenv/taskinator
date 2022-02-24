let buttonEl = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");

let createTaskHandler = () => {
  let taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";
  taskItemEl.textContent = "New Task";
  tasksToDoEl.appendChild(taskItemEl);
};

buttonEl.addEventListener("click", createTaskHandler);
