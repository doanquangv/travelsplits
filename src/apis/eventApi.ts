import { AppInfo } from "../constants/AppInfor"
import axiosClient from "./axiosClient"

class EventApi {
    HandleEvent = async (
        url: string,
        data?: any,
        method?: 'post' | 'get' | 'put' | 'delete',
    ) => {

     try {
        return await axiosClient(`/events${url}`,{
            method: method ?? 'get',
            data,
        })
    }
    catch (error) {
        console.error('Lỗi API:', error);
        throw error
    }
    }
    
}
const eventAPI = new EventApi()
export default eventAPI;