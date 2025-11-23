import { useShallow } from "zustand/shallow"
import { useCounterStore } from "../stores/counterStore"
import CounterButton from "./CounterButton";

export default function Counter() {

    // const {count, increment, decrement} = useCounterStore((state) => state)

    // 개별 구독! => 리렌더링 최적화 위함. 
    // const count = useCounterStore((state) => state.count);
    // const increment = useCounterStore((state) => state.increment);
    // const decrement = useCounterStore((state) => state.decrement);

    // 객체로 뽑아야할 때 useShallow 활용 가능
    const {count} = useCounterStore(
        useShallow((state)=> ({
        count : state.count,
        }))
    );

  return (
    <div>
      <h1>{count}</h1>
      <CounterButton />
    </div>
  )
}
