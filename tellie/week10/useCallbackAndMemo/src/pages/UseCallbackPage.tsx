import { useCallback, useState } from 'react';
import CountButton from '../components/CountButton';
import TextInput from '../components/TextInput';

export default function UseCallbackPage() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');

  // useCallback으로 감싸면 함수가 메모이제이션 된다.
  // 처음 렌더링 될 때만 함수가 생성되고, 이후로는 동일한 함수를 재사용한다.
  const handleIncreaseCount = useCallback((number: number) => {
    setCount(count + number);
    // 빈 배열을 이 함수가 처음 한 번만 만들어져야 한다.
    // 함수 내부에서 count 값은 0으로 기억하고 있다.
    // 두 번째 클릭을 해도, 0 + 10이 되어서 count 값이 변하지 않는다.
    // 첫 번째 클릭도 0 + 10
    // 두 번째 클릭도 0 + 10
  }, [count]);

  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <div>
      <h1>같이 배우는 리액트 useCallback편</h1>
      <h2>Count : {count}</h2>
      <CountButton onClick={handleIncreaseCount} />
      <h2>Text</h2>
      <div className='flex flex-col'>
        <span>{text}</span>
        <TextInput onChange={handleText} />
      </div>
    </div>
  )
}
