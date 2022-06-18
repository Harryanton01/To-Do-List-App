import { Todo as TodoAPI } from "./API";

export type Todo = Omit<TodoAPI, "__typename">;
