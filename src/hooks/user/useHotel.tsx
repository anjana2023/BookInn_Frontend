import { useState } from "react"
import axiosJWT from "../../utils/axiosService"
import { USER_API } from "../../constants"
import { useAppDispatch, useAppSelector } from "../../redux/store/store"
import { setError, setSearchResult } from "../../redux/slices/destinationSlice"


const useHotelsUser = () => {
  const searchingData = useAppSelector(state => state.searchingSlice)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true);
    try {
      const destination = searchingData.place;
      const { adult, children, room } = searchingData.options;
      const startDate = searchingData.dates[0].startDate;
      const endDate = searchingData.dates[0].endDate;
      const minAmount = searchingData.budget.min.toString();
      const maxAmount = searchingData.budget.max.toString();
      const amenitiesString = searchingData.amenities.join(',');
  
      const { data } = await axiosJWT.get(`${USER_API}/searchedHotels`, {
        params: {
          destination,
          adult,
          children,
          room,
          startDate,
          endDate,
          minPrice: minAmount, // Ensure correct parameter name
          maxPrice: maxAmount, // Ensure correct parameter name
          amenities: amenitiesString,
        },
      });
      dispatch(setSearchResult(data.data));
    } catch (error) {
      dispatch(setError("Failed to fetch hotels"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    handleSearch,
    loading,
  }
}

export default useHotelsUser
