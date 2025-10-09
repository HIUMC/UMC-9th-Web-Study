import { useEffect } from "react"
import { getMyInfo } from "../apis/auth"

export const MyPage = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response)
    }
    getData();
  }, [])
  return <div>MyPage</div>
}