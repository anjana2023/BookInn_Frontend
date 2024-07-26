import axiosJWT from "../../utils/axiosService"
import { useState, useEffect } from "react"
import { USER_API } from "../../constants"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  setLoading,
  setError,
  setSearchResult,
} from "../../redux/slices/destinationSlice"
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
  const [hotelsData, setHotelsData] = useState<HotelInterface[]>([])
  const [error, setErrorState] = useState<string | null>(null)

  const fetchHotels = async () => {
    try {
      const response = await axiosJWT.get(`${USER_API}/hotels`)
      console.log(response,"......respomse.....")
      setHotelsData(response.data.Hotels)
      setLoadingState(false)
    } catch (err) {
      setErrorState("Failed to fetch hotels")
      setLoadingState(false)
      console.error(err)
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  useEffect(() => {
    if (error) {
      dispatch(setError(error))
    }
  }, [error, dispatch])

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
  console.log(hotelsData, "hotels....")

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
    } catch (err) {
      dispatch(setError("Failed to fetch hotels"))
      console.error(err)
    } finally {
      dispatch(setLoading(false))
      setLoadingState(false)
    }
  }

  return {
    hotels: hotelsData ? hotelsData : [],
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
