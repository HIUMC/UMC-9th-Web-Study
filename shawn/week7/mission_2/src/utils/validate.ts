/**
 * ========================================
 * 유효성 검사 유틸리티 함수들
 * ========================================
 *
 * 사용자 입력값의 유효성을 검사하는 함수들을 모아둔 파일입니다.
 * 로그인, 회원가입 등의 폼에서 사용됩니다.
 */

/**
 * 사용자 로그인 정보 타입
 */
export type UserSigninInformation = {
  email: string; // 이메일 주소
  password: string; // 비밀번호
};

/**
 * 사용자 입력 정보의 유효성을 검사하는 함수
 * 이메일 형식과 비밀번호 길이를 검증합니다.
 *
 * @param values - 검증할 사용자 정보 (이메일, 비밀번호)
 * @returns 각 필드의 에러 메시지 객체. 유효하면 빈 문자열
 *
 * 검증 규칙:
 * - 이메일: 기본 이메일 형식 (예: user@example.com)
 * - 비밀번호: 8자 이상 20자 이하
 *
 * 사용 예시:
 * ```tsx
 * const errors = validateUser({ email: 'test@test.com', password: '1234' });
 * if (errors.password) {
 *   console.log(errors.password); // "비밀번호는 8자 이상 20자 이하여야 합니다."
 * }
 * ```
 */
export const validateUser = (values: UserSigninInformation) => {
  // 에러 메시지를 담을 객체 초기화
  const errors = {
    email: "",
    password: "",
  };

  // 이메일 형식 검증 (정규표현식 사용)
  // 형식: 영문자/숫자 + @ + 영문자/숫자 + . + 영문자/숫자
  if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(values.email)) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }

  // 비밀번호 길이 검증 (8자 이상 20자 이하)
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8자 이상 20자 이하여야 합니다.";
  }

  return errors;
};

/**
 * 로그인 시 사용되는 유효성 검사 함수
 * validateUser를 래핑하여 명확한 의미 전달
 *
 * @param values - 검증할 로그인 정보
 * @returns 각 필드의 에러 메시지 객체
 *
 * 사용 예시:
 * ```tsx
 * const loginForm = useForm({
 *   initialValue: { email: '', password: '' },
 *   validate: validateSignin  // 이 함수를 validate prop으로 전달
 * });
 * ```
 */
function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

export { validateSignin };
