document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskList = document.getElementById("taskList");
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    saveTask(taskText);
    taskInput.value = "";
  }
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.onclick = () => toggleTask(li, taskText);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => removeTask(li, taskText);

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

function toggleTask(li, taskText) {
  li.classList.toggle("completed");
  updateStorage();
}

function removeTask(li, taskText) {
  li.remove();
  updateStorage();
}

function saveTask(taskText) {
  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasks();
  const taskList = document.getElementById("taskList");

  tasks.forEach(task => {
    const li = createTaskElement(task.text, task.completed);
    taskList.appendChild(li);
  });
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
