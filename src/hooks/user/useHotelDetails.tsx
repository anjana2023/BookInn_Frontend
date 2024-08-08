import useSWR from "swr"
import { USER_API } from "../../constants"
import axiosJWT from "../../utils/axiosService";

const fetcher = (url: string) => {
  
  return axiosJWT.get(url).then(res => res.data);
}

const useHotelDetails = (id: string | undefined) => {
  const { data, error, mutate } = useSWR(`${USER_API}/hotelDetails/${id}`, fetcher)

  const reloadHotelDetails = async () => {
    try {
      await mutate()
    } catch (error) {
      console.error("Error reloading hotel details:", error)
    }
  }

  return {
    hotel: data?.Hotel,
    loading: !error && !data,
    error: error,
    reloadHotelDetails
  }
}

export default useHotelDetails
