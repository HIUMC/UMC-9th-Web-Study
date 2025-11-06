import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import LoadingState from "../components/mypage/LoadingState";
import ErrorState from "../components/mypage/ErrorState";
import NoUserState from "../components/mypage/NoUserState";
import UserProfile from "../components/mypage/UserProfile";

interface UserInfo {
  id: number;
  email: string;
  name: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function MyPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        // 토큰 확인
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        const response = await getMyInfo();
        console.log("사용자 정보:", response);

        // API 응답 구조에 맞게 데이터 변환
        const userData: UserInfo = {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          bio: response.data.bio || null,
          avatar: response.data.avatar || null,
          createdAt:
            typeof response.data.createdAt === "string"
              ? response.data.createdAt
              : response.data.createdAt.toISOString(),
          updatedAt:
            typeof response.data.updatedAt === "string"
              ? response.data.updatedAt
              : response.data.updatedAt.toISOString(),
        };

        setUserInfo(userData);
      } catch (error: any) {
        console.error("사용자 정보 조회 실패:", error);

        if (error.response?.status === 401) {
          setError("로그인이 만료되었습니다.");
          localStorage.removeItem("accessToken");
          navigate("/login");
        } else if (error.response?.status === 404) {
          setError("사용자 정보를 찾을 수 없습니다.");
        } else {
          setError("사용자 정보를 불러올 수 없습니다. 다시 시도해주세요.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // useEffect가 다시 실행되도록 강제로 상태 변경
    setUserInfo(null);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={handleRetry}
        onGoHome={() => navigate("/")}
      />
    );
  }

  if (!userInfo) {
    return <NoUserState onLogin={() => navigate("/login")} />;
  }

  return (
    <UserProfile
      userInfo={userInfo}
      onGoHome={() => navigate("/")}
      onLogout={handleLogout}
    />
  );
}
