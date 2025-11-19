export const useLocalStorage = (key: string) => {
    const setItem = (value : unknown) => {
        try{
            window.localStorage.setItem(key, JSON.stringify(value));
            // window 생략가능게 만들기
        } catch (error) {
            console.log(error)
        }
    };

    const getItem = () => {
        try{
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : null
        } catch (error){
            console.log(error)
        }
    };

    const removeItem = () => {
        try{
            window.localStorage.removeItem(key);
        } catch(error){
            console.log(error)
        }
    };

    return {setItem, getItem, removeItem}
}

