import { useCounterStore } from "../stores/counterStore"

export default function RandomNumGenerator() {

    const randomNum = useCounterStore((state) => state.randomNum);
    const random = useCounterStore((state) => state.actions.random);

  return (
    <div>
      <h1>{randomNum}</h1>
      <button onClick={random}>랜덤 번호 생성기</button>
    </div>
  )
}
