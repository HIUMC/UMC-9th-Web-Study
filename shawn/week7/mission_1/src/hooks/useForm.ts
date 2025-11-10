/**
 * ========================================
 * 폼(Form) 입력 관리 커스텀 훅
 * ========================================
 *
 * 폼의 입력값, 유효성 검사, 터치 상태를 통합 관리하는 재사용 가능한 훅입니다.
 * 회원가입, 로그인 등 다양한 폼에서 사용할 수 있습니다.
 *
 * 주요 기능:
 * 1. 폼 입력값 상태 관리 (values)
 * 2. 필드별 유효성 검사 에러 관리 (errors)
 * 3. 사용자가 터치한 필드 추적 (touched)
 * 4. 입력 필드에 연결할 props 자동 생성 (getInputProps)
 */

import { useEffect, useState } from "react";

/**
 * useForm 훅의 매개변수 타입 정의
 * @template T - 폼 데이터 객체의 타입 (예: {email: string, password: string})
 */
interface UseFormProps<T> {
  /** 폼의 초기값 (예: {email: '', password: ''}) */
  initialValue: T;

  /** 값이 올바른지 검증하는 함수. 각 필드의 에러 메시지를 반환 */
  validate: (values: T) => Record<keyof T, string>;
}

/**
 * 폼 입력 관리 훅
 *
 * @template T - 폼 데이터 객체의 타입
 * @param initialValue - 폼의 초기값
 * @param validate - 유효성 검사 함수
 * @returns 폼 상태와 유틸리티 함수들
 *
 * 사용 예시:
 * ```tsx
 * const loginForm = useForm({
 *   initialValue: { email: '', password: '' },
 *   validate: (values) => ({
 *     email: !values.email ? '이메일을 입력하세요' : '',
 *     password: !values.password ? '비밀번호를 입력하세요' : ''
 *   })
 * });
 *
 * return (
 *   <input {...loginForm.getInputProps('email')} />
 * );
 * ```
 */
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  // 폼의 현재 입력값들을 저장하는 상태
  const [values, setValues] = useState(initialValue);

  // 사용자가 터치(포커스 후 블러)한 필드를 추적하는 상태
  // 터치된 필드에만 에러 메시지를 표시하기 위해 사용
  const [touched, setTouched] = useState<Record<string, boolean>>();

  // 각 필드의 유효성 검사 에러 메시지를 저장하는 상태
  const [errors, setErrors] = useState<Record<string, string>>();

  /**
   * 사용자가 입력값을 변경할 때 실행되는 함수
   * @param name - 변경할 필드의 이름
   * @param text - 새로운 입력값
   */
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  /**
   * 사용자가 입력 필드에서 포커스를 잃을 때(블러) 실행되는 함수
   * 해당 필드를 '터치됨' 상태로 마킹하여 에러 메시지를 표시할 수 있게 함
   * @param name - 블러된 필드의 이름
   */
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  /**
   * values가 변경될 때마다 유효성 검사를 실행하는 Effect
   * 실시간으로 에러 상태를 업데이트함
   */
  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  /**
   * 특정 입력 필드에 연결할 props를 생성하는 함수
   * input이나 textarea에 직접 스프레드하여 사용할 수 있음
   *
   * @param name - 필드의 이름
   * @returns value, onChange, onBlur를 포함한 props 객체
   *
   * 예: <input {...getInputProps('email')} />
   */
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    // input의 onChange 이벤트 핸들러
    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      handleChange(name, e.target.value);
    };

    // input의 onBlur 이벤트 핸들러
    const onBlur = () => {
      handleBlur(name);
    };

    return {
      value, // 현재 입력값
      onChange, // 입력 변경 핸들러
      onBlur, // 블러 핸들러
    };
  };

  // 폼 상태와 유틸리티 함수들을 반환
  return {
    values, // 현재 폼 입력값들
    errors, // 필드별 에러 메시지
    touched, // 필드별 터치 상태
    getInputProps, // 입력 필드 props 생성 함수
  };
}

export default useForm;
