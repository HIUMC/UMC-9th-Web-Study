import { useCartActions } from "../hooks/useCartStore";
import type { Lp } from "../types/cart";
interface CartItemProps {
lp: Lp;
}

const CartItem = ({lp}: CartItemProps) => { 
  const {increase, decrease, removeItem} = useCartActions();

    const handleIncreaseCount = () : void => {
    increase(lp.id );
  };

    const handleDecreaseCount = () : void => {
    if (lp.amount === 1) {
      removeItem(lp.id );
      return;
    }

      decrease(lp.id );
  };

  return (
    <div className="flex items-center border-b p-4 border-gray-800">
      <img src={lp.img} alt={lp.title}
      className="w-20 h-20 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm text-gray-800 font-bold">Price: {lp.price}</p>
        <p className="text-sm text-gray-800">Amount: {lp.amount}</p>
      </div>
      <div className="flex">
        <button className="bg-white text-black px-3 py-1 h-8 border hover:text-gray-400 cursor-pointer"
        onClick={handleDecreaseCount}
        >-</button>
          <p className=" h-8 text-gray-800 px-3 border-y py-1">{lp.amount}</p>
        <button className=" h-8  bg-white text-black px-3 py-1 border hover:text-gray-400 cursor-pointer"
        onClick={handleIncreaseCount}
        >+</button>
      </div>
    </div>
  );
}
export default CartItem;