import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useSelector } from "../hooks/useCustomRedux";
import CartItem from "./CartItem";

export default function CartList() {
  const { cartItems } = useCartInfo();

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
