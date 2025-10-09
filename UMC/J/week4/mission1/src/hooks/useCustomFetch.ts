import axios from "axios";
import { useEffect, useState } from "react";

export function useCustomFetch<T>(url : string, deps: any[] = []) {
    const [data, setData] = useState<T>();
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetch = async() => {
            setIsPending(true);
            try {
                const {data} = await axios.get(
                    url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                )

                setData(data);
                setIsError(false);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetch();
    }, deps );

    return {data, isPending, isError};
}