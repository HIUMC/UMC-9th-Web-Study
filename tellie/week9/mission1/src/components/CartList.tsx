import { useSelector } from 'react-redux';
import CartItem from "./CartItem";

const CartList = () => {
  const { cartItems } = useSelector ((state) => state.cart);
  
  return (
    <div className='flex flex-col items-center justify-center pt-6'>
      <ul className='w-full max-w-4xl px-4'>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  )
};

export default CartList;
