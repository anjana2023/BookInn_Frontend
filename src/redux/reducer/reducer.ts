import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice"; // Import the UserState type
import ownerSlice from "../slices/ownerSlice";
import bookingSlice from "../slices/bookingSlice";

export const rootReducer = combineReducers({
  userSlice,
  ownerSlice,
  bookingSlice
});

export type RootState = ReturnType<typeof rootReducer>;
