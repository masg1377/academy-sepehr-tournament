import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { Typography } from "@src/components/common/Typography";
import { Divider } from "@src/components/common/divider/Divider";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import { LogoUploader } from "@src/components/common/form/Fields/LogoUploader/LogoUploader";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import {
  useCheckGroupEmail,
  useCheckGroupUsername,
} from "@src/core/services/api/group/group.api";
import { createGroupBasicInfoValidation } from "@src/core/validations/group.validation";
import { useFormikContext } from "formik";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Col } from "reactstrap";
import DescItem from "./DescItem";
import { WizardComponentsWrapper } from "../WizardComponentsWrapper";
import { GoogleMaps } from "@src/components/common/GoogleMap";

// regex
// ^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$ => contact_number
// ^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$' => contact_email

interface IGroupGeneralInformationProp {
  stepper: any;
  setStepper: React.Dispatch<any>;
  stepNumber: number;
  setInitialValues: (val: any) => void;
  isSubmiting?: boolean;
  details?: any;
  setUsernameError: React.Dispatch<React.SetStateAction<string>>;
  usernameError: string;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  isLoading?: boolean;
}

const GroupGeneralInformation: FC<IGroupGeneralInformationProp> = ({
  stepper,
  setStepper,
  stepNumber,
  setInitialValues,
  isSubmiting,
  details,
  setUsernameError,
  usernameError,
  emailError,
  setEmailError,
  isLoading,
}): JSX.Element => {
  const { setFieldValue, setFieldError } = useFormikContext<any>();

  //* =======================
  const [userSelectOptionList, setUserSelectOptionList] = useState<any[]>([]);

  const [filterList, setFilterList] = useState<TGetEntities>({
    entity: "users",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: 1000,
        offset: 0,
      },
    },
  });

  //* Custom Hooks
  const getUserList = useGetListOfEntity();
  const checkUsername = useCheckGroupUsername();
  const checkEmail = useCheckGroupEmail();

  const userNameRef = useRef<NodeJS.Timeout>();

  const onCheckUsername = (user: string) => {
    clearTimeout(userNameRef.current);
    const timeOut = setTimeout(() => {
      checkUsername.mutate(user, {
        onSuccess: (res) => {
          if (details?.groupUsername !== user) {
            if (res.data.is_success && res.data.result?.username?.status) {
              setUsernameError("");
            } else {
              setFieldError(
                "groupUsername",
                res.data.result?.username?.message
              );
              setUsernameError(res.data.result?.username?.message);
            }
          }
        },
      });
    }, 700);

    userNameRef.current = timeOut;
  };

  const emailRef = useRef<NodeJS.Timeout>();

  const onCheckEmail = (email: string) => {
    clearTimeout(emailRef.current);
    const timeOut = setTimeout(() => {
      checkEmail.mutate(email, {
        onSuccess: (res) => {
          if (details?.contactEmail !== email) {
            if (res.data.is_success && res.data.result?.contact_email?.status) {
              setEmailError("");
            } else {
              setFieldError(
                "contactEmail",
                res.data.result?.contact_email?.message
              );
              setEmailError(res.data.result?.contact_email?.message);
            }
          }
        },
      });
    }, 700);

    emailRef.current = timeOut;
  };

  const loadUserSelectOptionData = () => {
    getUserList.mutate(filterList, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          result?.map((item: any) =>
            setUserSelectOptionList((prev) => [
              ...prev,
              {
                value: item?.id,
                label: `${item?.first_name} ${item?.last_name}`,
              },
            ])
          );
          // console.log(result);
        }
      },
      onError: (err: any) => {
        console.log("error : ", err);
      },
    });
  };

  useEffect(() => {
    loadUserSelectOptionData();
  }, []);

  return (
    <WizardComponentsWrapper
      stepper={stepper}
      setStepper={setStepper}
      stepNum={stepNumber}
      stepText="Group General Settings"
      schema={createGroupBasicInfoValidation}
      isSubmiting={isSubmiting}
      isFirstStep
    >
      {isLoading ? (
        <LoadingData wrapperStyle="py-5 my-3" />
      ) : (
        <div className="w-100">
          {/* User Role */}
          <Col sm={12} xs={12} md={12} xl={6} className="ps-0 pe-0 mb-1">
            <SelectOption
              name="userRole"
              placeholder="Please Select"
              options={userSelectOptionList}
              // defaultValue={{
              //   value: 1,
              //   label: "Admin",
              // }}
              label="User"
              isRequired
              //   customStyle={SelectCustomStyle}
              noErrorMessage
              isLoading={getUserList.isLoading}
            />
          </Col>
          {/* Group Logo */}
          <Col sm={2} xs={2} md={2} xl={2} className="ps-0 pe-0 mb-1">
            <LogoUploader name="groupLogo" label="Group Logo" />
          </Col>
          <Divider wrapperClassName="w-100 mb-2" />
          <RowWrappers sm={6} md={6} xl={4}>
            {/* Group Name */}
            {/* <Col sm={6} xs={6} md={6} xl={12} className="ps-0 pe-0 mb-1"> */}
            <InputText
              name="groupName"
              label="Group Name"
              placeholder="Please enter ..."
              isRequired
            />
            {/* </Col> */}
            {/* Group Short Name */}
            {/* <Col sm={6} xs={6} md={6} xl={12} className="ps-0 pe-0 mb-1"> */}
            <InputText
              name="groupShortName"
              label="Group Short Name *"
              placeholder="Please enter ..."
              isRequired
            />
            {/* </Col> */}
          </RowWrappers>
          <RowWrappers sm={6} md={6} xl={4}>
            {/* Group Userame */}
            {/* <Col sm={6} xs={6} md={6} xl={8} className="ps-0 pe-0 mb-1"> */}
            <InputText
              name="groupUsername"
              label="Group Username"
              placeholder="Please enter ..."
              customError={usernameError}
              isRequired
              onChange={(e) => {
                setFieldValue("groupUsername", e.target.value);
                onCheckUsername(e.target.value);
              }}
            />
            <div />
            {/* </Col> */}
          </RowWrappers>
          <RowWrappers sm={6} md={6} xl={4}>
            {/* Contact number */}
            {/* <Col sm={6} xs={6} md={6} xl={12} className="ps-0 pe-0 mb-1"> */}
            <InputText
              name="contactNumber"
              label="Contact number"
              placeholder="Please enter group Contact number"
              isRequired
            />
            {/* </Col> */}
            {/* contact email */}
            {/* <Col sm={6} xs={6} md={6} xl={12} className="ps-0 pe-0 mb-1"> */}
            <InputText
              name="contactEmail"
              label="contact email"
              placeholder="Please enter group contact email"
              isRequired
              customError={emailError}
              onChange={(e: any) => {
                setFieldValue("contactEmail", e.target.value);
                onCheckEmail(e.target.value);
              }}
            />
            {/* </Col> */}
          </RowWrappers>
          <RowWrappers sm={6} md={6} xl={4}>
            {/* Address */}
            {/* <Col sm={6} xs={6} md={6} xl={8} className="ps-0 pe-0 mb-1"> */}
            <LocationField
              name="address"
              label="Address"
              placeholder="Zipcode, Neighborhood, City, County"
            />
            <div />
            {/* </Col> */}
          </RowWrappers>
          {/* Map */}
          <div className="d-flex justify-content-start align-items-center">
            <Typography className="mb-1 text-black" size={18}>
              You can also choose the location from the map
            </Typography>
          </div>
          <div style={{ height: "500px" }} className="rounded-3">
            <Col
              className="position-relative h-100"
              sm={12}
              xs={12}
              md={12}
              xl={8}
            >
              <GoogleMaps
                addressName="address"
                controls={{ hasZoomControls: true }}
              />
            </Col>
          </div>
          {/* Group Description */}
          <div className="d-flex">
            <Col sm={12} xs={12} md={12} xl={10}>
              <DescItem
                name="groupDesc"
                placeholder="Please Write Group Description"
                label="Group Description"
              />
            </Col>
          </div>
          {/* Terms & Conditions */}
          <div className="d-flex">
            <Col sm={12} xs={12} md={12} xl={10}>
              <DescItem
                name="termCondition"
                placeholder="Please Write Group's Terms & Conditions"
                label="Terms & Conditions"
              />
            </Col>
          </div>
        </div>
      )}
    </WizardComponentsWrapper>
  );
};

export { GroupGeneralInformation };
