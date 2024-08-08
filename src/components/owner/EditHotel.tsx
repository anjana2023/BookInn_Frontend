import { FC, useState, useEffect, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { hotelAddValidation } from "../../utils/validation";
import { FaTrashAlt } from "react-icons/fa";
import { HotelInterface } from "../../types/hotelInterface";
import showToast from "../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import PhotoUploadModal from "../../components/owner/photoUploadModal";
import { OWNER_API } from "../../constants";
import UploadButton from "../../components/UploadButton";
import OutlinedButton from "../../components/OutlinedButton";
import axiosJWT from "../../utils/axiosService";
import AutoCompleteInput from "./AutoCompleteInput";
import mongoose from "mongoose";

const EditHotelForm: FC = () => {
  const [hotelData, setHotelData] = useState<HotelInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const StayTypes = ["Flat/Appartment", "Hotel", "Villa"];
  const [images, setImages] = useState<(string | null)[]>([]);
  const [hotelDocument, setHotelDocument] = useState<
    (string | ArrayBuffer | null)[]
  >([]);
  const [propertyRules, setPropertyRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);

  const [coordinates, setcoordinates] = useState({
    searchLocation: "",
    location: [0, 0] as [number, number],
  });

  const amenitiesList = [
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
    const fetchHotelData = async () => {
      try {
        const { data } = await axiosJWT.get(`${OWNER_API}/hotelDetails/${id}`);
        setHotelData(data.Hotel);
        setImages(data.Hotel.imageUrls || []);
        setHotelDocument(
          data.Hotel.hotelDocument ? [data.Hotel.hotelDocument] : []
        );
        setPropertyRules(data.Hotel.propertyRules || []);
        setcoordinates({
          searchLocation: data.Hotel.place || "",
          location: data.Hotel.location?.coordinates || [0, 0],
        });
      } catch (error) {
        setError("Failed to fetch hotel details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      // Ensure id is defined
      fetchHotelData();
    }

    return () => {
      console.log("return useffect");
    };
  }, []);

  const addPropertyRule = () => {
    if (newRule.trim() !== "") {
      setPropertyRules([...propertyRules, newRule]);
      setNewRule("");
    }
  };

  const removePropertyRule = (index: number) => {
    setPropertyRules(propertyRules.filter((_, i) => i !== index));
  };

  const handleUpload = (uploadedImages: string[]) => {
    setImages([...images, ...uploadedImages]);

    setIsModalOpen(false);
  };

  const handleHotelDocumentUpload = (
    imageUrls: SetStateAction<(string | ArrayBuffer | null)[]>
  ) => {
    setHotelDocument(imageUrls);
    setIsHotelModalOpen(false);
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setImages(images.filter((image) => image !== imageToRemove));
  };

  const handleRemoveHotelDocument = () => {
    setHotelDocument([]);
  };

  const handleReapply = async () => {
    try {
      const response = await axiosJWT.put(
        `${OWNER_API}/reapply_verification/${id}`,
        {
          status: "pending",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        showToast("Reapplied");
        navigate("/owner/hotels");
        setIsModalOpen(false);
      } else {
        console.error("Failed to reapply verification");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values: HotelInterface) => {
    try {
      const response = await axiosJWT.patch(`${OWNER_API}/editHotel/${id}`, {
        name: values.name,
        place: values.place,
        address: {
          streetAddress: values.address.streetAddress,
          landMark: values.address.landMark,
          district: values.address.district,
          city: values.address.city,
          pincode: values.address.pincode,
          country: values.address.country,
        },
        stayType: values.stayType,
        description: values.description,
        amenities: values.amenities,
        propertyRules,
        imageUrls: images,
        hotelDocument: hotelDocument[0],
        location: {
          type: "Point",
          coordinates: coordinates.location,
        },
        isVerified: "pending",
      });
      showToast(response.data.message);
      navigate("/owner/hotels");
    } catch (error) {
      console.error("Error updating hotel:", error);
      showToast("Failed to update hotel details", "error");
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }


  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          Hotel: hotelData?.Hotel || null,
          _id: hotelData?._id || new mongoose.Types.ObjectId(),
          name: hotelData?.name || "",
          ownerId: hotelData?.ownerId ||null,
          email: hotelData?.email || "", 
          imageUrls: hotelData?.imageUrls || [],
          place: hotelData?.place || "",
          address: {
            streetAddress: hotelData?.address.streetAddress || "",
            landMark: hotelData?.address.landMark || "",
            district: hotelData?.address.district || "",
            city: hotelData?.address.city || "",
            pincode: hotelData?.address.pincode || "",
            country: hotelData?.address.country || "",
          },
          location: {
            type: hotelData?.location?.type || "",
            coordinates: hotelData?.location?.coordinates || [0, 0],
          },
          isVerified: hotelData?.isVerified || "", 
          stayType: hotelData?.stayType || "",
          propertyRules: hotelData?.propertyRules || [], 
          description: hotelData?.description || "",
          amenities: hotelData?.amenities || [],
          createdAt: hotelData?.createdAt || new Date(), 
          updatedAt: hotelData?.updatedAt || new Date(), 
          isBlocked: hotelData?.isBlocked || false, 
          isApproved: hotelData?.isApproved || false, 
          status: hotelData?.status || "", 
          hotelDocument: hotelData?.hotelDocument || "", 
          rejectedReason: hotelData?.rejectedReason || "", 
          unavailbleDates: hotelData?.unavailbleDates || [], 
          rooms: hotelData?.rooms || [], 
        }}
        validationSchema={hotelAddValidation}
        validate={() => {
          const errors: any = {};

          if (propertyRules.length < 2) {
            errors.propertyRules = "At least two rules are required";
          }

          // Validate images
          if (images.length < 3) {
            errors.images = "At least 3 images are required";
          } else if (images.length > 5) {
            errors.images = "No more than 5 images are allowed";
          }

          if (hotelDocument.length < 1) {
            errors.hotelDocument = "Hotel documentation is required";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ values, dirty }) => (
          <div className="px-4 py-7 md:px-14 flex justify-center">
            <div className="px-4 py-7 md:px-14 rounded-3xl shadow-lg border border-spacing-y-9  w-8/12   items-center ">
              <h1 className="p-6 text-2xl md:text-3xl font-bold mb-4 text-center">
                Edit Hotel
              </h1>
              <Form>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Name:
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Name"
                    />
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="name" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Destination:
                    </label>
                    <Field
                      type="text"
                      name="place"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Enter the location"
                    />
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="place" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Type:
                    </label>
                    <Field
                      as="select"
                      name="stayType"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option value="" label="Select stay type" />
                      {StayTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Field>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="stayType" />
                    </span>
                  </div>

                  <div className="col-span-2 bg-blue-gray-50 py-5 rounded-lg">
                    <p className="px-5 text-xl">Address</p>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 px-10">
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Street Address:
                        </label>
                        <Field
                          type="text"
                          name="address.streetAddress"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Street Address"
                        />
                        <span className="text-red-500 text-sm">
                          <ErrorMessage name="address.streetAddress" />
                        </span>
                      </div>

                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Landmark:
                        </label>
                        <Field
                          type="text"
                          name="address.landMark"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Landmark"
                        />
                        <span className="text-red-500 text-sm">
                          <ErrorMessage name="address.landMark" />
                        </span>
                      </div>

                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          District:
                        </label>
                        <Field
                          type="text"
                          name="address.district"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="District"
                        />
                        <span className="text-red-500 text-sm">
                          <ErrorMessage name="address.district" />
                        </span>
                      </div>

                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          City:
                        </label>
                        <Field
                          type="text"
                          name="address.city"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="City"
                        />
                        <span className="text-red-500 text-sm">
                          <ErrorMessage name="address.city" />
                        </span>
                      </div>

                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Pincode:
                        </label>
                        <Field
                          type="text"
                          name="address.pincode"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Pincode"
                        />
                        <span className="text-red-500 text-sm">
                          <ErrorMessage name="address.pincode" />
                        </span>
                      </div>

                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Country:
                        </label>
                        <Field
                          type="text"
                          name="address.country"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Country"
                        />
                        <span className="text-red-500 text-sm">
                          <ErrorMessage name="address.country" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Description:
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      rows={5}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Description"
                    />
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="description" />
                    </span>
                  </div>

                  <div className="col-span-2">
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Amenities:
                    </label>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {amenitiesList.map((amenity, index) => (
                        <label
                          key={index}
                          className="flex items-center text-gray-700"
                        >
                          <Field
                            type="checkbox"
                            name="amenities"
                            value={amenity}
                            checked={values.amenities.includes(amenity)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2">{amenity}</span>
                        </label>
                      ))}
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="amenities" />
                    </span>
                  </div>

                  <div className="col-span-2">
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Property Rules:
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {propertyRules.map((rule, index) => (
                        <div key={index} className="flex items-center">
                          <p className="text-gray-700">{rule}</p>
                          <button
                            type="button"
                            onClick={() => removePropertyRule(index)}
                            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        type="text"
                        value={newRule}
                        onChange={(e) => setNewRule(e.target.value)}
                        placeholder="Add new rule"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />

                      <div className="px-2 pt-2">
                        {" "}
                        <OutlinedButton
                          onclick={addPropertyRule}
                          color={"black"}
                          text={"Add"}
                        />
                      </div>
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="propertyRules" />
                    </span>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="Location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <div className="mt-1">
                      <AutoCompleteInput
                        setFormData={setcoordinates}
                        searchLocation={coordinates.searchLocation}
                      />
                      {/* {error?.searchLocation && (
                      <p className="text-red-500">{error?.searchLocation}</p>
                    )} */}
                    </div>
                  </div>

                  <label className="text-gray-700 text-lg font-bold mb-2">
                    Add Hotel images:
                  </label>
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Upload Photos
                      </button>
                      <UploadButton
                        text={"Upload Photos"}
                        onclick={() => setIsModalOpen(true)}
                      />
                      <p className="ml-4 text-gray-700">
                        {images.length}{" "}
                        {images.length === 1 ? "image" : "images"} uploaded
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative mr-2">
                          <img
                            src={image || "/hotel.jpg"}
                            alt="hotel"
                            className="w-32 h-20 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(image || "")}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 hover:bg-gray-200"
                          >
                            <FaTrashAlt className="text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="images" />
                    </span>
                  </div>

                  <div className="col-span-2">
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Hotel Document:
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {hotelDocument.map((doc, index) => (
                        <div key={index} className="relative">
                          {typeof doc === "string" && doc.endsWith(".pdf") ? (
                            <embed
                              src={doc}
                              type="application/pdf"
                              className="h-40 w-full object-cover rounded-md"
                            />
                          ) : (
                            <img
                              src={doc as string}
                              alt="Hotel"
                              className="h-40 w-full object-cover rounded-md"
                            />
                          )}
                          <button
                            title="btn"
                            className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500"
                            onClick={() => handleRemoveHotelDocument()}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsHotelModalOpen(true)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Hotel Document
                    </button>
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="hotelDocument" />
                    </span>
                  </div>

                  {hotelData?.status === "rejected" ? (
                    <div>
                      <div className="flex justify-center space-x-">
                        <br></br>
                        <button
                          type="button"
                          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md "
                          onClick={handleReapply}
                        >
                          Save and Reapply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="col-span-2 mt-6">
                      <button
                        type="submit"
                        className={`w-full px-6 py-3 rounded-md text-white font-semibold focus:outline-none ${
                          dirty
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                        disabled={!dirty}
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>

      {isModalOpen && (
        <PhotoUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
          file={"5"}
        />
      )}

      {isHotelModalOpen && (
        <PhotoUploadModal
          isOpen={isHotelModalOpen}
          onClose={() => setIsHotelModalOpen(false)}
          onUpload={handleHotelDocumentUpload}
          file={"2"}
          isHotelDocumentUpload={true}
        />
      )}
    </>
  );
};

export default EditHotelForm;
