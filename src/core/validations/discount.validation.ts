import * as yup from "yup";

const addDiscountValidation = yup.object().shape({
  name: yup
    .string()
    .required("Enter the name")
    .typeError("Enter the valid name"),
  // currency: yup
  //   .object()
  //   .required("Enter the currency")
  //   .typeError("Enter the valid currency"),
  percentOff: yup
    .string()
    .matches(/^[\d.]*$/, "Enter valid number")
    .test("percentOff", "Enter valid percentage", (value) =>
      value ? +value > -1 && +value < 101 : true
    )
    .required("Enter the percent off")
    .typeError("Enter the valid percent off"),
  // .when("amount_off", (amount_off: any, schema: any) => {
  //   if (!amount_off) {
  //     return schema
  //       .matches(/^[\d.]*$/, "Enter valid number")
  //       .required("Enter the percent off")
  //       .typeError("Enter the valid percent off");
  //   }
  //   return schema.nullable().notRequired().optional();
  // }),
  // amount_off: yup
  //   .string()
  //   .when("percentOff", (percentOff: any, schema: any) => {
  //     if (!percentOff) {
  //       return schema
  //         .matches(/^[\d.]*$/, "Enter valid number")
  //         .required("Enter the amount off")
  //         .typeError("Enter the valid amount off");
  //     }
  //     return schema.nullable().notRequired().optional();
  //   }),
  // duration: yup
  //   .object()
  //   .required("Enter the duration")
  //   .typeError("Enter the valid duration"),
  maxRedemptions: yup.string().optional().nullable(),
  // expiryDate: yup.date().optional().nullable(),
  // coveredPackages: yup.array().of(yup.string,
  // covered_BTT_Items: null,
  description: yup.string().optional().nullable(),
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

const addDiscountOnBttValidation = yup.object().shape({
  discountName: yup
    .string()
    .required("Enter the name")
    .typeError("Enter the valid name"),
  // currency: yup
  //   .object()
  //   .required("Enter the currency")
  //   .typeError("Enter the valid currency"),
  percentOff: yup
    .string()
    .matches(/^[\d.]*$/, "Enter valid number")
    .test("percentOff", "Enter valid percentage", (value) =>
      value ? +value > -1 && +value < 101 : true
    )
    .matches(/^[\d.]*$/, "Enter valid number")
    .required("Enter the percent off")
    .typeError("Enter the valid percent off"),
  // .when("amount_off", (amount_off: any, schema: any) => {
  //   if (!amount_off) {
  //     return schema
  //       .matches(/^[\d.]*$/, "Enter valid number")
  //       .required("Enter the percent off")
  //       .typeError("Enter the valid percent off");
  //   }
  //   return schema.nullable().notRequired().optional();
  // }),
  // amount_off: yup
  //   .string()
  //   .when("percentOff", (percentOff: any, schema: any) => {
  //     if (!percentOff) {
  //       return schema
  //         .matches(/^[\d.]*$/, "Enter valid number")
  //         .required("Enter the amount off")
  //         .typeError("Enter the valid amount off");
  //     }
  //     return schema.nullable().notRequired().optional();
  //   }),
  // duration: yup
  //   .object()
  //   .required("Enter the duration")
  //   .typeError("Enter the valid duration"),
  maxRedemptions: yup.string().optional().nullable(),
  // expiryDate: yup.date().optional().nullable(),
  // coveredPackages: yup.array().of(yup.string,
  // covered_BTT_Items: null,
  description: yup.string().optional().nullable(),
});

export { addDiscountValidation, addDiscountOnBttValidation };
