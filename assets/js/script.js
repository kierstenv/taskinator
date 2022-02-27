let taskIdCounter = 0;

const formEl = document.querySelector("#task-form");
const pageContentEl = document.querySelector("#page-content");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");

let tasks = [
  
];

// just so i can use it in function ?
const taskFormHandler = (event) => {
  event.preventDefault();
  const taskNameInput = document.querySelector("input[name='task-name']").value;
  const taskTypeInput = document.querySelector("select[name='task-type']").value;

  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();

  const isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    const taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    const taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
      id: taskIdCounter
    };

    createTaskEl(taskDataObj);
  }
};

// y have 2 use both object in function and argument/parameter ?
const createTaskEl = (taskDataObj) => {
  const taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";
  
  taskItemEl.setAttribute("data-task-id", taskIdCounter);

  const taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  // HOW 2 PREVENT CROSS SITE SCRIPTIN G IM GONNA SCREAM
  taskItemEl.appendChild(taskInfoEl);
  
  const taskActionsEl = createTaskActions(taskIdCounter)
  taskItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(taskItemEl);

  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);
  
  taskIdCounter++;
  
  saveTasks();
};

const createTaskActions = (taskId) => {
  const actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  const editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);
  
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  const statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  const statusChoices = ["To Do", "In Progress", "Completed"];

  statusChoices.forEach(choice => {
    const statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = choice;
    statusOptionEl.setAttribute("value", choice);

    statusSelectEl.appendChild(statusOptionEl);
  });

  return actionContainerEl;
};

const completeEditTask = (taskName, taskType, taskId) => {
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  
  tasks.forEach(task => {
    if (task.id === parseInt(taskId)) {
      task.name = taskName;
      task.type = taskType;
    }
  });
  
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
  
  alert("Task Updated!");

  saveTasks();
};

const taskButtonHandler = (event) => {
  const targetEl = event.target;
  
  if (targetEl.matches(".edit-btn")) {
    const taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (event.target.matches(".delete-btn")) {
    // could i put this above if statement 2 DRY
    const taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

const taskStatusChangeHandler = (event) => {
  const taskId = event.target.getAttribute("data-task-id");
  
  const statusValue = event.target.value.toLowerCase();
  
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  
  tasks.forEach(task => {
    if (task.id === parseInt(taskId)) {
      task.status = statusValue;
    }
  });

  saveTasks();
};

const editTask = (taskId) => {
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  const taskName = taskSelected.querySelector("h3.task-name").textContent;
  const taskType = taskSelected.querySelector("span.task-type").textContent;
  
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  
  formEl.setAttribute("data-task-id", taskId);
};

const deleteTask = (taskId) => {
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
  
  let updatedTaskArr = [];
  
  tasks.forEach(task => {
    if (task.id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks);
    }
  });
  
  tasks = updatedTaskArr;

  saveTasks();
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);