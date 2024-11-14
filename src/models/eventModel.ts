export interface eventModel {
  __v: number;
  _id: string;
  hostId: string;
  category: string;
  createdAt: string;
  description: string;
  endAt: number;
  locationAddress: string;
  locationTitle: string;
  imageUrl: string;
  position: Position;
  price: string;
  date: number;
  startAt: number;
  title: string;
  updatedAt: string;
  users: any[];
}

export interface Position {
  _id: string;
  lat: number;
  long: number;
}