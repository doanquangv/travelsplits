import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";

import { fontFamily } from "../constants/fontFamilies";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,
    },
    text: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
        color: appColors.text,
    },
    button: {
        borderRadius:12,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor: appColors.white,
        paddingHorizontal:16,
        paddingVertical:16,
        minHeight: 56,
        flexDirection:'row',
    }
});