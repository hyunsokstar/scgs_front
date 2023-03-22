import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducers/counterSlice'
import loginInfoReducer from '../reducers/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loginInfo: loginInfoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
