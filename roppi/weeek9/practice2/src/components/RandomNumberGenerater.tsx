import { useCounterStore } from "../stores/counterStore";

const RandomNumberGenerater = () => {
const { randomNumber } = useCounterStore((state) => state);
const { random  } = useCounterStore((state) => state.actions);


  return (
    <div className="flex flex-col items-center gap-2">
      <p>{randomNumber}</p>
      <button onClick={random}>랜덤 숫자 생성</button>

    </div>
  )
}

export default RandomNumberGenerater  