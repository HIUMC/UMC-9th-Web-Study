interface UserInfo {
  id: number;
  email: string;
  name: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AccountInfoProps {
  userInfo: UserInfo;
}

export default function AccountInfo({ userInfo }: AccountInfoProps) {
  return (
    <div className="bg-[#141416] border border-[#2a2a2a] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">계정 정보</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">이메일:</span>
          <span className="font-medium text-white">{userInfo.email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">닉네임:</span>
          <span className="font-medium text-white">{userInfo.name}</span>
        </div>
        {userInfo.bio && (
          <div className="flex justify-between items-center">
            <span className="text-gray-300">소개:</span>
            <span className="font-medium text-white">{userInfo.bio}</span>
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
  );
}
