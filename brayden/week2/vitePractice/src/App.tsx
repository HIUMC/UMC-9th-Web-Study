import "./App.css";
import List, { type Tech } from "./components/List";

function App() {
  const nickname = "매튜";
  const sweetPotato = "고구마";
  const array = [
    "REACT",
    "NEXT",
    "VUE",
    "SVELTE",
    "ANGULAR",
    "REACT-NATIVE",
  ] as const;
  // 리터럴 타입으로 고정하라 -> array는 ["REACT", "NEXT", "VUE", "SVELTE", "ANGULAR", "REACT-NATIVE"] 중 하나다

  return (
    <>
      <strong className="school">상명대학교</strong>
      <p style={{ color: "purple", fontWeight: "bold", fontSize: "3rem" }}>
        {nickname}/김용민
      </p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
      <ul>
        {array.map((yaho, idx) => (
          // <li key={idx}>{yaho}</li>
          // as를 통한 타입 선언 -> yaho는 Tech 타입이다!
          // 다른 문자열이 들어가도 타입체크가 무력화 -> 많이 쓰지말자.
          <List key={idx} tech={yaho as Tech} />
        ))}
      </ul>
    </>
  );
}

export default App;
