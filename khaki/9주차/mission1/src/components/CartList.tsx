import CartItem from "./CartItem";
import type { CartState } from "../slices/cartSlice";
import { useSelector } from "../hooks/useCustomRedux";

export const CartList = () => {
  const { cartItems } = useSelector((state): CartState => state.cart);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item, idx) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};
