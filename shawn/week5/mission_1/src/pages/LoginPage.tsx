import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";

// 기존 타입은 useForm 제네릭으로 대체

export default function LoginPage() {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  // 로그인 처리
  const handleSubmit = async () => {
    try {
      await login(values);
      navigate("/my");
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const isNextDisabled = useMemo(() => {
    return !values.email || Boolean(errors?.email);
  }, [values.email, errors]);

  const isLoginDisabled = useMemo(() => {
    return (
      !values.password || Boolean(errors?.password) || Boolean(errors?.email)
    );
  }, [values.password, errors]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-sm">
        {/* 상단 바 & 뒤로 가기 */}
        <div className="flex items-center mb-4">
          <button
            aria-label="go-back"
            onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
            className="text-2xl mr-2"
          >
            &lt;
          </button>
          <h1 className="text-xl font-semibold">로그인</h1>
        </div>

        {/* 카드 */}
        <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-5 space-y-5">
          {step === 1 && (
            <>
              {/* 구글 로그인 버튼 (UI만) */}
              <button
                className="w-full h-11 rounded-lg border border-[#3a3a3a] flex items-center justify-center gap-2 hover:bg-[#141416]"
                type="button"
              >
                <span>G</span>
                <span>구글 로그인</span>
              </button>

              {/* OR 구분선 */}
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex-1 h-px bg-[#2a2a2a]" />
                <span>OR</span>
                <div className="flex-1 h-px bg-[#2a2a2a]" />
              </div>

              {/* 이메일 */}
              <div>
                <input
                  type="email"
                  placeholder="이메일"
                  {...getInputProps("email")}
                  className={`w-full h-10 px-3 rounded-md bg-[#141416] border ${
                    errors?.email && touched?.email
                      ? "border-red-500"
                      : "border-[#2a2a2a]"
                  } focus:outline-none`}
                />
                {errors?.email && touched?.email && (
                  <p className="mt-2 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* 다음 버튼 */}
              <button
                onClick={() => setStep(2)}
                disabled={isNextDisabled}
                className={`w-full h-11 rounded-md font-medium ${
                  isNextDisabled
                    ? "bg-[#2a2a2a] text-gray-500"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                다음
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* 이메일 표시 */}
              <div className="text-sm text-gray-300">{values.email}</div>

              {/* 비밀번호 */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호"
                    {...getInputProps("password")}
                    className={`w-full h-10 pr-10 px-3 rounded-md bg-[#141416] border ${
                      errors?.password && touched?.password
                        ? "border-red-500"
                        : "border-[#2a2a2a]"
                    } focus:outline-none`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors?.password && touched?.password && (
                  <p className="mt-2 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* 로그인 버튼 */}
              <button
                onClick={handleSubmit}
                disabled={isLoginDisabled}
                className={`w-full h-11 rounded-md font-medium ${
                  isLoginDisabled
                    ? "bg-[#2a2a2a] text-gray-500"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                로그인
              </button>
            </>
          )}

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
