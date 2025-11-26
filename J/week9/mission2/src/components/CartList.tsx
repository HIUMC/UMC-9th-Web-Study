import { CartItem } from "./CartItem"
import type { RootState } from "../store/store";
import { useSelector } from "../hooks/useCustomRedux";

export const CartList = () => {
    const { cartItems } = useSelector((state: RootState) => state.cart);
    return (
        <div className="flex flex-col items-center justify-center">
            <ul>{cartItems.map((item) => (
                <CartItem key={item.id} lp={item}/>
            ))}</ul>
        </div>
    )
}