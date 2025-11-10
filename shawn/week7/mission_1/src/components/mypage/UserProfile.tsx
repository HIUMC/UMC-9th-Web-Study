/**
 * ========================================
 * 사용자 프로필 컴포넌트 (UserProfile)
 * ========================================
 *
 * 마이페이지에서 사용자의 프로필 정보를 표시하는 메인 컴포넌트입니다.
 * 프로필 헤더, 계정 정보, 액션 버튼들을 조합하여 완성된 프로필 UI를 제공합니다.
 */

import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import AccountInfo from "./AccountInfo";
import ActionButtons from "./ActionButtons";
import ProfileEditModal from "./ProfileEditModal";

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
  onGoHome: () => void; // 홈으로 이동하는 함수
  onLogout: () => void; // 로그아웃 함수
}

/**
 * 사용자 프로필 컴포넌트
 * 마이페이지에서 사용자 정보를 보여주고 관련 액션을 수행할 수 있는 컴포넌트
 *
 * @param userInfo - 표시할 사용자 정보
 * @param onGoHome - 홈으로 이동 버튼 클릭 핸들러
 * @param onLogout - 로그아웃 버튼 클릭 핸들러
 */
export default function UserProfile({
  userInfo,
  onGoHome,
  onLogout,
}: UserProfileProps) {
  // 프로필 수정 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-8">
            {/* 프로필 헤더: 아이콘, 제목, 설정 버튼 */}
            <ProfileHeader
              onEditClick={() => setIsEditModalOpen(true)}
              avatar={userInfo.avatar}
            />

            <div className="space-y-6">
              {/* 계정 정보 섹션: 이메일, 이름, 가입일 등 */}
              <AccountInfo userInfo={userInfo} />

              {/* 액션 버튼들: 홈으로, 로그아웃 */}
              <ActionButtons onGoHome={onGoHome} onLogout={onLogout} />
            </div>
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
