import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice"; // Import the UserState type
import ownerSlice from "../slices/ownerSlice";
import bookingSlice from "../slices/bookingSlice";
import searchingSlice from "../slices/searchingSlice"
import destinationSlice from "../slices/destinationSlice"
import chatSlice from "../slices/chatSlice";

export const rootReducer = combineReducers({
  userSlice,
  ownerSlice,
  destinationSlice,
  bookingSlice,
  searchingSlice,
  chatSlice
 
});

export type RootState = ReturnType<typeof rootReducer>;
