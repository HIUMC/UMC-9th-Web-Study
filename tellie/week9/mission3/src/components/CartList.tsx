import CartItem from "./CartItem";
import { useCartInfo } from '../hooks/useCartStore';

const CartList = () => {
  const { cartItems } = useCartInfo();
  
  if (cartItems.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center pt-20'>
        <div className='text-center text-gray-500 text-lg'>
          장바구니가 비어있습니다.
        </div>
      </div>
    );
  }
  
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
