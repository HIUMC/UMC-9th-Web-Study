import { create } from "zustand";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";

interface CartActions {
    increase : (id : string) => void;
    decrease : (id : string) => void;
    removeItem : (id : string) => void;
    clearCart : () => void;
    calculateTotals : () => void;
}

interface CartState {
    cartItems : CartItems;
    amount : number;
    total : number;
    actions : CartActions;
}

export const CartStore = create<CartState>()(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    immer((set, _) => ({
        cartItems : cartItems,
        amount : 0,
        total : 0,
        actions : {
            increase : (id : string) => {
                // immer 사용 x 
                // set((state) => {
                //     cartItems : state.cartItems.map((item) => item.id === id ? {...item, amount: item.amount + 1} : item)
                // })
                // immer 사용 O
                set((state) => {
                    const cartItem = state.cartItems.find((item) => item.id === id);
                    if (cartItem) { cartItem.amount += 1; }
                });
            },
            decrease : (id : string) => {
                set((state) => {
                    const cartItem = state.cartItems.find((item) => item.id === id);
                    if (cartItem && cartItem.amount > 0) { cartItem.amount -= 1; }
                });
            },
            removeItem : (id : string) => {
                set((state) => {
                    state.cartItems = state.cartItems.filter((item) => item.id !== id);
                });
            },
            clearCart : () => {
                set((state) => {
                    state.cartItems = [];
                })
            },
            calculateTotals : () => {
                set((state) => {
                    let amount = 0;
                    let total = 0;

                    state.cartItems.forEach((item) => {
                        amount += item.amount;
                        total += item.amount * item.price;
                    });

                    state.amount = amount;
                    state.total = total; 
                })
            },
        },
    }))
);