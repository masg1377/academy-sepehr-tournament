import * as yup from "yup";

const addMultiLangValidation = yup.object().shape({
  useCase: yup
    .object()
    .required("Usecase is required!")
    .typeError("Usecase is required!"),
  // version: yup
  //   .string()
  //   .required("Version is required!")
  //   .typeError("Version is required!"),
  language: yup
    .object()
    .required("Language is required!")
    .typeError("Language is required!"),
  // file: yup
  //   .object()
  //   .required("File is required!")
  //   .typeError("File is required!"),
});

export { addMultiLangValidation };
