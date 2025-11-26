import { FaShoppingCart } from "react-icons/fa";
import lpImg from "../assets/lp1.png";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useEffect } from "react";

const NavBat = () => { 
  const {amount, cartItems } = useCartInfo();
const { calculateTotals } = useCartActions();

// cartItems(장바구니 목록)가 변경될 때마다 총 수량/총 금액을 다시 계산하기 위한 useEffect
// increase/decrease/removeItem/clearCart 같은 액션이 실행되면 cartItems가 변하게 되고,
// 그 변화에 맞춰 calculateTotals()를 dispatch하여 Redux store의 amount/total 값을 최신 상태로 유지함.
// dispatch는 React Hooks 규칙상 의존성 배열에 포함시키는 것이 권장됨.
useEffect(() => {
  calculateTotals();
}, [cartItems, calculateTotals]);

  
  return (
    <div className="flex justify-between items-center p-4  mx-10">
      <img src={lpImg} alt="logo" className="w-25" />

          <div className="flex items-center gap-1">
            <FaShoppingCart className="text-3xl" />
            <span className="ml-1">{amount}</span>
          </div>
    </div>
  );
}
export default NavBat;