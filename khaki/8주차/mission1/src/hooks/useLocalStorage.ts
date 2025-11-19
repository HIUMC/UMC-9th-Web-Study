export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      // 문자열은 그대로, 나머지만 JSON 변환
      if (typeof value === "string") {
        window.localStorage.setItem(key, value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    }
    catch (error) {
      console.error("로컬 스토리지에 저장하는 도중 에러 발생", error);
    }
  }

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      // JSON 문자열이면 객체로 파싱, 아니면 그냥 문자열 반환
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.error("로컬 스토리지에서 가져오는 도중 에러 발생", error);
      return null;
    }
  };
  
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
