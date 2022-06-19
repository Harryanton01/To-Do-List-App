import { useContext } from "react";
import TodoNote from "../TodoTask/TodoTask";
import { TaskContext } from "../../store/TaskContext/TaskContextProvider";

const TodoList = () => {
  const { todos } = useContext(TaskContext);
  return (
    <div style={{ marginBottom: 30 }}>
      {todos !== (null || undefined) &&
        todos.map((note) => <TodoNote key={note.id} Todo={note} />)}
    </div>
  );
};
export default TodoList;
