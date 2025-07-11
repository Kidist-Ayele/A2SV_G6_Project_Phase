let tasks = [ { id: 1, title: "Attended Daily cool down meeting", completed: false },
  { id: 2, title: "Read intro to javascript documentation", completed: true }, 
  {id: 3, title: "Watched tutorial on basic javascript", completed: true }];


const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (title === "") return alert("Task can't be empty!");
    
    const newTask = {
        id:Date.now(), 
        title,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks(searchInput.value.toLowerCase());
}); 

searchInput.addEventListener("input", () => {
  renderTasks(searchInput.value.toLowerCase());
});

function renderTasks(filter = "") {
    taskList.innerHTML = "";
    tasks
    .filter(task => task.title.toLowerCase().includes(filter))
    .forEach((task) => {
        const li = document.createElement("li");
        li.className =task.completed ? "complated" : "";

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.title;
        taskSpan.onclick = () => toggleComplete(task.id);

        const actionDiv = document.createElement("div");
        actionDiv.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        actionDiv.appendChild(editBtn);
        actionDiv.appendChild(deleteBtn);

        li.appendChild(taskSpan);
        li.appendChild(actionDiv);

        taskList.appendChild(li);

    })
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks(searchInput.value.toLowerCase());
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks(searchInput.value.toLowerCase());
}

function editTask(id) {
    const task = tasks.find( t => t.id == id);
    if (!task) return;

    const li = [...taskList.children].find(li =>
        li.querySelector("span").textContent === task.title
    );

  if (!li) return;

    const input = document.createElement("input");
    input.type = "text";
    input.value = task.title;
    input.onkeydown = (e) => {
        if (e.key === "Enter") {
            const newTitle = input.value.trim();
            if (newTitle == "") return alert("Title can't be empty!");
            task.title = newTitle;
            renderTasks(searchInput.value.toLowerCase());
        }
    };

    li.replaceChild(input, li.querySelector("span"));
    input.focus();
}

renderTasks();