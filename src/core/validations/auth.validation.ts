import * as yup from "yup";
import { validPasswordRegex } from "../utils/regex.utils";

const loginValidation = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    // .min(8, "Password should greater than 8 character")
    .required("Password is required!"),
});

const emailAuthValidation = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid email!")
    .required("Email is required!"),
});

const codeCheckValidation = yup.object().shape({
  code: yup
    .string()
    .min(6, "Enter valid code!")
    .max(6, "Enter valid code!")
    .required("Code is required!")
    .typeError("Code is required!"),
});

const resetPassValidation = yup.object().shape({
  password: yup
    .string()
    .required("New password is required!")
    .matches(validPasswordRegex, " ")
    .typeError("New password is required!"),
  confirmPassword: yup
    .string()

    .required("Confirm password is required!")
    .test(
      "confirmPassword",
      "Confirm password do not match with new password!",
      function (item) {
        return this.parent.password === item;
      }
    )
    .matches(
      validPasswordRegex,
      "This password is easy to guess. Please use at least 8 characters - symbol (special character), numeric character, uppercase and lowercase letters."
    )
    .typeError("Confirm password is required!"),
});

const changePassValidation = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required!")
    .typeError("Current password is required!"),
  newPassword: yup
    .string()
    .required("New password is required!")
    .matches(
      validPasswordRegex,
      "This password is easy to guess. Please use at least 8 characters - symbol (special character), numeric character, uppercase and lowercase letters."
    )
    .typeError("New password is required!"),
  confirmNewPassword: yup
    .string()
    .required("Retype password is required!")
    .test(
      "confirmNewPassword",
      "Retype password do not match with new password!",
      function (item) {
        return this.parent.newPassword === item;
      }
    )
    .matches(
      validPasswordRegex,
      "This password is easy to guess. Please use at least 8 characters - symbol (special character), numeric character, uppercase and lowercase letters."
    )
    .typeError("Retype password is required!"),
});

const registerValidation = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .matches(validPasswordRegex, " ")
    // .min(8, "Password should greater than 8 character")
    .required("Password is required!")
    .typeError("Password is required!"),
  firstName: yup.string().required("First Name is required!"),
  lastName: yup.string().required("Last Name is required!"),
});

export {
  loginValidation,
  emailAuthValidation,
  registerValidation,
  changePassValidation,
  codeCheckValidation,
  resetPassValidation,
};
