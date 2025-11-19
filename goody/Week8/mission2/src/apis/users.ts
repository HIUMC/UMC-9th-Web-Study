import type { ResponseMyInfoDto, ResponseSignupDto } from "../types/auth";
import { axiosInstance } from "./axios"

export interface patchUsersProps {
    name : string;
    bio : string;
    avatar : string | null ;
}

export const patchUsers = async ( editData : patchUsersProps) : Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.patch(`/v1/users`, editData);
    return data;
}

export const deleteUsers = async () : Promise<ResponseSignupDto>=> {
    const { data } = await axiosInstance.delete(`/v1/users`);
    return data;
}