export default function ProfileHeader() {
  return (
    <div className="text-center mb-8">
      <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl text-white">👤</span>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">마이페이지</h1>
      <p className="text-gray-300">사용자 정보를 확인할 수 있습니다</p>
    </div>
  );
}
