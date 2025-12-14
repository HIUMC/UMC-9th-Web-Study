import { useMemo, useState } from "react";
import TextInput from "./components/TextInput";
import { findPrimeNumbers } from "./utils/math";

export const UseMemoPage = () => {
  console.log("UseMemoPage 렌더링됨");

  const [limit, setLimit] = useState<number>(0);
  const [text, setText] = useState("");

  const handleChangeText = (text: string): void => {
    setText(text);
  };

  const primes = useMemo((): number[] => findPrimeNumbers(limit), [limit]);

  return (
    <div className="flex flex-col justify-center gap-5 h-dvh w-dvw p-10">
      <h1>같이 배우는 리액트: useMemo편</h1>
      <label>
        숫자 입력(소수 찾기):
        <input
          type="number"
          value={limit}
          className="mt-5 border-3 p-4 rounded-lg"
          onChange={(e): void => setLimit(Number(e.target.value))}
        />
      </label>

      <h2>소수 리스트:</h2>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {primes.map((prime) => (
          <span key={prime}>{prime}</span>
        ))}
      </div>

      <label>
        {text}
        다른 입력 텍스트: <TextInput onChange={handleChangeText} />
      </label>
    </div>
  );
};
