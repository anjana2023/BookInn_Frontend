import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Room {
  roomId: string;
  roomType: string;
  roomPrice: number;
}

interface SearchingState {
  name: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  adults: number;
  children: number;
  price: number;
  hotelName: string;
  place: string;
  city: string;
  district: string;
  pincode: string;
  country: string;
  hotelId: string;
  rooms: Room[]; // Array of Room objects
  totalDays: number; // Add a property to store the total number of days
}

const initialState: SearchingState = {
  name: "",
  checkIn: "",
  checkOut: "",
  adults: 0,
  children: 0,
  price: 0,
  hotelName: "",
  place: "",
  city: "",
  district: "",
  pincode: "",
  country: "",
  hotelId: "",
  rooms: [],
  totalDays: 0, // Initialize with 0
};

const calculateTotalDays = (checkIn: string, checkOut: string): number => {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);
  return dayDifference + 1; // Including both start and end dates
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setCheckoutData: (state, action: PayloadAction<Partial<SearchingState>>) => {
      const { checkIn, checkOut } = action.payload;

      if (checkIn && checkOut) {
        const totalDays = calculateTotalDays(checkIn, checkOut);
        return { ...state, ...action.payload, totalDays };
      }

      return { ...state, ...action.payload };
    },
    clearData: () => initialState,
  },
});

export const { setCheckoutData, clearData } = bookingSlice.actions;
export default bookingSlice.reducer;
