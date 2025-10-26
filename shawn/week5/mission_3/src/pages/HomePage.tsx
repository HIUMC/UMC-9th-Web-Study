export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">돌려돌려LP판</h1>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            간편하고 안전한 로그인/회원가입을 경험하세요.
          </p>
          {/* CTA는 네브바로 이동 */}
        </div>

        {/* 기능 소개 섹션 */}
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-6">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-lg font-semibold mb-1">이메일 검증</h3>
            <p className="text-gray-400 text-sm">
              정확한 이메일 형식 검사로 안전한 계정 생성을 보장합니다.
            </p>
          </div>

          <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-6">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-lg font-semibold mb-1">보안 비밀번호</h3>
            <p className="text-gray-400 text-sm">
              길이·일치 여부 검사를 통해 계정 보안을 강화합니다.
            </p>
          </div>

          <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-6">
            <div className="text-3xl mb-3">👤</div>
            <h3 className="text-lg font-semibold mb-1">개인화 설정</h3>
            <p className="text-gray-400 text-sm">
              닉네임 설정으로 나만의 프로필을 완성하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
