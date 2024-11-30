import axiosClient from "./axiosClient";

class ExpenseApi {
  HandleExpense = async (
    url: string,
    data?: any,
    method?: 'post' | 'get' | 'put' | 'delete',
  ) => {
    try {
      const res = await axiosClient(`/expenses${url}`, {
        method: method ?? 'get',
        data,
      });
      return res; // Phải trả về đối tượng response từ axios
    } catch (error) {
      console.error('Lỗi API:', error);
      throw error;
    }
  }
}

const expenseAPI = new ExpenseApi();
export default expenseAPI;
