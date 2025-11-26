import { useCartInfo } from "../hooks/useCartStore";
import CartItem from "./CartItem"


const CartList = () => {

  const { cartItems } = useCartInfo();


  return (
    <div className="flex flex-col items-center justify-center ">
      <ul>{cartItems.map((item) => (<CartItem key={item.id} lp={item}/>))}</ul>
    </div>
  )
}

export default CartList
