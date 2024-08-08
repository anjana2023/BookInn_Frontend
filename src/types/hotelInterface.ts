import mongoose from "mongoose";

interface Address {
  streetAddress: string;
  landMark: string;
  district: string;
  city: string;
  pincode: string;
  country: string;
}
interface OwnerInterface {
  _id:mongoose.Types.ObjectId
  name: string
  email: string
}

export interface RoomInterface {
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
  title: string
  price: number
  maxAdults: number
  maxChildren: number
  desc: string
  roomNumbers: { number: number; unavailableDates: Date[] }[]
}

export type HotelInterface = {
  Hotel: any;
  _id: mongoose.Types.ObjectId;
  name: string;
  ownerId:OwnerInterface|null;
  place: string;
  email: string;
  imageUrls:string[];
  address: Address;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  isVerified:string;
  stayType: string;
  propertyRules: string[];
  description: string;
  isBlocked: boolean;
  amenities: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  isApproved?: boolean;
  status: string;
  hotelDocument:string;
  rejectedReason?: string;
  unavailbleDates: Date[]
  rooms: RoomInterface[]
};


export type UserInterface ={
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePic: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type BookingInterface={
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  hotelId: HotelInterface;
  userId: UserInterface;
  maxPeople: number;
  checkInDate: string;
  checkOutDate: string;
  totalDays: number;
  price: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface BookingResponse {
  data: BookingInterface;
}