import { UserInterface } from "./hotelInterface";

export type Review= {
    _id: string;
    createdAt: string;
    description: string;
    hotelId: string;
    imageUrls: string[];
    rating: number;
    updatedAt: string;
    userId:UserInterface;
}