import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// [1,2,3,4,5,]
interface CounterState {
  selectedButtons: number[];
}

const initialState: CounterState = {
  selectedButtons: [],
};

export const studyNoteSlice = createSlice({
  name: "study_note",
  initialState,
  reducers: {
    selectButton: (state, action: PayloadAction<any>) => {
        console.log("action.payload : ", action.payload);

        const buttonNumber = action.payload

        if (state.selectedButtons.includes(buttonNumber)) {
            state.selectedButtons = state.selectedButtons.filter((num) => num !== buttonNumber).sort((a, b) => a - b);
        } else {
            state.selectedButtons = ([...state.selectedButtons, buttonNumber].sort((a, b) => a - b));
        } 
    },
  },
});

export const { selectButton } = studyNoteSlice.actions;

export const selectedButtons = (state: RootState) =>
  state.studyNote.selectedButtons;

export default studyNoteSlice.reducer;
