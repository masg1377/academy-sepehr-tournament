import * as yup from "yup";
import { urlPattern } from "../utils/regex.utils";

const addPlatformValidation = yup.object().shape({
  platformName: yup
    .string()
    .required("Enter platform name")
    .typeError("Enter platform name"),

  dashboardAccessUrl: yup
    .string()
    .required("Enter dashboard access url")
    .typeError("Enter dashboard access url"),
  username: yup.string().required("Enter username").typeError("Enter username"),
  password: yup.string().required("Enter password").typeError("Enter password"),
  extraData: yup
    .array()
    .of(
      yup.object().shape({
        order: yup.string().required("Enter order"),
        type: yup.object().required("Enter type"),
        description: yup.string().when("type", {
          is: (obj: any) => {
            return obj && obj.value === 2;
          },
          then: yup
            .string()
            .matches(/^[\d]*$/, "Enter number")
            .required("Enter description"),
          otherwise: yup.string().required("Enter description"),
        }),
      })
    )
    .required(),
});

const addPlatformCredentialValidation = yup.object().shape({
  name: yup.string().optional(),
  feedConnectionType: yup
    .object()
    .required("Enter feed type")
    .typeError("Enter feed type"),
  tokenUrl: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .optional()
    .nullable()
    .notRequired(),
  requestUrl: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .required("Enter request url"),
  clientId: yup.string().optional().nullable().notRequired(),
  clientPassword: yup.string().optional().nullable().notRequired(),
  accessToken: yup.string().optional().nullable().notRequired(),
  scope: yup.string().optional().nullable().notRequired(),
  generateToken: yup.bool().optional().nullable().notRequired(),
  extraData: yup
    .array()
    .of(
      yup.object().shape({
        description: yup.string().required("Enter description"),
        type: yup.object().required("Enter type"),
        order: yup.string().when("type", {
          is: (obj: any) => {
            return obj && obj.value === 2;
          },
          then: yup
            .string()
            .matches(/^[\d]*$/, "Enter number")
            .required("Enter order"),
          otherwise: yup.string().required("Enter order"),
        }),
      })
    )
    .required(),
});

const addPlatformCredentialModalValidation = yup.object().shape({
  platformName: yup.string().optional(),
  tokenUrl: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .optional()
    .nullable()
    .notRequired(),
  requestURL: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .required("Enter request url"),
  clientId: yup.string().optional().nullable().notRequired(),
  clientPassword: yup.string().optional().nullable().notRequired(),
  platformAccessToken: yup.string().optional().nullable().notRequired(),
  scop: yup.string().optional().nullable().notRequired(),
  generateToken: yup.bool().required("Set token generation status"),
  // platformOptions: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       description: yup.string().required("Enter description"),
  //       type: yup.object().required("Enter type"),
  //       order: yup.string().when("type", {
  //         is: (obj: any) => {
  //           return obj && obj.value === 2;
  //         },
  //         then: yup
  //           .string()
  //           .matches(/^[\d]*$/, "Enter number")
  //           .required("Enter order"),
  //         otherwise: yup.string().required("Enter order"),
  //       }),
  //     })
  //   )
  //   .required(),
});

const addCurrentPlatformCredentialModalValidation = yup.object().shape({
  platformCredential: yup
    .object()
    .required("Enter platform credential")
    .typeError("Enter platform credential"),
});

export {
  addPlatformValidation,
  addPlatformCredentialValidation,
  addPlatformCredentialModalValidation,
  addCurrentPlatformCredentialModalValidation,
};
