import axiosClient from "./axiosClient";

class MemberApi {
    // Hàm để xử lý các yêu cầu liên quan đến thành viên
    handleMember = async (
        url: string,
        data?: any,
        method?: 'post' | 'get' | 'put' | 'delete',
    ) => {
        try {
            // Gọi API với đường dẫn liên quan tới members
            return await axiosClient(`/members${url}`, {
                method: method ?? 'get',
                data,
            });
        } catch (error) {
            console.error('Lỗi API:', error);
            throw error;
    }
    }

    // Hàm cụ thể để thêm thành viên vào sự kiện
    addMemberToEvent = async (eventId: string, memberData: any) => {
        return this.handleMember(`/${eventId}`, memberData, 'post');
    }

    // Hàm cụ thể để lấy danh sách thành viên của sự kiện
    getEventMembers = async (eventId: string) => {
        return this.handleMember(`/${eventId}`, undefined, 'get');
    }

    // Hàm cụ thể để xóa thành viên khỏi sự kiện
    removeMemberFromEvent = async (eventId: string, memberId: string) => {
        return this.handleMember(`/${eventId}/${memberId}`, undefined, 'delete');
    }
}

const memberAPI = new MemberApi();
export default memberAPI;
