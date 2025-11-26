import { useCounterActions } from "../stores/counterStore";

const CounterButton = () => {
  const { increment, decrement } = useCounterActions();
  return (
    <div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default CounterButton;
