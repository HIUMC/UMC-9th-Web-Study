import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

// CartSlice 생성
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // increase: 증가
    // state: 현재 장바구니 상태
    // action: 디스패치 될 때 전달되는 값
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount += 1;
      }
    },
    // 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount -= 1;
      }
    },
    // removeItem 제거
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
    },
    // clearCart 장바구니 비우기
    clearCart: (state) => {
      state.cartItems = [];
    },
    // calculateTotals 합계 계산
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * Number(item.price);
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

// duck pattern 방식으로 export
export const cartReducer = cartSlice.reducer;

// 액션 생성 함수들 내보내기
export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
