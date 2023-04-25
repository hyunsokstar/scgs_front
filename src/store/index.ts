import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducers/counterSlice'
import loginInfoReducer from '../reducers/userSlice'
import studyNoteSliceReducer from '../reducers/studyNoteSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loginInfo: loginInfoReducer,
    studyNote: studyNoteSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
