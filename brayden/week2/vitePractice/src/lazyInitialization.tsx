import { useState } from "react";
import "./App.css";

function heavyComputation(): number {
  let result = 0;
  for (let i = 0; i < 10000000; i++) {
    result += i;
  }
  return result;
}

function App() {
  const [count, setCount] = useState(() => heavyComputation());
  // const [count, setCount] = useState(heavyComputation);

  const handleIncreaseNumber = (): void => {
    setCount((prev): number => prev + 1);
  };

  const handleDecreaseNumber = (): void => {
    setCount((prev): number => prev - 1);
  };

  return (
    <>
      <h3>{count}</h3>
      <button onClick={handleIncreaseNumber}>증가</button>
      <button onClick={handleDecreaseNumber}>감소</button>
    </>
  );
}

export default App;
