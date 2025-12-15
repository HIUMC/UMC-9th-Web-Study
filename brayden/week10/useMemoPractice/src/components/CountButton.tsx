import { memo } from "react";

interface ICountButton {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
  // memo : 이 props가 변경이 되지 않는다면 리렌더링 X
  // but memo만 설정해서는 안됨 <- props가 원시 타입이 아닌 참조타입이기 때문
  // => Callback으로 감싸줘야함
  console.log("CountButton rendered");

  return (
    <button className="border p-2 rounded-lg" onClick={() => onClick(10)}>
      카운트 증가
    </button>
  );
};

export default memo(CountButton);
