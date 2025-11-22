import { useShallow } from "zustand/shallow";
import { useCounterStore } from "../stores/counterStore";
import CounterButton from "./CounterButton";

const Counter = () => {
  // zustand : 구독단위로 관리한다.
  //   const count = useCounterStore((state) => state.count);
  //   const increment = useCounterStore((state) => state.increment);
  //   const decrement = useCounterStore((state) => state.decrement);

  //   const count = useCounterStore((state) => ({
  //     count: state.count,
  //     increment: state.increment,
  //     decrement: state.decrement,
  //   }));
  // 따라서 객체로 뽑을 경우 아래와 같이 사용
  const { count } = useCounterStore(
    useShallow((state) => ({
      count: state.count,
    }))
  );
  return (
    <div>
      <h1>{count}</h1>
      <CounterButton />
    </div>
  );
};

export default Counter;
