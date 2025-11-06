import ProfileHeader from "./ProfileHeader";
import AccountInfo from "./AccountInfo";
import ActionButtons from "./ActionButtons";

interface UserInfo {
  id: number;
  email: string;
  name: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserProfileProps {
  userInfo: UserInfo;
  onGoHome: () => void;
  onLogout: () => void;
}

export default function UserProfile({
  userInfo,
  onGoHome,
  onLogout,
}: UserProfileProps) {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-8">
            <ProfileHeader />

            <div className="space-y-6">
              <AccountInfo userInfo={userInfo} />
              <ActionButtons onGoHome={onGoHome} onLogout={onLogout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
