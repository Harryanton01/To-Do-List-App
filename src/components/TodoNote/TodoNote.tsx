import Radio from "@mui/material/Radio";
import { Todo } from "../../types";
import { RowCenter, Column, Title, Content } from "./styles";
import { unixToDateString } from "../../App";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const TodoNote = ({ Todo }: { Todo: Todo }) => {
  return (
    <Column>
      <RowCenter>
        <Radio />
        <Title>{Todo.title}</Title>
      </RowCenter>
      <Content>{Todo.content}</Content>
      <Content>
        <RowCenter>
          <CalendarMonthIcon />
          {unixToDateString(Todo.timestamp_due as number)}
        </RowCenter>
      </Content>
    </Column>
  );
};

export default TodoNote;
