document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const completedTaskList = document.getElementById("completed-task-list");
    const clearAllBtn = document.getElementById("clear-all");
    const toggleThemeBtn = document.getElementById("toggle-theme");
    const toggleCompletedBtn = document.getElementById("toggle-completed");
    const totalDisplay = document.getElementById("total");
    const completedDisplay = document.getElementById("completed");
    const remainingDisplay = document.getElementById("remaining");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function updateTaskCounts() {
      const total = tasks.length;
      const completed = tasks.filter(task => task.completed).length;
      const remaining = total - completed;
  
      totalDisplay.textContent = total;
      completedDisplay.textContent = completed;
      remainingDisplay.textContent = remaining;
    }
  
    function renderTasks() {
      taskList.innerHTML = "";
      completedTaskList.innerHTML = "";
  
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.toggle("completed", task.completed);
  
        const span = document.createElement("span");
        span.textContent = task.text;
  
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => toggleCompleteTask(index);
  
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(index);
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);
  
        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
  
        if (task.completed) {
          completedTaskList.appendChild(li);
        } else {
          taskList.appendChild(li);
        }
      });
  
      updateTaskCounts();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function addTask() {
      const text = taskInput.value.trim();
      if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        renderTasks();
      }
    }
  
    function toggleCompleteTask(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }
  
    function editTask(index) {
      const newText = prompt("এডিট করুন", tasks[index].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        renderTasks();
      }
    }
  
    function clearAllTasks() {
      tasks = [];
      renderTasks();
    }
  
    function toggleTheme() {
      document.body.classList.toggle("dark-mode");
      toggleThemeBtn.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    }
  
    function toggleCompletedTasks() {
      const completedSection = document.querySelector(".completed-tasks-section");
      completedSection.style.display = completedSection.style.display === "none" ? "block" : "none";
      toggleCompletedBtn.textContent = completedSection.style.display === "none" ? "Show Completed" : "Hide Completed";
    }
  
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTask();
    });
    clearAllBtn.addEventListener("click", clearAllTasks);
    toggleThemeBtn.addEventListener("click", toggleTheme);
    toggleCompletedBtn.addEventListener("click", toggleCompletedTasks);
  
    renderTasks();
  });
  