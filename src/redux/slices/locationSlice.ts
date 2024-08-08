import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  location: {
    lng: number;
    lat: number;
  };
}

const initialState: LocationState = {
  location: {
    lng: 0,
    lat: 0,
  },
};

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ lng: number; lat: number }>) => {
      state.location = action.payload;
    },
    removeLocation: (state) => {
      state.location = { lng: 0, lat: 0 }; 
    },
  },
});

export const { removeLocation, setLocation } = locationSlice.actions;
export default locationSlice.reducer;