
import React, { useMemo } from "react"
import useHotelDetails from "../../hooks/user/useHotelDetails"
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { setData } from "../../redux/slices/bookingSlice"
import { AiFillStar } from 'react-icons/ai';
import dayjs from 'dayjs';

const HotelDetail: React.FC = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const today = new Date().toISOString().split("T")[0]
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0]

    const { id } = useParams<{ id: string }>();

      if (!id) {
        return <p>Error: No hotel ID provided.</p>;
      }
    
 
  const { hotel, loading, error } = useHotelDetails(id);
  const formik = useFormik({
    initialValues: {
      checkInDate: today,
      checkOutDate: tomorrow,
      guests: 1,
    },
    validationSchema: Yup.object().shape({
      checkInDate: Yup.date()
        .required("Please enter check-in date")
        .min(today, "Check-in date cannot be before today")
        .max(
          Yup.ref("checkOutDate"),
          "Check-in date cannot be after check-out date"
        ),
      checkOutDate: Yup.date()
        .required("Please enter check-out date")
        .min(
          Yup.ref("checkInDate"),
          "Check-out date must be after or same as check-in date"
        )
        .test(
          "date-difference",
          "Check-out date must be at least one day after check-in date",
          function (value) {
            const checkIn = new Date(this.parent.checkInDate)
            const checkOut = new Date(value)
            const difference =
              (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)
            return difference >= 1
          }
        ),
      guests: Yup.number()
        .required("Please enter the count of guests")
        .min(1, "Minimum number of guests must be 1")
        .integer("Guests must be a whole number")
        .typeError("Please enter a valid number of guests"),
    }),
    onSubmit: values => {
      const data={
        checkIn: values.checkInDate,
        checkOut: values.checkOutDate,
        guests: values.guests,
        price: total,
        days,
        name: hotel?.name ?? "", 
        place: hotel?.place ?? "", 
        image: hotel?.imageUrls[0] ?? "", 
        city: hotel?.address.city ?? "", 
        district: hotel?.address.district ?? "", 
        pincode: hotel?.address.pincode ?? "", 
        country: hotel?.address.country ?? "", 
        hotelId: hotel?._id ?? "" 
      }
      dispatch(setData(data))
      navigate(`/user/checkout/${hotel?._id}`)
    },
  })

  const calculateDays = (checkInDate:any, checkOutDate:any) => {
    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    return Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)
    )
  }

  // const days = useMemo(
  //   () => calculateDays(formik.values.checkInDate, formik.values.checkOutDate),
  //   [formik.values.checkInDate, formik.values.checkOutDate]
  // )

  const days = dayjs(formik.values.checkOutDate).diff(dayjs(formik.values.checkInDate), 'day');
  
  const total = useMemo(() => {
    return hotel ? parseInt(hotel.price) * days : 0
  }, [hotel, days])

  const handleDateChange = (e: any) => {
    formik.handleChange(e)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading hotel details.</p>
  if (!hotel) return <p>No hotel details available.</p>

  const {
    name,
    imageUrls,
    place,
    description,
    amenities,
    room,
    guests: maxGuests,
    price,
    stayType,
    address,
    unavailbleDates: unavailableDatesRaw,
  } = hotel

  // Convert unavailable dates to ISO format, if they exist
  const unavailableDates =
    unavailableDatesRaw?.map(
      date => new Date(date).toISOString().split("T")[0]
    ) || []

  return (
    <div className="max-w-7xl mx-auto p-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="space-y-4">
          <div className="relative">
            <img src={imageUrls[0]} alt={name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
            <div className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md flex items-center">
              <AiFillStar className="text-yellow-500" />
              <span className="ml-1">69 Ratings</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imageUrls.slice(1).map((url, index) => (
              <img key={index} src={url} alt={`${name} ${index}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
            ))}
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-semibold">{name}</h1>
            <p className="text-gray-600">{place}</p>
            <p className="mt-2">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 text-sm text-gray-800 rounded-full shadow-sm">{amenity}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Reservation</h2>
          <p className="text-gray-600">₹{price} per night</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-in</label>
            <input
              type="date"
              {...formik.getFieldProps('checkInDate')}
              value={formik.values.checkInDate}
              aria-label="Check-in date"
              min={dayjs().format('YYYY-MM-DD')}
              onChange={handleDateChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                formik.touched.checkInDate && formik.errors.checkInDate ? 'border-red-500' : ''
              }`}
            />
            {formik.touched.checkInDate && formik.errors.checkInDate && (
              <p className="text-red-600 text-sm">{formik.errors.checkInDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-out</label>
            <input
              type="date"
              {...formik.getFieldProps('checkOutDate')}
              value={formik.values.checkOutDate}
              aria-label="Check-out date"
              min={formik.values.checkInDate}
              onChange={handleDateChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                formik.touched.checkOutDate && formik.errors.checkOutDate ? 'border-red-500' : ''
              }`}
            />
            {formik.touched.checkOutDate && formik.errors.checkOutDate && (
              <p className="text-red-600 text-sm">{formik.errors.checkOutDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Guests</label>
            <input
              type="number"
              {...formik.getFieldProps('guests')}
              value={formik.values.guests}
              min={1}
              aria-label="Number of guests"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                formik.touched.guests && formik.errors.guests ? 'border-red-500' : ''
              }`}
            />
            {formik.touched.guests && formik.errors.guests && (
              <p className="text-red-600 text-sm">{formik.errors.guests}</p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            >
              Book Now
            </button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600 text-sm">₹{price} x {days} nights</p>
            <p className="text-gray-800 text-lg font-semibold">₹{total}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};



export default HotelDetail
