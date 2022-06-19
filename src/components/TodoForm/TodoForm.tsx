import { useState, useContext } from "react";
import {
  Column,
  StyledTextField,
  StyledDatePicker,
  AddButton,
  CancelButton,
  ButtonSection,
  RowCenter,
} from "./styles";
import AddIcon from "@mui/icons-material/Add";
import { TaskContext } from "../../store/TaskContext/TaskContextProvider";
import { API } from "aws-amplify";
import { createTodo } from "../../graphql";

type FormState = {
  title: string;
  content: string;
  timestamp_due: undefined | number;
  date: string;
  completed: boolean;
};
const initialFormState: FormState = {
  title: "",
  content: "",
  timestamp_due: undefined,
  date: "",
  completed: false,
};

const TodoForm = () => {
  const { fetchTodoTasks } = useContext(TaskContext);
  const [formData, setFormData] = useState(initialFormState);
  const [isOpen, setIsOpen] = useState(false);
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  const handleCreateNote = async () => {
    const { date, ...newTask } = formData;
    await API.graphql({
      query: createTodo,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { input: newTask },
    });
    setFormData(initialFormState);
    fetchTodoTasks();
  };
  return (
    <>
      {isOpen ? (
        <>
          <Column>
            <StyledTextField
              required
              id="outlined-required"
              placeholder="Task name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <StyledTextField
              id="outlined"
              placeholder="Details..."
              multiline
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              minRows={2}
            />
            <StyledDatePicker
              id="outlined-search"
              inputProps={{
                type: "date",
              }}
              value={formData.date}
              label="Due Date"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  date: e.target.value,
                  timestamp_due: Math.floor(
                    new Date(e.target.value).getTime() / 1000
                  ),
                });
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Column>
          <ButtonSection>
            <CancelButton variant="text" onClick={toggleForm}>
              Cancel
            </CancelButton>
            <AddButton variant="contained" onClick={handleCreateNote}>
              Add Task
            </AddButton>
          </ButtonSection>
        </>
      ) : (
        <RowCenter>
          <AddButton
            variant="contained"
            endIcon={<AddIcon />}
            onClick={toggleForm}
          >
            Add Task
          </AddButton>
        </RowCenter>
      )}
    </>
  );
};
export default TodoForm;
