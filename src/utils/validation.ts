import * as yup from "yup";

const noSpacesOrDots = (value: string) => !/[.\s]/.test(value);

export const RegisterValidation = yup.object().shape({
  name: yup
    .string()
    .strict()
    .matches(
      /^[a-zA-Z]+$/,
      "Name must contain only letters and no spaces or dots"
    )
    .required("Name is required")
    .test(
      "no-spaces-dots",
      "Name must not contain spaces or dots",
      noSpacesOrDots
    ),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Minimum 10 numbers required")
    .max(10, "Maximum 10 numbers required")
    .required("Phone number is required"),
    password: yup
    .string()
    .min(8, "Minimum 8 characters required")
    .matches(
      /^(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one digit and one special character"
    )
    .required("Password is required")
    .test(
      "no-spaces-dots",
      "Password must not contain spaces or dots",
      (value) => !/\s/.test(value) && !/\./.test(value)
    ),
  cpassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match")
    .test(
      "no-spaces-dots",
      "Confirm password must not contain spaces or dots",
      (value) => !/\s/.test(value) && !/\./.test(value)
    ),
});

export const LoginValidation = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("Password is required")
    .test(
      "no-spaces-dots",
      "Password must not contain spaces or dots",
      noSpacesOrDots
    ),
});

export const emailValidation = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
});

export const passwordValidation = yup.object().shape({
  password: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("Password is required")
    .test(
      "no-spaces-dots",
      "Password must not contain spaces or dots",
      noSpacesOrDots
    ),
  cpassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match")
    .test(
      "no-spaces-dots",
      "Confirm password must not contain spaces or dots",
      noSpacesOrDots
    ),
});

export const hotelAddValidation = yup.object().shape({
  name: yup.string().required("Hotel name is required"),
  stayType: yup.string().required("Room type is required"),
  place: yup.string().required("Destinaiton is required"),
  address: yup.object().shape({
    streetAddress: yup.string().required("Street address is required"),
    landMark: yup.string().required("Landmark is required"),
    district: yup.string().required("District is required"),
    city: yup.string().required("City is required"),
    pincode: yup
      .string()
      .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required"),
    country: yup.string().required("Country is required"),
  }),
 

  description: yup.string().required("Description is required"),
  amenities: yup
    .array()
    .of(yup.string().required("Amenity is required"))
    .min(1, "At least one amenity is required"),

  
})