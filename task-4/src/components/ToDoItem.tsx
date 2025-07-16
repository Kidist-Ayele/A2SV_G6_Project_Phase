import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

interface ToDoItemProps {
  todo: Todo;
  onChange: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

function ToDoItem({ todo, onChange, onDelete }: ToDoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title); 

  function handleSave() {
    onChange({ ...todo, title: editedTitle }); 
    setIsEditing(false);
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => onChange({ ...todo, done: e.target.checked })}
      />

      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.title}
          </span>
          <button onClick={() => {
            setEditedTitle(todo.title); 
            setIsEditing(true);
          }}>Edit</button>
        </>
      )}

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </label>
  );
}

export default ToDoItem;
