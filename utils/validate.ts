export class Validate {
    static email(email: string) {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            return true;
        }
        return false;
    }


    static Password(val: string) {
        return val.length >= 6 
    }
}