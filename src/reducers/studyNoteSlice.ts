import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// [1,2,3,4,5,]
interface CounterState {
  selectedButtons: number[];
  currentPage: number;
}

const initialState: CounterState = {
  selectedButtons: [],
  currentPage: 1,
};

export const studyNoteSlice = createSlice({
  name: "study_note",
  initialState,
  reducers: {
    selectButton: (state, action: PayloadAction<any>) => {
      // console.log("action.payload : ", action.payload);

      const buttonNumber = action.payload.buttonNumber;

      if (action.payload.editMode) {
        if (state.selectedButtons.includes(buttonNumber)) {
          state.selectedButtons = state.selectedButtons.filter(
            (num) => num !== buttonNumber
          );
        } else {
          state.selectedButtons = [...state.selectedButtons, buttonNumber].sort(
            (a, b) => a - b
          );
        }
      }

      state.currentPage = buttonNumber;
    },
    initalizeSelctButtons: (state, action: PayloadAction<number[]>) => {
      console.log("action.payload : ", action.payload);
      state.selectedButtons = [...action.payload];
    },
    initializeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    moveToBeforPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    moveToNextPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    cancle_for_all_selected_pages: (state) => {
      state.selectedButtons = [];
    },
    go_to_specific_page: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }

  },
});

export const {
  selectButton,
  initializeCurrentPage,
  initalizeSelctButtons,
  moveToBeforPage,
  moveToNextPage,
  cancle_for_all_selected_pages,
  go_to_specific_page
} = studyNoteSlice.actions;

export const selectedButtons = (state: RootState) =>
  state.studyNote.selectedButtons;

export default studyNoteSlice.reducer;
