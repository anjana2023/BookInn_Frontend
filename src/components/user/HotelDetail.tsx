import React, { useEffect, useMemo, useState } from "react";
import useHotelDetails from "../../hooks/user/useHotelDetails";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { FormikErrors, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setCheckoutData } from "../../redux/slices/bookingSlice";
import { useAppSelector } from "../../redux/store/store";
import { AiFillStar } from "react-icons/ai";
import dayjs from "dayjs";
import { RoomInterface } from "../../types/roomInterface";
import { setData } from "../../redux/slices/searchingSlice";
import SearchBoxDetail from "./searchDate";
import CustomMap from "../addLocation/Map";
import { BiSolidNavigation } from "react-icons/bi";
import EditReview from "../../components/EditReview"
import { useFetchData } from "../../utils/fetcher";
import { USER_API } from "../../constants";
import ReviewCard from "../Review/ReviewCard";
import StarComponent from "../Review/starComponent";
import noProfile  from "../../assets/images/chat.svg"
import { Review } from "../../types/reviewInterface";

interface RoomNumber {
  number: number;
  unavailableDates: string[];
}

interface Room {
  title: string;
  price: number;
  maxAdults: number;
  maxChildren: number;
  desc: string;
  roomNumbers: RoomNumber[];
}

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
    console.log(data, "review.......")

    if (data) {
      setReview(data.result)
    }
  }, [data])
  
  const sumOfRatings = review
    ? review.reduce((acc, curr) => acc + curr.rating, 0)
    : 0
  const avgRatings = sumOfRatings && review ? sumOfRatings / review.length : 0

  console.log(sumOfRatings, "sum of ratings.........")
  console.log(avgRatings)

  console.log(review, "😆")
  console.log(searchingData.dates, "'''''''''''''''''''''''''''");
  const dates = getDatesInRange(
    searchingData.dates[0].startDate,
    searchingData.dates[0].endDate
  );

  console.log(dates, "dates...........");

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
  console.log(availableRooms, "availableRooms...............");

  const {
    name,
    imageUrls,
    destination,
    description,
    amenities,
    propertyRules,
    stayType,
    address,
    rooms,
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
      // Remove the room from the roomSelections state
      setRoomSelections((prevSelections) => {
        const { [roomId]: removedRoom, ...rest } = prevSelections;
        return rest;
      });
    } else {
      // Create an array of room numbers based on the selected count
      const selectedRoomNumbers = roomNumbers.slice(0, count);

      setRoomSelections((prevSelections) => ({
        ...prevSelections,
        [roomId]: { count, price, roomNumbers: selectedRoomNumbers },
      }));
    }
  };

  const handleReserve = () => {
    const selectedRooms = Object.entries(roomSelections);
    if (selectedRooms.length <= 0) {
      setErr("please select atleast one room");
      return;
    }
    console.log("hloooo");

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
      rooms: selectedRooms,
      checkIn: searchingData.dates[0].startDate,
      checkOut: searchingData.dates[0].endDate,
      adults: searchingData.options.adult,
      children: searchingData.options.children,
    };

    console.log(data,"............................data,,,,,,,,,,,,,,,,,,,,,,,,,");
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
              <Image
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
                alt={`Houseboat ${index + 1}`}
                className="w-full h-40 rounded-lg object-cover shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-gray-700 mb-2">{stayType}</p>
        <p className="text-gray-600 mb-2">{destination}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center mb-4">
            <span className="inline-block bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold mr-2">
              4.97
            </span>
            <span className="text-gray-600">(79 reviews)</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-800 font-medium">Hosted by Kirby</p>
            <p className="text-gray-600">Dedicated workspace</p>
            <p className="text-gray-600">Kirby is a Superhost</p>
            <p className="text-gray-600">Free cancellation before Jun 3</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">What this place offers</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {amenities.map((amenity: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-yellow-100 text-sm text-gray-800 rounded-full shadow-sm"
                >
                  {amenity}
                </span>
              ))}
            </ul>
          </div>
          
          {review && review.length && (
        

        <div className="flex flex-col gap-4  mt-10">
           <p className="text-blue-500 text-thin font-semibold">Review & Rating</p>
  {review && review.map(r => (
    <div key={r?._id} className="flex flex-col border rounded-lg shadow-md p-2 space-y-2 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full w-7 h-7"
            src={r?.userId?.profilePic ? r?.userId?.profilePic : noProfile}
            alt={`${r?.userId?.name}'s Avatar`}
          />
          <div className="text-gray-900 text-xl font-bold">{r?.userId?.name}</div>
        </div>
        <div className="text-gray-400">
          {r?.createdAt && (
            <>{new Date(r.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}</>
          )}
        </div>
      </div>
      <StarComponent stars={r.rating} />
      <div className="mt-2 space-x-2 flex flex-wrap">
        {r?.imageUrls.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover rounded"
            />
          </div>
        ))}
      </div>
      <p className="text-gray-500 text-xl font-thin">{r?.description}</p>
      {r?.userId?._id === user.id && (
        <p
          onClick={() => handleEdit(r?._id)}
          className="text-right font-bold text-orange-400 cursor-pointer"
        >
          Edit
        </p>
      )}
    </div>
  ))}
</div>


      
      )}
      {showReviewModal && (
        <div className="absolute inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50">
          {selectedReviewId && (
            <EditReview
              reviewId={selectedReviewId}
              onClose={handleCloseReviewModal}
            />
          )}
        </div>
      )}
        </div>
        <div>
          <div className="mb-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <div className="text-gray-600">
              <p>{address.streetAddress}, {address.landMark}</p>
              <p>{address.city}</p>
              <p>{address.district}</p>
              <p>{address.country}, {address.pincode}</p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Property Rules</h2>
            <ul className="list-disc list-inside text-gray-600">
              {propertyRules.map((rule: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
            <div>
            <h2 className="text-3xl  mt-2" style={{ fontWeight: "bold" }}>
                  Here to find
                </h2>
                <div className="rounded-md overflow-hidden  mt-4">
                  <CustomMap
                    longitude={hotel.location?.coordinates[0]}
                    latitude={hotel.location?.coordinates[1]}
                    isMarkerDraggable={false}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2 text-blue-500 ">
                  <div className="flex items-center gap-2 hover:text-blue-600">
                    <BiSolidNavigation />
                    <Link
                      to={`https://maps.google.com/?q=${hotel.location?.coordinates[1]},${hotel.location?.coordinates[0]}`}
                      target="_blank"
                      className="font-medium hover:underline font-mono"
                    >
                      Get Direction
                    </Link>
                  </div>
    
      <div className="pt-16">
        <SearchBoxDetail handleSearch={undefined} />
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
            {availableRooms.map((item: RoomInterface) => (
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
  
      </div>
      
    </div>
</div>
    </div>
  </>
);
};

export default HotelDetail;
