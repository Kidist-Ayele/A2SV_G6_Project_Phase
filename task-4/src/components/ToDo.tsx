import { useState } from "react";
import AddTodo from "./AddToDo";
import ToDosList from "./ToDosList";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

let nextId = 1;
const initialTodos: Todo[] = [{ id: 0, title: "Complete Task 4", done: true }, { id: 1, title: "Learn CSS", done: false }];

function ToDo() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function addToDo(title: string) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title,
        done: false,
      },
    ]);
  }

  function editToDo(nextTodo: Todo) {
    setTodos(todos.map((todo) => (todo.id === nextTodo.id ? nextTodo : todo)));
  }

  function deleteToDo(todoId: number) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  return (
    <div className="main-container">
      <h1>Todo App</h1>
      <AddTodo onAddToDo={addToDo} />
      <ToDosList
        todos={todos}
        onChangeToDo={editToDo}
        onDeleteToDo={deleteToDo}
      />
    </div>
  );
}


export default ToDo;