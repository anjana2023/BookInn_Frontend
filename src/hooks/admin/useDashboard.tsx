import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_API } from "../../constants";
import moment from "moment";
import axiosJWT from "../../utils/axiosService";

const useDashboard = () => {
  const [booking, setBooking] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [hotelData, setHotelData] = useState<any>(null);
  const [ownerData, setOwnerData] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);

  const fetchBookings = async () => {
    try {
      const response = await axiosJWT.get(`${ADMIN_API}/bookings`);
      setBooking(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosJWT.get(`${ADMIN_API}/users`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get(`${ADMIN_API}/hotels`);
      setHotelData(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchOwners = async () => {
    try {
      const response = await axiosJWT.get(`${ADMIN_API}/owners`);
      setOwnerData(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchUsers();
    fetchHotels();
    fetchOwners();
  }, []);

  useEffect(() => {
    console.log("Updated booking:", booking);
  }, [booking]);

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  useEffect(() => {
    console.log("Updated hotelData:", hotelData);
  }, [hotelData]);

  useEffect(() => {
    console.log("Updated ownerData:", ownerData);
  }, [ownerData]);

  let Revenue = 0;

  if (booking) {
    Revenue = booking.result.reduce((acc: number, curr: any) => {
      const platformFee = parseFloat(curr.platformFee);
      if (!isNaN(platformFee)) {
        return acc + platformFee;
      } else {
        console.warn(`Invalid platformFee for booking:`, curr);
        return acc;
      }
    }, 0);
  }

  const userCount = userData?.users?.length || "0";
  const ownerCount = ownerData?.owners?.length || "0";
  const hotelCount = hotelData?.Hotels?.length || "0";
  const bookingCount = booking?.result?.length || "0";
  const totalRevenue = Revenue || 0;

  const months = 5;
  const today = new Date();
  const tempData: any[] = [];

  for (let i = 0; i < months; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth() - (months - (i + 1))
    );
    tempData.push({
      date,
      name: moment(date).format("MMM YYYY"),
      users: 0,
      owners: 0,
      hotels: 0,
    });
  }

  useEffect(() => {
    if (userData) {
      tempData.forEach(month => (month.users = 0));
      userData.users.forEach((user: any) => {
        tempData.forEach(month => {
          if (moment(user.createdAt).isSame(month.date, "month")) {
            month.users++;
          }
        });
      });
      setGraphData([...tempData]);
    }
  }, [userData]);

  useEffect(() => {
    if (ownerData) {
      tempData.forEach(month => (month.owners = 0));
      ownerData.owners.forEach((owner: any) => {
        tempData.forEach(month => {
          if (moment(owner.createdAt).isSame(month.date, "month")) {
            month.owners++;
          }
        });
      });
      setGraphData([...tempData]);
    }
  }, [ownerData]);

  useEffect(() => {
    if (hotelData) {
      tempData.forEach(month => (month.hotels = 0));
      hotelData.Hotels.forEach((hotel: any) => {
        tempData.forEach(month => {
          if (moment(hotel.createdAt).isSame(month.date, "month")) {
            month.hotels++;
          }
        });
      });
      setGraphData([...tempData]);
    }
  }, [hotelData]);

  return {
    userCount,
    ownerCount,
    hotelCount,
    bookingCount,
    graphData,
    totalRevenue,
  };
};

export default useDashboard;
