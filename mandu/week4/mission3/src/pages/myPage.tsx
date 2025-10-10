import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
    };

    getData();
  }),
    [];
  return <div>MyPage</div>;
};

export default MyPage;
