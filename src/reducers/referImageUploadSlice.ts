import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ReferImageState {
  imageFileToUpload: Blob | MediaSource | null;
}

const initialState: ReferImageState = {
  imageFileToUpload: null,
};

export const referImageUploadSlice = createSlice({
  name: "refer_image",
  initialState,
  reducers: {
    initializeImageFileToUpload: (state, action) => {
      state.imageFileToUpload = action.payload;
    },
  },
});

export const { initializeImageFileToUpload } = referImageUploadSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default referImageUploadSlice.reducer;
