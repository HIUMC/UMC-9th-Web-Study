import { useShallow } from "zustand/shallow";
import { CartStore } from "../store/CartStore";



export const useCartInfo = () => CartStore(
    useShallow((state) => ({
        cartItems : state.cartItems,
        amount : state.amount,
        total : state.total,
    }))
);

export const useCartActions = () => CartStore((state) => state.actions)