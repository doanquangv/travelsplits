// place.ts
export interface Place {
    title: string; // Tên địa điểm
    position: {   // Tọa độ địa điểm
      lat: number; // Vĩ độ
      lng: number; // Kinh độ
    };
    // ... Các thuộc tính khác của địa điểm (address, category, ...)
  }