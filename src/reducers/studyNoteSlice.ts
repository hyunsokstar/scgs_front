import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CounterState {
  pageNumbersToEdit: number[];
  pageNumbersToMove: number[];
  currentPage: number;
}

const initialState: CounterState = {
  pageNumbersToEdit: [],
  pageNumbersToMove: [],
  currentPage: 1,
};

export const studyNoteSlice = createSlice({
  name: "study_note",
  initialState,
  reducers: {
    selectButton: (state, action: PayloadAction<any>) => {
      console.log("action.payload.editMode : ", action.payload.editMode);
      const buttonNumber = action.payload.buttonNumber;

      if (action.payload.editMode) {
        if (state.pageNumbersToEdit.includes(buttonNumber)) {
          console.log("여기서 클릭한 버튼 number 제거");
          state.pageNumbersToEdit = state.pageNumbersToEdit.filter(
            (num) => num !== buttonNumber
          );
        } else {
          console.log("여기서 클릭한 버튼 number 추가");
          state.pageNumbersToEdit = [
            ...state.pageNumbersToEdit,
            buttonNumber,
          ].sort(
            // setState 와 같은 효과
            (a, b) => a - b
          );
        }
      } else {
        state.currentPage = buttonNumber;
      }
    },

    deselectButton: (state) => {
      state.pageNumbersToEdit = [];
    },
    initalizeSelctButtons: (state, action: PayloadAction<number[]>) => {
      console.log("action.payload : ", action.payload);
      state.pageNumbersToEdit = [...action.payload];
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
      state.pageNumbersToEdit = [];
      state.pageNumbersToMove = [];
    },
    go_to_specific_page: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    // 이동할 페이지 번호 (shift +  clcik 으로 설정)
    setPageNumbersToMove: (state, action: PayloadAction<any>) => {
      console.log("action.payload.editMode : ", action.payload.editMode);
      const buttonNumber = action.payload.buttonNumber;
      // todo
      if (action.payload.editMode) {
        if (state.pageNumbersToMove.includes(buttonNumber)) {
          console.log(
            "클릭 했던 버튼 클릭한 경우 pageNumbersToMove 에서 buttonNumber 제거"
          );
          state.pageNumbersToMove = state.pageNumbersToMove.filter(
            (num) => num !== buttonNumber
          );
        } else if (
          Math.max(...state.pageNumbersToEdit) < buttonNumber &&
          state.pageNumbersToEdit.length > state.pageNumbersToMove.length
        ) {
          console.log(
            "pageNumbersToEdit 의 최대값보다 buttonNumber 가 크면 추가"
          );
          state.pageNumbersToMove = [
            ...state.pageNumbersToMove,
            buttonNumber,
          ].sort((a, b) => a - b);
        } else {
          alert("조건을 만족하지 않습니다."); // 조건을 만족하지 않을 경우 alert 표시
          return; // 조건을 만족하지 않으면 함수 종료
        }
      }
    },

    // 질문: 
    // setPageNumbersToEdit: (state, action: PayloadAction<any>) => {
    // },
    setPageNumbersToEdit: (state, action: PayloadAction<number[]>) => {
      state.pageNumbersToEdit = action.payload;
    },
    setPageNumbersToMove2: (state, action: PayloadAction<number[]>) => {
      console.log("setPageNumbersToMove2 실행 check");
      
      state.pageNumbersToMove = action.payload;
      
    },
    // pageNumbersToMove
  },
});

export const {
  selectButton,
  setPageNumbersToMove,
  setPageNumbersToMove2,
  deselectButton,
  initializeCurrentPage,
  initalizeSelctButtons,
  moveToBeforPage,
  moveToNextPage,
  cancle_for_all_selected_pages,
  go_to_specific_page,
  setPageNumbersToEdit
} = studyNoteSlice.actions;

export const pageNumbersToEdit = (state: RootState) =>
  state.studyNote.pageNumbersToEdit;

export default studyNoteSlice.reducer;
