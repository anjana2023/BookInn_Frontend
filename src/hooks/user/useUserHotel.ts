import axios from "axios"
import { useEffect, useState } from "react"
import { USER_API } from "../../constants"
import { HotelInterface } from "../../types/hotelInterface"

const useUserHotels = () => {
  const [hotels, setHotels] = useState<HotelInterface[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get(`${USER_API}/hotels`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
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

export default useUserHotels
