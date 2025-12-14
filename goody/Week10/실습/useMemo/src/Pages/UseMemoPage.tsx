import { useMemo, useState } from "react";
import TextInput from "../components/TextInput";
import { findPrimeNumbers } from "../utils/math";

export default function UseMemoPage() {
    console.log('rerender');

    const [limit, setLimit] = useState<number>(10000);
    const [text,setText] = useState('');

    const handleChangeText = (text:string) => {
        setText(text);
    };

    const primes = useMemo(() => findPrimeNumbers(limit), [limit]);

  return (
    <div className="flex flex-col gap-4">
      <h1>useMemo</h1>
      <label>
        숫자 입력 (소수 찾기) : 
        <input value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border p-4 rounded-lg"/>
      </label>

      <h2>소수 리스트 : </h2>
      <div className="flex flex-wrap">
        {primes.map((prime) =>(<div key={prime}>{prime}&nbsp;</div>))}
      </div>
      <label>
        {text}
        다른 입력 테스트 : <TextInput onChange={handleChangeText} />
      </label>

      
    </div>
  )
}

/*
useMemo
- 역할 : 연산 결과를 캐싱 (값)
- 언제 사용? : 비싼 연산 작업 (배열 정렬, 복잡한 계산) 최적화 할 때 사용 
*/
