import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth";

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
          id: response.id,
          email: response.email,
          name: response.name,
          bio: response.bio || null,
          avatar: response.avatar || null,
          createdAt:
            typeof response.createdAt === "string"
              ? response.createdAt
              : response.createdAt.toISOString(),
          updatedAt:
            typeof response.updatedAt === "string"
              ? response.updatedAt
              : response.updatedAt.toISOString(),
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // useEffect가 다시 실행되도록 강제로 상태 변경
    setUserInfo(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#887bff] mx-auto mb-4"></div>
          <p className="text-gray-600">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            오류가 발생했습니다
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex space-x-3">
            <button
              onClick={handleRetry}
              className="bg-[#887bff] text-white px-6 py-3 rounded-lg hover:bg-[#776eff] transition-colors"
            >
              다시 시도
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              홈으로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            사용자 정보가 없습니다
          </h2>
          <p className="text-gray-600 mb-6">다시 로그인해주세요.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#887bff] text-white px-6 py-3 rounded-lg hover:bg-[#776eff] transition-colors"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-[#887bff] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-white">👤</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                마이페이지
              </h1>
              <p className="text-gray-600">사용자 정보를 확인할 수 있습니다</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  계정 정보
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">이메일:</span>
                    <span className="font-medium">{userInfo.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">닉네임:</span>
                    <span className="font-medium">{userInfo.name}</span>
                  </div>
                  {userInfo.bio && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">소개:</span>
                      <span className="font-medium">{userInfo.bio}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">가입일:</span>
                    <span className="font-medium">
                      {new Date(userInfo.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">최근 수정:</span>
                    <span className="font-medium">
                      {new Date(userInfo.updatedAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  홈으로
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
