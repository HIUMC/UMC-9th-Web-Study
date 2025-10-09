import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

export const MyPage = () => {
    const [ data, setData ] = useState<ResponseMyInfoDto | null>(null);
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            setData(response);
        };

        getData();
    }, []);
    return <div>{data?.data.name} {data?.data.email}</div>;
}