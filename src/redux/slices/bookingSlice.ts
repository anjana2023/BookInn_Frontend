import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface bookingState {
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
  days: number;
  name: string;
  place: string;
  image:string;
  city: string;
  district: string;
  pincode: string;
  country: string;
  hotelId: string;
}

const initialState: bookingState = {
  checkIn: "",
  checkOut: "",
  guests: 0,
  price: 0,
  days: 0,
  name: "",
  place: "",
  image:"",
  city: "",
  district: "",
  pincode: "",
  country: "",
  hotelId: "",
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<bookingState>) => {
      return { ...state, ...action.payload };
    },
    clearData: () => initialState,
  },
});

export const { setData, clearData } = bookingSlice.actions;
export default bookingSlice.reducer;
