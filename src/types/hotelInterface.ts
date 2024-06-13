interface Address {
  streetAddress: string;
  landMark: string;
  district: string;
  city: string;
  pincode: string;
  country: string;
}

export type HotelInterface = {
  _id: string;
  name: string;
  place: string;
  email: string;
  imageUrls:string[];
  address: Address;
  stayType: string;
  propertyRules: string[];
  room: number;
  guests: number;
  price: string;
  // reservationType: string;
  description: string;
  isBlocked: boolean;
  amenities: Array<string>;
  // aboutProperty: string;
  createdAt: Date;
  isApproved?: boolean;
  status: string;
  unavailbleDates:string[]  
};
