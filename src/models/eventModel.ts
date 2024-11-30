export interface eventModel {
  __v: number;
  _id: string;
  hostId: string;
  category: string;
  createdAt: string;
  description: string;
 
  locationAddress: string;
  // locationTitle: string;
  imageUrl: string;
  position: Position;
  price: string;
  
  startDate: number;
  endDate: number;
  title: string;
  updatedAt: string;
  users: any[];
  status: string;
}

export interface Position {
  _id: string;
  lat: number;
  long: number;
}