import { useEffect, useState } from "react";

export const Parent = () => {
  const [visible, setVisible] = useState(false);

  return(
    <>
      <h1>카운터 페이지</h1>
      <button onClick={() => {setVisible(!visible)}}>{visible? "숨기기" : "보이기"}</button>
      {visible && <Child/>}
    </>
  )
}

const Child = () => {
  useEffect(() => {
    let i = 0;
    const counterInterval = setInterval(()=>{
      console.log("number : " + i);
      i++;
    }, 1000);

    return () => {
      console.log("언마운트 됨");
      clearInterval(counterInterval);
    }
  }, [])

  return  (
    <div>
      Child
    </div>
  )
}

