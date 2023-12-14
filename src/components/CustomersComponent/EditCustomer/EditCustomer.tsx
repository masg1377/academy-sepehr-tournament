// ** React Imports
import React, { FC, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ** ReactStrap Imports
import { Row, Col, Button } from "reactstrap";
import { FormikProps } from "formik";

// React feather
import { Plus, ChevronDown, Edit2 } from "react-feather";

// ** Custom Components
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { MaskInput } from "@src/components/common/form/common/MaskInput/MaskInput";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { LogoUploader } from "@src/components/common/form/Fields/LogoUploader/LogoUploader";
import { useGetProfileDetailsById } from "@src/core/services/api/profileSetup/profile-setup.api";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import classNames from "classnames";

// ** Import Pictures
import Def from "@src/assets/images/portrait/small/profileDef.png";

const EditCustomer = () => {
  const [staffProfile, setStaffProfile] = useState<any>([]);
  const [staffDetail, setstaffDetail] = useState<any>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getStaffProfile = useGetProfileDetailsById();
  const getStaff = useGetListOfEntity();

  const getStaffDetailSingle = () => {
    getStaff.mutate(
      {
        entity: "customers",
        data: { id: id ? +id : 0 },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setstaffDetail(result);
          }
        },
        onError: () => {
          setstaffDetail([]);
        },
      }
    );
  };

  const getStaffProfileDetail = () => {
    getStaffProfile.mutate(
      {
        keys: [
          "address",
          " interested_in",
          " bio",
          " expertise",
          " profile_picture",
          " birth_date",
          " professional_email",
          " personal_phone",
          " professional_phone",
          " area_of_interest",
          " company",
          " i_am_a",
          " personal_url",
        ],
        user_id: id ? +id : 0,
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setStaffProfile(result);
          }
        },
        onError: (err) => {
          setStaffProfile([]);
        },
      }
    );
  };

  useEffect(() => {
    getStaffProfileDetail();
    getStaffDetailSingle();
  }, []);

  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
        {/* <div className="d-flex align-items-center">
          <span className="fs-6 fw-bolder me-1">Handler</span>
          <RippleButton
            className="d-flex justify-content-center"
            color="light"
            size="sm"
          >
            <span className="fs-6 me-1">{"-"}</span>
            <Edit2 size={15} />
          </RippleButton>
        </div> */}
        <div className="d-flex align-items-center ms-1">
          <RippleButton
            className="d-flex justify-content-center me-1"
            color="light"
            size="sm"
          >
            {staffDetail && staffDetail.status ? (
              staffDetail.status === 1 ? (
                <>
                  <span className={"fs-6 text-success"}>Active</span>
                  <span className="active-inactive-show bg-success"></span>
                </>
              ) : staffDetail.status === 2 ? (
                <>
                  <span className={"fs-6 text-danger"}>Inactive</span>
                  <span className="active-inactive-show bg-danger"></span>
                </>
              ) : (
                "Not Set"
              )
            ) : (
              "Loading ..."
            )}
            <ChevronDown className="ms-1" size={15} />
          </RippleButton>
        </div>
      </div>
    );
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Row>
      <Col xs={12}>
        <CardWrapper
          title={
            (staffDetail && staffDetail.first_name) ||
            (staffDetail && staffDetail.last_name)
              ? staffDetail?.first_name + " " + staffDetail?.last_name
              : "Loading ..."
          }
          headerChild={headerRightSide()}
          borderBottom
        >
          {getStaffProfile.isLoading || getStaff.isLoading ? (
            <LoadingData wrapperStyle="py-5 my-3" />
          ) : (
            <>
              <FormWrapper
                initialValues={{
                  personal_phone:
                    staffProfile && staffProfile.personal_phone
                      ? staffProfile.personal_phone?.value
                      : "",
                  Business_phone:
                    staffProfile && staffProfile.professional_phone
                      ? staffProfile.professional_phone?.value
                      : "",
                  website:
                    staffProfile &&
                    staffProfile.personal_url &&
                    staffProfile.personal_url.length > 0
                      ? staffProfile?.personal_url[0]?.value
                      : "",
                  address:
                    staffProfile && staffProfile.address
                      ? staffProfile.address?.full_address
                      : "",
                  source:
                    staffDetail && staffDetail.user_source
                      ? staffDetail?.user_source
                      : "",
                  note:
                    staffProfile &&
                    staffProfile.bio &&
                    staffProfile.bio.length > 0
                      ? staffProfile?.bio[0]?.value
                      : "",
                  image:
                    staffProfile &&
                    staffProfile.profile_picture &&
                    staffProfile.profile_picture.length > 0
                      ? staffProfile?.profile_picture[0]?.value !== ""
                        ? staffProfile?.profile_picture[0]?.value
                        : Def
                      : Def,
                }}
                //validationSchema={}
                onSubmit={onSubmit}
                enableReinitialize
                className=""
              >
                {({ values, setFieldValue }: FormikProps<any>) => (
                  <Row>
                    <Col xs={12} lg={8} className="order-2 order-lg-1">
                      <>
                        <span
                          style={{ color: "#314bc9" }}
                          className="fs-7 mt-2 d-inline-block fw-bolder"
                        >
                          Customer Info
                        </span>
                        <RowWrappers sm={12} md={6}>
                          <MaskInput
                            name="personal_phone"
                            placeholder="Please enter your phone"
                            label={"Personal Phone"}
                            id="personal_phone"
                            options={{ phone: true, phoneRegionCode: "US" }}
                            wrapperClassName="mb-1 mb-md-0"
                          />
                          <MaskInput
                            name="Business_phone"
                            placeholder="Please enter your business phone"
                            label={"Business Phone"}
                            id="Business_phone"
                            options={{ phone: true, phoneRegionCode: "US" }}
                            //wrapperClassName="mb-1"
                          />
                        </RowWrappers>
                        <RowWrappers sm={12} md={6}>
                          <div>
                            <InputText
                              name="website"
                              placeholder="Please enter website"
                              label={"Website"}
                              id="website"
                              wrapperClassName="mb-1 mb-md-0"
                            />
                          </div>
                          <div>
                            <InputText
                              name="address"
                              placeholder="Please enter address"
                              label={"Address"}
                              id="address"
                              //wrapperClassName="mb-1"
                            />
                          </div>
                        </RowWrappers>
                        <RowWrappers sm={12} md={6}>
                          <div>
                            <InputText
                              name="source"
                              placeholder="Please enter source"
                              label={"Client Source"}
                              id="source"
                              //icon={<Mail size="15" />}
                              wrapperClassName=""
                            />
                          </div>
                          <div></div>
                        </RowWrappers>
                        <Col sm={12}>
                          <InputText
                            name="note"
                            placeholder="Please enter your note"
                            label={"Bio"}
                            id="note"
                            type="textarea"
                            inputClassName="minHeight-115"
                            wrapperClassName="mt-1 mt-md-0"
                          />
                        </Col>
                        <Col xs={12} className="mt-5">
                          <SubmitButton
                            className=" me-auto ms-0 mb-2 d-block px-3"
                            color="info"
                            type="submit"
                            //isLoading={}
                            disabled
                          >
                            Save
                          </SubmitButton>
                        </Col>
                      </>
                    </Col>
                    <Col sx={12} lg={4} className="order-1 order-lg-2">
                      <LogoUploader
                        name="image"
                        //label=""
                        id="image"
                        mode="three"
                        wrapperClassName="mt-5 text-center"
                        fileFormat="png, jpg"
                        fileSize="5 MB"
                      />
                    </Col>
                  </Row>
                )}
              </FormWrapper>
            </>
          )}
        </CardWrapper>
      </Col>
    </Row>
  );
};

export { EditCustomer };
