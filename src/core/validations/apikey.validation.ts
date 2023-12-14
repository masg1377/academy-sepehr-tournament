import * as yup from "yup";

const resetApiValidation = yup.object().shape({
  description: yup
    .string()
    .required("Description is required!")
    .typeError("Description is required!"),
  quota_extension: yup
    .string()
    .matches(/^\d*$/, "Please enter valid number")
    .required("Extension quota is required!")
    .typeError("Extension quota is required!"),
});

const changeStatusApiValidation = yup.object().shape({
  description: yup
    .string()
    .required("Description is required!")
    .typeError("Description is required!"),
});

export { resetApiValidation, changeStatusApiValidation };
