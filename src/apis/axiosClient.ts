import axios from "axios";
import queryString from "query-string";
import { AppInfo } from "../constants/AppInfor";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccessToken = async () => {
    const res = await AsyncStorage.getItem("auth");
    return res ? JSON.parse(res).accesstoken : "";
};

const axiosClient = axios.create({
    baseURL: AppInfo.BASE_URL,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    async (config: any) => {
        const accessToken = await getAccessToken();
        config.headers = {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            Accept: "application/json",
            ...config.headers,
        };
        return config;
    },
    (error) => {
        console.error("Lỗi interceptor request:", error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (error) => {
        console.error("Lỗi interceptor response:", error);
        return Promise.reject(error);
    }
);

export default axiosClient;
