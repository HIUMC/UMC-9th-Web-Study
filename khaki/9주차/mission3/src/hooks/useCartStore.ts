import { create } from "zustand";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

// cart 관련 액션 함수들의 형태(타입)를 정의한 것
interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// cart 관련 상태와 액션들을 포함한 스토어의 형태(타입)를 정의한 것
interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

// create()로 만든 zustand 전역 store Hook이 useCartStore에 담긴다.
export const useCartStore = create<CartState>()(
  // 미들웨어를 쓸 때는 이런구조로 쓴다.
  // immer 미들웨어를 사용하여 직접 state 변경 문법을 사용할 수 있게 함
  immer((set) => ({
    // 초기 state
    cartItems: cartItems,
    amount: 0,
    total: 0,

    // action 함수들
    actions: {
      increase: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem) {
            cartItem.amount += 1;
          }
        });
      },

      decrease: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem && cartItem.amount > 0) cartItem.amount -= 1;
        });
      },

      remove: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },

      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },

      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * Number(item.price);
          });

          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

// state 정보만 가져오는 커스텀 훅
export const useCartInfo = () =>
  useCartStore(
    // useShallow: “얕은 비교(shallow compare)”를 적용해서 selector가 객체를 반환할 때 불필요한 리렌더를 막아주는 함수
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

// action 함수들만 가져오는 커스텀 훅
export const useCartActions = () => useCartStore((state) => state.actions);
