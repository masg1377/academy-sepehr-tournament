import * as yup from "yup";

export const AddStaffValidation = yup.object().shape({
  staffInvite: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().nullable().notRequired(),
        label: yup
          .string()
          .email("Enter valid email!")
          .required("Enter the staff emails")
          .typeError("Enter the staff emails"),
      })
    )
    .required("Enter the staff emails")
    .typeError("Enter the valid staff emails"),
});
