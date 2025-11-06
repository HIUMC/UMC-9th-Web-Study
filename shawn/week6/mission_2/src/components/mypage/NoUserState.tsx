interface NoUserStateProps {
  onLogin: () => void;
}

export default function NoUserState({ onLogin }: NoUserStateProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          사용자 정보가 없습니다
        </h2>
        <p className="text-gray-300 mb-6">다시 로그인해주세요.</p>
        <button
          onClick={onLogin}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
