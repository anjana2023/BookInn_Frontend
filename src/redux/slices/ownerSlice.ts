import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OwnerState {
  name: string | null;
  isAuthenticated: boolean | null;
  role: string | null;
  id?: string | null;
}

const initialState: OwnerState = {
  name: null,
  isAuthenticated: null,
  role: null,
  id: null,
};

const OnwerSlice = createSlice({
  name: "ownerSlice",
  initialState,
  reducers: {
    setOwner: (state, action: PayloadAction<OwnerState>) => {
      return { ...state, ...action.payload };
    },
    clearOwner: () => initialState,
  },
});

export const { setOwner, clearOwner } = OnwerSlice.actions;
export default OnwerSlice.reducer;
export * from "./ownerSlice"; // Export UserState from here
