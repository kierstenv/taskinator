let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

// just so i can use it in function ?
let taskFormHandler = (event) => {
  event.preventDefault();
  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  //after return it just goes back 2 addEventListener(submit, taskFormHandler)
  // - like the caller function is false so it stops ???
  // then regoes bc its the only call rn ????

  formEl.reset();

  let taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj);
};

// y have 2 use both object in function and argument/parameter ?
let createTaskEl = (taskDataObj) => {
  let taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";
  
  let taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  // HOW 2 PREVENT CROSS SITE SCRIPTIN G IM GONNA SCREAM
  taskItemEl.appendChild(taskInfoEl);
  
  tasksToDoEl.appendChild(taskItemEl);
};

formEl.addEventListener("submit", taskFormHandler);

