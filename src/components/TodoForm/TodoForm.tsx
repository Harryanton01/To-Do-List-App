import { useState } from "react";
import { TextField } from "@mui/material";
import { Column } from "./styles";

const unixToDate = (UNIX_timestamp: number | undefined) => {
  if (UNIX_timestamp == undefined) return undefined;
  return new Date(UNIX_timestamp * 1000);
};
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
  const [formData, setFormData] = useState(initialFormState);
  return (
    <Column>
      <TextField
        required
        id="outlined-required"
        label="Title"
        defaultValue="Hello World"
      />
      <TextField
        id="outlined"
        label="Details"
        defaultValue="details..."
        multiline
        rows={2}
      />
      <TextField
        id="outlined"
        inputProps={{
          type: "date",
        }}
        value={formData.date}
        onChange={(e) => {
          setFormData({
            ...formData,
            date: e.target.value,
            timestamp_due: Math.floor(
              new Date(e.target.value).getTime() / 1000
            ),
          });
        }}
      />
    </Column>
  );
};

export default TodoForm;
