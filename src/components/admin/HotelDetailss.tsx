import React from "react";
import useHotelDetails from "../../hooks/admin/useHotelDetails";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
// import { setData } from "../../redux/slices/bookingslice"

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
  // const formik = useFormik({
  //   initialValues: {
  //     checkInDate: today,
  //     checkOutDate: tomorrow,
  //     guests: 1,
  //   },
  //   validationSchema: Yup.object().shape({
  //     checkInDate: Yup.date()
  //       .required("Please enter check-in date")
  //       .min(today, "Check-in date cannot be before today")
  //       .max(
  //         Yup.ref("checkOutDate"),
  //         "Check-in date cannot be after check-out date"
  //       ),
  //     checkOutDate: Yup.date()
  //       .required("Please enter check-out date")
  //       .min(
  //         Yup.ref("checkInDate"),
  //         "Check-out date must be after or same as check-in date"
  //       )
  //       .test(
  //         "date-difference",
  //         "Check-out date must be at least one day after check-in date",
  //         function (value) {
  //           const checkIn = new Date(this.parent.checkInDate)
  //           const checkOut = new Date(value)
  //           const difference =
  //             (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)
  //           return difference >= 1
  //         }
  //       ),
  //     guests: Yup.number()
  //       .required("Please enter the count of guests")
  //       .min(1, "Minimum number of guests must be 1")
  //       .integer("Guests must be a whole number")
  //       .typeError("Please enter a valid number of guests"),
  //   }),
  //   onSubmit: values => {
  //     const data={
  //       checkIn: values.checkInDate,
  //       checkOut: values.checkOutDate,
  //       guests: values.guests,
  //       price: total,
  //       days,
  //       name: hotel?.name ?? "", 
  //       destination: hotel?.place ?? "", 
  //       city: hotel?.address.city ?? "", 
  //       district: hotel?.address.district ?? "", 
  //       pincode: hotel?.address.pincode ?? "", 
  //       country: hotel?.address.country ?? "", 
  //       hotelId: hotel?._id ?? "" 
  //     }
  //     dispatch(setData(data))
  //     navigate(`/user/checkout/${hotel?._id}`)
  //   },
  // })

  // const calculateDays = (checkInDate, checkOutDate) => {
  //   const checkIn = new Date(checkInDate)
  //   const checkOut = new Date(checkOutDate)
  //   return Math.ceil(
  //     (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)
  //   )
  // }

  // const days = useMemo(
  //   () => calculateDays(formik.values.checkInDate, formik.values.checkOutDate),
  //   [formik.values.checkInDate, formik.values.checkOutDate]
  // )

  // const total = useMemo(() => {
  //   return hotel ? parseInt(hotel.price) * days : 0
  // }, [hotel, days])

  // const handleDateChange = (e: any) => {
  //   formik.handleChange(e)
  // }

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
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Images at the top */}
      <div className="mb-6 h-2/5">
        <div className="grid grid-cols-2 gap-2">
          <img
            src={imageUrls[0]}
            alt="Houseboat"
            className="h-full object-cover rounded-lg mb-2 col-span-1"
          />
          <div className="grid grid-cols-2 gap-2">
            {imageUrls.slice(1, 5).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Houseboat ${index + 1}`}
                className="h-full object-cover rounded-lg col-span-1"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Details below */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-gray-700 mb-2">
            {room} room.
          </p>
          <p className="text-gray-600 mb-2">{place}</p>
          <div className="flex items-center mb-2">
            <span className="inline-block bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold mr-2">
              4.97
            </span>
            <span className="text-gray-600">(79 reviews)</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-800 mb-1">Hosted by Kirby</p>
            <p className="text-gray-600 mb-1">Dedicated workspace</p>
            <p className="text-gray-600 mb-1">Kirby is a Superhost</p>
            <p className="text-gray-600 mb-1">Free cancellation before Jun 3</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              What this place offers
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:ml-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            {/* <form onSubmit={formik.handleSubmit}>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-800 font-semibold text-lg">
                    ₹{price} / night
                  </p>
                  <p className="text-gray-600 text-sm">
                    Includes taxes and fees
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Check-in
                </label>
                <input
                  type="date"
                  {...formik.getFieldProps("checkInDate")}
                  value={formik.values.checkInDate}
                  aria-label="Check-in date"
                  min={today}
                  max={(() => {
                    const checkOutDate = new Date(formik.values.checkOutDate)
                    checkOutDate.setDate(checkOutDate.getDate() - 1)
                    return checkOutDate.toISOString().split("T")[0]
                  })()} // Ensure check-in date is not after check-out date
                  onChange={handleDateChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                    formik.touched.checkInDate && formik.errors.checkInDate
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.checkInDate && formik.errors.checkInDate && (
                  <p className="text-red-600 text-sm">
                    {formik.errors.checkInDate}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Check-out
                </label>
                <input
                  type="date"
                  {...formik.getFieldProps("checkOutDate")}
                  value={formik.values.checkOutDate}
                  aria-label="Check-out date"
                  min={formik.values.checkInDate} // Ensure check-out date is not before check-in date
                  onChange={handleDateChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                    formik.touched.checkOutDate && formik.errors.checkOutDate
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.checkOutDate && formik.errors.checkOutDate && (
                  <p className="text-red-600 text-sm">
                    {formik.errors.checkOutDate}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Guests
                </label>
                <input
                  type="number"
                  {...formik.getFieldProps("guests")}
                  value={formik.values.guests}
                  min={1} // Ensure minimum value is 1
                  aria-label="Number of guests"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 ${
                    formik.touched.guests && formik.errors.guests
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.guests && formik.errors.guests && (
                  <p className="text-red-600 text-sm">{formik.errors.guests}</p>
                )}
              </div>

              <div className="text-gray-600 text-base mt-4">
                <p className="mb-2">
                  ₹{price} x {days} nights
                </p>
                <p className="font-semibold"> ₹{total}</p>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold mt-4"
              >
                Reserve
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelDetail
