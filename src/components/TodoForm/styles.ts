import styled from "styled-components";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.23);
`;

export const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }
`;

export const RowCenter = styled.div`
  display: flex;
  justify-content: center;
`;
export const StyledDatePicker = styled(TextField)`
  && {
    margin-left: 10px;
    margin-bottom: 10px;
    max-width: 120px;
  }

  &:hover {
    background-color: #e3e3e3;
  }
  &:focus-within {
    background-color: #e3e3e3;
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
`;

export const AddButton = styled(Button)`
  && {
    background-color: #e07f00;
    &:hover {
      background-color: #cc7402;
    }
  }
`;
export const CancelButton = styled(Button)`
  && {
    color: #3b3b3b;
    background-color: #e3e3e3;
    &:hover {
      background-color: #c9c9c9;
    }
  }
`;
export const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  margin-top: 10px;
  gap: 20px;
`;
