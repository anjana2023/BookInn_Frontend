import { UserInterface } from "../../types/userInterface";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { USER_API, nameRegex, phoneRegex } from "../../constants";
import showToast from "../../utils/toast";
import axiosJWT from "../../utils/axiosService";
import uploadImagesToCloudinary from "../../api/imageUpload";
axios.defaults.withCredentials = true;

const useProfile = () => {
  const [profile, setProfile] = useState<UserInterface | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    imageFile: File | null;
  }>({
    name: "",
    phone: "",
    email: "",
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(USER_API + "/profile", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(({ data }) => {
        const { user } = data;
        setProfile(user);
        setFormData((prev) => ({
          ...prev,
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phoneNumber || "",
        }));
      })
      .catch(() => showToast("Oops!something went wrong", "error"));
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, "-----------", value);

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
          errorMessage =
            "First letter must be capital and no leading or trailing space";
        }
        setNameError(errorMessage);
      } else if (name === "phone") {
        if (value.trim() && !phoneRegex.test(value)) {
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
        const url = formData.imageFile
          ? await uploadImagesToCloudinary(formData.imageFile)
          : profile?.profilePic;

        const profilePicUrl = Array.isArray(url) ? url[0] : url; // Ensure the URL is correctly formatted

        await axiosJWT.patch(
          USER_API + "/profile/edit",
          {
            name: formData.name,
            phoneNumber: formData.phone,
            profilePic: profilePicUrl || profile?.profilePic,
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
    handleSubmit,
  };
};

export default useProfile;
