let taskIdCounter = 0;

let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let pageContentEl = document.querySelector("#page-content");

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

  let isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    let taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    let taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    createTaskEl(taskDataObj);
  }
};

// y have 2 use both object in function and argument/parameter ?
let createTaskEl = (taskDataObj) => {
  let taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";
  
  taskItemEl.setAttribute("data-task-id", taskIdCounter);

  let taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  // HOW 2 PREVENT CROSS SITE SCRIPTIN G IM GONNA SCREAM
  taskItemEl.appendChild(taskInfoEl);
  
  let taskActionsEl = createTaskActions(taskIdCounter)
  taskItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(taskItemEl);

  taskIdCounter++;
};

let createTaskActions = (taskId) => {
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  let editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);
  
  let deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  let statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  let statusChoices = ["To Do", "In Progress", "Completed"];

  statusChoices.forEach(choice => {
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = choice;
    statusOptionEl.setAttribute("value", choice);

    statusSelectEl.appendChild(statusOptionEl);
  });

  return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);

let taskButtonHandler = (event) => {
  let targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    let taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (event.target.matches(".delete-btn")) {
    // could i put this above if statement 2 DRY
    let taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

let editTask = (taskId) => {
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  let taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);
};

let completeEditTask = (taskName, taskType, taskId) => {
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";

  alert("Task Updated!");
};

let deleteTask = (taskId) => {
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);