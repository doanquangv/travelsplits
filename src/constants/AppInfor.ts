import { Dimensions } from "react-native";

export const AppInfo = {
    sizes: {
        WIDTH:Dimensions.get('window').width,
        HEIGHT:Dimensions.get('window').height,
    },
    BASE_URL:'http://192.168.5.102:3001'
}