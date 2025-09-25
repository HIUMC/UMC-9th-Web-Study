import {useState} from 'react';

function App() {
  const [count, setCount] = useState(0);
  const increase  = () => setCount ((count) => count + 1);
  const decrease = () => setCount ((count) => count - 1);

  return (
    <div>
      <h1> count: {count}</h1>
      <button onClick={increase} className="cursor-pointer">1 증가</button>
      <button onClick={decrease} className="cursor-pointer">1 감소</button>
    </div>
  );
};
export default App

