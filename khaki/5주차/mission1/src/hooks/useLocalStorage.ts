// <로컬 스토리지에 데이터 저장, 조회, 삭제하는 커스텀 훅>
//    - 컴포넌트 어디서든 const { setItem, getItem, removeItem } = useLocalStorage("토큰키"); 이렇게 불러서 사용가능

// 로컬 스토리지의 각각의 데이터마다 이름표(key)가 붙어있는데, 그 키를 사용해서 커스텀훅 사용
export const useLocalStorage = (key: string) => {

  // 저장
  const setItem = (value: unknown) => {
    try {
      // 만약 value가 문자열이면 그대로 저장
      if (typeof value === "string") {
        window.localStorage.setItem(key, value);
      } 
      // 문자열이 아니라 객체나 배열이면 JSON 문자열로 변환하여 저장(localstorage에는 문자열만 저장 가능)
      else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    }
    catch (error) {
      console.error("로컬 스토리지에 저장하는 도중 에러 발생", error);
    }
  }

  // 가져오기
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      // 저장값 없으면 null 반환
      if (!item) 
        return null;
      // 단순 문자열이면 그대로 반환
      if(typeof item === "string")
        return JSON.parse(item);
      // JSON 문자열이면 다시 객체나 배열로 변환하여 반환
      else
        return JSON.parse(item);
      }
    catch (error) {
      console.error("로컬 스토리지에서 가져오는 도중 에러 발생", error);
      return null;
    }
  };
  
  // 삭제
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    }
    catch (error) {
      console.error("로컬 스토리지에서 제거하는 도중 에러 발생", error);
    }
  }

  return { setItem, getItem, removeItem };
}
