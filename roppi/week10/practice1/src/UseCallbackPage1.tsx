import { useState } from "react";

function heavyComputation() : number {
  let result = 0;
  for (let i = 0; i < 1_000_999; i++) {
    result += i;
  }
  return result;
}

export default function UseCallbackPage()  {
  const [count, setCount] = useState(heavyComputation); // 참조자체를 전달하면 초기렌더링 한 번

  const handleIncrease = () => {
    console.log('Increase clicked');
    setCount((prev) => prev + 1);
  }

  return(
    <>
    <div>
      <h1>UseCallback Page</h1>
      <div>Count: {count}</div>
      <button onClick={handleIncrease}>Increase</button>
    </div>
    <div>
      
    </div>
    </>
  );
}