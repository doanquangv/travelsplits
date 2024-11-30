import { AppInfo } from "../constants/AppInfor"
import axiosClient from "./axiosClient"
// authApi.ts
import * as SecureStore from 'expo-secure-store';

const getAccessToken = async () => {
    const res = await SecureStore.getItemAsync('auth');
    return res ? JSON.parse(res).accesstoken : '';
}

const setAccessToken = async (token: string) => {
    await SecureStore.setItemAsync('auth', JSON.stringify({ accesstoken: token }));
}

const removeAccessToken = async () => {
    await SecureStore.deleteItemAsync('auth');
}


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