// ** React Imports
import React, { FC, useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

// ** ReactStrap Imports
import { Row, Col, Button } from "reactstrap";

// ** General components
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { Note } from "@src/components/Platform/PlatformDetail/Note/Note";
import { Divider } from "@src/components/common/divider/Divider";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import {
  useGetClientRequest,
  useRemoveClientRequestDoc,
} from "@src/core/services/api/mls/mls.api";

import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { getCustomWrittenDate } from "@src/core/utils/date-helper.utils";
import {
  useGetProfileDetails,
  useGetProfileDetailsById,
} from "@src/core/services/api/profileSetup/profile-setup.api";
import { Timeline } from "@src/components/common/timeline";
import Verify from "@src/assets/images/icons/Verify.png";
import PackageList from "./PackageList/PackageList";
import PaymentList from "./PaymentList/PaymentList";
import MlsAccessList from "./MlsAccessList/MlsAccessList";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import classNames from "classnames";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// React feather
import {
  Plus,
  FileText,
  Send,
  RefreshCw,
  Edit3,
  Edit2,
  RefreshCcw,
  Check,
  MoreVertical,
  Trash,
  Edit,
  Download,
} from "react-feather";

// ** Import Pictures
import Pic from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import Def from "@src/assets/images/portrait/small/profileDef.png";
import {
  capitalizeFirstLetter,
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { TGetRequest } from "@src/core/services/api/mls/type";
import { UploadDocModal } from "./UploadDocModal/UploadDocModal";
import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";

const CustomerDetail: FC = (): JSX.Element => {
  const [staffDetail, setstaffDetail] = useState<any>([]);
  const [staffProfile, setStaffProfile] = useState<any>([]);
  const [doccData, setDoccData] = useState<any>([]);
  const [requestData, setRequestData] = useState<any>([]);
  const [requestIdData, setRequestIdData] = useState<any>([]);
  const [reloadDoc, setReloadDoc] = useState<boolean>(false);
  const [noReload, setNoReload] = useState<boolean>(false);
  const [docShowMore, setDocShowMore] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>(null); // for modal

  const [filterState, setfilterState] = useState<TGetRequest>({
    entity: "mls_access_customer_request_document",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: 3,
        offset: 0,
        filters: [
          // {
          //   field: "mls_access_customer_request_id",
          //   operator: "=",
          //   value: id ? +id : "",
          // },
          {
            field: "mls_access_customer_request_id",
            operator: "in",
            value: requestIdData,
          },
        ],
      },
    },
  });

  useEffect(() => {
    setfilterState({
      entity: "mls_access_customer_request_document",
      data: {
        list_filter: {
          order_by: "creation_date DESC",
          limit: 3,
          offset: 0,
          filters: [
            {
              field: "mls_access_customer_request_id",
              operator: "in",
              value: requestIdData,
            },
          ],
        },
      },
    });
  }, [requestIdData]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getStaff = useGetListOfEntity();
  const getStaffProfile = useGetProfileDetailsById();
  //const getDetailDoc = useGetMlsServer();
  const getDetailDoc = useGetClientRequest();
  const getDocsMore = useGetClientRequest();

  const getMlsAccess = useGetClientRequest();

  const removeDoc = useRemoveClientRequestDoc();

  const getMlsAccessDetail = () => {
    setDocShowMore(true);
    getMlsAccess.mutate(
      {
        entity: "mls_access_customer_request",
        data: {
          list_filter: {
            order_by: "creation_date DESC",
            limit: 1000000,
            offset: 0,
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            let filteredResult = result.filter(
              (item: any) => item.owner_id === Number(id)
            );
            setRequestData(filteredResult);
            let mlsDataa: any[] = filteredResult.map(
              (i: any, index: number) => i.id
            );
            mlsDataa.push(0);
            setRequestIdData(mlsDataa);
            docList(mlsDataa);
          } else {
            setRequestIdData([0]);
            docList([0]);
          }
        },
      }
    );
  };

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

  const onRemove = (idDoc: number) => {
    setNoReload(true);
    showQuestionAlert(
      "Are you sure?",
      "Delete the document?",
      (val) => {},
      "Yes",
      true,
      true,
      async (val) => {
        const result = await removeDoc.mutateAsync({
          entity: "mls_access_customer_request_document",
          data: {
            id: idDoc,
          },
        });
        if (result.data.is_success) {
          showSuccessAlert(
            "Success!",
            "Document removed!",
            () => {
              setReloadDoc((old) => !old);
            },
            "Ok"
          );
          return result.data.is_success;
        } else {
          showErrorAlert("Error!", "Something went wrong!", undefined, "Ok");
        }
      }
    );
  };

  const docList = (data: any) => {
    getDetailDoc.mutate(
      {
        //entity: "mls_document",
        entity: "mls_access_customer_request_document",
        data: {
          list_filter: {
            order_by: "creation_date DESC",
            limit: 3,
            offset: 0,
            //@ts-ignore
            filters: [
              //{ field: "mls_id", operator: "in", value: data ? data : [0] },
              {
                field: "mls_access_customer_request_id",
                operator: "in",
                value: data ? data : [0],
              },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            result &&
              setDoccData(
                result.map((o: any) => ({
                  title: o.name,
                  content: "",
                  icon: <FileText size={35} />,
                  meta: (
                    <div className="d-flex">
                      <UncontrolledDropdown>
                        <DropdownToggle className="" tag="span">
                          <MoreVertical size={14} />
                        </DropdownToggle>
                        <DropdownMenuPortal>
                          <DropdownItem
                            tag="a"
                            href={o.url ? o.url : "/"}
                            target="_blank"
                            className="w-100"
                            // onClick={(e) => {
                            //   e.preventDefault();
                            //   //navigate("/packages/" + row.id);
                            // }}
                          >
                            <FileText size={12} />
                            <span className="align-middle ms-50 fs-9">
                              Download
                            </span>
                          </DropdownItem>
                          <DropdownItem
                            tag="a"
                            href="/"
                            className="w-100"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedData(o);
                              setModalOpen(true);
                            }}
                          >
                            <Edit size={12} />
                            <span className="align-middle ms-50 fs-9">
                              Edit
                            </span>
                          </DropdownItem>
                          <DropdownItem
                            tag="a"
                            href="/"
                            className="w-100"
                            onClick={(e) => {
                              e.preventDefault();
                              onRemove(o.id);
                            }}
                          >
                            <Trash size={12} />
                            <span className="align-middle ms-50 fs-9">
                              Delete
                            </span>
                          </DropdownItem>
                        </DropdownMenuPortal>
                      </UncontrolledDropdown>
                    </div>
                  ),
                  metaClassName: "mb-1",
                  customIcon: true,
                  className: "border-start-0",
                  customContent: (
                    <>
                      <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
                        <div>
                          <div>
                            <span className="fs-6 fw-bolder lh-base">
                              Creator:{" "}
                            </span>
                            <span className="fs-6 lh-base">
                              {o.creator ? o.creator : "--"}
                            </span>
                          </div>
                          {/* <div>
                            <span className="fs-6 fw-bolder lh-base">
                              Type:{" "}
                            </span>
                            <span className="fs-6 lh-base">
                              {o.document_type ? o.document_type : "--"}
                            </span>
                          </div> */}
                          <div>
                            <span className="fs-6 fw-bolder lh-base">
                              Source:{" "}
                            </span>
                            <span className="fs-6 lh-base">Realtyna</span>
                          </div>
                          <div>
                            <span className="fs-6 fw-bolder lh-base">
                              Creation On:{" "}
                            </span>
                            <span className="fs-6 lh-base">
                              {getCustomDate(o.modification_date)}
                            </span>
                          </div>
                          <div className="mt-1 text-start">
                            <RippleButton
                              className={classNames(
                                "text-white",
                                o.status === "sent" ||
                                  o.status === "approved" ||
                                  o.status === "rejected"
                                  ? ""
                                  : "bg-pending"
                              )}
                              color={
                                o.status === "sent"
                                  ? "info"
                                  : o.status === "approved"
                                  ? "success"
                                  : o.status === "rejected"
                                  ? "danger"
                                  : o.status === "archived"
                                  ? "light"
                                  : "light"
                              }
                              size="sm"
                            >
                              {capitalizeFirstLetter(o.status)}
                              {/* <RefreshCw size={12} /> */}
                            </RippleButton>
                          </div>
                        </div>

                        {/* <span className="fs-6 lh-base">
                        {getCustomDate(o.modification_date)}
                      </span> */}
                      </div>
                    </>
                  ),
                }))
              );
            if (!result || result.length < 3) setDocShowMore(false);
          } else {
            setDoccData([]);
            setDocShowMore(false);
          }
        },
      }
    );
  };

  const onLoadMoreDoc = () => {
    let newFilter = { ...filterState };
    //@ts-ignore
    newFilter.data.list_filter["offset"] += newFilter.data.list_filter?.limit;
    setfilterState(newFilter);
    getDocsMore.mutate(newFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          result &&
            setDoccData((old: any) => [
              ...old,
              ...result.map((o: any) => ({
                title: o.name,
                content: "",
                icon: <FileText size={35} />,
                meta: (
                  <div className="d-flex">
                    <UncontrolledDropdown>
                      <DropdownToggle className="" tag="span">
                        <MoreVertical size={14} />
                      </DropdownToggle>
                      <DropdownMenuPortal>
                        <DropdownItem
                          tag="a"
                          href={o.url ? o.url : "/"}
                          target="_blank"
                          className="w-100"
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   //navigate("/packages/" + row.id);
                          // }}
                        >
                          <FileText size={12} />
                          <span className="align-middle ms-50 fs-9">
                            Download
                          </span>
                        </DropdownItem>
                        <DropdownItem
                          tag="a"
                          href="/"
                          className="w-100"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedData(o);
                            setModalOpen(true);
                          }}
                        >
                          <Edit size={12} />
                          <span className="align-middle ms-50 fs-9">Edit</span>
                        </DropdownItem>
                        <DropdownItem
                          tag="a"
                          href="/"
                          className="w-100"
                          onClick={(e) => {
                            e.preventDefault();
                            onRemove(o.id);
                          }}
                        >
                          <Trash size={12} />
                          <span className="align-middle ms-50 fs-9">
                            Delete
                          </span>
                        </DropdownItem>
                      </DropdownMenuPortal>
                    </UncontrolledDropdown>
                  </div>
                ),
                metaClassName: "mb-1",
                customIcon: true,
                className: "border-start-0",
                customContent: (
                  <>
                    <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
                      <div>
                        <div>
                          <span className="fs-6 fw-bolder lh-base">
                            Creator:{" "}
                          </span>
                          <span className="fs-6 lh-base">
                            {o.creator ? o.creator : "--"}
                          </span>
                        </div>
                        {/* <div>
                          <span className="fs-6 fw-bolder lh-base">Type: </span>
                          <span className="fs-6 lh-base">
                            {o.document_type ? o.document_type : "--"}
                          </span>
                        </div> */}
                        <div>
                          <span className="fs-6 fw-bolder lh-base">
                            Source:{" "}
                          </span>
                          <span className="fs-6 lh-base">Realtyna</span>
                        </div>
                        <div>
                          <span className="fs-6 fw-bolder lh-base">
                            Creation On:{" "}
                          </span>
                          <span className="fs-6 lh-base">
                            {getCustomDate(o.modification_date)}
                          </span>
                        </div>
                        <div className="mt-1 text-start">
                          <RippleButton
                            className={classNames(
                              "text-white",
                              o.status === "sent" ||
                                o.status === "approved" ||
                                o.status === "rejected"
                                ? ""
                                : "bg-pending"
                            )}
                            color={
                              o.status === "sent"
                                ? "info"
                                : o.status === "approved"
                                ? "success"
                                : o.status === "rejected"
                                ? "danger"
                                : o.status === "archived"
                                ? "light"
                                : "light"
                            }
                            size="sm"
                          >
                            {capitalizeFirstLetter(o.status)}
                            {/* <RefreshCw size={12} /> */}
                          </RippleButton>
                        </div>
                      </div>

                      {/* <span className="fs-6 lh-base">
                    {getCustomDate(o.modification_date)}
                  </span> */}
                    </div>
                  </>
                ),
              })),
            ]);
          if (!result || result.length < 3) setDocShowMore(false);
        }
      },
    });
  };

  useEffect(() => {
    getStaffDetailSingle();
    getStaffProfileDetail();
  }, []);

  useEffect(() => {
    getMlsAccessDetail();
  }, [reloadDoc]);

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
            <span className="fs-6 me-1">{true ? "Ben M" : "Not Set"}</span>
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
            {/* <ChevronDown size={15} /> */}
          </RippleButton>
        </div>
      </div>
    );
  };

  return (
    <>
      {modalOpen && (
        <UploadDocModal
          requestData={requestData}
          isOpen={modalOpen}
          onToggle={() => {
            setModalOpen((old) => !old);
            setSelectedData(null);
          }}
          setReloadDoc={setReloadDoc}
          selectedData={selectedData}
        />
      )}

      <Row>
        <Col xs={12} xl={9}>
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
                  <div
                    className={
                      "d-flex align-items-center justify-content-end mt-1"
                    }
                  >
                    <Edit3
                      className="cursor-pointer"
                      size={15}
                      color="#92969a"
                      onClick={() => navigate("/customer-list/edit/" + id)}
                    />
                  </div>
                  <Col xs={12} md={10} className="order-2 order-md-1">
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
                    <span
                      style={{ color: "#314bc9" }}
                      className="fs-7 fw-bolder"
                    >
                      More Details
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
                        ? staffProfile.i_am_a?.map(
                            (item: any, index: number) => {
                              return (
                                <div
                                  className="m-0 p-0 d-inline"
                                  key={index + 10}
                                >
                                  {staffProfile.i_am_a?.length > 1
                                    ? index > 0
                                      ? ", "
                                      : ""
                                    : ""}
                                  <span
                                    key={index + 10}
                                  >{`${item?.name}`}</span>
                                </div>
                              );
                            }
                          )
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
                  </Col>
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
                  </Col>
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
                  </Col>
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
                  </Col>
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
                      style={{ width: "14.6%", display: "inline-block" }}
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
                    <span
                      style={{ color: "#314bc9" }}
                      className="fs-7 fw-bolder"
                    >
                      Experties
                    </span>
                  </Col>
                  <Col xs={12} className="ps-1">
                    {staffProfile && staffProfile.expertise
                      ? staffProfile?.expertise.length !== 0
                        ? staffProfile?.expertise.map(
                            (item: any, index: number) => (
                              <span
                                key={index + 10}
                                className="fs-9 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                                style={{
                                  padding: "5px",
                                  background: "#f8f8f8",
                                }}
                              >
                                #{item?.name}
                              </span>
                            )
                          )
                        : "-"
                      : "-"}
                  </Col>
                </Row>
                <Divider wrapperClassName="my-1" />
                <Row>
                  <Col xs={12} className="mb-1">
                    <span
                      style={{ color: "#314bc9" }}
                      className="fs-7 fw-bolder"
                    >
                      Area of Interest
                    </span>
                  </Col>
                  <Col xs={12} className="ps-1">
                    {staffProfile && staffProfile.area_of_interest
                      ? staffProfile?.area_of_interest.length !== 0
                        ? staffProfile?.area_of_interest.map(
                            (item: any, index: number) => (
                              <span
                                key={index + 10}
                                className="fs-9 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                                style={{
                                  padding: "5px",
                                  background: "#f8f8f8",
                                }}
                              >
                                {item?.label}
                              </span>
                            )
                          )
                        : "-"
                      : "-"}
                  </Col>
                </Row>
                <Divider wrapperClassName="my-1" />
                <Row>
                  <Col xs={12} className="mb-1">
                    <span
                      style={{ color: "#314bc9" }}
                      className="fs-7 fw-bolder"
                    >
                      Interested In
                    </span>
                  </Col>
                  <Col xs={12} className="ps-1">
                    {staffProfile && staffProfile.interested_in
                      ? staffProfile?.interested_in.length !== 0
                        ? staffProfile?.interested_in.map(
                            (item: any, index: number) => (
                              <span
                                key={index + 10}
                                className="fs-9 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                                style={{
                                  padding: "5px",
                                  background: "#f8f8f8",
                                }}
                              >
                                #{item?.name}
                              </span>
                            )
                          )
                        : "-"
                      : "-"}
                  </Col>
                </Row>
              </>
            )}
          </CardWrapper>
          <Col xs={12}>
            <PaymentList userId={id} startFlag={getStaff.isLoading} />
          </Col>
          <Col xs={12}>
            <PackageList
              startFlag={
                (!noReload && getStaff.isLoading) ||
                (!noReload && getMlsAccess.isLoading)
                  ? true
                  : false
              }
            />
          </Col>
          <Col xs={12}>
            <MlsAccessList startFlag={!noReload && getMlsAccess.isLoading} />
          </Col>
        </Col>
        <Col xs={12} xl={3}>
          {/* <Note /> */}
          <CardWrapper
            title="Documents"
            headerChild={
              <RippleButton
                color="light"
                size="sm"
                onClick={() => setModalOpen(true)}
              >
                <Plus size={18} color="#92969a" />
              </RippleButton>
            }
            borderBottom
          >
            {getDetailDoc.isLoading || getMlsAccess.isLoading ? (
              <LoadingData wrapperStyle="my-2" />
            ) : doccData.length === 0 ? (
              <div className="text-center mt-4 mb-3">No Document </div>
            ) : (
              <>
                {" "}
                <Timeline wide={true} data={doccData} className="mt-1" />
                {docShowMore && (
                  <Row>
                    {!getDocsMore.isLoading && (
                      <Col
                        onClick={onLoadMoreDoc}
                        className="pt-1 text-center cursor-pointer text-primary fs-5"
                        xs={12}
                        style={{ fontWeight: "700" }}
                      >
                        Show More
                      </Col>
                    )}
                    {getDocsMore.isLoading && (
                      <LoadingData hideLabel wrapperStyle="p-0 mb-0 mt-1" />
                    )}
                  </Row>
                )}
              </>
            )}
          </CardWrapper>
        </Col>
      </Row>
    </>
  );
};

export { CustomerDetail };
