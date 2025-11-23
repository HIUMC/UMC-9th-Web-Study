import { useCounterActions } from "../stores/counterStore"

export default function CounterButton() {

    // 모든 상태 관리 라이브러리에서도 동일한 패턴 적용 가능
    const {increment, decrement} = useCounterActions();
    
  return (
    <>
        <button onClick={increment}>증가</button>
        <button onClick={decrement}>감소</button>
    </>
  )
}
