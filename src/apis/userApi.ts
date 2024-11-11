import { AppInfo } from "../constants/AppInfor"
import axiosClient from "./axiosClient"

class UserApi {
    HandleUser = async (
        url: string,
        data?: any,
        method?: 'post' | 'get' | 'put' | 'delete',
    ) => {
        return await axiosClient(`/users${url}`,{
            method: method ?? 'get',
            data,
        })
    }
}
const userAPI = new UserApi()
export default userAPI;