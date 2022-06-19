import { FC, ReactNode, createContext } from "react";
import { Todo } from "../../types";
import useTasks from "../useTasks";

type TaskStateType = {
  todos: Todo[];
  fetchTodoTasks: () => void;
};

export const TaskContext = createContext<TaskStateType>({
  todos: [],
  fetchTodoTasks: () => undefined,
});

export const TaskContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { todos, fetchTodoTasks } = useTasks();
  return (
    <TaskContext.Provider
      value={{
        todos,
        fetchTodoTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
