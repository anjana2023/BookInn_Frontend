import { useEffect, useState } from 'react';
import axios from 'axios';
import { HotelInterface } from '../../types/hotelInterface';
import { ADMIN_API } from '../../constants';

const useHotelDetails = (id: string) => {
  const [hotel, setHotel] = useState<HotelInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const { data } = await axios.get(`${ADMIN_API}/hotelDetails/${id}`);        
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
  console.log(hotel,".............")

  return { hotel, loading, error };
};

export default useHotelDetails;
