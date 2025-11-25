import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";

const Navbar = () => {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1
          className="text-2xl font-semibold cursor-pointer"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Minjae Kim
        </h1>
        <div className="flex items-center space-x-2">
          <ShoppingCart size={24} />
          <span className="text-xl font-medium">{amount}</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
