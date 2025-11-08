/**
 * ========================================
 * 마이페이지 (MyPage)
 * ========================================
 *
 * 로그인한 사용자의 프로필 정보를 보여주는 페이지입니다.
 * 사용자 정보를 서버에서 가져와 표시하고, 로딩/에러/빈 상태를 처리합니다.
 *
 * 주요 기능:
 * 1. 사용자 정보 조회 및 표시
 * 2. 로딩 상태 처리 (LoadingState 컴포넌트)
 * 3. 에러 상태 처리 (ErrorState 컴포넌트)
 * 4. 사용자 정보 없음 처리 (NoUserState 컴포넌트)
 * 5. 로그아웃 기능
 * 6. 홈으로 이동 기능
 *
 * 상태 흐름:
 * 로딩 중 → (성공) → 프로필 표시
 *         → (실패) → 에러 화면
 *         → (데이터 없음) → 로그인 안내
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import LoadingState from "../components/mypage/LoadingState";
import ErrorState from "../components/mypage/ErrorState";
import NoUserState from "../components/mypage/NoUserState";
import UserProfile from "../components/mypage/UserProfile";

/**
 * 사용자 정보 타입 정의
 */
interface UserInfo {
  id: number; // 사용자 고유 ID
  email: string; // 이메일 주소
  name: string; // 사용자 이름
  bio?: string | null; // 자기소개 (옵션)
  avatar?: string | null; // 프로필 이미지 URL (옵션)
  createdAt: string; // 가입 일시
  updatedAt: string; // 마지막 수정 일시
}

/**
 * 마이페이지 컴포넌트
 * 사용자 프로필을 표시하고 관련 액션을 수행할 수 있는 페이지
 */
export default function MyPage() {
  // 라우터 네비게이션 함수
  const navigate = useNavigate();

  // 로그아웃 함수 가져오기
  const { logout } = useAuth();

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 에러 메시지 상태
  const [error, setError] = useState<string | null>(null);

  /**
   * 컴포넌트 마운트 시 사용자 정보 조회 Effect
   * API를 호출하여 사용자 정보를 가져오고 상태를 업데이트합니다.
   */
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. 토큰 확인 (localStorage에 직접 접근)
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        // 2. 사용자 정보 API 호출
        const response = await getMyInfo();
        console.log("사용자 정보:", response);

        // 3. API 응답 구조에 맞게 데이터 변환
        const userData: UserInfo = {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          bio: response.data.bio || null,
          avatar: response.data.avatar || null,
          // Date 객체를 문자열로 변환
          createdAt:
            typeof response.data.createdAt === "string"
              ? response.data.createdAt
              : response.data.createdAt.toISOString(),
          updatedAt:
            typeof response.data.updatedAt === "string"
              ? response.data.updatedAt
              : response.data.updatedAt.toISOString(),
        };

        // 4. 상태 업데이트
        setUserInfo(userData);
      } catch (error: any) {
        console.error("사용자 정보 조회 실패:", error);

        // 에러 타입별 처리
        if (error.response?.status === 401) {
          // 인증 만료: 로그인 페이지로 리다이렉트
          setError("로그인이 만료되었습니다.");
          localStorage.removeItem("accessToken");
          navigate("/login");
        } else if (error.response?.status === 404) {
          // 사용자 없음
          setError("사용자 정보를 찾을 수 없습니다.");
        } else {
          // 기타 에러
          setError("사용자 정보를 불러올 수 없습니다. 다시 시도해주세요.");
        }
      } finally {
        // 로딩 완료
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  /**
   * 로그아웃 버튼 클릭 핸들러
   * 로그아웃 후 홈페이지로 이동
   */
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  /**
   * 재시도 버튼 클릭 핸들러
   * 에러 상태를 초기화하고 다시 데이터를 가져옴
   */
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // useEffect가 다시 실행되도록 강제로 상태 변경
    setUserInfo(null);
  };

  // 로딩 중: 로딩 화면 표시
  if (loading) {
    return <LoadingState />;
  }

  // 에러 발생: 에러 화면 표시
  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={handleRetry}
        onGoHome={() => navigate("/")}
      />
    );
  }

  // 사용자 정보 없음: 로그인 안내 화면 표시
  if (!userInfo) {
    return <NoUserState onLogin={() => navigate("/login")} />;
  }

  // 정상: 사용자 프로필 표시
  return (
    <UserProfile
      userInfo={userInfo}
      onGoHome={() => navigate("/")}
      onLogout={handleLogout}
    />
  );
}
