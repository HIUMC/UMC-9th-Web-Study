import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlices";
import modalReducer from "../slices/modalSlices";


// 1. 저장소 생성
function createStore() {
  const store = configureStore({
  // 2. 리듀서 설정
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
  })
  return store;
}


// store를 활용할 수 있도록 내보내야 함
// 여기서 실행해서 스토어를 빼준자
// 싱글톤 패턴
const store = createStore();

export default store;

// RootState
// store.getState()가 반환하는 Redux 전체 상태의 타입을 자동으로 추론하여 RootState로 정의한다.
// 이렇게 하면 useSelector 사용 시 state 타입을 자동 완성(IntelliSense)으로 정확하게 받을 수 있음.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch
// store.dispatch의 타입을 가져와서 AppDispatch로 정의한다.
// 이렇게 하면 useDispatch를 사용할 때 커스텀 훅(useAppDispatch)과 함께
// Thunk 같은 비동기 액션까지 타입 안정성을 완전히 보장할 수 있음.
export type AppDispatch = typeof store.dispatch;
