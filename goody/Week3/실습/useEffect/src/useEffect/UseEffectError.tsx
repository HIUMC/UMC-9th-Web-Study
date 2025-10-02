import { useEffect, useState } from "react"

export default function UseEffectError() {
    const [counter,setCounter] = useState(0);

    const handleIncrease = () => {
        setCounter((counter)=>counter + 1);
    }

    useEffect(()=> {
        // 1 . 초기 렌더링 시작
        setCounter((counter)=> counter + 1) //useEffect안에서 업데이트하는 function을 dependency array 없이 호출 하면 안됨.

        // 2.counter 값이 변경될 때 마다 실행 => 무한 렌더링 
    },[counter])



    return (
        <div onClick={handleIncrease}>{counter}</div>    
    )
}
