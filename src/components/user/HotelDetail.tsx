import React, { useEffect, useState } from "react";
import useHotelDetails from "../../hooks/user/useHotelDetails";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaPlus } from 'react-icons/fa';
import { setCheckoutData } from "../../redux/slices/bookingSlice";
import { useAppSelector } from "../../redux/store/store";
import SearchBoxDetail from "./searchDate";
import CustomMap from "../addLocation/Map";
import { BiSolidNavigation } from "react-icons/bi";
import EditReview from "../../components/EditReview"
import { useFetchData } from "../../utils/fetcher";
import { USER_API } from "../../constants";
import StarComponent from "../Review/starComponent";
import noProfile  from "../../assets/images/chat.svg"
import { Review } from "../../types/reviewInterface";

interface RoomNumber {
  number: number;
  unavailableDates: string[];
}



interface Room {
  roomId: string;
  roomType: string;
  roomPrice: number;
  count: number;
  price: number;
  roomNumbers: RoomNumber[];
}


const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAppSelector((state) => state.userSlice);
  const { hotel, loading, error } = useHotelDetails(id);
  const [err, setErr] = useState("");
  const [review, setReview] = useState<Review[] | null>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)
  const searchingData = useAppSelector((state) => state.searchingSlice);
  const user = useAppSelector(state => state.userSlice)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [roomSelections, setRoomSelections] = useState<{
    [key: string]: { count: number; price: number; roomNumbers: RoomNumber[] };
  }>({});
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading hotel details</div>;
  }
  if (!hotel) {
    return <div>No hotel data available</div>;
  }
  const { data} = useFetchData<any>(`${USER_API}/getRating/${id}`)

  useEffect(() => {

    if (data) {
      setReview(data.result)
    }
  }, [data])
  
  const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
    const datesArray: string[] = [];
  
    while (currentDate <= end) {
      const formattedDate = new Date(currentDate);
      formattedDate.setUTCHours(0, 0, 0, 0);
      datesArray.push(formattedDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return datesArray;
  };
  


  const sumOfRatings = review
    ? review.reduce((acc, curr) => acc + curr.rating, 0)
    : 0
  const avgRatings = sumOfRatings && review ? sumOfRatings / review.length : 0




  const dates = getDatesInRange(
    searchingData.dates[0].startDate,
    searchingData.dates[0].endDate
  );

  

  const isRoomNumberAvailable = (roomNumber: RoomNumber): boolean => {
    return !roomNumber.unavailableDates.some((date: string) =>
      dates.includes(new Date(date).toISOString().split("T")[0])
    );
  };

  const availableRooms = hotel.rooms
    .filter((room: Room) => {
      const availableRoomNumbers = room.roomNumbers.filter(
        isRoomNumberAvailable
      );
      return availableRoomNumbers.length > 0;
    })
    .map((room: Room) => ({
      ...room,
      roomNumbers: room.roomNumbers.filter(isRoomNumberAvailable),
    }));


    const handleEdit = (id: string) => {
      setSelectedReviewId(id)
      setShowReviewModal(true)
    }

  const {
    name,
    imageUrls,
    destination,
    description,
    amenities,
    propertyRules,
    stayType,
    address,
  } = hotel;

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    roomId: string,
    price: number,
    roomNumbers: RoomNumber[]
  ) => {
    const { value } = e.target;
    setErr("");
    const count = parseInt(value, 10);

    if (count === 0) {
     
      setRoomSelections((prevSelections) => {
        const { [roomId]: removedRoom, ...rest } = prevSelections;
        return rest;
      });
    } else {

      const selectedRoomNumbers = roomNumbers.slice(0, count);

      setRoomSelections((prevSelections) => ({
        ...prevSelections,
        [roomId]: { count, price, roomNumbers: selectedRoomNumbers },
      }));
    }
  };

  const handleReserve = () => {
    const selectedRoomsArray: Room[] = Object.entries(roomSelections).map(([roomId, selection]) => ({
      roomId,
      roomType: availableRooms.find((room: { _id: string; }) => room._id === roomId)?.roomType ?? '',
      roomPrice: availableRooms.find((room: { _id: string; }) => room._id === roomId)?.price ?? 0,
      count: selection.count,
      price: selection.price,
      roomNumbers: selection.roomNumbers,
    }));
    
  
    if (selectedRoomsArray.length <= 0) {
      setErr("Please select at least one room");
      return;
    }

    if (!isAuthenticated) {
      navigate(`/user/auth/login?redirectPath=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

   
    const data = {
      name: hotel?.name ?? "",
      destination: hotel?.place ?? "",
      city: hotel?.address.city ?? "",
      district: hotel?.address.district ?? "",
      pincode: hotel?.address.pincode ?? "",
      country: hotel?.address.country ?? "",
      hotelId: hotel?._id ?? "",
      rooms: selectedRoomsArray,
      checkIn: searchingData.dates[0].startDate,
      checkOut: searchingData.dates[0].endDate,
      adults: searchingData.options.adult,
      children: searchingData.options.children,
    };

    dispatch(setCheckoutData(data));
    navigate(`/user/checkout/${hotel._id}`);
  };

  const handleCloseReviewModal = async() => {
    setSelectedReviewId(null);
    setShowReviewModal(false);
  };

if (showAllPhotos) {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg max-w-3xl w-full shadow-lg">
        <button
          title="button"
          onClick={() => setShowAllPhotos(false)}
          className="absolute top-4 right-4 text-black hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h2 className="text-2xl mb-4 font-semibold">Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imageUrls.map((url: any, index: React.Key | null | undefined) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={url}
                alt={`Photo ${index}`}
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

return (
  <>
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
        <div className="col-span-3">
          <img
            src={imageUrls[0]}
            alt="Houseboat"
            className="w-full h-80 rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="col-span-4 grid grid-cols-2 gap-4">
          {imageUrls.slice(1, 5).map((url: string | undefined, index: React.Key | null | undefined) => (
            <div key={index}>
              <img
                src={url}
                alt="Houseboat"
                className="w-full h-40 rounded-lg object-cover shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        {review ? (
            <div className="flex items-center mb-2 gap-2">
              <StarComponent stars={avgRatings} />
              <span className="text-gray-600">
                {review.length
                  ? `(${review.length} reviews)`
                  : `(not yet rated )`}
              </span>
            </div>
          ) : (
            ""
          )}
        <p className="text-gray-700 mb-2">{stayType}</p>
        <p className="text-gray-600 mb-2">{destination}</p>
      </div>
      <div className="grid  gap-4 mb-6">
       
        
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{description}</p>
            <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">What this place offers</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
  {amenities.map((amenity:any, index:any) => (
    <li
      key={index}
      className="px-3 py-1 bg-gray-200 text-sm text-gray-800 rounded-full shadow-sm flex items-center gap-2"
    >
      <FaPlus className="text-orange-400" />
      {amenity}
    </li>
  ))}
</ul>
      


</div>
          </div>
          <div>
          <div className="pt-16">
        <SearchBoxDetail  />
      </div>
      <div className="p-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100">
              <th className="py-2 px-4 border-r">Room Types</th>
              <th className="py-2 px-4 border-r">Number of guests</th>
              <th className="py-2 px-4 border-r">Price per night</th>
              <th className="py-2 px-4 border-r">No of rooms</th>
            </tr>
          </thead>
          <tbody>
            {availableRooms.map((item:any) => (
              <tr className="border-b" key={item._id}>
                <td className="py-4 px-4 border-r">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-green-600">{item.desc}</p>
                </td>
                <td className="py-4 px-4 border-r">
                  <div className="flex flex-col">
                    <p>Maximum Adults: {item.maxAdults}</p>
                    <p>Maximum Children: {item.maxChildren}</p>
                  </div>
                </td>
                <td className="py-4 px-4 border-r">₹ {item.price}</td>
                <td className="py-4 px-4 border-r">
                  <select
                    title="select"
                    className="border p-2 rounded"
                    onChange={(e) =>
                      handleSelectChange(e, item._id, item.price, item.roomNumbers)
                    }
                  >
                    {Array.from({ length: item.roomNumbers.length + 1 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="py-4 flex justify-center">
          {availableRooms.length > 0 ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleReserve}
            >
              Reserve Room
            </button>
          ) : (
            <span className="text-red-500 text-xl">No rooms available</span>
          )}
        </div>
        <span className="text-red-500 flex justify-center">{err}</span>
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
  {/* Address Section */}
  <div className="border rounded-lg shadow-md p-2">
    <h2 className="text-xl font-semibold mb-2">Address</h2>
    <div className="text-gray-600">
      <p>{address.streetAddress}, {address.landMark}</p>
      <p>{address.city}</p>
      <p>{address.district}</p>
      <p>{address.country}, {address.pincode}</p>
    </div>
  </div>

  {/* Property Rules Section */}
  <div className="border rounded-lg shadow-md p-4">
    <h2 className="text-xl font-semibold mb-2">Property Rules</h2>
    <ul className="list-disc list-inside text-gray-600">
      {propertyRules.map((rule:any, index:any) => (
        <li key={index}>{rule}</li>
      ))}
    </ul>
  </div>

  {/* Map Section */}
  <div className="col-span-2 border rounded-lg shadow-md p-4 mt-4 md:mt-0">
    <h2 className="text-xl font-semibold mb-2">Location</h2>
    <div className="rounded-md overflow-hidden mb-4">
      <CustomMap
        longitude={hotel.location?.coordinates[0]}
        latitude={hotel.location?.coordinates[1]}
        isMarkerDraggable={false}
      />
    </div>
    <div className="flex flex-col gap-2 text-blue-500">
      <div className="flex items-center gap-2 hover:text-blue-600">
        <BiSolidNavigation />
        <Link
          to={`https://maps.google.com/?q=${hotel.location?.coordinates[1]},${hotel.location?.coordinates[0]}`}
          target="_blank"
          className="font-medium hover:underline"
        >
          Get Direction
        </Link>
      </div>
    </div>
  </div>
</div>
          
{review && review.length > 0 && (
  <div className="flex flex-col gap-4 mt-10">
    <p className="text-blue-500 text-lg font-semibold">Review & Rating</p>
    {review.map((r) => (
      <div
        key={r?._id}
        className="flex flex-col border rounded-lg shadow-md p-6 space-y-3 w- bg-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              className="rounded-full w-12 h-12"
              src={r?.userId?.profilePic ? r?.userId?.profilePic : noProfile}
              alt={`${r?.userId?.name}'s Avatar`}
            />
            <div className="text-gray-900 text-xl font-semibold">{r?.userId?.name}</div>
          </div>
          <div className="text-gray-400 text-sm">
            {r?.createdAt && (
              <>
                {new Date(r.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center mt-2">
          <StarComponent stars={r.rating} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {r?.imageUrls.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Preview ${index}`}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
              />
            </div>
          ))}
        </div>
        <p className="text-gray-600 mt-4">{r?.description}</p>
        {r?.userId?._id === user.id && (
          <p
            onClick={() => handleEdit(r?._id)}
            className="text-right font-bold text-orange-500 cursor-pointer"
          >
            Edit
          </p>
        )}
      </div>
    ))}
  </div>
)}
{showReviewModal && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    {selectedReviewId && (
      <EditReview
        reviewId={selectedReviewId}
        onClose={handleCloseReviewModal}
      />
    )}
  </div>
)}

</div>
</div>
   
  </>
);
};

export default HotelDetail;
