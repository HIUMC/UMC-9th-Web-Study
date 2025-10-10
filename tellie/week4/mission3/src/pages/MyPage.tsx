import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    useEffect(() => {
        const getData = async() => {
            const response : ResponseMyInfoDto = await getMyInfo();
            console.log(response);

            setData(response);
        };
        getData();
    }, []);

    return (
        <div>{data?.data.name} {data?.data.email}</div>
    );
};

export default MyPage;