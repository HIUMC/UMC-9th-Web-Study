import type { Lp } from "../types/cart";
import { useCartActions } from "../hooks/useCartStore";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, remove } = useCartActions();

  const handleIncrease = () => {
    // 수량 증가 액션 디스패치
    increase(lp.id);
  };

  const handleDecrease = () => {
    // 수량 감소 액션 디스패치
    decrease(lp.id);

    if (lp.amount === 1) {
      remove(lp.id);
      return;
    }
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img src={lp.img} alt={lp.title} className="w-20 h-20 object-cover rounded mr-4" />
      <div className="flex-1">
        <h3 className="text-xl">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm font-bold text-gray-600">{lp.price} 원</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-gray-300">{lp.amount}</span>
        <button
          onClick={handleIncrease}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
