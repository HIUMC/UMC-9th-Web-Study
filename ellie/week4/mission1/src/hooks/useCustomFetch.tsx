import axios from "axios";
import { useEffect, useState } from "react";

function useFetch<T>(url:string , deps:any[]){
  const [datas,setDatas]=useState<T|null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect (() => {
    const fetchData = async () => {

      setIsPending(true);
      setIsError(false);

      try {
        const data = await axios.get<T>(url,{
             headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
           },
         }
        )
        setDatas(data.data);
      }
      catch {
        setIsError(true);
        setIsPending(false);
      }
      finally{
        setIsPending(false);
      }
    };
    fetchData();
  },deps) 

  return {datas,isError,isPending};
}
export default useFetch;