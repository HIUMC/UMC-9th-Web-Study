import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    const location = useLocation();

    // 로그인 해야만 mypage접근 가능
    if(!accessToken){
        return <Navigate to ={"/login"} state={{location}} replace /> // replace : 뒤로가기 히스토리가 안남음
    }

    return <Outlet />;
};

export default ProtectedLayout
