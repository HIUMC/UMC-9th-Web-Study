/**
 * ========================================
 * LocalStorage 관리 커스텀 훅
 * ========================================
 *
 * 브라우저의 localStorage에 데이터를 안전하게 저장/조회/삭제하는 훅입니다.
 * JSON 직렬화/역직렬화를 자동으로 처리하고, 에러 처리도 포함되어 있습니다.
 *
 * 주요 기능:
 * 1. 데이터를 JSON 형태로 저장 (setItem)
 * 2. 저장된 데이터를 파싱하여 반환 (getItem)
 * 3. 특정 키의 데이터 삭제 (removeItem)
 * 4. 에러 발생 시 안전하게 처리
 *
 * 사용 예시:
 * ```tsx
 * const { setItem, getItem, removeItem } = useLocalStorage('accessToken');
 *
 * setItem('my-token-value');           // 토큰 저장
 * const token = getItem();              // 토큰 조회
 * removeItem();                         // 토큰 삭제
 * ```
 */
export const useLocalStorage = (key: string) => {
  /**
   * localStorage에 값을 저장하는 함수
   * 자동으로 JSON.stringify를 수행하여 객체도 저장 가능
   *
   * @param value - 저장할 값 (문자열, 숫자, 객체 등 any type)
   */
  const setItem = (value: unknown) => {
    try {
      // 값을 JSON 문자열로 변환하여 localStorage에 저장
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // 저장 실패 시 에러 로깅 (예: 저장 공간 초과)
      console.log(error);
    }
  };

  /**
   * localStorage에서 값을 조회하는 함수
   * 자동으로 JSON.parse를 수행하여 원래 타입으로 복원
   *
   * @returns 저장된 값 또는 null (값이 없거나 에러 발생 시)
   */
  const getItem = () => {
    try {
      // localStorage에서 값 가져오기
      const item = window.localStorage.getItem(key);

      // 값이 있으면 JSON 파싱하여 반환, 없으면 null 반환
      return item ? JSON.parse(item) : null;
    } catch (e) {
      // 파싱 실패 시 에러 로깅 (예: 유효하지 않은 JSON)
      console.log(e);
    }
  };

  /**
   * localStorage에서 특정 키의 값을 삭제하는 함수
   */
  const removeItem = () => {
    try {
      // 해당 키의 데이터 삭제
      window.localStorage.removeItem(key);
    } catch (e) {
      // 삭제 실패 시 에러 로깅
      console.log(e);
    }
  };

  // localStorage 조작 함수들을 객체로 반환
  return { setItem, getItem, removeItem };
};
