import { create } from "zustand";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItem";
import { useShallow } from "zustand/shallow";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  // set : immer와 같이 쓰면 draft 사용 -> 불변성 유지
  /* eslint-disable @typescript-eslint/no-unused-vars */ // eslint 에러 삭제
  immer((set, _) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        // set((state) => ({
        //   cartItems: state.cartItems.map((item) =>
        //     item.id === id ? { ...item, amount: item.amount + 1 } : item
        //   ),
        // }));
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

          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
        });
      },
      removeItem: (id: string) => {
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

// const nextState = produce(baseState, (draft) => {
//     ...state, count = 1;
// });

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

export const useCartAction = () => useCartStore((state) => state.actions);
