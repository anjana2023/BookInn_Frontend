// import { ChangeEvent, useState } from "react";
// import uploadImagesToCloudinary from "../../api/imageUpload";
// import { OWNER_API, emailRegex } from "../../constants";
// import axios from "axios";
// import showToast from "../../utils/toast";

// const predefinedAmenities = [
//   "Swimming Pool",
//   "Gym",
//   "Spa",
//   "Restaurant",
//   "Parking",
// ];

// interface Room {
//   type: string;
//   price: string;
//   number: string;
// }

// interface FormData {
//   name: string;
//   email: string;
//   place: string;
//   description: string;
//   propertyRules: string[];
//   aboutProperty: string;
//   rooms: Room[];
//   amenities: string[];
//   imageUrls: string[];
//   imageFile: File[];
// }

// const useHotel = () => {
//   const [emailError, setEmailError] = useState<string | null>(null);
//   const [placeError, setPlaceError] = useState<string | null>(null);
//   const [descriptionError, setDescriptionError] = useState<string | null>(null);
//   const [aboutPropertyError, setAboutPropertyError] = useState<string | null>(
//     null
//   );

//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     place: "",
//     description: "",
//     propertyRules: [""],
//     aboutProperty: "",
//     rooms: [],
//     amenities: [],
//     imageFile: [] as File[],
//     imageUrls: [] as string[],
//   });

//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [roomTypes, setRoomTypes] = useState([
//     { name: "Single", enabled: false },
//     { name: "Double", enabled: false },
//     { name: "Duplex", enabled: false },
//   ]);
//   const [selectedDescription, setSelectedDescription] = useState("");

//   const handleDescriptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setSelectedDescription(e.target.value);
//     setFormData({ ...formData, description: e.target.value });
//   };
//   console.log(formData.imageFile, "mmmmmmmmmmmmmm");
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setFormData((prev) => ({
//         ...prev,
//         imageFile: files,
//       }));
//     }
//   };

//   const handleChange = (
//     e:
//       | ChangeEvent<HTMLInputElement>
//       | ChangeEvent<HTMLTextAreaElement>
//       | ChangeEvent<HTMLSelectElement>,
//     index: number | null = null,
//     fieldName: string
//   ) => {
//     let errorMessage = "";
//     const { name, value } = e.target;

//     if (fieldName === "image") {
//       const fileInput = e.target as HTMLInputElement;
//       const files = fileInput.files;

//       if (files && files.length > 0) {
//         const file = files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setImagePreview(reader.result as string);
//         };
//         reader.readAsDataURL(file);
//         setFormData((prev) => ({
//           ...prev,
//           imageFile: [file],
//         }));
//       }
//     } else if (fieldName === "email") {
//       if (!emailRegex.test(value)) {
//         errorMessage = "Please enter a valid email address";
//       }
//       setEmailError(errorMessage);
//       setFormData({ ...formData, [name]: value });
//     } else if (fieldName === "place") {
//       if (value.length < 5) {
//         errorMessage = "Please enter at least 5 characters";
//       }
//       setPlaceError(errorMessage);
//       setFormData({ ...formData, [name]: value });
//     } else if (fieldName === "description") {
//       setFormData({ ...formData, [name]: value });
//     } else if (fieldName === "aboutProperty") {
//       if (value.length < 15) {
//         errorMessage = "Please enter at least 15 characters";
//       }
//       setAboutPropertyError(errorMessage);
//       setFormData({ ...formData, [name]: value });
//     } else if (fieldName === "propertyRules") {
//       const updatedRules = [...formData.propertyRules];
//       if (index !== null) {
//         updatedRules[index] = value;
//       }
//       setFormData({ ...formData, propertyRules: updatedRules });
//     } else if (fieldName.includes("rooms")) {
//       const [field, property] = fieldName.split("_");
//       setFormData((prevFormData) => {
//         const updatedRooms = [...prevFormData.rooms];
//         if (!updatedRooms[Number(index)]) {
//           updatedRooms[Number(index)] = {
//             type: roomTypes[Number(index)].name,
//             price: "",
//             number: "",
//           };
//         }
//         updatedRooms[Number(index)] = {
//           ...updatedRooms[Number(index)],
//           [property]: value,
//         };
//         return { ...prevFormData, rooms: updatedRooms };
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleRoomEnabledChange = (roomType: string) => {
//     setRoomTypes((prevRoomTypes) =>
//       prevRoomTypes.map((rt) =>
//         rt.name === roomType ? { ...rt, enabled: !rt.enabled } : rt
//       )
//     );
//     setFormData((prevFormData) => {
//       const updatedRooms = prevFormData.rooms.filter(
//         (room) => room.type !== roomType
//       );

//       const roomTypeObj = roomTypes.find((rt) => rt.name === roomType);

//       if (roomTypeObj && !roomTypeObj.enabled) {
//         updatedRooms.push({ type: roomType, price: "", number: "" });
//       }

//       return { ...prevFormData, rooms: updatedRooms };
//     });
//   };

//   const handleAddAmenity = (selectedAmenity: string) => {
//     if (formData.amenities.includes(selectedAmenity)) {
//       const updatedAmenities = formData.amenities.filter(
//         (amenity) => amenity !== selectedAmenity
//       );
//       setFormData({ ...formData, amenities: updatedAmenities });
//     } else {
//       setFormData({
//         ...formData,
//         amenities: [...formData.amenities, selectedAmenity],
//       });
//     }
//   };

//   const handleAddMore = (fieldName: string) => {
//     if (fieldName === "propertyRules") {
//       setFormData({
//         ...formData,
//         propertyRules: [...formData.propertyRules, ""],
//       });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       console.log(formData, "-----------");
      
//       const response = await axios.post(
//         OWNER_API + "/addHotel",

//         formData,

//         {
//           headers: {
//             authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );

//       // Show success message
//       showToast(response.data.message);
//     } catch (error) {
//       // Handle error
//       showToast(
//         error.response?.data?.message || "Failed to add hotel",
//         "error"
//       );
//     }
//   };

//   return {
//     formData,
//     setFormData,
//     handleChange,
//     handleAddMore,
//     handleSubmit,
//     handleRoomEnabledChange,
//     handleDescriptionChange,
//     emailError,
//     placeError,
//     descriptionError,
//     aboutPropertyError,
//     handleAddAmenity,
//     predefinedAmenities,
//     imagePreview,
//     roomTypes,
//     handleImageChange,
//     selectedDescription,
//   };
// };

// export default useHotel;
