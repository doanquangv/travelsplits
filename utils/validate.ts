export class Validate {
    static Event(eventData: any) {
      throw new Error("Method not implemented.");
    }
    static email(email: string) {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            return true;
        }
        return false;
    }


    static Password(val: string) {
        return val.length >= 6 
    }

    static EventValidation = (data: any) => {
        // console.log(data);
        
        const mess: string[] = [];
        Object.keys(data).forEach(key => {
          if (key !== 'description' && key !== 'users') {
            !data[`${key}`] && mess.push(`${key} is required!!!`);
          }
        });
    
        return mess;
      }
}