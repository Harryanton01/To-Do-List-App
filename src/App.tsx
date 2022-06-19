import "./App.css";
import { withAuthenticator, Button, View, Card } from "@aws-amplify/ui-react";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import { TaskContextProvider } from "./store/TaskContext/TaskContextProvider";

const unixToDate = (UNIX_timestamp: number) => {
  return new Date(UNIX_timestamp * 1000);
};
export const unixToDateString = (UNIX_timestamp: number) => {
  return unixToDate(UNIX_timestamp).toLocaleDateString("en-GB");
};
function App({ signOut }: any) {
  return (
    <TaskContextProvider>
      <View classtitle="App">
        <Card>
          <h1>My Notes App</h1>
          <TodoList />
          <TodoForm />
        </Card>
        <Button onClick={signOut}>Sign Out</Button>
      </View>
    </TaskContextProvider>
  );
}

export default withAuthenticator(App);
