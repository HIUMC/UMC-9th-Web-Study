import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            환영합니다! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            간편하고 안전한 회원가입과 로그인 시스템을 경험해보세요. 다단계
            회원가입 프로세스로 더욱 사용자 친화적인 서비스를 제공합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="bg-[#887bff] text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#776eff] transition-colors shadow-lg"
            >
              회원가입 시작하기
            </Link>
            <Link
              to="/login"
              className="bg-white text-[#887bff] px-8 py-4 rounded-lg font-medium text-lg border-2 border-[#887bff] hover:bg-[#887bff] hover:text-white transition-colors shadow-lg"
            >
              로그인
            </Link>
          </div>
        </div>

        {/* 기능 소개 섹션 */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-2">이메일 검증</h3>
            <p className="text-gray-600">
              정확한 이메일 형식을 검증하여 안전한 계정 생성을 보장합니다.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">보안 비밀번호</h3>
            <p className="text-gray-600">
              강력한 비밀번호 정책과 재확인 기능으로 계정 보안을 강화합니다.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-2">개인화 설정</h3>
            <p className="text-gray-600">
              사용자 정의 닉네임과 프로필 설정으로 개인화된 경험을 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
