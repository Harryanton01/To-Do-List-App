import { useState, useEffect } from "react";
import { Todo } from "../types";
import GraphQLAPI from "@aws-amplify/api-graphql";
import { listTodos, ListTodosQuery } from "../graphql";

const useTasks = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const fetchTodoTasks = async () => {
    try {
      const response = (await GraphQLAPI.graphql({
        query: listTodos,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: ListTodosQuery };
      setTodos(response.data.listTodos?.items as Todo[]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTodoTasks();
  }, []);

  return { todos, fetchTodoTasks };
};

export default useTasks;
