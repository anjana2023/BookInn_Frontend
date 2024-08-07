import { useEffect, useState } from 'react';
import axiosJWT from '../../utils/axiosService';
import { HotelInterface } from '../../types/hotelInterface';
import { ADMIN_API } from '../../constants';

const useHotelDetails = (id: string) => {
  const [hotel, setHotel] = useState<HotelInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const { data } = await axiosJWT.get(`${ADMIN_API}/hotelDetails/${id}`);        
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


  return { hotel, loading, error };
};

export default useHotelDetails;
