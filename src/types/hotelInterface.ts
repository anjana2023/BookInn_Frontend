export type RoomInterface = {
    roomType: string;
    price: string;
    number:string;
  };
  
  export type HotelInterface = {
    _id: string;
    name: string;
    place: string;
    image: string;
    email: string;
    description: string;
    isBlocked: boolean;
    amenities: Array<string>;
    rooms: Array<RoomInterface>;
    propertyRules: Array<string>;
    aboutProperty: string;
    createdAt: Date;
    isApproved?: boolean;
    status: string;
  };
  