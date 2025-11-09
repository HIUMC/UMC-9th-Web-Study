/**
 * ========================================
 * 로그인 페이지 (LoginPage)
 * ========================================
 *
 * 사용자 로그인을 처리하는 페이지입니다.
 * 2단계 폼 UI로 구성되어 있습니다:
 * - 1단계: 이메일 입력 및 구글 로그인 옵션
 * - 2단계: 비밀번호 입력 및 로그인
 *
 * 주요 기능:
 * 1. 일반 이메일/비밀번호 로그인
 * 2. 구글 OAuth 로그인
 * 3. 실시간 유효성 검사 (이메일 형식, 비밀번호 길이)
 * 4. 로그인 후 리다이렉트 (이전 페이지 또는 마이페이지)
 * 5. 이미 로그인된 경우 자동 홈으로 이동
 * 6. 비밀번호 보기/숨기기 토글
 *
 * 사용자 경험 (UX):
 * - 단계별 폼으로 입력 부담 감소
 * - 실시간 에러 피드백
 * - 버튼 활성화/비활성화로 유효성 상태 표시
 */

import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

/**
 * 로그인 페이지 컴포넌트
 * 2단계 로그인 폼을 렌더링하고 로그인 로직을 처리
 */
export default function LoginPage() {
  // 인증 컨텍스트에서 accessToken 가져오기
  const { accessToken } = useAuth();

  // 라우터 네비게이션 함수
  const navigate = useNavigate();

  // localStorage 관리 훅
  const { setItem: setAccessTokenInStorage } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshTokenInStorage } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  /**
   * 이미 로그인된 경우 홈으로 리다이렉트하는 Effect
   * 로그인된 상태에서 로그인 페이지에 접근 방지
   */
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  // 비밀번호 표시/숨김 토글 상태
  const [showPassword, setShowPassword] = useState(false);

  // 로그인 폼 단계 (1: 이메일, 2: 비밀번호)
  const [step, setStep] = useState<1 | 2>(1);

  // useForm 훅으로 폼 상태 관리
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: { email: "", password: "" },
      validate: validateSignin, // 유효성 검사 함수
    });

  /**
   * 로그인 mutation
   */
  const loginMutation = useMutation({
    mutationFn: postSignin,
    onSuccess: (response) => {
      console.log("로그인 성공:", response);

      // 토큰 저장 (useLocalStorage 사용)
      setAccessTokenInStorage(response.data.accessToken);
      setRefreshTokenInStorage(response.data.refreshToken);

      // 페이지 새로고침하여 AuthContext가 토큰을 읽을 수 있게 함 (홈으로 이동)
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    },
  });

  /**
   * 로그인 제출 핸들러
   * useMutation을 호출하여 로그인 처리
   */
  const handleSubmit = () => {
    loginMutation.mutate(values);
  };

  /**
   * 구글 로그인 버튼 클릭 핸들러
   * 서버의 구글 OAuth 로그인 엔드포인트로 리다이렉트
   */
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  /**
   * 1단계 '다음' 버튼 비활성화 여부
   * 이메일이 비어있거나 유효성 검사 에러가 있으면 비활성화
   */
  const isNextDisabled = useMemo(() => {
    return !values.email || Boolean(errors?.email);
  }, [values.email, errors]);

  /**
   * 2단계 '로그인' 버튼 비활성화 여부
   * 비밀번호가 비어있거나 이메일/비밀번호 에러가 있거나 로딩 중이면 비활성화
   */
  const isLoginDisabled = useMemo(() => {
    return (
      !values.password ||
      Boolean(errors?.password) ||
      Boolean(errors?.email) ||
      loginMutation.isPending
    );
  }, [values.password, errors, loginMutation.isPending]);
  // JSX 렌더링
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-sm">
        {/* ==================== 상단 바 & 뒤로 가기 ==================== */}
        <div className="flex items-center mb-4">
          {/* 뒤로 가기 버튼: 1단계면 이전 페이지로, 2단계면 1단계로 */}
          <button
            aria-label="go-back"
            onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
            className="text-2xl mr-2"
          >
            &lt;
          </button>
          <h1 className="text-xl font-semibold">로그인</h1>
        </div>

        {/* ==================== 로그인 폼 카드 ==================== */}
        <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-5 space-y-5">
          {/* 1단계: 이메일 입력 및 구글 로그인 */}
          {step === 1 && (
            <>
              {/* 구글 로그인 버튼 */}
              <button
                className="w-full h-11 rounded-lg border border-[#3a3a3a] flex items-center justify-center gap-2 hover:bg-[#141416]"
                type="button"
                onClick={handleGoogleLogin}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={"/images/google.png"}
                    alt="google"
                    className="w-5 h-5"
                  />
                  <span>구글 로그인</span>
                </div>
              </button>

              {/* 이메일 입력 필드 */}
              <div>
                <input
                  type="email"
                  placeholder="이메일"
                  {...getInputProps("email")}
                  className={`w-full h-10 px-3 rounded-md bg-[#141416] border ${
                    errors?.email && touched?.email
                      ? "border-red-500" // 에러 시 빨간 테두리
                      : "border-[#2a2a2a]" // 기본 테두리
                  } focus:outline-none`}
                />
                {/* 이메일 에러 메시지 (터치된 후에만 표시) */}
                {errors?.email && touched?.email && (
                  <p className="mt-2 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* 다음 버튼 (이메일 유효성 검사 통과 시 활성화) */}
              <button
                onClick={() => setStep(2)}
                disabled={isNextDisabled}
                className={`w-full h-11 rounded-md font-medium ${
                  isNextDisabled
                    ? "bg-[#2a2a2a] text-gray-500" // 비활성 상태
                    : "bg-pink-500 hover:bg-pink-600" // 활성 상태
                }`}
              >
                다음
              </button>
            </>
          )}

          {/* 2단계: 비밀번호 입력 및 로그인 */}
          {step === 2 && (
            <>
              {/* 입력한 이메일 표시 */}
              <div className="text-sm text-gray-300">{values.email}</div>

              {/* 비밀번호 입력 필드 */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호"
                    {...getInputProps("password")}
                    className={`w-full h-10 pr-10 px-3 rounded-md bg-[#141416] border ${
                      errors?.password && touched?.password
                        ? "border-red-500" // 에러 시 빨간 테두리
                        : "border-[#2a2a2a]" // 기본 테두리
                    } focus:outline-none`}
                  />
                  {/* 비밀번호 보기/숨기기 토글 버튼 */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {/* 비밀번호 에러 메시지 */}
                {errors?.password && touched?.password && (
                  <p className="mt-2 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* 로그인 버튼 (모든 유효성 검사 통과 시 활성화) */}
              <button
                onClick={handleSubmit}
                disabled={isLoginDisabled}
                className={`w-full h-11 rounded-md font-medium ${
                  isLoginDisabled
                    ? "bg-[#2a2a2a] text-gray-500" // 비활성 상태
                    : "bg-pink-500 hover:bg-pink-600" // 활성 상태
                }`}
              >
                {loginMutation.isPending ? "로그인 중..." : "로그인"}
              </button>
            </>
          )}

          {/* 회원가입 링크 */}
          <p className="text-center text-sm text-gray-300">
            계정이 없으신가요?{" "}
            <Link className="text-pink-400 hover:text-pink-300" to="/signup">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
