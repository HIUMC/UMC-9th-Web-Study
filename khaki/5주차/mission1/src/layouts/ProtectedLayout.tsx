// <privateRoutes들의 레이아웃 컴포넌트>
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const {accessToken} = useAuth();

  // accessToken이 없으면 로그인 페이지로 이동
  if(!accessToken){
    return <Navigate to={"/login"} replace/>;
  }

  // accessToken이 있으면 자식 컴포넌트 렌더링
  return <Outlet/>
}

export default ProtectedLayout

// <Navigate />: 렌더링되면 즉시 지정한 URL로 리다이렉트(redirect) 시킴, 굳이 페이지 전체 새로고침할 필요 없이 SPA 내에서 경로 이동 가능
// replace 속성: 현재 기록을 새 기록으로 대체하여 사용자가 뒤로 가기 버튼을 눌러 이전 페이지로 돌아가지 못하게 함
