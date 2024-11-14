import axios from 'axios';

const HERE_API_KEY = '{YOUR_API_KEY}'; // Thay thế bằng API key của bạn

interface Location {
  lat: number;
  lng: number;
}

interface Place {
  title: string;
  position: Location;
  // ... các thuộc tính khác của địa điểm
}

const nearByPlace = async (
  location: Location,
  type: string,
  limit: number = 10
): Promise<Place[]> => {
  const url = `https://discover.search.hereapi.com/v1/discover?at=${location.lat},${location.lng}&q=${type}&in=countryCode:VN&limit=${limit}&apiKey=${HERE_API_KEY}`;
  try {
    const response = await axios.get(url);
    // Xử lý response từ HERE API để trả về mảng Place[]
    return response.data.items.map((item: any) => ({
      title: item.title,
      position: item.position,
      // ... các thuộc tính khác
    }));
  } catch (error) {
    console.error(error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

const searchByText = async (
  searchText: string,
  limit: number = 10
): Promise<Place[]> => {
  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${searchText}&in=countryCode:VN&limit=${limit}&apiKey=${HERE_API_KEY}`;
  try {
    const response = await axios.get(url);
    // Xử lý response từ HERE API để trả về mảng Place[]
    return response.data.items.map((item: any) => ({
      title: item.title,
      position: item.position,
      // ... các thuộc tính khác
    }));
  } catch (error) {
    console.error(error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

export default { nearByPlace, searchByText };