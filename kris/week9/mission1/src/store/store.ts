import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

// 1. 저장소 생성
function createStore() {
  const store = configureStore({
    // 2. 리듀서 설정
    reducer: {
      cart: cartReducer,
    },
  });
  return store;
}

// 3. 스토어 내보내기
// 여기서 실행해서 빼주기 -> singleton 패턴
const store = createStore();
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
