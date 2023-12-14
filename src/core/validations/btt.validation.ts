import * as yup from "yup";

const addBttValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required!")
    .typeError("Name is required!"),
  types: yup
    .object()
    .required("Type is required")
    .typeError("Type is required!"),
  boostType: yup.object().optional().nullable(),
  availablePeriod: yup.number().optional().nullable(),
  bttConditions: yup.string().nullable().optional(),
  icon: yup.string().nullable().optional(),
  location: yup
    .array()
    .of(
      yup
        .object()
        .required("Enter the location")
        .typeError("Enter the valid location")
    )
    .when("isGlobal", (isGlobal: any, schema: any) => {
      if (!isGlobal) {
        return schema
          .required("Enter the location")
          .typeError("Enter the valid location");
      }
      return schema.nullable().notRequired().optional();
    }),
  expiryDate: yup.string().when("permanent", (permanent: any, schema: any) => {
    if (!permanent) {
      return schema
        .required("Enter the expiry date")
        .typeError("Enter the valid expiry date");
    }
    return schema.nullable().notRequired().optional();
  }),
});

const addRoleValidation = yup.object().shape({
  roleName: yup
    .string()
    .required("Role name is required!")
    .typeError("Role name is required!"),
  permissions: yup
    .array()
    .required("Select a permission from the list")
    .typeError("Select a permission from the list"),
});

export { addBttValidation, addRoleValidation };
