import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { CustomTooltip } from "@src/components/common/tooltip";
import { useDiagnosticAPIMgmt } from "@src/core/services/api/api-key";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Link, ChevronUp, ChevronDown } from "react-feather";

interface IDiagnosticItemsProp {
  title?: string;
  onClick?: () => void;
  isLoading?: boolean;
  noBrBottom?: boolean;
  fullDiagMessage?: any;
  keyId?: number;
  dType: string;
  fullTest?: any;
}

const DiagnosticItems: FC<IDiagnosticItemsProp> = ({
  title,
  onClick,
  isLoading,
  noBrBottom = false,
  fullDiagMessage,
  keyId,
  dType,
  fullTest,
}): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [apiSuccess, setApiSuccess] = useState<boolean>(true);

  const CustomeIcon = apiSuccess ? ChevronUp : ChevronDown;

  const [fullData, setFullData] = useState<any>(null);
  const [data, setData] = useState<any>({
    status: false,
    errorTitle: null,
    error: null,
    success: null,
  });

  useEffect(() => {
    if (fullDiagMessage?.fullData) {
      setFullData([fullDiagMessage["fullData"]]);
    } else {
    }
  }, [fullDiagMessage]);

  const [doneMessages, setDoneMessages] = useState<any>({
    api_gateway_status: "API Gateway status checked successfully",
    api_key_status: "API Key status checked successfully",
    cognito_status: "Cognito status checked successfully",
    token_status: "Token Gen status checked successfully",
    authorization_status: "Authorizer status checked successfully",
    feed_config_status: "Feed Config status checked successfully",
    invoice_status: "Invoice status checked successfully",
  });
  const [errorMessages, setErrorMessages] = useState<any>({
    api_gateway_status: "Something went wrong! , try again",
    api_key_status: "Something went wrong! , try again",
    cognito_status: "Something went wrong! , try again",
    token_status: "Something went wrong! , try again",
    authorization_status: "Something went wrong",
    feed_config_status: "Something went wrong! , try again",
    invoice_status: "Something went wrong! , try again",
  });
  const [errorTitle, setErrorTitle] = useState<any>({
    api_gateway_status: "API gateway has encountered an error",
    api_key_status: "API key has encountered an error",
    cognito_status: "Cognito has encountered an error",
    token_status: "Token generator has encountered an error",
    authorization_status: "Authorizer has encountered an error",
    feed_config_status: "Feed config has encountered an error",
    invoice_status: "Invoice has encountered an error",
  });

  const opDiagnostic = useDiagnosticAPIMgmt();

  const doDiagnostic = () => {
    opDiagnostic.mutate(
      {
        user_api_key_id: id ? +id : 0,
        diagnostic_type: dType,
      },
      {
        onSuccess: (res) => {
          if (res.data?.is_success) {
            setFullData(res.data?.result);
            let statuss = res?.data?.result[0]?.status;
            let fullDesc = res?.data?.result[0]?.description;
            if (statuss) {
              setData({
                status: true,
                errorTitle: null,
                error: null,
                success: doneMessages[`${dType}`],
              });
            } else {
              setData({
                status: true,
                errorTitle: errorTitle[`${dType}`],
                error: fullDesc?.join(" , "),
                success: null,
              });
            }
          } else {
            setData({
              status: true,
              errorTitle: errorTitle[`${dType}`],
              //@ts-ignore
              error: res.data?.message
                ? //@ts-ignore
                  res.data?.message
                : errorMessages[`${dType}`],
              success: null,
            });
          }
        },
        onError: (err) => {
          toast.error("Error occured! Please try again");
        },
      }
    );
  };

  useEffect(() => {
    if (fullTest && fullTest === "Done") {
      setData({
        status: true,
        errorTitle: fullDiagMessage["error"] ? errorTitle[`${dType}`] : null,
        error: fullDiagMessage["error"] ? fullDiagMessage["errorMess"] : null,
        success: fullDiagMessage["success"] ? doneMessages[`${dType}`] : null,
      });
    } else if (fullTest && fullTest === "Error") {
    }
  }, [fullTest, fullDiagMessage]);

  const onCopy = (res?: string) => {
    navigator.clipboard.writeText("" + res);
    toast.success("Error copied successfully");
  };

  return (
    <>
      <Row
        style={{
          borderBottom: !noBrBottom
            ? "1px solid rgba(230, 229, 234, 0.5)"
            : undefined,
        }}
        className="p-0 m-0"
      >
        <Col
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingRight: 0,
            paddingLeft: 0,
          }}
          className="m-0 d-flex flex-column flex-sm-row justify-content-start align-items-center"
          xs={12}
        >
          <div className="p-0 m-0">
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#314bc9",
                borderRadius: "100%",
              }}
              className="d-inline-block"
            ></span>
            <span className="ms-1 d-inline-block text-darker fs-5 fw-bolder">
              {title}
            </span>
          </div>
          {!data.status && (
            <SubmitButton
              onClick={onClick ? onClick : doDiagnostic}
              noForm
              color=""
              type="button"
              className="ms-0 ms-sm-auto mt-1 mt-sm-0"
              outline
              isLoading={isLoading || opDiagnostic.isLoading}
            >
              {`${"Diagnostic"}`}
            </SubmitButton>
          )}

          {data.status && (data.success || data.error) && (
            <div className="m-0 p-0 ms-0 ms-sm-auto mt-1 mt-sm-0 px-2 d-flex flex-row justify-content-start align-items-center">
              <img
                className=""
                src={
                  data.success
                    ? require("../../../../assets/images/icons/keyManagement/done2.png")
                        .default
                    : data.error
                    ? require("../../../../assets/images/icons/keyManagement/cancel2.png")
                        .default
                    : require("../../../../assets/images/icons/keyManagement/done2.png")
                        .default
                }
                alt="icon"
                style={{
                  objectFit: "contain",
                  width: "16.3px",
                  height: "16.3px",
                  marginRight: "10px",
                }}
              />
              <span
                style={{
                  verticalAlign: "center",
                  color: data.success
                    ? "#21c44c"
                    : data.error
                    ? "#f5334f"
                    : "#21c44c",
                }}
                className="d-inline-block text-darker fs-5"
              >
                {data.success ? "Success" : data.error ? "Error" : "Not Set"}
              </span>
            </div>
          )}
          {data.status && data.error && (
            <SubmitButton
              onClick={doDiagnostic}
              noForm
              color=""
              type="button"
              className="ms-0 mt-1 mt-sm-0"
              outline
              isLoading={isLoading || opDiagnostic.isLoading}
            >
              {`${"Try again"}`}
            </SubmitButton>
          )}
        </Col>
        {data.status && (data.success || data.error) && (
          <Col className="p-0 m-0 mb-1">
            <span
              style={{ marginLeft: "5px" }}
              className="d-inline-block text-darker fs-5 w-100 text-truncate"
            >
              {data.success
                ? data.success
                : data.error || data.errorTitle
                ? data.errorTitle
                : "Not Set"}
            </span>
          </Col>
        )}
        {data.status && data.error && (
          <Col
            style={{
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.48)",
            }}
            xs={11}
            className="p-1 m-0 ms-1 mb-1 rounded-2 d-flex flex-column align-items-start justify-content-center"
          >
            <div className="p-0 m-0">
              <img
                onClick={() => onCopy(data.error)}
                src={
                  require("../../../../assets/images/icons/keyManagement/copy2.png")
                    .default
                }
                alt="icon"
                style={{
                  objectFit: "contain",
                  width: "15.3px",
                  height: "15.3px",
                  //marginLeft: "auto",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
              <span
                style={{ verticalAlign: "center", color: "#314bc9" }}
                className="fs-6-1"
              >
                Error text:
              </span>
            </div>
            <div
              style={{ margin: 0, marginTop: "14px", overflow: "hidden" }}
              className="p-0 w-100"
            >
              <CustomTooltip placement="bottom" target={dType}>
                {`${data.error}`}
              </CustomTooltip>
              <span
                id={dType}
                style={{
                  verticalAlign: "center",
                  color: "#182d49",
                  width: "100%",
                }}
                className="fs-6-1 d-inline-block text-truncate"
              >
                {`Error: ${data.error}`}
              </span>
            </div>
          </Col>
        )}
        {data.status && data.success && dType === "api_key_status" && (
          <Col
            style={{
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.48)",
            }}
            xs={11}
            className="p-1 m-0 ms-1 mb-1 rounded-2 d-flex flex-column align-items-start justify-content-center"
          >
            <div className="p-0 m-0 w-100 d-flex justify-content-start align-items-center">
              <Link
                style={{ marginRight: "7px", marginBottom: "2px" }}
                size={14}
                color="#314bc9"
                className=""
                //onClick={() => onCopy(data.error)}
              />
              <span
                style={{ verticalAlign: "center", color: "#314bc9" }}
                className="fs-6-1"
              >
                Resources:
              </span>
              <CustomeIcon
                style={{}}
                size={17}
                color="#314bc9"
                className="ms-auto cursor-pointer"
                onClick={() => setApiSuccess((old: boolean) => !old)}
              />
            </div>
            <div
              style={{
                margin: 0,
                marginTop: apiSuccess ? "14px" : undefined,
                overflow: "hidden",
                height: apiSuccess ? "auto" : 0,
                opacity: apiSuccess ? 1 : 0.5,
                visibility: apiSuccess ? "visible" : "hidden",
              }}
              className="p-0 w-100 d-flex flex-column justift-content-center align-items-center"
            >
              {fullData[0]?.data?.allowed_origins?.length > 0 ? (
                fullData[0]?.data?.allowed_origins?.map(
                  (item: any, index: number) => {
                    return (
                      <div className="w-100 d-flex justift-content-start align-items-center mb-1">
                        <span
                          style={{
                            backgroundColor: "#cdcdcd",
                            width: "6px",
                            height: "6px",
                            borderRadius: "100%",
                            marginLeft: "4px",
                            marginRight: "14px",
                          }}
                          className="d-inline-block"
                        ></span>
                        <span
                          style={{
                            color: "#2e2e33",
                            fontSize: "15px",
                          }}
                          className="d-inline-block text-truncate pe-1"
                        >
                          {item}
                        </span>
                      </div>
                    );
                  }
                )
              ) : (
                <div className="w-100 text-center">No resources to show</div>
              )}
            </div>
          </Col>
        )}
      </Row>
    </>
  );
};

export { DiagnosticItems };
