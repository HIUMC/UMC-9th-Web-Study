/**
 * ========================================
 * 계정 정보 컴포넌트 (AccountInfo)
 * ========================================
 *
 * 사용자의 계정 정보를 표시하는 컴포넌트입니다.
 * 이메일, 닉네임, 자기소개, 가입일, 최근 수정일을 표시합니다.
 */

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
 * AccountInfo 컴포넌트의 props 타입
 */
interface AccountInfoProps {
  userInfo: UserInfo; // 표시할 사용자 정보
}

/**
 * 계정 정보 컴포넌트
 * 사용자의 상세 정보를 보기 좋게 정리하여 표시
 *
 * @param userInfo - 표시할 사용자 정보
 */
export default function AccountInfo({ userInfo }: AccountInfoProps) {
  return (
    <div className="bg-[#141416] border border-[#2a2a2a] rounded-lg p-6">
      {/* 섹션 제목 */}
      <h3 className="text-lg font-semibold text-white mb-4">계정 정보</h3>

      {/* 정보 목록 */}
      <div className="space-y-3">
        {/* 이메일 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300">이메일:</span>
          <span className="font-medium text-white">{userInfo.email}</span>
        </div>

        {/* 닉네임 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300">닉네임:</span>
          <span className="font-medium text-white">{userInfo.name}</span>
        </div>

        {/* 자기소개 (있는 경우에만 표시) */}
        {userInfo.bio && (
          <div className="flex justify-between items-center">
            <span className="text-gray-300">소개:</span>
            <span className="font-medium text-white">{userInfo.bio}</span>
          </div>
        )}

        {/* 가입일 (한국어 날짜 형식으로 변환) */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300">가입일:</span>
          <span className="font-medium text-white">
            {new Date(userInfo.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>

        {/* 최근 수정일 (한국어 날짜 형식으로 변환) */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300">최근 수정:</span>
          <span className="font-medium text-white">
            {new Date(userInfo.updatedAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
    </div>
  );
}
