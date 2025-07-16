import { useState } from "react";

interface ToDoItemProps {
  todo: Todo;
  onChange: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

function ToDoItem({ todo, onChange, onDelete }: ToDoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  let todoContent;

  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => onChange({ ...todo, title: e.target.value })}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => onChange({ ...todo, done: e.target.checked })}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </label>
  );
}

export default ToDoItem;