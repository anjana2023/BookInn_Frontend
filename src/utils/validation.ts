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
