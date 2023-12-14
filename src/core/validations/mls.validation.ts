import * as yup from "yup";
import { urlPattern } from "../utils/regex.utils";

const addClientRequestValidation = yup.object().shape({
  status: yup.object().required("Enter status").typeError("Enter status"),
  aggrementStartDate: yup.date().optional().nullable(),
  ticketNumber: yup.string().optional().nullable(),
  mlsAccess: yup.object().optional().nullable(),
  platform: yup.object().optional().nullable(),
  agentType: yup
    .object()
    .required("Enter the agent type")
    .typeError("Enter the agent type"),
  agentName: yup.string().optional().nullable(),
  agentMlsId: yup.string().optional().nullable(),
  agentEmail: yup.string().email("Enter valid email").optional().nullable(),
  agentWebsite: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .optional()
    .nullable(),
  brokerName: yup.string().optional().nullable(),
  brokerMlsId: yup.string().optional().nullable(),
  brokerEmail: yup.string().email("Enter valid email").optional().nullable(),
  officeName: yup.string().optional().nullable(),
  officeMlsId: yup.string().optional().nullable(),
  clientSource: yup.string().optional().nullable(),
  comments: yup.string().optional().nullable(),
});

const addClientRequestDocValidation = yup.object().shape({
  status: yup.object().optional().nullable(),
  fileName: yup
    .string()
    .required("Enter file name")
    .typeError("Enter file name"),
  file: yup
    .mixed()
    .required("Enter the file")
    .typeError("Enter the valid file"),
  request_id: yup.mixed().required("Enter the access name"),
});

const addClientRequestDocDetailValidation = yup.object().shape({
  status: yup.object().optional().nullable(),
  fileName: yup
    .string()
    .required("Enter file name")
    .typeError("Enter file name"),
  file: yup
    .mixed()
    .required("Enter the file")
    .typeError("Enter the valid file"),
  // request_id: yup.mixed().required("Enter the access name"),
});

const editClientRequestDocValidation = yup.object().shape({
  status: yup.object().optional().nullable(),
  fileName: yup
    .string()
    .required("Enter file name")
    .typeError("Enter file name"),
});

const addMlsAccessValidation = yup.object().shape({
  platform: yup.object().optional().nullable(),
  feedConnectionType: yup
    .object()
    .required("Enter connection type")
    .typeError("Enter connection type"),
});

const addMlsAccessCredentialValidation = yup.object().shape({
  className: yup
    .string()
    .required("Enter class name")
    .typeError("Enter class name"),
  version: yup.string().required("Enter version").typeError("Enter version"),
  mediaSource: yup
    .string()
    .required("Enter media source")
    .typeError("Enter media source"),
  mediaObjectType: yup
    .string()
    .required("Enter media object type")
    .typeError("Enter media object type"),
  loginURL: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .required("Enter url")
    .typeError("Enter url"),
  authType: yup
    .object()
    .required("Enter auth type")
    .typeError("Enter auth type"),
  retsUserName: yup
    .string()
    .required("Enter rets username")
    .typeError("Enter rets username"),
  retsPassword: yup
    .string()
    .required("Enter rets password")
    .typeError("Enter rets password"),
  agentUsername: yup.string().optional().nullable(),
  agentPassword: yup.string().optional().nullable(),
  requestMethod: yup
    .object()
    .required("Enter request method")
    .typeError("Enter request method"),
  options: yup.string().optional().nullable(),
});

const addMlsConfigValidation = yup.object().shape({
  name: yup.string().required("Enter the name").typeError("Enter the name"),
  resource: yup
    .string()
    .required("Enter the resource")
    .typeError("Enter the resource"),
  query: yup.string().required("Enter the query").typeError("Enter the query"),
  limit: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid limit")
    .required("Enter the limit")
    .typeError("Enter the limit"),
  uniqField: yup
    .string()
    .required("Enter the unique field")
    .typeError("Enter the unique field"),
  // status
  updateInterval: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid update interval")
    .required("Enter the update interval")
    .typeError("Enter the update interval"),
  photoTimeStamp: yup
    .string()
    .required("Enter the photo time stamp")
    .typeError("Enter the photo time stamp"),
});

const addMlsFlatRateItemValidation = yup.object().shape({
  flatRatesFee: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .required("Enter the fee")
    .typeError("Enter the fee"),
  flatRatesInterval: yup
    .object()
    .required("Enter the interval")
    .typeError("Enter the interval"),
  flatRatesStartDate: yup
    .date()
    .required("Enter the start date")
    .typeError("Enter the start date"),
  flatRatesPaymentDayInMth: yup
    .string()
    .required("Enter the payment day")
    .typeError("Enter the payment day")
    .test("paymentDay", "Enter valid number", (val) =>
      val ? +val > 0 && +val < 32 : true
    ),
  flatRatesTarget: yup
    .object()
    .required("Enter the target")
    .typeError("Enter the target"),
  flatRatesDescription: yup.string().optional().nullable(),
});

const addMlsRangeRateItemValidation = yup.object().shape({
  flatRatesFee: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .required("Enter the fee")
    .typeError("Enter the fee"),
  flatRatesInterval: yup
    .object()
    .required("Enter the interval")
    .typeError("Enter the interval"),
  startDate: yup
    .date()
    .required("Enter the start date")
    .typeError("Enter the start date"),
  paymentDay: yup
    .string()
    .required("Enter the payment day")
    .typeError("Enter the payment day")
    .test("paymentDay", "Enter valid number", (val) =>
      val ? +val > 0 && +val < 32 : true
    ),
  flatRatesTarget: yup
    .object()
    .required("Enter the target")
    .typeError("Enter the target"),
  flatRatesDescription: yup.string().optional().nullable(),
  contractType: yup
    .object()
    .required("Enter the contract type")
    .typeError("Enter the contract type"),
  from: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .required("Enter the from")
    .typeError("Enter the from"),
  to: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .required("Enter the from")
    .typeError("Enter the from"),
  perType: yup
    .object()
    .required("Enter the per type")
    .typeError("Enter the per type"),
});

const addMlsPaymentMethodValidation = yup.object().shape({
  dataUrl: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .required("Enter the data url")
    .typeError("Enter the data url"),
  setupFee: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .optional()
    .nullable(),
  reactivationFee: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .optional()
    .nullable(),
  lambdaArn: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .optional()
    .nullable(),
  paymentURL: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .optional()
    .nullable(),
  // status
  paymentUserName: yup.string().optional().nullable(),
  paymentPassword: yup.string().optional().nullable(),
  paymentDetails: yup.string().optional().nullable(),
  isAutoBilling: yup.bool().optional().nullable(),
});

const addMlsPaymentMethodDetailValidation = yup.object().shape({
  data_url: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .required("Enter the data url")
    .typeError("Enter the data url"),
  setup_fee: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .optional()
    .nullable(),
  reactivation_fee: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .optional()
    .nullable(),
  lambda_arn: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .optional()
    .nullable(),
  payment_url: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .optional()
    .nullable(),
  // status
  payment_username: yup.string().optional().nullable(),
  payment_password: yup.string().optional().nullable(),
  // paymentDetails: yup.string().optional().nullable(),
  is_auto_billing: yup.bool().optional().nullable(),
});

const addMlsConfigAccessValidation = yup.object().shape({
  configName: yup
    .string()
    .required("Enter the name")
    .typeError("Enter the name"),
  configResource: yup
    .string()
    .required("Enter the resource")
    .typeError("Enter the resource"),
  configQuery: yup
    .string()
    .required("Enter the query")
    .typeError("Enter the query"),
  configLimit: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid limit")
    .required("Enter the limit")
    .typeError("Enter the limit"),
  uniqField: yup
    .string()
    .required("Enter the unique field")
    .typeError("Enter the unique field"),
  // status
  updateInterval: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid update interval")
    .required("Enter the update interval")
    .typeError("Enter the update interval"),
  photoTimeStamp: yup
    .string()
    .required("Enter the photo time stamp")
    .typeError("Enter the photo time stamp"),
});

const addMlsServerValidation = yup.object().shape({
  mlsName: yup
    .string()
    .required("Enter mls name")
    .typeError("Enter valid mls name"),
  mlsShortName: yup
    .string()
    .required("Enter mls short name")
    .typeError("Enter valid mls short name"),
  image: yup.string().optional().nullable(),
  country: yup.object().optional().nullable(),
  status: yup.bool().required("Enter status").typeError("Enter status"),
  report_status: yup.bool().optional().nullable(),
  contract_type: yup.object().optional().nullable(),
  reportInterval: yup
    .object()
    .when("report_status", (report_status: any, schema: any) => {
      if (report_status) {
        return schema
          .required("Enter the report interval")
          .typeError("Enter the valid report interval");
      }
      return schema.nullable().notRequired().optional();
    }),
  reportDayOfMmonth: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .test("reportDayOfMmonth", "Enter valid day", (value) =>
      value ? +value > 0 && +value < 32 : true
    )
    .when("report_status", (report_status: any, schema: any) => {
      if (report_status) {
        return schema
          .required("Enter the report day of month")
          .typeError("Enter the valid report day of month");
      }
      return schema.nullable().notRequired().optional();
    }),
  website: yup
    .string()
    .nullable()
    .matches(urlPattern, "Enter valid url")
    .optional()
    .notRequired(),
  contact_email: yup
    .string()
    .email("Enter valid email")
    .optional()
    .nullable()
    .notRequired(),
  contact_number: yup
    .string()
    .matches(/^(\+)?([\d]*)$/, "Please enter a valid number")
    .nullable()
    .optional()
    .notRequired(),
});

const addMlsServerButtonValidation = yup.object().shape({
  mlsName: yup
    .string()
    .required("Enter mls name")
    .typeError("Enter valid mls name"),
  mlsShortName: yup
    .string()
    .required("Enter mls short name")
    .typeError("Enter valid mls short name"),

  image: yup.string().optional().nullable(),
  country: yup.object().optional().nullable(),
  status: yup.bool().required("Enter status").typeError("Enter status"),
  report_status: yup.bool().optional().nullable(),
  contract_type: yup.object().optional().nullable(),
  reportInterval: yup
    .object()
    .when("report_status", (report_status: any, schema: any) => {
      if (report_status) {
        return schema
          .required("Enter the report interval")
          .typeError("Enter the valid report interval");
      }
      return schema.nullable().notRequired().optional();
    }),
  reportDayOfMmonth: yup
    .string()
    .matches(/^[\d]*$/, "Enter valid number")
    .test("reportDayOfMmonth", "Enter valid day", (value) =>
      value ? +value > 0 && +value < 32 : true
    )
    .when("report_status", (report_status: any, schema: any) => {
      if (report_status) {
        return schema
          .required("Enter the report day of month")
          .typeError("Enter the valid report day of month");
      }
      return schema.nullable().notRequired().optional();
    }),
  website: yup
    .string()
    .matches(urlPattern, "Enter valid url")
    .optional()
    .nullable()
    .notRequired(),
  contact_email: yup
    .string()
    .email("Enter valid email")
    .optional()
    .nullable()
    .notRequired(),
});

const addMlsDocValidation = yup.object().shape({
  documentType: yup
    .object()
    .required("Enter document type")
    .typeError("Enter valid document type"),
  documentName: yup
    .string()
    .required("Enter document name")
    .typeError("Enter valid document name"),
  file: yup
    .mixed()
    .required("Enter the file")
    .typeError("Enter the valid file"),
});

const editMlsDocValidation = yup.object().shape({
  documentType: yup
    .object()
    .required("Enter document type")
    .typeError("Enter valid document type"),
  documentName: yup
    .string()
    .required("Enter document name")
    .typeError("Enter valid document name"),
});

export {
  addMlsServerValidation,
  addMlsDocValidation,
  addMlsConfigValidation,
  editMlsDocValidation,
  addMlsAccessValidation,
  addMlsAccessCredentialValidation,
  addMlsConfigAccessValidation,
  addMlsPaymentMethodValidation,
  addMlsRangeRateItemValidation,
  addClientRequestValidation,
  addClientRequestDocValidation,
  editClientRequestDocValidation,
  addMlsFlatRateItemValidation,
  addMlsServerButtonValidation,
  addMlsPaymentMethodDetailValidation,
  addClientRequestDocDetailValidation,
};
