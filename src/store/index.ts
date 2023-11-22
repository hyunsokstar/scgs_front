import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducers/counterSlice'
import loginInfoReducer from '../reducers/userSlice'
import studyNoteSliceReducer from '../reducers/studyNoteSlice'
import referImageUploadSlice from '../reducers/referImageUploadSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loginInfo: loginInfoReducer,
    studyNote: studyNoteSliceReducer,
    imageUpload: referImageUploadSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
