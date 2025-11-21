import { FaShoppingBasket } from "react-icons/fa";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";

export default function Navnar() {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1
        className="text-2xl font-semibold cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Ellie
      </h1>
      <div className="flex items-center space-x-2">
        <FaShoppingBasket className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
}
