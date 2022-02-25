let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

let createTaskHandler = (event) => {
  event.preventDefault();
  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

  let taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";

  let taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
  taskItemEl.appendChild(taskInfoEl);

  tasksToDoEl.appendChild(taskItemEl);
};

formEl.addEventListener("submit", createTaskHandler);

