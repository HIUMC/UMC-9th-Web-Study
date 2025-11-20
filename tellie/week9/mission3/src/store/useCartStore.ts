import { create } from 'zustand';
import cartItems from '../constants/cartItems';
import type { CartItems } from '../types/cart';

// 타입 정의
export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  isModalOpen: boolean;
}

export interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export type CartStore = CartState & CartActions;

// Zustand 스토어 생성
export const useCartStore = create<CartStore>((set, get) => ({
  // 초기 상태 (기존 Redux 상태 그대로)
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isModalOpen: false,

  // 액션들 (기존 Redux 로직 그대로)
  increase: (id: string) => {
    set((state) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === id);
      if (item) {
        item.amount += 1;
      }
    });
    get().calculateTotals();
  },

  decrease: (id: string) => {
    set((state) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === id);
      if (item) {
        item.amount -= 1;
      }
    });
    get().calculateTotals();
  },

  removeItem: (id: string) => {
    set((state) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
    });
    get().calculateTotals();
  },

  clearCart: () => {
    set((state) => {
      state.cartItems = [];
    });
    get().calculateTotals();
  },

  calculateTotals: () => {
    set((state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      return { amount, total };
    });
  },

  openModal: () => {
    set({ isModalOpen: true });
  },

  closeModal: () => {
    set({ isModalOpen: false });
  },
}));