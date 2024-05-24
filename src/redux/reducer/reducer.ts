import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice"; // Import the UserState type
import ownerSlice from "../slices/ownerSlice";

export const rootReducer = combineReducers({
  userSlice,
  ownerSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
