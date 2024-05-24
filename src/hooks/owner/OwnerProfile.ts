import { OwnerInterface } from "../../types/ownerInterface";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { OWNER_API,nameRegex, phoneRegex } from "../../constants";
import showToast from "../../utils/toast";
import axiosJWT from "../../utils/axiosService";
import uploadImagesToCloudinary from "../../api/imageUpload";
axios.defaults.withCredentials = true;

const useOwnerProfile = () => {
  const [profile, setProfile] = useState<OwnerInterface | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email:string
    imageFile: File | null;
  }>({
    name: "",
    phone: "",
    email:"",
    imageFile:null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(OWNER_API + "/profile", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      // .then(({ data }) => {
      //   console.log('then..................',data);
      //   const { owner } = data.user;
      //   setProfile(owner);
      //   console.log('ownerrrrrrrr',owner);
      //   setFormData((prev) => ({
      //     ...prev,
      //     name: owner?.name || "",
      //     email: owner?.email || "",
      //     phone: owner?.phoneNumber || "",
      //   }));
      // })
      .then(({data})=>{
        console.log('Api.',data);
        if(data.success){
          const owner=data.user
          console.log('Owner here',owner);
          setProfile(owner);
          setFormData((prev) => ({
            ...prev,
            name: owner.name || "",
            email: owner.email || "",
            phone: owner.phoneNumber || "",
          }));
        } else {
          showToast("Failed to fetch profile data", "error");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        showToast("Oops!something went wrong","error")}
      );
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name,"-----------",value);

    if (name === "imageFile") {
        const fileInput = e.target as HTMLInputElement;
        const file = fileInput.files && fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setFormData((prev) => ({
                ...prev,
                imageFile: file,
            }));
        }
    } else {
        let errorMessage = "";

        if (name === "name") {
            if (!value.trim()) {
                errorMessage = "Name is required";
            } else if (!nameRegex.test(value)) {
                errorMessage = "First letter must be capital and no leading or trailing space";
            }
            setNameError(errorMessage);
        } else if (name === "phone") {
           if (value.trim()&&!phoneRegex.test(value)) {
                errorMessage = "Phone number must have 10 numbers";
            }
            setPhoneError(errorMessage);
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
};



const handleSubmit = async () => {
  if (!nameError && !phoneError) {
    setIsSubmitting(true);

    try {
      const url = formData.imageFile ? await uploadImagesToCloudinary(formData.imageFile) : profile?.profilePic;
      const profilePicUrl = Array.isArray(url) ? url[0] : url; // Extract the first URL from the array

      await axiosJWT.patch(
        OWNER_API + "/profile/edit",
        {
          name: formData.name,
          phoneNumber: formData.phone,
          profilePic: profilePicUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      showToast("Profile updated successfully");
    } catch (error) {
      showToast("Oops! Something went wrong while updating profile", "error");
    } finally {
      setIsSubmitting(false);
    }
  }
};


  return {
    profile,
    formData,
    nameError,
    phoneError,
    imagePreview,
    isSubmitting,
    handleInputChange,
    handleSubmit
  };
};

export default useOwnerProfile;
