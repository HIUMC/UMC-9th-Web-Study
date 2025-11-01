import "./App.css";
import { useCustomFetch } from "./hooks/useCustomFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

export 

function AppBefore() {
  const { data, isPending, isError } = useCustomFetch<User>(
    "http://jsonplaceholder.typicode.com/users/1"
  );

  console.log(isPending);
  // 문제 : 로딩 상태에 대한 정의가 없음
  // 로딩이 왜 중요하지? 데이터 자체가 엄청 크다고 할 때 바로 렌더링이 안됨
  // 유저 입장에서 데이터를 받아오기까지 "기다려야 하는구나"라는 걸 알려줘야함.

  if (isPending) {
    return <div>Loading...</div>;
  }

  // 에러가 발생했을 때 사용자들 입장에서 상황을 전혀 모르기 때문에
  // 에러 처리를 해줘야 함.
  if (isError) {
    return <div>응 에러야 고쳐...</div>;
  }

  return (
    <>
      <h1>Tanstack Query</h1>
      {data?.name}
      {/* useEffect의 경우 데이터가 없음 -> 렌더링 때 깨짐 => optional로 달면 undefined를 반환하고 리렌더링 실행, 즉 이때 실제 데이터 렌더링*/}
    </>
  );
}

// 위의 코드의 문제점
// 1. 계속 네트워크 요청이 발생함.
// 블로그 예시 : 한 번 방문한 페이지는 네트워크 요청을 하지 않음 -> SSR 방식
// 한 번 받았고 잘 안바뀌는 데이터들은 불필요한 네트워크 요청을 줄여야함 -> 오버헤드 문제
// -> StaleTime 개념을 도입하여 Query key 방식을 사용하는 캐싱 시스템 사용

export default AppBefore;
