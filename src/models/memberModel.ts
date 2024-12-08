// src/models/MemberModel.ts

export interface Member {
    _id: string;
    userId: {
      _id: string;
      fullname?: string; // Có thể là fullname hoặc không, vì trong dữ liệu bạn có thể thấy fullname trống
      email: string;
    };
    role: "host" | "member";
    joinedAt: string; // Dùng kiểu string để lưu trữ ngày giờ, sau đó bạn có thể format lại.
  }
  