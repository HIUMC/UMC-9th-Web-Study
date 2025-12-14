import { memo } from "react";

interface ICountButton {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
  console.log("CountButton 렌더링됨");

  return (
    <button
      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      onClick={(): void => onClick(10)}
    >
      카운트 증가
    </button>
  );
};

// memo: props가 바뀌지 않으면 리렌더링을 안함
export default memo(CountButton);
