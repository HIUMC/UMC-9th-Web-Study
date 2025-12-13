import { useCallback, useState } from "react";
import CountBtn from "./CountBtn";
import TextInput from "./TextInput";

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback((number :number) : void => {
    setCount(count + number);
  }, [count] );
  
  const handleText = useCallback((str : string) => { 
    setText(str);
  }, [])
  
  return(
    <>
      <h1>같이 배우는 리액트 useCallback편</h1>
      <h2>Count : {count}</h2>
        <CountBtn  onClick={handleIncreaseCount} />
      <h2>Text</h2>
      <div>{text}</div>
      <TextInput onChange={handleText} />
    </>
  )
}

// 주의 사항
// 1. 디펜던시 배열 (의존성 배열)을 신중하게 설정
// 만약 count를 넣지 않으면 최신 값이 반영 되지 않을 수 있었다.
// 너무 많은 변수를 넣은 경우, 최적화 효과가 떨어질 수 있다.

// 2. useCallback trade-off
// useCallback을 남발하면 오히려 성능이 저하될 수 있다.
// 메모리 사용량이 증가하고, 코드가 복잡해질 수 있다.
// 따라서, 실제로 성능 문제가 발생하는 경우에만 사용하는 것이 좋다.