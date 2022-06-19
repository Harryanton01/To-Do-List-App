import { API } from "aws-amplify";
import { deleteTodo } from "../graphql";
import { Todo } from "../types";

const deleteTodoTask = async (Todo: Todo) => {
  const { id } = Todo;
  await API.graphql({
    query: deleteTodo,
    authMode: "AMAZON_COGNITO_USER_POOLS",
    variables: { input: { id } },
  });
};

export default deleteTodoTask;
