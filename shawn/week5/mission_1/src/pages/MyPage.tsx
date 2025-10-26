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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // 네브바 업데이트를 위한 커스텀 이벤트 발생
    window.dispatchEvent(new Event("loginChange"));
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-300">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            오류가 발생했습니다
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="flex space-x-3">
            <button
              onClick={handleRetry}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
            >
              다시 시도
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#2a2a2a] text-gray-300 px-6 py-3 rounded-lg hover:bg-[#3a3a3a] transition-colors"
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            사용자 정보가 없습니다
          </h2>
          <p className="text-gray-300 mb-6">다시 로그인해주세요.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-white">👤</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">마이페이지</h1>
              <p className="text-gray-300">사용자 정보를 확인할 수 있습니다</p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#141416] border border-[#2a2a2a] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  계정 정보
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">이메일:</span>
                    <span className="font-medium text-white">
                      {userInfo.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">닉네임:</span>
                    <span className="font-medium text-white">
                      {userInfo.name}
                    </span>
                  </div>
                  {userInfo.bio && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">소개:</span>
                      <span className="font-medium text-white">
                        {userInfo.bio}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">가입일:</span>
                    <span className="font-medium text-white">
                      {new Date(userInfo.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">최근 수정:</span>
                    <span className="font-medium text-white">
                      {new Date(userInfo.updatedAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 bg-[#2a2a2a] text-gray-300 py-3 rounded-lg font-medium hover:bg-[#3a3a3a] transition-colors"
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
