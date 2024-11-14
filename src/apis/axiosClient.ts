import axios from 'axios'
import qerryString from 'query-string'
// import { err } from 'react-native-svg'
import { AppInfo } from '../constants/AppInfor'
import AsyncStorage from '@react-native-async-storage/async-storage'


const getAccessToken = async () => {
    const res = await AsyncStorage.getItem('auth')

    return res ? JSON.parse(res).accesstoken : '';
}

const axiosClient = axios.create({
    baseURL: AppInfo.BASE_URL,
    paramsSerializer: params => qerryString.stringify(params),

})

axiosClient.interceptors.request.use(async (config:any) => {

    const accesstoken = await getAccessToken()

    config.headers = {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : '',
        Accept: 'application/json',
        ...config.headers,
    }

    config.data
    return config
})

axiosClient.interceptors.response.use(res => {
    if (res.data && res.status === 200) {
        return res.data
    }
    throw console.error('error');
    
    
}, error => {
    console.log(`error api ${JSON.stringify(error)}`)
    return Promise.reject(error);
})

export default axiosClient