import {memo} from 'react';

interface ICountBtn {
  onClick: (count : number) => void;
}

const CountBtn= ({onClick} : ICountBtn) => {
  console.log("CountBtn 렌더링됨");
  return (
    <button onClick={() => onClick(1)}>+1</button>
  )

};

export default memo(CountBtn);