import { AppInfo } from "../src/constants/AppInfor";
import { numberToString } from "./NumberToString";

export class DateTime {
    static GetTime = (num: Date) => {
        const date = new Date(num);

        return `${numberToString(date.getHours())}:${numberToString(date.getMinutes())}`
    }
    static GetDate = (num: Date) => {
        const date = new Date(num);

        return `${numberToString(date.getDate())}/${AppInfo.monthNames[date.getMonth()]}/${date.getFullYear()}`
    }
}