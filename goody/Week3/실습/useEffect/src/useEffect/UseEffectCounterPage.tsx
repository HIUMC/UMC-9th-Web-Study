import { useEffect, useState } from "react";

export default function UseEffectCounterPage() {
    
    const [visible,setVisible] = useState(false);

    return (
        <>
            <h1>같이 배우는 리액트 #2 useEffect</h1>
            <button onClick={()=> setVisible(!visible)}>
                    {visible ? '숨기기' : '보이기'}
            </button>
            {visible && <Child />}
        </>
    )
}

export function Child(){
    useEffect(()=> { // cleanup function 안쓰면 계속 쌓이면서 메모리 소모함
        let i = 0;
        const countInterval = setInterval(()=> {
            console.log('Number =>' + i);
            i++
        }, 1_000);

        return () => { 
            console.log('언마운트 될 때 실행됩니다.');
            clearInterval(countInterval) // clean up 함수!
        }
    }, []);

    return <div className="mt-20 text-4xl">Child</div>
}
