import { useState, useEffect } from "react";
import "./App.css";
import { API } from "aws-amplify";
import GraphQLAPI from "@aws-amplify/api-graphql";
import {
  listTodos,
  ListTodosQuery,
  createTodo,
  deleteTodo,
  updateTodo,
} from "./graphql";
import { withAuthenticator, Button, View, Card } from "@aws-amplify/ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Todo } from "./types";
import TodoNote from "./components/TodoNote/TodoNote";
import TodoForm from "./components/TodoForm/TodoForm";

const initialFormState = {
  title: "",
  content: "",
  timestamp_due: Math.floor(new Date().getTime() / 1000),
  completed: false,
};

const unixToDate = (UNIX_timestamp: number) => {
  return new Date(UNIX_timestamp * 1000);
};
export const unixToDateString = (UNIX_timestamp: number) => {
  return unixToDate(UNIX_timestamp).toLocaleDateString("en-GB");
};
function App({ signOut }: any) {
  const [todos, setTodos] = useState<Todo[] | undefined>([]);
  const [formData, setFormData] = useState(initialFormState);
  const fetchTodos = async () => {
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
    fetchTodos();
  }, []);

  async function createNote() {
    if (!formData.title || !formData.content) return;
    await API.graphql({
      query: createTodo,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { input: formData },
    });
    setFormData(initialFormState);
    fetchTodos();
  }
  const completeNote = async ({ id }: Todo) => {
    await API.graphql({
      query: updateTodo,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { input: { id, completed: true } },
    });
    fetchTodos();
  };
  async function deleteNote({ id }: Todo) {
    await API.graphql({
      query: deleteTodo,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { input: { id } },
    });
    fetchTodos();
  }
  return (
    <View classtitle="App">
      <Card>
        <h1>My Notes App</h1>
        <input
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Note title"
          value={formData.title}
        />
        <input
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="Note content"
          value={formData.content}
        />
        <DatePicker
          selected={unixToDate(formData.timestamp_due)}
          onChange={(date: Date) =>
            setFormData({
              ...formData,
              timestamp_due: Math.floor(date.getTime() / 1000),
            })
          }
        />
        <button onClick={createNote}>Create Note</button>
        <div style={{ marginBottom: 30 }}>
          {todos !== (null || undefined) &&
            todos.map((note) => <TodoNote Todo={note} />)}
        </div>
        <TodoForm />
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
