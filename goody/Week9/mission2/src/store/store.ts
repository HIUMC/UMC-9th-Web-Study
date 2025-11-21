import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice";

// 1. 저장소 생성
function createStore() {
    const store = configureStore({
        // 2. 리듀서 설정
        reducer : {
            cart : cartReducer,
            modal : modalReducer,
        },
    })

    return store;
}

// store를 활용할 수 있도록 export
// 여기서 실행해서 스토어를 빼줌
// 싱글톤패턴
const store = createStore();
export default store;

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store