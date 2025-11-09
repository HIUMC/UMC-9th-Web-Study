/**
 * ========================================
 * 마이페이지 (MyPage)
 * ========================================
 *
 * 로그인한 사용자의 프로필 정보를 보여주는 페이지입니다.
 * React Query의 useQuery를 사용하여 사용자 정보를 가져오고,
 * 로딩/에러/빈 상태를 처리합니다.
 *
 * 주요 기능:
 * 1. 사용자 정보 조회 및 표시 (useQuery)
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

import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMyInfo, postLogout } from "../apis/auth";
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

  /**
   * React Query로 사용자 정보 조회
   */
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myInfo"],
    queryFn: async () => {
      // 토큰 확인
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        throw new Error("로그인이 필요합니다.");
      }
      return await getMyInfo();
    },
    retry: 1, // 실패 시 1번만 재시도
  });

  /**
   * 로그아웃 mutation
   */
  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      console.log("로그아웃 성공");
      logout();
      navigate("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      logout();
      navigate("/");
    },
  });

  /**
   * 로그아웃 버튼 클릭 핸들러
   * useMutation을 호출하여 로그아웃 처리
   */
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // 로딩 중: 로딩 화면 표시
  if (isLoading) {
    return <LoadingState />;
  }

  // 에러 발생: 에러 화면 표시
  if (isError) {
    let errorMessage = "사용자 정보를 불러올 수 없습니다. 다시 시도해주세요.";

    // 에러 타입별 처리
    if ((error as any)?.response?.status === 401) {
      errorMessage = "로그인이 만료되었습니다.";
      localStorage.removeItem("accessToken");
      navigate("/login");
    } else if ((error as any)?.response?.status === 404) {
      errorMessage = "사용자 정보를 찾을 수 없습니다.";
    }

    return (
      <ErrorState
        error={errorMessage}
        onRetry={() => refetch()}
        onGoHome={() => navigate("/")}
      />
    );
  }

  // 사용자 정보 없음: 로그인 안내 화면 표시
  if (!response?.data) {
    return <NoUserState onLogin={() => navigate("/login")} />;
  }

  // API 응답 구조에 맞게 데이터 변환
  const userInfo: UserInfo = {
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

  // 정상: 사용자 프로필 표시
  return <UserProfile userInfo={userInfo} />;
}
