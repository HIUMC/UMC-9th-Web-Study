import { useCallback, useState } from "react";
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";

function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 200_000_000; i++) {
    result += i;
  }
  return result;
}

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback(
    (number: number) => {
      setCount(count + number);
    },
    [count]
  );

  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <>
      <h2>Count: {count}</h2>
      <CountButton onClick={handleIncreaseCount} />
      <h2>Text</h2>
      <TextInput onChange={handleText} />
      <span>{text}</span>
    </>
  );
}
