import { useCallback, useState } from "react";
import CountButton from "./components/CountButton";
import TextInput from "./components/TextInput";

// function heavyComputation() {
//   let result = 0;
//   for (let i = 0; i < 1_000_000; i++) {
//     result += i;
//   }
//   return result;
// }

const UseCallbackPage = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  // Callback으로 감싸주면 함숫값을 캐싱할 수 있음 -> 동일한 것으로 간주 => 리렌더링 X
  const handleIncreaseCount = useCallback(
    (number: number) => {
      setCount(count + number);
      // 의존성 배열을 []로 설정 시 이 함수가 처음 한번만 만들어져야 한다는 뜻
      // 따라서 한번 렌더링 되면 freeze
      // 함수 내부에서 count 값은 0으로 기억하고 있음. 두 번째 클릭을 해도 0 + 10이 되엇 count 값이 변경 X
      // 첫번째 클릭도 0 + 10, 두번째 클릭도  0 + 10, ...
      // 따라서 count 값이 변경될때마다 다시 렌더링되게끔 해줄 수 있음 -> [count]
    },
    [count]
  );

  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  // const handleText = (text: string) => {
  //   setText(text);
  // };

  return (
    <div>
      <h1>같이 배우는 리액트 useCallback편</h1>
      <h2>Count : {count}</h2>
      <CountButton onClick={handleIncreaseCount} />

      <h2>Text</h2>
      <div className="flex flex-col">
        <span>{text}</span>
        <TextInput onChange={handleText} />
      </div>
    </div>
  );
};
export default UseCallbackPage;

// 주의할 점
// 1. 디펜던시 배열(의존성 배열)을 신중하게 설정
//    만약 count를 넣지 않았으면 최신 값이 반영되지 않을 수 있었음.
//    조금 알고 써야 함.
//    너무 많은 변수를 넣은 경우는, 최적화 효과가 사라질 수 있음.
// 2. useCallback = TradeOff
//    useCallback 함수가 메모리에 저장되기 때문에, 메모리를 많이 사용한다는 것
//    정말 필요할 때만 사용하기
