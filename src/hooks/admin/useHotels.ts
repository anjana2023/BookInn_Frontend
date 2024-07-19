import axiosJWT from "../../utils/axiosService"
import { useEffect, useState } from "react"
import { ADMIN_API } from "../../constants"
import { HotelInterface } from "../../types/hotelInterface"

const useHotelList = () => {
  const [hotels, setHotels] = useState<HotelInterface[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axiosJWT.get(`${ADMIN_API}/hotels`
        )
        setHotels(data.Hotels)
      } catch (error) {
        setError("Failed to fetch hotels")
        console.error(error)
      }
    }

    fetchHotels()
  }, [])

  return { hotels, error }
}

export default useHotelList
