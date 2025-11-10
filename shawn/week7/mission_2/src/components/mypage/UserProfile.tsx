/**
 * ========================================
 * 사용자 프로필 컴포넌트 (UserProfile)
 * ========================================
 *
 * 마이페이지에서 사용자의 프로필 정보를 표시하는 메인 컴포넌트입니다.
 * 프로필 헤더, 계정 정보, 액션 버튼들을 조합하여 완성된 프로필 UI를 제공합니다.
 */

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProfileEditModal from "./ProfileEditModal";
import { getMyLikedLps, getMyCreatedLps } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";
import LpCardSkeleton from "../LpCardSkeleton";

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
 * UserProfile 컴포넌트의 props 타입
 */
interface UserProfileProps {
  userInfo: UserInfo; // 표시할 사용자 정보
}

/**
 * 사용자 프로필 컴포넌트
 * 마이페이지에서 사용자 정보를 보여주고 관련 액션을 수행할 수 있는 컴포넌트
 *
 * @param userInfo - 표시할 사용자 정보
 */
export default function UserProfile({ userInfo }: UserProfileProps) {
  // 프로필 수정 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 탭 상태: "liked" 또는 "created" (기본: 게시물)
  const [activeTab, setActiveTab] = useState<"liked" | "created">("created");

  // 정렬 상태
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const navigate = useNavigate();

  // 내가 좋아요한 LP 목록
  const { data: likedData, isLoading: isLikedLoading } = useInfiniteQuery({
    queryKey: ["myLikedLps", sortOrder],
    queryFn: ({ pageParam = 0 }) =>
      getMyLikedLps({
        cursor: pageParam,
        limit: 10,
        order:
          sortOrder === "desc" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    initialPageParam: 0,
  });

  // 내가 작성한 LP 목록
  const { data: createdData, isLoading: isCreatedLoading } = useInfiniteQuery({
    queryKey: ["myCreatedLps", sortOrder],
    queryFn: ({ pageParam = 0 }) =>
      getMyCreatedLps({
        cursor: pageParam,
        limit: 10,
        order:
          sortOrder === "desc" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    initialPageParam: 0,
  });

  // 현재 활성 탭에 따른 데이터
  const currentData = activeTab === "liked" ? likedData : createdData;
  const isLoading = activeTab === "liked" ? isLikedLoading : isCreatedLoading;

  // 모든 페이지의 LP 데이터를 하나의 배열로 합치기
  const allLps = currentData?.pages.flatMap((page) => page.data.data) ?? [];

  // 통계용 - 내가 작성한 LP 개수
  const myCreatedLpsCount =
    createdData?.pages.flatMap((page) => page.data.data).length ?? 0;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 인스타그램 스타일 프로필 헤더 */}
          <div className="flex items-start gap-8 mb-8">
            {/* 프로필 사진 */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                {userInfo.avatar ? (
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl text-white">
                    {userInfo.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* 프로필 정보 */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-2xl font-light text-white">
                  {userInfo.name}
                </h1>
                {/* 설정 아이콘 - 원래 버전 */}
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  title="프로필 수정"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                </button>
              </div>

              {/* 통계 */}
              <div className="flex gap-8 mb-4">
                <div>
                  <span className="text-white font-semibold">
                    {myCreatedLpsCount}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">게시물</span>
                </div>
              </div>

              {/* 이메일 */}
              <div className="space-y-1">
                <p className="text-gray-300 text-sm">{userInfo.email}</p>
                {userInfo.bio && (
                  <p className="text-gray-300 text-sm">{userInfo.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="border-t border-[#2a2a2a]">
            <div className="flex gap-0">
              <button
                onClick={() => setActiveTab("created")}
                className={`flex-1 py-3 font-medium text-xs tracking-wider transition-colors border-t-2 ${
                  activeTab === "created"
                    ? "text-white border-white"
                    : "text-gray-400 hover:text-white border-transparent"
                }`}
              >
                작성한 LP
              </button>
              <button
                onClick={() => setActiveTab("liked")}
                className={`flex-1 py-3 font-medium text-xs tracking-wider transition-colors border-t-2 ${
                  activeTab === "liked"
                    ? "text-white border-white"
                    : "text-gray-400 hover:text-white border-transparent"
                }`}
              >
                좋아요한 LP
              </button>
            </div>
          </div>

          {/* 정렬 버튼 */}
          <div className="flex justify-end gap-2 px-4 py-3 border-b border-[#2a2a2a]">
            <button
              onClick={() => setSortOrder("desc")}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
                sortOrder === "desc"
                  ? "bg-pink-500 text-white"
                  : "bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
                sortOrder === "asc"
                  ? "bg-pink-500 text-white"
                  : "bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
              }`}
            >
              오래된순
            </button>
          </div>

          {/* LP 목록 */}
          <div className="mt-6">
            {isLoading ? (
              // 로딩 스켈레톤
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <LpCardSkeleton key={i} />
                ))}
              </div>
            ) : allLps.length > 0 ? (
              // LP 카드 목록
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allLps.map((lp) => (
                  <div
                    key={lp.id}
                    onClick={() => navigate(`/lp/${lp.id}`)}
                    className="bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-500 transition-all"
                  >
                    <div className="aspect-square">
                      <img
                        src={lp.thumbnail}
                        alt={lp.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium text-lg mb-2 line-clamp-1">
                        {lp.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {lp.content}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-pink-500 text-sm">
                          ❤️ {lp.likes?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 빈 상태
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg mb-2">
                  {activeTab === "liked"
                    ? "좋아요한 LP가 없습니다."
                    : "작성한 LP가 없습니다."}
                </p>
                <p className="text-sm">
                  {activeTab === "liked"
                    ? "마음에 드는 LP에 좋아요를 눌러보세요!"
                    : "첫 LP를 작성해보세요!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 프로필 수정 모달 */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUserInfo={userInfo}
      />
    </div>
  );
}
