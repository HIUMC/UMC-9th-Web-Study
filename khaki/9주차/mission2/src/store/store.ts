import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../slices/cartSlice";
import { modalReducer } from "../slices/modalSlice";

// 1. 저장소 생성
function createStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });
  return store;
}

// store 내보내기
// 여기서 실행해서 store를 생성한 후 내보냄
const store = createStore();
export default store;

// 루트 상태 타입 내보내기
export type RootState = ReturnType<typeof store.getState>;

// 디스패치 타입 내보내기
export type AppDispatch = typeof store.dispatch;
