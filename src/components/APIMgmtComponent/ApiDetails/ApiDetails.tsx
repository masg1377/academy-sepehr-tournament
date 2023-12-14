// ** React Imports
import React, { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ** ReactStrap Imports
import { Row, Col } from "reactstrap";

// ** General components
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { Divider } from "@src/components/common/divider/Divider";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomWrittenDate } from "@src/core/utils/date-helper.utils";
import classNames from "classnames";

// ** Import Pictures
import {
  useDiagnosticAPIMgmt,
  useGetAPIMgmtCredential,
  useGetAPIMgmtList,
} from "@src/core/services/api/api-key";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { CustomTooltip } from "@src/components/common/tooltip";
import { DiagnosticItems } from "./DiagnosticItems/DiagnosticItems";
import toast from "react-hot-toast";

const ApiDetails = () => {
  const [details, setDetails] = useState<any>(null);
  const [apiKey, setApiKey] = useState<any>(null);
  const [fullTest, setFullTest] = useState<any>(null);
  const [fullDiagMessage, setFullDiagMessage] = useState<any>({
    api_gateway_status: {
      success: null,
      error: null,
      errorMess: null,
      fullData: null,
    },
    api_key_status: {
      success: null,
      error: null,
      errorMess: null,
      fullData: null,
    },
    cognito_status: {
      success: null,
      error: null,
      errorMess: null,
      fullData: null,
    },
    token_status: {
      success: null,
      error: null,
      errorMess: null,
      fullData: null,
    },
    authorization_status: {
      success: null,
      error: null,
      errorMess: null,
      fullData: null,
    },
    feed_config_status: {
      success: null,
      error: null,
      errorMess: null,
      fullData: null,
    },
    invoice_status: {
      success: null,
      error: null,
      errorMess: null,
      fullData: null,
    },
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const getList = useGetAPIMgmtList();
  const getCredentials = useGetAPIMgmtCredential();

  const getDetails = () => {
    getList.mutate(
      {
        data: { id: id ? +id : 0 },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setDetails(res.data.result);
          } else setDetails(null);
        },
        onError: (err: any) => {
          setDetails(null);
        },
      }
    );
  };

  const getApiKey = () => {
    getCredentials.mutate(
      {
        usage_type: "api_key",
        user_api_key_id: id ? +id : 0,
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setApiKey(res.data.result);
          } else setApiKey(null);
        },
        onError: (err) => {
          setApiKey(null);
        },
      }
    );
  };

  useEffect(() => {
    getDetails();
    getApiKey();
  }, [id]);

  const opDiagnostic = useDiagnosticAPIMgmt();

  const doFullDiagnostic = () => {
    opDiagnostic.mutate(
      {
        user_api_key_id: id ? +id : 0,
        diagnostic_type: "full_diagnostic",
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res?.data?.result;
            result?.forEach((item: any) => {
              let statuss = item?.status;
              if (statuss) {
                fullDiagMessage[`${item?.diagnostic_type}`] = {
                  success: true,
                  error: null,
                  errorMess: null,
                  fullData: item,
                };
              } else {
                let fullDesc = item?.description;
                fullDiagMessage[`${item?.diagnostic_type}`] = {
                  success: null,
                  error: true,
                  errorMess: fullDesc?.join(" , "),
                  fullData: item,
                };
              }
            });
            setFullTest("Done");
          } else {
            toast.error("Error occured! Please try again");
            setFullTest("Error");
          }
        },
        onError: (err) => {
          toast.error("Error occured! Please try again");
        },
      }
    );
  };

  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center ms-1"></div>
      </div>
    );
  };

  return (
    <Row className="">
      <Col xs={12}>
        <CardWrapper
          title={
            getCredentials.isLoading || getList.isLoading
              ? "Loading ..."
              : details
              ? details.username
                ? details.username
                : "Not Set"
              : "Not Set"
          }
          headerChild={headerRightSide()}
          borderBottom
        >
          {getCredentials.isLoading || getList.isLoading ? (
            <LoadingData wrapperStyle="py-5 my-3" />
          ) : (
            <>
              <Row style={{ minHeight: "140px" }}>
                <Col xs={12} className="order-2 order-md-1">
                  <Row className="mt-1">
                    <Col xs={12} className="mt-1">
                      <span
                        style={{ color: "#314bc9", marginBottom: "10px" }}
                        className="fs-5 fw-bolder d-inline-block"
                      >
                        Record Information
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        RF User ID
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {details
                          ? details.user_id
                            ? details.user_id
                            : "Not Set"
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        App Client ID
                      </span>
                      <CustomTooltip placement="bottom" target={"ff"}>
                        {details
                          ? details.client_id
                            ? details.client_id
                            : "Not Set"
                          : "Not Set"}
                      </CustomTooltip>
                      <span
                        id="ff"
                        style={{ width: "55%" }}
                        className="customeInfoFontSize staffInfoText text-truncate d-inline-block"
                      >
                        {details
                          ? details.client_id
                            ? details.client_id
                            : "Not Set"
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        RF Username
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {details
                          ? details.username
                            ? details.username
                            : "Not Set"
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Invoice ID
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {details
                          ? details.invoice_id
                            ? details.invoice_id
                            : "Not Set"
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Cognito username
                      </span>
                      <CustomTooltip placement="bottom" target={"cc"}>
                        {details
                          ? details.cognito_username
                            ? details.cognito_username
                            : "Not Set"
                          : "Not Set"}
                      </CustomTooltip>
                      <span
                        id={"cc"}
                        style={{ width: "55%" }}
                        className="customeInfoFontSize staffInfoText text-truncate d-inline-block"
                      >
                        {details
                          ? details.cognito_username
                            ? details.cognito_username
                            : "Not Set"
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        Usage plan
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {details
                          ? details.usage_plan_name
                            ? details.usage_plan_name
                            : "Not Set"
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        API Key
                      </span>
                      <CustomTooltip placement="bottom" target={"aa"}>
                        {apiKey ? apiKey : "Not Set"}
                      </CustomTooltip>
                      <span
                        id={"aa"}
                        style={{ width: "55%" }}
                        className="customeInfoFontSize staffInfoText text-truncate d-inline-block"
                      >
                        {apiKey ? apiKey : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        API ID
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {details
                          ? details.id
                            ? details.id
                            : "Not Set"
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span
                        style={{ width: "30%", display: "inline-block" }}
                        className="fs-6 fw-bolder me-5 staffInfoTitle"
                      >
                        API Key Name
                      </span>
                      <CustomTooltip placement="bottom" target={"bb"}>
                        {details
                          ? details.name
                            ? details.name
                            : "Not Set"
                          : "Not Set"}
                      </CustomTooltip>
                      <span
                        id={"bb"}
                        style={{ width: "55%" }}
                        className="customeInfoFontSize staffInfoText text-truncate d-inline-block"
                      >
                        {details
                          ? details.name
                            ? details.name
                            : "Not Set"
                          : "Not Set"}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Divider wrapperClassName="my-1" />
              <Row style={{ minHeight: "140px", marginBottom: "20px" }}>
                <Col xs={12} className="order-2 order-md-1">
                  <Row className="mt-1">
                    <Col xs={12} className="">
                      <span
                        style={{ color: "#314bc9", marginBottom: "10px" }}
                        className="fs-5 fw-bolder d-inline-block"
                      >
                        Diagnostic Items
                      </span>
                    </Col>
                    <Col xs={12} className="">
                      <span className="customeInfoFontSize staffInfoText text-wrap">
                        From this part, you can test different parts of the
                        system and follow up if an error occurs
                      </span>
                    </Col>
                    <Col xs={12} className="mt-2 text-center text-sm-start">
                      <SubmitButton
                        noForm
                        color=""
                        type="button"
                        className="px-3"
                        onClick={doFullDiagnostic}
                        isLoading={opDiagnostic.isLoading}
                      >
                        Full Diagnostic
                      </SubmitButton>
                    </Col>
                    <Col
                      style={{
                        backgroundColor: "#f8f8f8",
                        padding: "30px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                      xs={11}
                      md={10}
                      lg={8}
                      xl={7}
                      className="m-0 mt-2 rounded-3 overflow-hidden ms-1"
                    >
                      <DiagnosticItems
                        title="API Gateway Status"
                        isLoading={opDiagnostic.isLoading}
                        fullDiagMessage={fullDiagMessage["api_gateway_status"]}
                        dType="api_gateway_status"
                        fullTest={fullTest}
                      />
                      <DiagnosticItems
                        title="API Key Settings"
                        isLoading={opDiagnostic.isLoading}
                        fullDiagMessage={fullDiagMessage["api_key_status"]}
                        dType="api_key_status"
                        fullTest={fullTest}
                      />
                      <DiagnosticItems
                        title="Cognito status check"
                        isLoading={opDiagnostic.isLoading}
                        fullDiagMessage={fullDiagMessage["cognito_status"]}
                        dType="cognito_status"
                        fullTest={fullTest}
                      />
                      <DiagnosticItems
                        title="Token Gen status check"
                        isLoading={opDiagnostic.isLoading}
                        fullDiagMessage={fullDiagMessage["token_status"]}
                        dType="token_status"
                        fullTest={fullTest}
                      />
                      <DiagnosticItems
                        title="Authorizer Status check"
                        isLoading={opDiagnostic.isLoading}
                        fullDiagMessage={
                          fullDiagMessage["authorization_status"]
                        }
                        dType="authorization_status"
                        fullTest={fullTest}
                      />
                      <DiagnosticItems
                        title="Feed Config Check"
                        isLoading={opDiagnostic.isLoading}
                        fullDiagMessage={fullDiagMessage["feed_config_status"]}
                        dType="feed_config_status"
                        fullTest={fullTest}
                      />
                      <DiagnosticItems
                        title="Invoice Status"
                        isLoading={opDiagnostic.isLoading}
                        fullDiagMessage={fullDiagMessage["invoice_status"]}
                        noBrBottom
                        dType="invoice_status"
                        fullTest={fullTest}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </CardWrapper>
      </Col>
    </Row>
  );
};

export { ApiDetails };
