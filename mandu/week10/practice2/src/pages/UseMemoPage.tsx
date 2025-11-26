import { useMemo, useState } from "react";
import TextInput from "../components/TextInput";
import { findPrimeNumbers } from "../utils/math";

export default function UseMemoPage() {
  console.log("render");

  const [limit, setLimit] = useState(1000);
  const [text, setText] = useState("");

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const primes = useMemo(() => findPrimeNumbers(limit), [limit]);

  return (
    <div className="flex flex-col gap-4">
      <h1>같이 배우는 리액트: UseMemo편</h1>
      <label>
        숫자 입력 (소수 찾기):
        <input
          type="number"
          value={limit}
          className="border p-4 rounded-lg"
          onChange={(e) => setLimit(Number(e.target.value))}
        ></input>
      </label>

      <h2>소수 리스트:</h2>
      <div className="flex flex-wrap">
        {primes.map((prime) => (
          <div key={prime}>{prime}&nbsp;</div>
        ))}
      </div>

      <label>
        {text}
        다른 입력 테스트: <TextInput onChange={handleChangeText} />
      </label>
    </div>
  );
}
