import {
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

// useDispatch 커스텀 버전
// 기본 useDispatch는 any 타입이라 비동기 액션(Thunk) 실행 시 타입 안전성이 떨어진다.
// 따라서 store.dispatch의 정확한 타입(AppDispatch)을 반환하도록 재정의해
// 컴포넌트에서 dispatch를 사용할 때 타입 추론과 자동완성을 보장한다.
export const useDispatch: () => AppDispatch = useDefaultDispatch;

//  useSelector 커스텀 버전
// 기본 useSelector는 Redux state의 타입 정보를 모르기 때문에 state.cart, state.user 등의
// 구조에 대해 자동완성을 제공하지 못한다.
// RootState 타입을 연결한 TypedUseSelectorHook을 사용해
// state의 전체 타입을 정확하게 추론하고 컴포넌트에서 안전하게 값을 읽을 수 있게 한다.
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
