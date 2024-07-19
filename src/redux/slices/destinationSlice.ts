import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HotelInterface } from "../../types/hotelInterface"

interface DestinationState {
  loading: boolean
  places: string[] | null
  place: string | null
  featured: HotelInterface[] | null
  search: HotelInterface[]
  error: string | null
}

const initialState: DestinationState = {
  loading: false,
  places: null,
  place: null,
  featured: null,
  search: [],
  error: null,
}

const destinationSlice = createSlice({
  name: "destinationSlice",
  initialState,
  reducers: {
    setSearchResult: (state, action: PayloadAction<HotelInterface[]>) => {
      state.search = action.payload
    },
    removeSearchResult: (state) => {
      state.search = []
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { removeSearchResult, setSearchResult, setLoading, setError } = destinationSlice.actions
export default destinationSlice.reducer
