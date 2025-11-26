import CartItem from "./CartItem";
import type { RootState } from "../store/store";
import { useSelector } from "../hooks/useCustomRedux";

const CartList = () => { 
  const { cartItems } = useSelector((state : RootState) => state.cart);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ul>
       {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
}
export default CartList;