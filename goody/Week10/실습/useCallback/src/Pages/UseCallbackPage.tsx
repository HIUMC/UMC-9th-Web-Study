import { useCallback, useState } from "react";
import Countbutton from "../components/Countbutton";
import TextInput from "../components/TextInput";

export default function UseCallbackPage() {
    // 함수의 참조가 아닌 바로 호출 => 복잡한 연산 계속함
    const [count,setCount] = useState<number>(0); 
    const [text,setText] = useState<string>("");

    // useCallback : 함수 값 캐싱 => 동일한 함수 참조 동일하다고 인식할 수 있게됨.
    const handleIncreseCount = useCallback((number: number) => { 
        setCount(count + number);
        // 빈 배열 = 이 함수가 처음 한번만 만들어져야 한다. ( 모든 값 동결됨 )
        // 함수 내부에서 Count 값 0으로 기억함.
        // 두번째,세번째 클릭에도 0+10이 되어서 count 값 변경 없음.
        // dependency에 count 추가!
    },[count]);

    const handleText = useCallback((text:string) => {
        setText(text);
    }, []);

    
  return (
    <>
        <h1>useCallback</h1>
        <h2>Count : {count}</h2>
        <Countbutton onClick={handleIncreseCount} />
        <h2>Text</h2>
        <div className="flex flex-col">
            <span>{text}</span>
            <TextInput onChange={handleText} />
        </div>
    </>
  )
}

/* 
주의할 점
1. 디펜던시 배열 (의존성 배열) 을 신중하게 설정
- 디펜던시 배열에 count 넣지 않으면 최신 값이 반영되지 않았다.
- 너무 많은 변수를 넣은 경우는 최적화 효과가 사라질 수 있다.

2. useCallback TradeOff
- useCallback 함수가 메모리에 저장되기 때문에 메모리를 많이 사용한다.
- 정말 필요할 때 사용해야한다.
*/