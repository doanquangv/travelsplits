import { Dimensions } from "react-native";

export const AppInfo = {
    sizes: {
        WIDTH:Dimensions.get('window').width,
        HEIGHT:Dimensions.get('window').height,
    },
    BASE_URL:'http://172.16.1.255:3001'
}