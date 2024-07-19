import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/reducer/reducer"
import { Range } from "react-range"
import { useNavigate } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import useSWR from "swr"
import { ADMIN_API } from "../../constants"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../redux/store/store"
import { setData } from "../../redux/slices/searchingSlice"
import useHotelsUser from "../../hooks/user/useUserHotel"
import SearchBoxUser from "../../components/user/searchBox"
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axiosJWT from "../../utils/axiosService"
 

const STEP = 100
const MIN = 0
const MAX = 100000

const fetcher = (url: string) => axiosJWT.get(url).then(res => res.data)

const Hotels: React.FC = () => {
  const searchData = useAppSelector(state => state.searchingSlice)
  const { handleSearch, loading } = useHotelsUser()
  const dispatch = useAppDispatch()

  const [stayTypes, setStayTypes] = useState<string[]>([])
  const [localLoading, setLocalLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleClick = (id: string) => {
    navigate(`/user/hotelDetails/${id}`)
  }

  const searchResults = useSelector(
    (state: RootState) => state.destinationSlice.search
  )



  useEffect(() => {
    if (!loading) {
      setLocalLoading(false)
    }
  }, [loading])

  const [active, setActive] = React.useState(1);
 
  const getItemProps = (index:any) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    } as any);
 
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
 

  type optionType = {
    adult: number
    children: number
    room: number
  }

  type datesType = {
    startDate: Date
    endDate: Date
  }

  const handleSearchFunction = async (

    place: string,
    options: optionType,
    dates: datesType
  ) => {

    const { startDate, endDate } = dates
    const searchData = {
      place,
      dates: [{ startDate, endDate }],
      options,
    }
    console.log(searchData,".........saecrh datrahdjhadsfgdyfhugdufdgv")
    setLocalLoading(true)
    await dispatch(setData(searchData))
  }

  useEffect(() => {
    if (localLoading) {
      handleSearch()
    }
  }, [searchData, localLoading])

  useEffect(() => {
    if (searchResults.length > 0) {
      window.scrollTo(0, 0)
    }
  }, [searchResults])

  return (
    <div className="md:px-40 lg:px-60 pt-8">
      <SearchBoxUser handleSearch={handleSearchFunction} />
      <div className="grid grid-cols-12 mt-2 min-h-screen">
        <div className="w-full bg-white col-span-12 lg:col-span-3 flex flex-col gap-5 px-2">
          <Formik
            initialValues={{
              StayType: [],
              budget: [MIN, MAX],
              amenities: [],
            }}
            onSubmit={async values => {
              setLocalLoading(true)
              await dispatch(
                setData({
                  stayTypes: values.StayType,
                  budget: { min: values.budget[0], max: values.budget[1] },
                  amenities: values.amenities,
                })
              )
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex-1 bg-gray-100 p-3 rounded-md sticky top-20 h-fit">
                <h1 className="text-lg text-gray-700 mb-2 font-bold">
                  Filter by:
                </h1>
                {/* <div className="mb-4 border p-4 rounded-lg">
                  <h2 className="text-sm font-medium text-gray-700">
                    Stay Type
                  </h2>
                  <ul className="mt-2 space-y-2">
                    {stayTypes.map(category => (
                      <li key={category}>
                        <label className="flex items-center">
                          <Field
                            type="checkbox"
                            name="StayType"
                            value={category._id}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <span className="ml-2 text-gray-700">
                            {category.name}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div className="mb-4 border p-4 rounded-lg">
                  <h2 className="text-sm font-medium text-gray-700">
                    Your budget (per night)
                  </h2>
                  <div className="py-4">
                    <Range
                      step={STEP}
                      min={MIN}
                      max={MAX}
                      values={values.budget}
                      onChange={budget => setFieldValue("budget", budget)}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          className="w-full h-1 bg-gray-300 rounded-lg"
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          className="w-5 h-5 bg-blue-600 rounded-full"
                        />
                      )}
                    />
                  </div>

                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>₹ {values.budget[0]}</span>
                    <span>₹ {values.budget[1]}+</span>
                  </div>
                </div>
                <div className="mb-4 border p-4 rounded-lg">
                  <h2 className="text-sm font-medium text-gray-700">
                    Amenities
                  </h2>
                  <ul className="mt-2 space-y-2">
                    {[
                      "Swimming Pool",
                      "Gym",
                      "Spa",
                      "Restaurant",
                      "Parking",
                      "Free parking on premises",
                      "Kitchen",
                      "Washing Machine",
                      "Air Conditioning",
                      "BBQ grill",
                      "Hot tub",
                      "Beach Access",
                    ].map(amenity => (
                      <li key={amenity}>
                        <label className="flex items-center">
                          <Field
                            type="checkbox"
                            name="amenities"
                            value={amenity}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <span className="ml-2 text-gray-700">{amenity}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="submit"
                  className={`py-2 rounded-lg text-white w-full font-medium cursor-pointer ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Apply filters"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-span-12 lg:col-span-9  bg-gray-100 p-5">
          {searchResults.length > 0 ? (
            searchResults.map(hotel => (
              <div
                key={hotel._id}
                className="flex flex-col p-4 min-w-full my-4 rounded-lg bg-white shadow-md md:max-w-xl md:flex-row transform transition-transform hover:scale-105 hover:shadow-md hover:bg-varGray"
                onClick={() => handleClick(hotel._id.toString())}
              >
                <img
                  className="aspect-square rounded-xl w-full object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={hotel?.imageUrls[0]}
                  alt=""
                />
                <div className="flex flex-col justify-start p-6">
                  <h5 className="mb-2 text-2xl font-bold text-gray-800">
                    {hotel?.name}
                  </h5>
                  <p className="text-xs text-gray-500">{hotel?.place}</p>
                  <p className="mb-4 text-base text-gray-600">
                    {hotel?.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No hotels available</p>
          )}
        </div>
      </div>
      <div className="flex justify-center py-5">
        <div className="flex items-center gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton {...getItemProps(1)}>1</IconButton>
            <IconButton {...getItemProps(2)}>2</IconButton>
            <IconButton {...getItemProps(3)}>3</IconButton>
            <IconButton {...getItemProps(4)}>4</IconButton>
            <IconButton {...getItemProps(5)}>5</IconButton>
          </div>
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={next}
            disabled={active === 5}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hotels
