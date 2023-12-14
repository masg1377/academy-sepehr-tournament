// ** React Imports
import React, { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ** ReactStrap Imports
import { Row, Col } from "reactstrap";

// ** General components
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { Divider } from "@src/components/common/divider/Divider";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { getCustomWrittenDate } from "@src/core/utils/date-helper.utils";
import {
  useGetProfileDetails,
  useGetProfileDetailsById,
} from "@src/core/services/api/profileSetup/profile-setup.api";
import Verify from "@src/assets/images/icons/Verify.png";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import classNames from "classnames";

// React feather
import { Plus, RefreshCcw, Check } from "react-feather";

// ** Import Pictures
import Def from "@src/assets/images/portrait/small/profileDef.png";

const UsersDetail = () => {
  const [staffDetail, setstaffDetail] = useState<any>([]);
  const [staffProfile, setStaffProfile] = useState<any>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getStaff = useGetListOfEntity();
  const getStaffProfile = useGetProfileDetailsById();

  const getStaffDetailSingle = () => {
    getStaff.mutate(
      {
        entity: "users",
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
            //console.log(result);
          }
        },
        onError: (err) => {
          setStaffProfile([]);
        },
      }
    );
  };

  useEffect(() => {
    getStaffDetailSingle();
    getStaffProfileDetail();
  }, []);

  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center ms-1"></div>
      </div>
    );
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
          {getStaff.isLoading || getStaffProfile.isLoading ? (
            <LoadingData wrapperStyle="py-5 my-3" />
          ) : (
            <>
              <Row style={{ minHeight: "140px" }}>
                <Col xs={12} md={10} className="order-2 order-md-1">
                  <Row className="mt-1">
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Full Name
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {(staffDetail && staffDetail.first_name) ||
                        (staffDetail && staffDetail.last_name)
                          ? staffDetail?.first_name +
                            "" +
                            staffDetail?.last_name
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        User Id
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {staffDetail && staffDetail.id
                          ? staffDetail?.id
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Username
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {staffDetail && staffDetail.username
                          ? staffDetail?.username
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Email
                      </span>
                      <span className="customeInfoFontSize linkBlue text-truncate">
                        {staffDetail && staffDetail.email
                          ? staffDetail?.email
                          : "Not Set"}
                      </span>

                      {staffDetail &&
                        staffDetail.email &&
                        staffDetail.email_verified && (
                          <img src={Verify} alt="verify" />
                        )}
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  md={2}
                  className="tex-center d-flex justify-content-center align-items-center mt-1 mt-lg-0 order-1 order-md-2"
                >
                  <img
                    src={
                      staffProfile &&
                      staffProfile.profile_picture &&
                      staffProfile.profile_picture.length > 0
                        ? staffProfile?.profile_picture[0]?.value
                        : Def
                    }
                    alt="profile"
                    className="rounded-circle mt-1 mt-lg-0 mb-1 mb-lg-0"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
              </Row>
              <Divider wrapperClassName="my-1" />
              <Row>
                <Col xs={12} className="mb-1">
                  <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                    User account information
                  </span>
                </Col>
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    company
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffProfile &&
                    staffProfile.company &&
                    staffProfile.company.length > 0
                      ? staffProfile?.company[0]?.value
                      : "Not Set"}
                  </span>
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Profession
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffProfile && staffProfile.i_am_a
                      ? staffProfile.i_am_a?.map((item: any, index: number) => {
                          return (
                            <>
                              {staffProfile.i_am_a?.length > 1
                                ? index > 0
                                  ? ", "
                                  : ""
                                : ""}
                              <span>{`${item?.name}`}</span>
                            </>
                          );
                        })
                      : "Not Set"}
                  </span>
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Personal Email
                  </span>
                  <span className="customeInfoFontSize linkBlue text-truncate">
                    {staffDetail && staffDetail.email
                      ? staffDetail?.email
                      : "Not Set"}
                    {"  "}
                    {staffDetail &&
                      staffDetail.email &&
                      staffDetail.email_verified && (
                        <img src={Verify} alt="verify" />
                      )}
                  </span>
                </Col>
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Professional Email
                  </span>
                  <span className="customeInfoFontSize linkBlue text-truncate">
                    {staffProfile && staffProfile.professional_email
                      ? staffProfile?.professional_email?.value
                      : "Not Set"}
                    {"  "}
                    {staffProfile &&
                    staffProfile.professional_email &&
                    staffProfile.professional_email?.verification_status ===
                      2 ? (
                      <img src={Verify} alt="verify" />
                    ) : (
                      ""
                    )}
                  </span>
                </Col>
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Personal Phone
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffProfile && staffProfile.personal_phone
                      ? staffProfile?.personal_phone?.value
                      : "Not Set"}
                  </span>
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Business Phone
                  </span>
                  <span className="customeInfoFontSize linkBlue text-truncate">
                    {staffProfile && staffProfile.professional_phone
                      ? staffProfile?.professional_phone?.value
                      : "Not Set"}
                    {"  "}
                    {staffProfile &&
                    staffProfile.professional_phone &&
                    staffProfile.professional_phone?.verification_status ===
                      2 ? (
                      <img src={Verify} alt="verify" />
                    ) : (
                      ""
                    )}
                  </span>
                </Col>
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Location
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate text-wrap">
                    {staffDetail && staffDetail.short_address
                      ? staffDetail?.short_address
                      : "Not Set"}
                  </span>
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Member Since
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffDetail && staffDetail.creation_date
                      ? getCustomWrittenDate(staffDetail.creation_date)
                      : "Not Set"}
                  </span>
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Website
                  </span>
                  <a
                    target={
                      staffProfile &&
                      staffProfile.personal_url &&
                      staffProfile.personal_url.length > 0 &&
                      staffProfile.personal_url[0]?.value !== ""
                        ? "_blank"
                        : "_self"
                    }
                    href={
                      staffProfile &&
                      staffProfile.personal_url &&
                      staffProfile.personal_url.length > 0 &&
                      staffProfile.personal_url[0]?.value !== ""
                        ? "https://" + staffProfile?.personal_url[0]?.value
                        : ""
                    }
                    className="customeInfoFontSize staffInfoText text-truncate"
                  >
                    {staffProfile &&
                    staffProfile.personal_url &&
                    staffProfile.personal_url.length > 0
                      ? staffProfile?.personal_url[0]?.value
                      : "Not Set"}
                  </a>
                </Col>
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Birthday
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffProfile &&
                    staffProfile.birth_date &&
                    staffProfile.birth_date.length > 0
                      ? staffProfile?.birth_date[0]?.value
                      : "Not Set"}
                  </span>
                </Col>{" "}
                {/* <Col xs={12} lg={6} className="mt-1">
                  <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                    Martial Status
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffProfile &&
                    staffProfile.marital_status &&
                    staffProfile.marital_status.length > 0
                      ? staffProfile?.marital_status[0]?.value
                      : "Not Set"}
                  </span>
                </Col>{" "} */}
                {/* <Col xs={12} lg={6} className="mt-1">
                  <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                    Gender
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffProfile &&
                    staffProfile.gender &&
                    staffProfile.gender.length > 0
                      ? staffProfile?.gender[0]?.value === "1"
                        ? "Female"
                        : staffProfile?.gender[0]?.value === "2"
                        ? "Male"
                        : "Another Type"
                      : "Not Set"}
                  </span>
                </Col>{" "} */}
                <Col xs={12} lg={12} className="mt-1">
                  <span
                    style={{ width: "14.7%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Bio
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate text-wrap">
                    {staffProfile &&
                    staffProfile.bio &&
                    staffProfile.bio.length > 0
                      ? staffProfile?.bio[0]?.value
                      : "Not Set"}
                  </span>
                </Col>
              </Row>
              <Divider wrapperClassName="my-1" />
              <Row>
                <Col xs={12} className="mb-1">
                  <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                    More Details
                  </span>
                </Col>
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Cognito username
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffDetail && staffDetail.cognito_username
                      ? staffDetail?.cognito_username
                      : "Not Set"}
                  </span>
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Invitation validated
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffDetail && staffDetail.invitation_validated ? (
                      <span className={`text-success`}>Valid</span>
                    ) : (
                      <span className={`text-info`}>Not Valid</span>
                    )}
                  </span>
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Affiliate code
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffDetail && staffDetail.affiliate_code
                      ? staffDetail?.affiliate_code
                      : "Not Set"}
                  </span>
                </Col>
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Is Superuser
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffDetail && staffDetail.is_superuser ? "Yes" : "No"}
                  </span>
                </Col>
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Profile setup status
                  </span>
                  {staffDetail && staffDetail.profile_setup_status ? (
                    staffDetail?.profile_setup_status === 2 ? (
                      <span className={`text-success`}>Done</span>
                    ) : (
                      <span className={`text-info`}>Incomplete</span>
                    )
                  ) : (
                    "Not Set"
                  )}
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Id verification status
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffDetail && staffDetail.id_verification_status ? (
                      <span className={`text-success`}>Verified</span>
                    ) : (
                      <span className={`text-info`}>Not Verified</span>
                    )}
                  </span>
                </Col>
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Meta VSBY permission
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {/* {staffDetail && staffDetail.short_address
                      ? staffDetail?.short_address
                      : "Not Set"} */}
                    -
                  </span>
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    License verification status
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffDetail && staffDetail.license_verification_status ? (
                      <span className={`text-success`}>Verified</span>
                    ) : (
                      <span className={`text-info`}>Not Verified</span>
                    )}
                  </span>
                </Col>{" "}
                <Col xs={12} lg={6} className="mt-1">
                  <span
                    style={{ width: "30%", display: "inline-block" }}
                    className="fs-6 fw-bolder me-5 staffInfoTitle"
                  >
                    Last login date
                  </span>
                  <span className="customeInfoFontSize staffInfoText text-truncate">
                    {staffDetail && staffDetail.last_login
                      ? staffDetail?.last_login
                      : "Not Set"}
                  </span>
                </Col>{" "}
              </Row>
              <Divider wrapperClassName="my-1" />
              <Row>
                <Col xs={12} md={6}>
                  <Col xs={12} className="mb-1">
                    <span
                      style={{ color: "#314bc9" }}
                      className="fs-7 fw-bolder"
                    >
                      BTT items
                    </span>
                  </Col>
                  <Col xs={12} className="">
                    {staffDetail && staffDetail.btt_type_items
                      ? staffDetail?.btt_type_items.length !== 0
                        ? staffDetail?.btt_type_items.map(
                            (item: any, index: number) => (
                              <span
                                key={index + 1}
                                className="fs-9 customeInfoFontSize me-1 mb-1 d-inline-block"
                                style={{
                                  padding: "2px 13px",
                                  background: "#3897f1",
                                  color: "#fff",
                                  borderRadius: "2px",
                                }}
                              >
                                {item?.name}
                              </span>
                            )
                          )
                        : "-"
                      : "-"}
                  </Col>
                </Col>
                <Col xs={12} md={6}>
                  <Col xs={12} className="mb-1">
                    <span
                      style={{ color: "#314bc9" }}
                      className="fs-7 fw-bolder"
                    >
                      #Hashtags
                    </span>
                  </Col>
                  <Col xs={12} className="">
                    {staffDetail && staffDetail.hashtags
                      ? staffDetail?.hashtags.length !== 0
                        ? staffDetail?.hashtags.map(
                            (item: any, index: number) => (
                              <span
                                key={index + 1}
                                className="fs-9 customeInfoFontSize me-1 mb-1 d-inline-block"
                                style={{
                                  padding: "2px 13px",
                                  background: "#3897f1",
                                  color: "#fff",
                                  borderRadius: "2px",
                                }}
                              >
                                #{item?.name}
                              </span>
                            )
                          )
                        : "-"
                      : "-"}
                  </Col>
                </Col>
              </Row>
            </>
          )}
        </CardWrapper>
      </Col>
    </Row>
  );
};

export { UsersDetail };
