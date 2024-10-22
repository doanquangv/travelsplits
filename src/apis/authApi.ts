import { AppInfo } from "../constants/AppInfor"
import axiosClient from "./axiosClient"

class AuthApi {
    HandleAuthentication = async (
        url: string,
        data?: any,
        method?: 'post' | 'get' | 'put' | 'delete',
    ) => {
        return await axiosClient(`/auth${url}`,{
            method: method ?? 'get',
            data,
        })
    }
}
const authenticationAPI = new AuthApi()
export default authenticationAPI;