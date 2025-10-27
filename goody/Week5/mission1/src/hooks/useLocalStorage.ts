export const useLocalStorage = (key: string) => {
    const setItem = (value : unknown) => {
        try{
            // ✅  값이 문자열이면 그대로 저장하고, 아니면 stringify
            const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
            window.localStorage.setItem(key, valueToStore);
        } catch (error) {
            console.log(error)
        }
    };

    const getItem = () => {
        try{
            const item = window.localStorage.getItem(key);
            if (!item) return null; // 1. 아이템이 없으면 null

            // 2. ✅ [수정] JSON 파싱을 시도합니다.
            try {
                return JSON.parse(item); // 객체나 배열이면 성공
            } catch {
                // 3. ✅ [수정] 파싱에 실패하면 (토큰 같은 순수 문자열이면)
                return item; // 원본 문자열 "ey..."를 그대로 반환
            }
        } catch (error){
            console.log(error)
            return null; 
        }
    }

    const removeItem = () => {
        try{
            window.localStorage.removeItem(key);
        } catch(error){
            console.log(error)
        }
    };

    return {setItem, getItem, removeItem}
}

