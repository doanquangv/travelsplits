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


    static EventValidation(data: any) {
      const mess: string[] = [];
      const realname: { [key: string]: string } = {
        title: "Tên chuyến đi",
        startDate: "Ngày bắt đầu",
        endDate: "Ngày kết thúc",
        locationAddress: "Địa chỉ",
        imageUrl: "Hình ảnh",
      };
      const requiredFields = [
          "title",
          "startDate",
          "endDate",
          "locationAddress",
          "imageUrl",
      ];

      requiredFields.forEach((field) => {
          if (!data[field] || (typeof data[field] === "string" && data[field].trim() === "")) {
            mess.push(`${realname[field]} là bắt buộc!`);
          }
      });

      if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
          mess.push("ngày kết thúc phải sau ngày bắt đầu");
      }

      return mess;
  }
}