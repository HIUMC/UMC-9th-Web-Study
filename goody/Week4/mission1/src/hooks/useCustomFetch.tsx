import axios from "axios";
import { useEffect, useState } from "react";


export function useCustomFetch<T>(url: string, depsarray: unknown[] ) {

    const [data, setData] = useState<T | null>(null);

    // 1. 로딩 상태
    const [isPending,setIsPending] = useState(false);
    // 2. 에러 상태
    const [isError,setIsError] = useState(false);

    useEffect(() => {
            const fetchData = async () =>{

                setIsPending(true);
                try {
                    const {data} = await axios.get<T>(url, 
                    { 
                        headers : { 
                            Authorization : `Bearer ${import.meta.env.VITE_TMDB_KEY}`, 
                        },
                    }
                    );
                    setData(data);
                } catch {
                    setIsError(true);
                    setIsPending(false);
                } finally {
                    setIsPending(false);
                }
            };

            fetchData();
        }, depsarray);
    

    return (
        { data, isPending, isError }
    )
    }

export default useCustomFetch
