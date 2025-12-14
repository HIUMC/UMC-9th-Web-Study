import { memo } from "react";

interface ICountButton {
    onClick : (count : number) => void;
}

const Countbutton = ({onClick} : ICountButton) => {
    console.log("CountButton rendered")
    return <button className="border p-2 rounded-lg" onClick={() => onClick(10)}>카운트 증가</button>
};

// export default Countbutton; text, count 중 하나의 상태만 변경되어도 둘다 렌더링

export default memo(Countbutton); // props의 값이 동일하면 컴포넌트 리렌더링 X 
// 함수는 참조 => 함수로 넘겨주면 리렌더링됨 =>> useCallback 사용!
