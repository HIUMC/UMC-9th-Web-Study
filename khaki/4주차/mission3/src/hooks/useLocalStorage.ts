export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
      console.error("로컬 스토리지에 저장하는 도중 에러 발생", error);
    }
  }

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    catch (error) {
      console.error("로컬 스토리지에서 가져오는 도중 에러 발생", error);
    }
  }

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
