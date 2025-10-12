import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postSignin } from "../apis/auth";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [showPassword, setShowPassword] = useState(false);
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
    return "";
  };

  // 입력값 업데이트
  const updateFormData = (field: keyof LoginData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 에러 메시지 초기화
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // 로그인 처리
  const handleSubmit = async () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await postSignin(formData);
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("로그인 성공:", response);
      alert("로그인이 완료되었습니다!");
      navigate("/");
    } catch (error: any) {
      console.error("로그인 실패:", error);
      console.log("Status:", error.response?.status);
      console.log("Message:", error.response?.data?.message);
      if (error.response?.status === 401) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 버튼 활성화 조건
  const isDisabled =
    !formData.email ||
    !formData.password ||
    !!validateEmail(formData.email) ||
    !!validatePassword(formData.password);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
          <p className="text-gray-600">계정에 로그인하세요</p>
        </div>

        <div className="space-y-6">
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

          <button
            onClick={handleSubmit}
            disabled={isDisabled || isSubmitting}
            className={`w-full py-4 rounded-lg font-medium ${
              isDisabled || isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#887bff] text-white hover:bg-[#776eff]"
            }`}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{" "}
              <Link
                to="/signup"
                className="text-[#887bff] hover:text-[#776eff] font-medium"
              >
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
