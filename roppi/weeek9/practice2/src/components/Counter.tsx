import { useCounterStore } from "../stores/counterStore"
import { useShallow } from "zustand/shallow"

const Counter = () => {
  const { count } = useCounterStore(useShallow((state) => state))
  const { increment, decrement } = useCounterStore(useShallow((state) => state.actions))

  return (
    <>
      <div className="flex">{count}</div>
      <div className="flex gap-2">     
      <button
      onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
      </div>
    </>

  )
}

export default Counter