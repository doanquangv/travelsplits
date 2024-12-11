import { Dimensions } from "react-native";

export const AppInfo = {
    sizes: {
        WIDTH:Dimensions.get('window').width,
        HEIGHT:Dimensions.get('window').height,
    },
    BASE_URL:'http://172.16.2.41:9445',
    // ip home: 192.168.5.102
    // ip iphone: 172.20.10.2
    //ip quan: 172.16.3.122
    monthNames:[
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
    ]
}   