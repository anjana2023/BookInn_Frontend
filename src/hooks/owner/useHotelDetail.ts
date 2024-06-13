import { useEffect, useState } from 'react';
import axios from 'axios';
import { HotelInterface } from '../../types/hotelInterface';
import { OWNER_API } from '../../constants';

const useHotelDetails = (id: string) => {
  const [hotel, setHotel] = useState<HotelInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        console.log(`Fetching hotel details for ID: ${id}`);
        console.log(`Fetching hotel details for ID: ${id}`);
        console.log(`Fetching hotel details for ID: ${id}`);

        const { data } = await axios.get(`${OWNER_API}/hotelDetails/${id}`);   
        console.log("hiiiiiiiiiiiiii:", data.Hotel);     
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
