import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";

interface SignupData {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
}

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

  // 입력값 업데이트
  const updateFormData = (field: keyof SignupData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 에러 메시지 초기화
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* 진행 단계 표시 */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? "bg-[#887bff] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* 1단계: 이메일 입력 */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-center mb-2">
                이메일을 입력해주세요
              </h2>
              <p className="text-gray-600 text-center">
                회원가입에 사용할 이메일을 입력해주세요
              </p>
            </div>

            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887bff] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="이메일을 입력해주세요"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`w-full py-4 rounded-lg font-medium ${
                isNextDisabled()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#887bff] text-white hover:bg-[#776eff]"
              }`}
            >
              다음
            </button>
          </div>
        )}

        {/* 2단계: 비밀번호 설정 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-center mb-2">
                비밀번호를 설정해주세요
              </h2>
              <p className="text-gray-600 text-center mb-4">
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
                  className={`w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887bff] ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="비밀번호를 입력해주세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
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
                  className={`w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887bff] ${
                    errors.passwordCheck ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswordCheck ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.passwordCheck && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.passwordCheck}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="flex-1 py-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                이전
              </button>
              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={`flex-1 py-4 rounded-lg font-medium ${
                  isNextDisabled()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#887bff] text-white hover:bg-[#776eff]"
                }`}
              >
                다음
              </button>
            </div>
          </div>
        )}

        {/* 3단계: 닉네임 설정 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-center mb-2">
                닉네임을 설정해주세요
              </h2>
              <p className="text-gray-600 text-center">
                다른 사용자에게 보여질 닉네임을 입력해주세요
              </p>
            </div>

            {/* 프로필 이미지 UI (선택사항) */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>

            <div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887bff] ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="닉네임을 입력해주세요"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="flex-1 py-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                이전
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 py-4 rounded-lg font-medium ${
                  isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#887bff] text-white hover:bg-[#776eff]"
                }`}
              >
                {isSubmitting ? "처리중..." : "회원가입 완료"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
