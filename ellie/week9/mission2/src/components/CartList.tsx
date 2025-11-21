import { useSelector } from "../hooks/useCustomRedux";
import CartItem from "./CartItem";

export default function CartList() {
  const { cartItems, amount, total } = useSelector((state) => state.cart);

  return (
    <div>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
}
