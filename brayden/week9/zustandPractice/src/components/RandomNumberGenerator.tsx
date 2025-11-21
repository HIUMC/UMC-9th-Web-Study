import { useShallow } from "zustand/shallow";
import { useCounterStore } from "../stores/counterStore";

const RandomNumberGenerator = () => {
  // count를 구독하지 않았더라도 모두 영향을 받게 됨
  // 이를 해결하기 위해, useShallow 사용
  const { randomNumber, random } = useCounterStore(
    useShallow((state) => ({
      randomNumber: state.randomNumber,
      random: state.actions.random,
    }))
  );

  // 혹은 개별 구독을 사용하자.
  // const randomNumber = useCounterStore((state) => state.randomNumber);
  // const random = useCounterStore((store) => state.random);

  return (
    <div>
      <h1>{randomNumber}</h1>
      <button onClick={random}>랜덤 번호 생성기</button>
    </div>
  );
};

export default RandomNumberGenerator;
