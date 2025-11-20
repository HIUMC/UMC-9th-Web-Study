import { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCartActions, useCartInfo } from '../hooks/useCartStore';

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gray-800 text-white'>
      <h1 onClick={() => {
        window.location.href='/';
        }} 
        className='text-2xl font-semibold cursor-pointer'>Tellie</h1>
      <div className='flex items-center space-x-2'>
        <FaShoppingCart className='text-2xl' />
        <span className='text-xl font-medium'>{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
