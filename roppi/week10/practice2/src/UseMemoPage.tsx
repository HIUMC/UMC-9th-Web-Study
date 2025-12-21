import { useMemo, useState } from "react";
import TextInput from "./TextInput";
import { findPrimeNumbers } from "./utils/math";

const UseMemoPage = () => {
  console.log('UseMemoPage 렌더링됨!');
  const [limit, setLimit] = useState<string>("100099");
  const [text, setText] = useState("");

  const handleChangeText = (str : string) => {
    setText(str);
  };
  
const primes = useMemo(() => findPrimeNumbers(Number(limit) || 0), []);

  return (
    <div>
      <h1>같이 배우는 리액트 useMemo편</h1>
      <label>숫자 입력 (소수 찾기) : 
        <input  
          value={limit} 
          onChange={(e)=> setLimit(e.target.value)}
          />
      </label>

      <h2>소수 리스트: </h2>
      <div style={{
        height: '300px',
        overflow: 'auto',
        border: '1px solid black',
        padding: '10px'
      }}>
        {primes.map((prime) => (
          <div key={prime}>{prime}</div> 
        ) )}
      </div>

      <label>
        {text}
           다른 입력 테스트 : <TextInput onChange={handleChangeText} />
      </label>
    </div>
  )
}

export default UseMemoPage;

// useMemo
// - 역할: 연산 결과를 캐싱 (값)
// - 언제 사용?: 연산 비용이 많이 드는 함수의 결과값을 재사용하고 싶을 때 (배열정렬, 긴 계산 등)