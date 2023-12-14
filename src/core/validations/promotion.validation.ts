import * as yup from "yup";

const addPromotionValidation = yup.object().shape({
  name: yup
    .string()
    .required("Enter the name")
    .typeError("Enter the valid name"),

  percentOff: yup
    .string()
    .matches(/^[\d.]*$/, "Enter valid number")
    .test("percentOff", "Enter valid percentage", (value) =>
      value ? +value > -1 && +value < 101 : true
    )
    .matches(/^[\d.]*$/, "Enter valid number")
    .required("Enter the percent off")
    .typeError("Enter the valid percent off"),

  // duration: yup
  //   .object()
  //   .required("Enter the duration")
  //   .typeError("Enter the valid duration"),
  maxRedemptions: yup.string().optional().nullable(),
  expiryDate: yup.date().optional().nullable(),
  // coveredPackages: yup.array().of(yup.string,
  // covered_BTT_Items: null,
  isAuto: yup
    .bool()
    .required("Enter the is auto flag")
    .required("Enter the is auto flag"),
  description: yup.string().optional().nullable(),
  discountCode: yup
    .string()
    .when("isAuto", (isAuto: boolean, schema: any) => {
      if (!isAuto) {
        return schema
          .required("Enter the code")
          .typeError("Enter the valid code");
      }
      return schema.nullable().notRequired().optional();
    })
    .optional()
    .nullable(),
});

export { addPromotionValidation };
