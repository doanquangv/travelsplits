import { AppInfo } from "../constants/AppInfor"
import axiosClient from "./axiosClient"

class EventApi {
    HandleEvent = async (
        url: string,
        data?: any,
        method?: 'post' | 'get' | 'put' | 'delete',
    ) => {
        return await axiosClient(`/events${url}`,{
            method: method ?? 'get',
            data,
        })
    }
}
const eventAPI = new EventApi()
export default eventAPI;