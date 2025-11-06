import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { useAuth } from "../context/AuthContext";

export default function LpDetailPage() {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { data, isLoading, error, refetch } = useGetLpDetail(lpId || "");
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // 비로그인 사용자 체크
  useEffect(() => {
    if (!accessToken) {
      const shouldLogin = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
      );
      if (shouldLogin) {
        // 현재 경로를 저장하고 로그인 페이지로 이동
        sessionStorage.setItem("redirectPath", window.location.pathname);
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [accessToken, navigate]);

  // 데이터 로드 시 좋아요 수 초기화
  useEffect(() => {
    if (data?.data) {
      setLikesCount(data.data.likes?.length || 0);
    }
  }, [data]);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "오늘";
    if (days === 1) return "1일 전";
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    if (days < 365) return `${Math.floor(days / 30)}개월 전`;
    return `${Math.floor(days / 365)}년 전`;
  };

  const handleEdit = () => {
    // 수정 페이지로 이동 (추후 구현)
    navigate(`/lp/${lpId}/edit`);
  };

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      // 삭제 API 호출 (추후 구현)
      alert("삭제 기능은 추후 구현 예정입니다.");
    }
  };

  const handleLike = () => {
    // 좋아요 토글
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
    // 실제 API 호출은 추후 구현
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            {/* 헤더 스켈레톤 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full" />
                <div className="h-4 w-20 bg-[#1a1a1a] rounded" />
              </div>
              <div className="h-4 w-16 bg-[#1a1a1a] rounded" />
            </div>
            {/* 제목 스켈레톤 */}
            <div className="h-8 w-64 bg-[#1a1a1a] rounded mb-8" />
            {/* 이미지 스켈레톤 */}
            <div className="w-full max-w-2xl mx-auto aspect-square bg-[#1a1a1a] rounded-full mb-8" />
            {/* 본문 스켈레톤 */}
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-[#1a1a1a] rounded w-full" />
              <div className="h-4 bg-[#1a1a1a] rounded w-5/6" />
              <div className="h-4 bg-[#1a1a1a] rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !data) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="text-red-400 text-center">
              <p className="text-lg font-medium mb-2">
                LP를 불러올 수 없습니다
              </p>
              <p className="text-sm text-gray-400">
                {error ? String(error) : "데이터를 찾을 수 없습니다"}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => refetch()}
                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors"
              >
                다시 시도
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-md transition-colors"
              >
                목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const lp = data.data;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더: 작성자 정보와 시간 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
              {lp.authorId}
            </div>
            <span className="text-gray-300 font-medium">오타니안</span>
          </div>
          <span className="text-sm text-gray-400">
            {formatDate(lp.createdAt)}
          </span>
        </div>

        {/* 제목과 액션 버튼 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">{lp.title}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="수정"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              aria-label="삭제"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6H5H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* LP 이미지 */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="aspect-square rounded-full overflow-hidden bg-[#1a1a1a] border-4 border-[#2a2a2a]">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=No+Image";
              }}
            />
          </div>
        </div>

        {/* 본문 */}
        <div className="mb-8">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {lp.content}
          </p>
        </div>

        {/* 태그 */}
        {lp.tags && lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {lp.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1.5 bg-[#1a1a1a] text-gray-300 text-sm rounded-full hover:bg-[#2a2a2a] transition-colors cursor-pointer"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* 좋아요 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              isLiked
                ? "bg-pink-500 text-white"
                : "bg-[#1a1a1a] text-pink-500 hover:bg-pink-500 hover:text-white"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-lg font-semibold">{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

