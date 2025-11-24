import { FaShoppingCart } from "react-icons/fa"
import { useDispatch, useSelector } from "../hooks/useCustomRedux"
import { useEffect } from "react";
import { caculateTotals } from "../slices/cartSlice";

export const Navbar = () => {
    const { amount, cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(caculateTotals());
    }, [dispatch, cartItems])
    
    return(
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1
                onClick={() => {
                    window.location.href = "/";
                }}
                className="text-2xl font-semibold cursor-pointer"
            >
                제이
            </h1>
            <div className="flex items-center space-x-2">
                <FaShoppingCart className="text-2xl"/>
                <span className="text-xl font-medium">{amount}</span>
            </div>
        </div>
    )
}