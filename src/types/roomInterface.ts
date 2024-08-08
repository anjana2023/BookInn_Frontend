
export interface RoomInterface {
  _id: string;
  title: string;
  price: number;
  maxAdults: number;
  maxChildren: number;
  desc: string;
  roomNumbers: number[];  
  createdAt: Date;
  updatedAt: Date;
}
