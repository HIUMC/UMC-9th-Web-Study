import { useMemo, useState } from "react";
import TextInput from "../components/TextInput";
import { findPrimeNumbers } from "../utils/math";

export default function UseMemoPage() {
  console.log("UseMemoPage 렌더링됨");

  const [limit, setLimit] = useState<number>(0);
  const [text, setText] = useState("");

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const primes = useMemo(() => findPrimeNumbers(limit), [limit]);

  return (
    <>
      <div className="flex flex-col gap-4 h-dvh">
        <h1>useMemo</h1>
        <label>
          숫자 입력:
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </label>
        <h2>소수 리스트</h2>
        <div className="flex flex-wrap gap-2">
          {primes.map((prime) => (
            <span key={prime}>{prime} </span>
          ))}
        </div>
        <label>
          {text}
          다른 입력 테스트: <TextInput onChange={handleChangeText} />
        </label>
      </div>
    </>
  );
}
