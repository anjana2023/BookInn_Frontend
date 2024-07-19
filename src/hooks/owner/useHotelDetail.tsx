// import { useEffect, useState } from 'react';
// import axiosJWT from '../../utils/axiosService';
// import { HotelInterface } from '../../types/hotelInterface';
// import { OWNER_API } from '../../constants';
// import { useParams } from 'react-router';

// const useHotelDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const [hotel, setHotel] = useState<HotelInterface | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchHotelDetails = async () => {
//     try {
//       console.log(`Fetching hotel details for ID: ${id}`);
//       const { data } = await axiosJWT.get(`${OWNER_API}/hotelDetails/${id}`);
//       console.log("hiiiiiiiiiiiiii:", data.Hotel);
//       setHotel(data.Hotel);
//     } catch (error) {
//       setError("Failed to fetch hotel details");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//     console.log("===========================");
//     fetchHotelDetails();
//   // }, [id]);

//   console.log("Current hotel state:", hotel);

//   return { hotel, loading, error };
// };

// export default useHotelDetails;
