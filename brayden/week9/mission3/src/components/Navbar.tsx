import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCartAction, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartAction();

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals, cartItems]);

  return (
    <div
      className="flex justify-between items-center p-4 bg-gray-800
     text-white"
    >
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className="text-2xl font-semibold cursor-pointer"
      >
        Brayden
      </h1>
      <div className="flex items-center space-x-2">
        <ShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
