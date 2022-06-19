import { useContext } from "react";
import Radio from "@mui/material/Radio";
import { Todo } from "../../types";
import { RowCenter, Column, Title, Content, TitleWrapper } from "./styles";
import { unixToDateString } from "../../App";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { API } from "aws-amplify";
import { deleteTodo } from "../../graphql";
import { TaskContext } from "../../store/TaskContext/TaskContextProvider";

const TodoNote = ({ Todo }: { Todo: Todo }) => {
  const { fetchTodoTasks } = useContext(TaskContext);
  const handleDeleteTask = async () => {
    await API.graphql({
      query: deleteTodo,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { input: { id: Todo.id } },
    });
    fetchTodoTasks();
  };
  return (
    <Column>
      <TitleWrapper>
        <RowCenter>
          <Radio />
          <Title>{Todo.title}</Title>
        </RowCenter>
        <RowCenter>
          <IconButton onClick={handleDeleteTask}>
            <DeleteIcon />
          </IconButton>
        </RowCenter>
      </TitleWrapper>
      <Content>{Todo.content}</Content>
      <Content>
        <RowCenter>
          {Todo.timestamp_due && (
            <>
              <CalendarMonthIcon />
              {unixToDateString(Todo.timestamp_due)}
            </>
          )}
        </RowCenter>
      </Content>
    </Column>
  );
};

export default TodoNote;
