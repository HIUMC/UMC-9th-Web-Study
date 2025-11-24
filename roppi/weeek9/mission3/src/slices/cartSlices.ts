import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItemsType } from "../types/cart";

// Redux store에 저장될 cart 상태 타입
export interface CartState {
  cartItems: CartItemsType; // 장바구니에 담긴 아이템 목록
  amount: number;           // 전체 수량 합계
  total: number;            // 전체 금액 합계
}

// 초기 상태
const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

// Cart 기능을 담당하는 Slice 생성
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 특정 아이템의 수량을 +1 증가
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (item) item.amount += 1;
    },

    // 특정 아이템의 수량을 -1 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (item) item.amount -= 1;
    },

    // 특정 아이템을 장바구니에서 제거
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    },

    // 장바구니 전체 비우기
    clearCart: (state) => {
      state.cartItems = [];
    },

    // 전체 수량(amount)과 총 금액(total) 계산
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

// 액션 생성자 내보내기
export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

// Slice의 reducer를 기본 export (store에서 사용됨)
export default cartSlice.reducer;
