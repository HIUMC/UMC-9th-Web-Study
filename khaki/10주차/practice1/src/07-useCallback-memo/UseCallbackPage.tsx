import { useCallback, useState } from "react";
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";

export const UseCallbackPage = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // useCallback: 의존성 배열이 이전 렌더와 달라질 때만 함수 새로 생성하여 참조가 바뀜
  const handleIncreaseCount = useCallback(
    (number: number): void => {
      setCount(count + number);
    },
    [count]
  );
  // 빈 배열: 최초 렌더링 시에만 함수 생성 그 후로는 같은 함수 참조 유지
  // (count가 바뀌어도 함수내부에선 최초 count값만 참조)
  // [count]: count가 바뀔 때마다 함수 새로 생성

  const handleText = useCallback((inputText: string): void => {
    setText(inputText);
  }, []);
  // 빈 배열: 최초 렌더링 시에만 함수 생성

  return (
    <>
      <h1>같이 배우는 리액트: useCallback편</h1>
      <h2>Count: {count}</h2>
      <CountButton onClick={handleIncreaseCount} />
      <h2>Text</h2>
      <span>{text}</span>
      <TextInput onChange={handleText} />
    </>
  );
};
