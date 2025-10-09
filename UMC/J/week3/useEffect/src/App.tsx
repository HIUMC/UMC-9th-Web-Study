import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('컴포넌트가 처음 마운트될 때 실행됩니다!');
  }, []);

  useEffect(() => {
    console.log(`count 값이 ${count}로 변경될 때마다 실행됩니다!`);
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1 증가</button>
    </>
  );
}

export default App;