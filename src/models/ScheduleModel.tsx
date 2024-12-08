
export interface Schedule {
  _id: string;
  eventId: string;
  name: string;
  startAt: number;
  endAt: number;
  date: number;
  address: string;
  position: {
    lat: number;
    long: number;
  };
  description: string;
}
