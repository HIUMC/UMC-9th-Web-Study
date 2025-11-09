/**
 * ========================================
 * 회원가입 페이지 (SignupPage)
 * ========================================
 *
 * 새로운 사용자 계정을 생성하는 페이지입니다.
 * 3단계 폼 UI로 구성되어 있습니다:
 * - 1단계: 이메일 입력
 * - 2단계: 비밀번호 및 비밀번호 확인 입력
 * - 3단계: 닉네임 입력 및 회원가입 완료
 *
 * 주요 기능:
 * 1. 단계별 폼 유효성 검사
 * 2. 실시간 에러 피드백
 * 3. 비밀번호 보기/숨기기 토글
 * 4. 각 단계 간 데이터 유지
 * 5. 회원가입 완료 후 자동 로그인 페이지로 이동
 *
 * 유효성 검사:
 * - 이메일: 올바른 이메일 형식
 * - 비밀번호: 6자 이상
 * - 비밀번호 확인: 비밀번호와 일치
 * - 닉네임: 2자 이상
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";

/**
 * 회원가입 폼 데이터 타입
 */
interface SignupData {
  email: string; // 이메일
  password: string; // 비밀번호
  passwordCheck: string; // 비밀번호 확인
  name: string; // 닉네임
}

/**
 * 회원가입 페이지 컴포넌트
 * 3단계 폼을 통해 사용자 등록을 처리
 */
export default function SignupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  });
  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "이메일을 입력해주세요.";
    if (!emailRegex.test(email)) return "올바른 이메일 형식을 입력해주세요.";
    return "";
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    if (!password) return "비밀번호를 입력해주세요.";
    if (password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    return "";
  };

  // 비밀번호 확인 검사
  const validatePasswordCheck = (passwordCheck: string) => {
    if (!passwordCheck) return "비밀번호 확인을 입력해주세요.";
    if (passwordCheck !== formData.password)
      return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  // 닉네임 유효성 검사
  const validateName = (name: string) => {
    if (!name.trim()) return "닉네임을 입력해주세요.";
    return "";
  };

  // 입력값 업데이트 (실시간 유효성 반영)
  const updateFormData = (field: keyof SignupData, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };

      // 실시간 에러 갱신
      setErrors((prevErrors) => {
        const updated: Partial<SignupData> = { ...(prevErrors || {}) };

        if (field === "email") {
          updated.email = validateEmail(next.email);
        }
        if (field === "password") {
          updated.password = validatePassword(next.password);
          // 비밀번호가 바뀌면 재확인도 다시 검증
          updated.passwordCheck = validatePasswordCheck(next.passwordCheck);
        }
        if (field === "passwordCheck") {
          updated.passwordCheck = validatePasswordCheck(next.passwordCheck);
        }
        if (field === "name") {
          updated.name = validateName(next.name);
        }
        return updated as Record<string, string>;
      });

      return next;
    });
  };

  // 다음 단계로 이동
  const handleNext = () => {
    let newErrors: Partial<SignupData> = {};

    if (currentStep === 1) {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        newErrors.email = emailError;
      }
    } else if (currentStep === 2) {
      const passwordError = validatePassword(formData.password);
      const passwordCheckError = validatePasswordCheck(formData.passwordCheck);

      if (passwordError) newErrors.password = passwordError;
      if (passwordCheckError) newErrors.passwordCheck = passwordCheckError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  // 이전 단계로 이동
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // 회원가입 완료
  const handleSubmit = async () => {
    const nameError = validateName(formData.name);
    if (nameError) {
      setErrors({ name: nameError });
      return;
    }

    setIsSubmitting(true);
    try {
      const { passwordCheck, ...signupData } = formData;
      const response = await postSignup(signupData);
      console.log("회원가입 성공:", response);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      if (error.response?.status === 409) {
        alert("이미 존재하는 이메일입니다.");
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 단계별 버튼 활성화 조건
  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !formData.email || !!validateEmail(formData.email);
    } else if (currentStep === 2) {
      return (
        !formData.password ||
        !formData.passwordCheck ||
        !!validatePassword(formData.password) ||
        !!validatePasswordCheck(formData.passwordCheck)
      );
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-sm">
        {/* 상단 바 & 뒤로가기 */}
        <div className="flex items-center mb-4">
          <button
            aria-label="go-back"
            onClick={() => (currentStep === 1 ? navigate(-1) : handlePrev())}
            className="text-2xl mr-2"
          >
            &lt;
          </button>
          <h1 className="text-xl font-semibold">회원가입</h1>
        </div>

        {/* 카드 */}
        <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-5">
          {/* 진행 단계 표시 */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-3">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                    step <= currentStep
                      ? "bg-pink-500 text-white"
                      : "bg-[#1c1c1e] text-gray-400"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* 1단계: 이메일 입력 */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-center mb-2">
                  이메일을 입력해주세요
                </h2>
                <p className="text-gray-400 text-center">
                  회원가입에 사용할 이메일을 입력해주세요
                </p>
              </div>

              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={`w-full h-10 px-3 rounded-md bg-[#141416] border ${
                    errors.email ? "border-red-500" : "border-[#2a2a2a]"
                  } focus:outline-none`}
                  placeholder="이메일을 입력해주세요"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={`w-full h-11 rounded-md font-medium ${
                  isNextDisabled()
                    ? "bg-[#2a2a2a] text-gray-500"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                다음
              </button>
            </div>
          )}

          {/* 2단계: 비밀번호 설정 */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-center mb-2">
                  비밀번호를 설정해주세요
                </h2>
                <p className="text-gray-400 text-center mb-4">
                  입력한 이메일:{" "}
                  <span className="font-medium">{formData.email}</span>
                </p>
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className={`w-full h-10 pr-10 px-3 rounded-md bg-[#141416] border ${
                      errors.password ? "border-red-500" : "border-[#2a2a2a]"
                    } focus:outline-none`}
                    placeholder="비밀번호를 입력해주세요"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2">{errors.password}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPasswordCheck ? "text" : "password"}
                    value={formData.passwordCheck}
                    onChange={(e) =>
                      updateFormData("passwordCheck", e.target.value)
                    }
                    className={`w-full h-10 pr-10 px-3 rounded-md bg-[#141416] border ${
                      errors.passwordCheck
                        ? "border-red-500"
                        : "border-[#2a2a2a]"
                    } focus:outline-none`}
                    placeholder="비밀번호를 다시 입력해주세요"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
                  >
                    {showPasswordCheck ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.passwordCheck && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.passwordCheck}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handlePrev}
                  className="flex-1 h-11 border border-[#2a2a2a] rounded-md font-medium text-gray-300 hover:bg-[#141416]"
                >
                  이전
                </button>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={`flex-1 h-11 rounded-md font-medium ${
                    isNextDisabled()
                      ? "bg-[#2a2a2a] text-gray-500"
                      : "bg-pink-500 hover:bg-pink-600"
                  }`}
                >
                  다음
                </button>
              </div>
            </div>
          )}

          {/* 3단계: 닉네임 설정 */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-center mb-2">
                  닉네임을 설정해주세요
                </h2>
                <p className="text-gray-400 text-center">
                  다른 사용자에게 보여질 닉네임을 입력해주세요
                </p>
              </div>

              {/* 프로필 이미지 UI (선택사항) */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-[#1c1c1e] rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className={`w-full h-10 px-3 rounded-md bg-[#141416] border ${
                    errors.name ? "border-red-500" : "border-[#2a2a2a]"
                  } focus:outline-none`}
                  placeholder="닉네임을 입력해주세요"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-2">{errors.name}</p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handlePrev}
                  className="flex-1 h-11 border border-[#2a2a2a] rounded-md font-medium text-gray-300 hover:bg-[#141416]"
                >
                  이전
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 h-11 rounded-md font-medium ${
                    isSubmitting
                      ? "bg-[#2a2a2a] text-gray-500"
                      : "bg-pink-500 hover:bg-pink-600"
                  }`}
                >
                  {isSubmitting ? "처리중..." : "회원가입 완료"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
