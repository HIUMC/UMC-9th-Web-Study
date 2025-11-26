import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotal } = useCartActions();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, calculateTotal]);

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
