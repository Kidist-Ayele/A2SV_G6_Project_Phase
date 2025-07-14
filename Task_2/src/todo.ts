interface Task {
  id: number;
  text: string;
}

let tasks: Task[] = [
  { id: 1, text: "Learn TypeScript" },
  { id: 2, text: "Build a Todo App" }
];

document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm") as HTMLFormElement;
  const taskInput = document.getElementById("taskInput") as HTMLInputElement;
  const taskList = document.getElementById("taskList") as HTMLUListElement;

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
      const newTask: Task = {
        id: Date.now(),
        text
      };
      tasks.push(newTask);
      taskInput.value = "";
      renderTasks();
    }
  });

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span contenteditable="true" data-task-id="${task.id}">${task.text}</span>
        <button class = "edit" onclick="editMode(${task.id}, this)">
          <img src="https://img.icons8.com/ios-filled/20/000000/edit.png" alt="Edit">
        </button>
        <button class = "delete" onclick="deleteTask(${task.id})">
          <img src="https://img.icons8.com/ios-filled/20/000000/trash.png" alt="Delete">
        </button>
      `;
      taskList.appendChild(li);
    });
  }

  (window as any).editMode = function (id: number, button: HTMLButtonElement) {
    const span = button.parentElement?.querySelector(`span[data-task-id="${id}"]`) as HTMLSpanElement | null;
    if (span) {
      span.focus();
    }
  };

  (window as any).editTask = function (id: number, newText: string) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.text = newText.trim();
      renderTasks();
    }
  };

  (window as any).deleteTask = function (id: number) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
  };

  renderTasks();
});