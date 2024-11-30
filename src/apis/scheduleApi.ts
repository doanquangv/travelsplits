// client/travelsplits/src/api/ScheduleApi.ts

import { AppInfo } from "../constants/AppInfor"
import axiosClient from "./axiosClient"

class ScheduleApi {
    // Hàm xử lý các yêu cầu API liên quan đến lịch trình
    HandleSchedule = async (
        url: string,
        data?: any,
        method?: 'post' | 'get' | 'put' | 'delete',
    ) => {
        try {
            return await axiosClient(`/schedules${url}`, {
                method: method ?? 'get',
                data,
            })
        }
        catch (error) {
            console.error('Lỗi API:', error);
            throw error
        }
    }

    // Thêm lịch trình mới
    addSchedule = (eventId: string, scheduleData: any) => {
        return this.HandleSchedule(`/${eventId}`, scheduleData, 'post');
    }

    // Lấy danh sách lịch trình cho một sự kiện
    getSchedules = (eventId: string) => {
        return this.HandleSchedule(`/${eventId}`, null, 'get');
    }

    // Cập nhật lịch trình
    updateSchedule = (scheduleId: string, updatedData: any) => {
        return this.HandleSchedule(`/${scheduleId}`, updatedData, 'put');
    }

    // Xóa lịch trình
    deleteSchedule = (scheduleId: string) => {
        return this.HandleSchedule(`/${scheduleId}`, null, 'delete');
    }
}

const scheduleAPI = new ScheduleApi()
export default scheduleAPI;
