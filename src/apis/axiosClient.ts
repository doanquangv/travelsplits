import axios from 'axios'
import qerryString from 'query-string'
import { err } from 'react-native-svg'
import { AppInfo } from '../constants/AppInfor'
const axiosClient = axios.create({
    baseURL: AppInfo.BASE_URL,
    paramsSerializer: params => qerryString.stringify(params),

})

axiosClient.interceptors.request.use(async (config:any) => {
    config.headers = {
        Authorization: '',
        Accept: 'application/json',
        ...config.headers
    }

    config.data
    return config
})

axiosClient.interceptors.response.use(res => {
    if (res.data && res.status === 200) {
        return res.data
    }
    throw new Error('Error')
}, error => {
    console.log(`error api ${JSON.stringify(error)}`)
    throw new Error(error.response)
})

export default axiosClient