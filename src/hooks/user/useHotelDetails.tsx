import { useEffect, useState } from 'react';
import axios from 'axios';
import { HotelInterface } from '../../types/hotelInterface';
import { USER_API } from '../../constants';

const useHotelDetails = (id: string) => {
  const [hotel, setHotel] = useState<HotelInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        console.log(`Fetching hotel details for ID: ${id}`);
        const { data } = await axios.get(`${USER_API}/hotelDetails/${id}`);   
        console.log("Hotel details fetched successfully:", data.Hotel);     
        setHotel(data.Hotel);
      } catch (error) {
        setError("Failed to fetch hotel details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);
 
  console.log("Current hotel state:", hotel);

  return { hotel, loading, error };
};

export default useHotelDetails;
