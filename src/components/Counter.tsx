import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../reducers/counterSlice";
import { RootState } from "../store";

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const {loginUser, isLoggedIn} = useSelector(
    (state: RootState) => state.loginInfo
  );
  const dispatch = useDispatch();

  // console.log("loginUser : ", loginUser);

  return (
    <div>
      <div>{isLoggedIn ? "true" :  "false"}</div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default Counter;
