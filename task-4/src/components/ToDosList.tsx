import ToDoItem from "./ToDoItem";

interface ToDosListProps {
  todos: Todo[];
  onChangeToDo: (todo: Todo) => void;
  onDeleteToDo: (id: number) => void;
}

function ToDosList({ todos, onChangeToDo, onDeleteToDo }: ToDosListProps) {
  const completedTasks = todos.filter((todo) => todo.done).length;

  return (
    <>
      {todos.length === 0 ? (
        <h4>No tasks</h4>
      ) : (
        <h4>
          {completedTasks} completed {completedTasks === 1 ? "task" : "tasks"}{" "}
          out of {todos.length} total
        </h4>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <ToDoItem
              todo={todo}
              onChange={onChangeToDo}
              onDelete={onDeleteToDo}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ToDosList;