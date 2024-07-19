import axiosJWT from "../../utils/axiosService"
import { useState, useEffect } from "react"
import useSWR from "swr"
import { USER_API } from "../../constants"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  setLoading,
  setError,
  setSearchResult,
} from "../../redux/slices/destinationSlice"
import { fetcher, useFetchData } from "../../utils/fetcher"
import { setData } from "../../redux/slices/searchingSlice"
import { HotelInterface } from "../../types/hotelInterface"

const useUserHotels = () => {
  const dispatch = useDispatch()
  const [place, setDestination] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const navigate = useNavigate()
  const [loading, setLoadingState] = useState(true)
  const { data: hotelsData, isLoading, isError:error } = useFetchData<HotelInterface[]>(`${USER_API}/hotels`, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: () => {
      setLoadingState(false);
    },
    onError: () => {
      setLoadingState(false);
    },
  });

  useEffect(() =>{
    console.log(hotelsData,".......$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$..............")
    if (hotelsData) {
      setLoadingState(false)
    }
    if (error) {
      dispatch(setError("Failed to fetch hotels"))
      console.error(error)
      setLoadingState(false)
    }
  }, [hotelsData, error, dispatch])
  console.log(hotelsData, "hotels....")

  type optionType = {
    adult: number
    children: number
    room: number
  }

  type datesType = {
    startDate: Date
    endDate: Date
  }

  const handleSearch = async (
    place: string,
    options: optionType,
    dates: datesType
  ) => {
    console.log(place, "destination........")
    console.log(options, "options..........")
    console.log(dates, "dates......")

    dispatch(setLoading(true))
    setLoadingState(true)
    try {
      const { adult, children, room } = options
      const { startDate, endDate } = dates
      console.log(startDate, "startDates......")
      console.log(endDate, "endDates......")

      const { data } = await axiosJWT.get(`${USER_API}/searchedHotels`, {
        params: {
          place,
          adult,
          children,
          room,
          startDate,
          endDate,
        },
      })
      const searchData = {
        place,
        dates: [{ startDate, endDate }],
        options,
      }
      dispatch(setSearchResult(data.data))
      dispatch(setData(searchData))
      navigate("/user/hotels")
    } catch (error) {
      dispatch(setError("Failed to fetch hotels"))
      console.error(error)
    } finally {
      dispatch(setLoading(false))
      setLoadingState(false)
    }
  }

  if (error) {
    dispatch(setError("Failed to fetch hotels"))
    console.error(error)
  }

  return {
    hotels: hotelsData ? hotelsData.Hotels : [],
    place,
    checkInDate,
    checkOutDate,
    setDestination,
    setCheckInDate,
    setCheckOutDate,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    adults,
    setAdults,
    children,
    setChildren,
    rooms,
    setRooms,
    handleSearch,
    loading,
  }
}

export default useUserHotels
