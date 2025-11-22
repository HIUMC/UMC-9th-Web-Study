import { useSelector } from "../hooks/useCustomRedux";
import CardItem from "./CardItem";

const CartList = () => {
  // RootState, AppDispatch 등을 통해서 타입을 추론할 수 있도록 해야한다.
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CardItem lp={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
