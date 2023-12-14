// ** React Imports
import React, { FC, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// ** ReactStrap Imports
import { Row, Col, Button } from "reactstrap";

// ** General components
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { Note } from "@src/components/Platform/PlatformDetail/Note/Note";
import { GalleryShow } from "./GalleryShow/GalleryShow";
import { Divider } from "@src/components/common/divider/Divider";
import classNames from "classnames";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { getCustomWrittenDate } from "@src/core/utils/date-helper.utils";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { PermissionWrapper } from "@src/components/common/PermissionWrapper/PermissionWrapper";
import { Input } from "reactstrap";

// React feather
import { Edit, ChevronDown, AlertCircle } from "react-feather";

// ** Import Pictures
import Pic from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import Def from "@src/assets/images/portrait/small/profileDef.png";
import { useAssignRoleToStaff } from "@src/core/services/api/role/role.api";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import {
  useGetProfileDetails,
  useGetProfileDetailsById,
} from "@src/core/services/api/profileSetup/profile-setup.api";
import { TBttUserData } from "@src/core/data/user.data";

const StaffDetail: FC = (): JSX.Element => {
  const [editRole, setEditRole] = useState<boolean>(false);
  const [tempRoles, setTempRoles] = useState<any>([]);
  const [currentRoles, setCurrentRoles] = useState<any>([]);
  const [finalSetRoles, setFinalSetRoles] = useState<any>([]);
  const [initialUserRoles, setInitialUserRoles] = useState<any>([]);
  const [staffDetail, setstaffDetail] = useState<any>([]);
  const [staffProfile, setStaffProfile] = useState<any>([]);
  const [userBtts, setUserBtts] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [roles, setRoles] = useState([]);

  const { id } = useParams();
  const getRoles = useGetListOfEntity();
  const getStaff = useGetListOfEntity();
  const getStaffProfile = useGetProfileDetailsById();

  const [listFilter, setListFilter] = useState<TGetEntities>({
    entity: "btt_type_items",
    data: {
      list_filter: {
        limit: 1000,
        offset: 0,
        filters: [{ field: "type", operator: "=", value: 1 }],
      },
    },
  });

  const getFirstRoles = () => {
    getRoles.mutate(listFilter, {
      onSuccess: (res) => {
        let result = res.data.result;
        if (result && !Array.isArray(result)) result = [result];
        setRoles(result.map((i: any) => ({ value: i.id, label: i.name })));
      },
      onError: (err) => {
        setRoles([]);
      },
    });
  };

  const getStaffDetailSingle = () => {
    getStaff.mutate(
      {
        entity: "staffs",
        data: { id: id ? +id : 0 },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setstaffDetail(result);
            let userRoles = result.btt_type_items.map((o: any) => ({
              value: o.btt_id,
              label: o.name,
              type: o.type,
              id: o.id,
              btt_id: o.btt_id,
              status: o.status,
            }));
            userRoles = userRoles.filter(
              (obj: any, index: number) =>
                userRoles.findIndex((item: any) => item.label === obj.label) ===
                index
            );
            setUserBtts(userRoles);
            userRoles = userRoles.filter(
              (f: any) => f.type === 1 && f.status === "available"
            );
            console.log(userRoles);
            setFinalSetRoles((old: any) => [...userRoles]);
            setInitialUserRoles((old: any) => [...userRoles]);
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
          "expertise",
          " profile_picture",
          " bio",
          " professional_email",
          " skype_id",
          " personal_phone",
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
    getFirstRoles();
  }, []);

  useEffect(() => {
    getStaffDetailSingle();
    getStaffProfileDetail();
  }, []);

  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
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
            {/* <ChevronDown size={15} /> */}
          </RippleButton>
        </div>
      </div>
    );
  };

  const assignRole = useAssignRoleToStaff();

  const handleShowEditSection = () => {
    setEditRole(true);
    setTempRoles(finalSetRoles);
  };

  const handleSubmitSave = () => {
    const addRoles = finalSetRoles.filter(
      (newRole: any) =>
        !initialUserRoles.some((s: any) => s.value === newRole.value)
    );

    const removeRoles = initialUserRoles.filter(
      (oldRole: any) =>
        !finalSetRoles.some((s: any) => s.value === oldRole.value)
    );

    // console.log(removeRoles, addRoles);

    assignRole.mutate(
      {
        user_id: id ? +id : 0,
        assign_role: addRoles ? addRoles.map((r: any) => r.value) : [],
        get_role: removeRoles ? removeRoles.map((r: any) => r.id) : [],
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setEditRole(false);
            setTempRoles([]);
            getStaffDetailSingle();
            // setInitialUserRoles()
          }
        },
        onError: (err) => {
          //setFinalSetRoles(tempRoles);
        },
      }
    );
  };

  const handleAddToTemp = (item: any) => {
    if (finalSetRoles.some((i: any) => i.label === item.label)) {
      let newItems = finalSetRoles.filter((m: any) => m.value !== item.value);
      setFinalSetRoles(newItems);
    } else {
      setFinalSetRoles([...finalSetRoles, item]);
    }

    //setFinalSetRoles([...finalSetRoles, item]);
  };

  const handleRemoveItem = (item: any) => {
    const newVal = finalSetRoles.filter((o: any) => o.label !== item.label);
    //setTempRoles(newVal);
    setFinalSetRoles(newVal);
  };

  const inputRef = useRef<any>();

  const handleRoleSearch = (val: string) => {
    clearTimeout(inputRef.current);
    setSearchQuery(val);
    let timeOut: any;

    if (val) {
      timeOut = setTimeout(() => {
        getRoles.mutate(
          {
            entity: "btt_type_items",
            data: {
              list_filter: {
                limit: 1000,
                offset: 0,
                filters: [
                  { field: "type", operator: "=", value: 1 },
                  "and",
                  { field: "name", operator: "like", value: val },
                ],
              },
            },
          },
          {
            onSuccess: (res) => {
              let result = res.data.result;
              if (result && !Array.isArray(result)) result = [result];
              setRoles(
                result.map((i: any) => ({ value: i.id, label: i.name }))
              );
            },
            onError: (err) => {
              setRoles([]);
            },
          }
        );
      }, 800);
      inputRef.current = timeOut;
    } else if (!val) {
      timeOut = setTimeout(() => {
        getFirstRoles();
      }, 800);
      inputRef.current = timeOut;
    }
  };

  return (
    <Row>
      <Col xs={12} lg={12}>
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
                <Col xs={12} md={10} className="order-2 order-md-1 mt-1">
                  <Row>
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
                            " " +
                            staffDetail?.last_name
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Member Since
                      </span>
                      <span className="customeInfoFontSize staffInfoText">
                        {/* 13 Jun 2021 */}
                        {staffDetail && staffDetail.creation_date
                          ? getCustomWrittenDate(staffDetail.creation_date)
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Bio
                      </span>
                      <div className="customeInfoFontSize staffInfoText">
                        {staffProfile &&
                        staffProfile.bio &&
                        staffProfile.bio.length > 0
                          ? staffProfile?.bio[0]?.value
                          : "Not Set"}
                      </div>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Last Activity
                      </span>
                      <span className="customeInfoFontSize staffInfoText">
                        {/* 21 Jun 2022 */}
                        {staffDetail && staffDetail.last_login
                          ? getCustomWrittenDate(staffDetail.last_login)
                          : "Not Set"}
                      </span>
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
                    className="rounded-circle mt-1"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
              </Row>
              <Divider wrapperClassName="my-2" />
              <Row>
                <Col xs={12} md={10}>
                  <Row>
                    <Col xs={12} className="mb-1">
                      <span
                        style={{ color: "#314bc9" }}
                        className="fs-7 fw-bolder"
                      >
                        Contact Informations
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Email
                      </span>
                      <span className="customeInfoFontSize linkBlue">
                        {staffDetail && staffDetail.email
                          ? staffDetail?.email
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1 mt-lg-0">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Pers Email
                      </span>
                      <span className="customeInfoFontSize linkBlue">
                        {staffProfile && staffProfile.professional_email
                          ? staffProfile?.professional_email?.value
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Phone
                      </span>
                      <span className="customeInfoFontSize staffInfoText">
                        {staffProfile && staffProfile?.personal_phone?.value
                          ? staffProfile?.personal_phone?.value
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Skype Id
                      </span>
                      <span className="customeInfoFontSize staffInfoText">
                        {staffProfile && staffProfile.skype_id?.length
                          ? staffProfile?.skype_id[0].value
                          : "Not Set"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  md={2}
                  className="tex-center d-flex justify-content-center align-items-center mt-1 mt-lg-0 order-1 order-md-2"
                ></Col>
              </Row>
              <Divider wrapperClassName="my-2" />
              <Row>
                <Col xs={6} className="ps-1">
                  <span
                    style={{ color: "#314bc9", display: "block" }}
                    className="fs-7 fw-bolder mb-1"
                  >
                    Experties
                  </span>
                  <div className="d-flex flex-wrap">
                    {staffProfile && staffProfile.expertise
                      ? staffProfile?.expertise.length !== 0
                        ? staffProfile?.expertise.map(
                            (item: any, index: number) => (
                              <span
                                key={index + 1}
                                className="fs-9 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                                style={{
                                  padding: "5px",
                                  background: "#f8f8f8",
                                }}
                              >
                                {item?.name}
                              </span>
                            )
                          )
                        : "-"
                      : "-"}
                  </div>
                </Col>
                <Col xs={6} className="ps-1">
                  <span
                    style={{ color: "#314bc9", display: "block" }}
                    className="fs-7 fw-bolder mb-1"
                  >
                    User's Btts
                  </span>
                  {userBtts && userBtts.length !== 0
                    ? userBtts.map((item: any, index: number) => (
                        <span
                          key={index + 1}
                          className={`fs-9 customeInfoFontSize rounded me-1 mb-1 d-inline-block bg bg-${
                            TBttUserData.find((f) => f.value === item.status)
                              ?.color
                          } text-white
                          `}
                          style={{
                            padding: "5px",
                          }}
                        >
                          {item?.label}
                        </span>
                      ))
                    : "-"}
                </Col>
              </Row>
              <Divider wrapperClassName="my-2" />
              <Row>
                <Col xs={12} className="mb-1">
                  <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                    User's roles
                  </span>
                </Col>
                {!editRole && (
                  <React.Fragment>
                    <Col xs={12} className="mb-1 ps-1 d-flex flex-wrap">
                      {finalSetRoles
                        ? finalSetRoles.length !== 0
                          ? finalSetRoles?.map((item: any, index: number) => (
                              <span
                                key={index + 1}
                                className="fs-9 customeInfoFontSize text-light rounded me-1 mb-1"
                                style={{
                                  padding: "5px 8px",
                                  background: "#04cad0",
                                }}
                              >
                                {item.label}
                              </span>
                            ))
                          : "-"
                        : "-"}
                    </Col>
                    {/* <PermissionWrapper roles={["can_manage_staff_role"]}> */}
                    <Col xs={12} className="mt-1">
                      <RippleButton
                        style={{ padding: "9px" }}
                        color="primary"
                        className="d-flex fs-8"
                        onClick={handleShowEditSection}
                      >
                        <Edit className="me-1" size={12} />
                        Edit Roles
                      </RippleButton>
                    </Col>
                    {/* </PermissionWrapper> */}
                  </React.Fragment>
                )}
                {editRole && (
                  <FormWrapper
                    initialValues={{}}
                    // validationSchema={}
                    onSubmit={() => {}}
                    enableReinitialize
                  >
                    {/* <PermissionWrapper roles={["can_manage_staff_role"]}> */}
                    <React.Fragment>
                      <React.Fragment>
                        <Col xs={12}>
                          <div
                            style={{
                              borderRadius: "2px",
                              padding: "5px",
                              backgroundColor: "rgba(244, 243, 249, 0.6)",
                              border: "solid 1px #e1e0ea",
                            }}
                          >
                            <div className="d-flex flex-wrap outlineContainerCustome">
                              {finalSetRoles &&
                                finalSetRoles.length !== 0 &&
                                finalSetRoles.map(
                                  (item: any, index: number) => (
                                    <div
                                      key={index + 1}
                                      className="discount-options-holder2 bg-primary text-light fs-9"
                                    >
                                      {item.label}
                                      <span
                                        onClick={() => handleRemoveItem(item)}
                                        className="fs-6-1 cursor-pointer margin-left-9"
                                      >
                                        x
                                      </span>
                                    </div>
                                  )
                                )}
                            </div>
                            <Input
                              name="searchRoles"
                              placeholder={"Search Roles ..."}
                              type={"text"}
                              className={""}
                              onChange={(e) => handleRoleSearch(e.target.value)}
                              value={searchQuery}
                              onFocusCapture={() => setFocus(true)}
                              onBlurCapture={() => setFocus(false)}
                              style={{
                                background: "transparent",
                                border: "1px solid transparent",
                                boxShadow: "0 0 0 transparent",
                                margin: "3px 0px",
                                paddingLeft: "12px",
                              }}
                            />
                          </div>
                        </Col>
                        <Col xs={12} className="mt-2">
                          <div className="customeInfoFontSize staffInfoText">
                            List of roles
                          </div>
                          <div className="rounded-sm roles-list">
                            {getRoles.isLoading && (
                              <LoadingData wrapperStyle="pt-2 m-0" />
                            )}
                            {!getRoles.isLoading &&
                              roles &&
                              roles?.length > 0 &&
                              roles?.map((item: any, index: number) => (
                                <span
                                  key={index + 1}
                                  //onClick={() => handleAddToTemp(item)}
                                  onDoubleClick={() => handleAddToTemp(item)}
                                  style={{ padding: "2px 13px" }}
                                  className={classNames(
                                    "d-block",
                                    "cursor-pointer",
                                    "fs-8",
                                    "roleHolder",
                                    finalSetRoles.some(
                                      (i: any) => i.label === item.label
                                    )
                                      ? "roleHolderClick"
                                      : ""
                                  )}
                                >
                                  {item.label}
                                </span>
                              ))}
                            {!getRoles.isLoading &&
                              roles &&
                              roles.length === 0 && (
                                <span className="text-center w-100 d-block mt-5">
                                  {/* Please search for the List of Roles */}
                                  Roles not Found
                                </span>
                              )}
                          </div>
                        </Col>
                        <Row className="mt-2 pe-0">
                          <Col
                            className="text-center text-sm-start"
                            xs={12}
                            sm={8}
                          >
                            <div className="d-flex align-items-center mt-1-1">
                              <AlertCircle
                                size={20}
                                className="me-1"
                                color="#3897f1"
                              />
                              <span
                                className="fs-6"
                                style={{ color: "#3897f1" }}
                              >
                                Please double click to add an item
                              </span>
                            </div>
                          </Col>
                          <Col
                            className="text-center text-sm-end mt-1 mt-sm-0 p-0"
                            xs={12}
                            sm={4}
                          >
                            <SubmitButton
                              onClick={handleSubmitSave}
                              color="info"
                              // style={{
                              //   padding: "9px",
                              // }}
                              isLoading={assignRole.isLoading}
                              className="px-3 m-0 saveBtColor fs-8"
                            >
                              Save
                            </SubmitButton>
                          </Col>
                        </Row>
                      </React.Fragment>
                      <Col xs={12}></Col>
                    </React.Fragment>
                    {/* </PermissionWrapper> */}
                  </FormWrapper>
                )}
              </Row>
            </>
          )}
        </CardWrapper>
      </Col>
      {/* <Col xs={12} lg={3}>
        <Note />
        <GalleryShow />
      </Col> */}
    </Row>
  );
};

export { StaffDetail };
