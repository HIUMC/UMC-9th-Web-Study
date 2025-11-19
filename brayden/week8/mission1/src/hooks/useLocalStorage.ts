export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      // window.localStorage.setItem(key, JSON.stringify(value));
      // setItem으로 들어온 값이 문자열이면 그대로 저장, 그 외의 경우에만 JSON.stringify 사용
      const valueToStore =
        typeof value === "string" ? value : JSON.stringify(value);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = () => {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    try {
      // JSON 파싱을 시도
      return JSON.parse(item);
    } catch {
      // 파싱에 실패하면(순수 문자열이면) 원본 값을 그대로 반환
      return item;
    }
  };
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};
