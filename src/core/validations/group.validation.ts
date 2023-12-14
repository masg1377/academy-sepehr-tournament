import * as yup from "yup";
import { isEmail, urlPattern } from "../utils/regex.utils";

const createGroupBasicInfoValidation = yup.object().shape({
  userRole: yup
    .object()
    .required("User is required!")
    .typeError("Please select correct user"),
  groupName: yup
    .string()
    .required("Name is required!")
    .typeError("Please enter correct name!"),
  groupShortName: yup
    .string()
    .required("Short name is required!")
    .typeError("Please enter correct short name!"),
  groupUsername: yup
    .string()
    .required("Username is required!")
    .typeError("Please enter correct group username!"),
  contactNumber: yup
    .string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$/,
      "Enter a valid contact number"
    )
    .required("Contact number is required!")
    .typeError("Please enter correct contact number!"),
  contactEmail: yup
    .string()
    .required("Contact email is required!")
    .test("contactEmail", "Enter a valid contact email", (value: any) =>
      isEmail(value)
    )
    .typeError("Please enter correct contact email!"),
  address: yup
    .object()
    .required("Address is required!")
    .typeError("Please enter a valid address"),
});

const createGroupTypeValidation = yup.object().shape({
  mls: yup.object().when("groupType", (groupType: any, schema: any) => {
    if (groupType?.mlsGroup) {
      return schema
        .required("Select the mls")
        .typeError("Select the valid mls");
    }
    return schema.nullable().notRequired().optional();
  }),
});

const createGroupExpertiseValidation = yup.object().shape({
  activity_area: yup.array().test({
    message: "You should select at least three positions",
    test: function (arr: any) {
      if (
        this.parent?.activity_area_map?.some((s: any) => s?.paths?.length >= 3)
      )
        return true;
      return arr?.length >= 3;
    },
  }),
});

const groupAddEditLinkValidation = yup.object().shape({
  title: yup
    .string()
    .required("Please enter the title!")
    .typeError("Please enter the title!"),
  category: yup
    .string()
    .required("Please enter the category!")
    .typeError("Please enter the category!"),
  url: yup
    .string()
    .matches(urlPattern, "Enter valid url pattern!")
    .required("Please enter the category!")
    .typeError("Please enter the category!"),
});

const groupInviteMemberValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email!")
    .required("Please enter the email!")
    .typeError("Please enter the email!"),
  role: yup
    .object()
    .required("Please select the role!")
    .typeError("Please select the role!"),
});

export {
  createGroupBasicInfoValidation,
  createGroupTypeValidation,
  createGroupExpertiseValidation,
  groupAddEditLinkValidation,
  groupInviteMemberValidation,
};
