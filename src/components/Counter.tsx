import React from "react";
import { useSelector, useDispatch } from "react-redux";
// 액션 함수 가져 오기
import { increment, decrement } from "../reducers/counterSlice";
import { RootState } from "../store";

function Counter() {
  // 상태는 이렇게 가져오고 
  const count = useSelector((state: RootState) => state.counter.value);

  // 다른 리듀서의 상태도 이렇게 접근 가능
  const {loginUser, isLoggedIn} = useSelector(
    (state: RootState) => state.loginInfo
  );

  // dispatch 객체는 이렇게 생성
  const dispatch = useDispatch();

  return (
    <div>
      {/* <div>{isLoggedIn ? "true" :  "false"}</div> */}
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default Counter;
