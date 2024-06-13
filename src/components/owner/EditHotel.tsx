import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaTrashAlt } from 'react-icons/fa';
import * as Yup from 'yup';
import useHotelDetails from '../../hooks/owner/useHotelDetail';
import { HotelInterface } from '../../types/hotelInterface';
import PhotoUploadModal from './photoUploadModal';
import { OWNER_API } from '../../constants';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import showToast from '../../utils/toast';

const EditHotelForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <p>Error: No hotel ID provided.</p>;
  }

  const { hotel, loading, error } = useHotelDetails(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [newRule, setNewRule] = useState<string>('');
  // const reservationTypes = ['instant', 'approveDecline'];
  const StayTypes = ['House', 'Flat/Appartment', 'Hotel', 'HouseBoat', 'Villa'];
  const allAmenities = [
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
  ];
  useEffect(() => {
    if (hotel) {
      setImages(hotel.imageUrls || []);
    }
  }, [hotel]);

  const handleUpload = (uploadedImages: string[]) => {
    setImages([...images, ...uploadedImages]);
    setIsModalOpen(false);
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setImages(images.filter((image) => image !== imageToRemove));
  };

  const initialValues: Partial<HotelInterface> = {
    name: hotel?.name || '',
    place: hotel?.place || '',
    email: hotel?.email || '',
    address: hotel?.address || {
      streetAddress: '',
      landMark: '',
      district: '',
      city: '',
      pincode: '',
      country: '',
    },
    room: hotel?.room || 0,
    guests: hotel?.guests || 0,
    price: hotel?.price || '',
    description: hotel?.description || '',
    propertyRules: hotel?.propertyRules || [],
    amenities: hotel?.amenities || [],
    // reservationType: hotel?.reservationType || '',
    stayType:hotel?.stayType||'',
    imageUrls: hotel?.imageUrls || [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    place: Yup.string().required('Place is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.object().shape({
      streetAddress: Yup.string().required('Street address is required'),
      landMark: Yup.string().required('Landmark is required'),
      district: Yup.string().required('District is required'),
      city: Yup.string().required('City is required'),
      pincode: Yup.string().required('Pincode is required'),
      country: Yup.string().required('Country is required'),
    }),
    room: Yup.number().required('Room count is required'),
    guests: Yup.number().required('Guests count is required'),
    price: Yup.string().required('Price is required'),
    description: Yup.string().required('Description is required'),
    propertyRules: Yup.array().of(Yup.string()).required('Property rules are required'),
    amenities: Yup.array().of(Yup.string()).required('Amenities are required'),
    imageUrls: Yup.array().of(Yup.string()).required('Images are required'),
  });
 

  const onSubmit = async (values: Partial<HotelInterface>, { setSubmitting }: any) => {
    try {
        const response = await axios.patch(`${OWNER_API}/hotelDetails/edit/${id}`, {
            ...values,
            imageUrls: images,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
      console.log('Hotel details updated successfully:', response.data);
      showToast("Hotel details updated successfully", "success");
     
    } catch (error) {
      showToast("Hotel details updated successfully", "success");
      console.error('Failed to update hotel details:', error);
      
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    enableReinitialize
  >
    {({ values, setFieldValue }) => (
      <Form className="w-full max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 text-lg font-bold mb-2">Hotel Name:</label>
            <Field
              type="text"
              name="name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter hotel name"
            />
            <span className="text-Strawberry_red text-sm"><ErrorMessage name="name" /></span>
          </div>
          <div>
            <label className="text-gray-700 text-lg font-bold mb-2">Place:</label>
            <Field
              type="text"
              name="place"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter the place"
            />
            <span className="text-Strawberry_red text-sm"><ErrorMessage name="place" /></span>
          </div>
          <div>
            <label className="text-gray-700 text-lg font-bold mb-2">Email:</label>
            <Field
              type="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter email"
            />
            <span className="text-Strawberry_red text-sm"><ErrorMessage name="email" /></span>
          </div>
          
          <div>
            <label className="text-gray-700 text-lg font-bold mb-2">Rooms:</label>
            <Field
              type="number"
              name="room"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter number of rooms"
            />
            <span className="text-Strawberry_red text-sm"><ErrorMessage name="room" /></span>
          </div>
          <div>
            <label className="text-gray-700 text-lg font-bold mb-2">Guests:</label>
            <div className="relative flex items-center max-w-[8rem]">
              <button
                type="button"
                onClick={() => setFieldValue("guests", Math.max(0, values.guests - 1))}
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                </svg>
              </button>
              <Field
                type="number"
                name="guests"
                className="w-full bg-gray-50 text-gray-900 text-center rounded-none border-0 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-0 dark:focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setFieldValue("guests", values.guests + 1)}
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
            <span className="text-Strawberry_red text-sm"><ErrorMessage name="guests" /></span>
          </div>
          <div>
            <label className="text-gray-700 text-lg font-bold mb-2">Price:</label>
            <Field
              type="text"
              name="price"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter price"
            />
            <span className="text-Strawberry_red text-sm"><ErrorMessage name="price" /></span>
          </div>
          <div className="col-span-2">
            <label className="text-gray-700 text-lg font-bold mb-2">Description:</label>
            <Field
              as="textarea"
              name="description"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Enter description"
            />
            <span className="text-Strawberry_red text-sm"><ErrorMessage name="description" /></span>
          </div>
          {/* <div className="col-span-2">
            <label className="text-gray-700 text-lg font-bold mb-2">Reservation Type:</label>
            <Field
                as="select"
                name="reservationType"
                className="block w-full px-4 py-2 mt-2 text-gray-700  border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600   focus:outline-none focus:ring"
              >
                {reservationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
            <span className="text-Strawberry_red text-sm"><ErrorMessage name="reservationType" /></span>
          </div> */}
          <div>
              <label className="text-gray-700 text-lg font-bold mb-2">Stay Type:</label>
              <Field
                as="select"
                name="stayType"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="">Select stay type</option>
                {StayTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
              <span className="text-Strawberry_red text-sm">
                <ErrorMessage name="stayType" />
              </span>
            </div>
            
            <div className="col-span-2">
              <label className="text-gray-700 text-lg font-bold mb-2">Amenities:</label>
              <div className="grid grid-cols-2 gap-2">
                {allAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <Field
                      type="checkbox"
                      name="amenities"
                      value={amenity}
                      className="mr-2"
                      checked={values.amenities?.includes(amenity)}
                    />
                    <label>{amenity}</label>
                  </div>
                ))}
              </div>
            </div>
          <div className="col-span-2">
            <label className="text-gray-700 text-lg font-bold mb-2">Property Rules:</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {values.propertyRules && values.propertyRules.map((rule, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 px-2 py-1 rounded-lg">
                  <span>{rule}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedRules = values.propertyRules?.filter((_, i) => i !== index);
                      setFieldValue('propertyRules', updatedRules);
                    }}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <Field
                type="text"
                name="newRule"
                value={newRule}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRule(e.target.value)}
                placeholder="Add new rule"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <button
                type="button"
                onClick={() => {
                  if (newRule) {
                    setFieldValue('propertyRules', [...values.propertyRules!, newRule]);
                    setNewRule('');
                  }
                }}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
          <div className="col-span-2">
              <label className="text-gray-700 text-lg font-bold mb-2">Street Address:</label>
              <Field
                type="text"
                name="address.streetAddress"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Enter street address"
              />
              <span className="text-Strawberry_red text-sm">
                <ErrorMessage name="address.streetAddress" />
              </span>
            </div>
            <div>
              <label className="text-gray-700 text-lg font-bold mb-2">Landmark:</label>
              <Field
                type="text"
                name="address.landMark"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Enter landmark"
              />
              <span className="text-Strawberry_red text-sm">
                <ErrorMessage name="address.landMark" />
              </span>
            </div>
            <div>
              <label className="text-gray-700 text-lg font-bold mb-2">District:</label>
              <Field
                type="text"
                name="address.district"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Enter district"
              />
              <span className="text-Strawberry_red text-sm">
                <ErrorMessage name="address.district" />
              </span>
            </div>
            <div>
              <label className="text-gray-700 text-lg font-bold mb-2">City:</label>
              <Field
                type="text"
                name="address.city"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Enter city"
              />
              <span className="text-Strawberry_red text-sm">
                <ErrorMessage name="address.city" />
              </span>
            </div>
            <div>
              <label className="text-gray-700 text-lg font-bold mb-2">Pincode:</label>
              <Field
                type="text"
                name="address.pincode"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Enter pincode"
              />
              <span className="text-Strawberry_red text-sm">
                <ErrorMessage name="address.pincode" />
              </span>
            </div>
            <div>
              <label className="text-gray-700 text-lg font-bold mb-2">Country:</label>
              <Field
                type="text"
                name="address.country"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Enter country"
              />
              <span className="text-Strawberry_red text-sm">
                <ErrorMessage name="address.country" />
              </span>
            </div>
          <div className="col-span-2">
            <label className="text-gray-700 text-lg font-bold mb-2">Images:</label>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Uploaded ${index}`} className="w-32 h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Upload Images
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Submit
          </button>
        </div>
        <PhotoUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUpload={handleUpload} file={'5'} />
      </Form>
    )}
  </Formik>
);
};


export default EditHotelForm;
