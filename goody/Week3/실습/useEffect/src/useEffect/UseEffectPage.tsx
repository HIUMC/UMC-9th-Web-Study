import { useEffect, useState } from "react"

export default function UseEffectPage() {
    const [count, setCount] = useState(0);

    const handleIncrease = () => {
        setCount((prev): number => prev + 1);
        console.log('setState',count);
    };
//useEffect((): void => 
// {실행하고 싶은 코드}, [의존성 배열(depency array)])
useEffect(() : void => {
    // 실행하고 싶은 코드
    console.log(count);

    // (optional) return function
    // clean up function
    return () => {
        console.log('청소하는 함수입니다');
    };

    // 의존성 배열 (dependency array) 
}, [count]);
    

    return (
    
    <div>
        <h3>UseEffectPage</h3>
        <h3>{count}</h3>
        <button onClick={handleIncrease}>증가</button>
    </div>
    

    )
}
