import { memo } from "react";

interface ICountButton {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
  console.log("CountButton 렌더링됨");
  return (
    <button className="border p-2" onClick={() => onClick(10)}>
      Count 10 증가
    </button>
  );
};

export default memo(CountButton);
