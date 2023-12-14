import React, { FC } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import {
  Edit,
  Target,
  ChevronDown,
  Calendar,
  Plus,
  Bell,
  AlignRight,
  ChevronRight,
  Edit3,
  Edit2,
} from "react-feather";
import { Row, Col } from "reactstrap";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { ComponentSpinner } from "@src/components/common/spinner/Loading-spinner";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { requestStatus } from "../../data";
import classNames from "classnames";
import { IsSameUrl } from "@src/core/utils/Utils";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { useNavigate, useParams } from "react-router-dom";

interface IRequestInformationProp {
  data: any;
  isLoading: boolean;
  clientData: any;
}

const RequestInformation: FC<IRequestInformationProp> = ({
  data,
  isLoading,
  clientData,
}): JSX.Element => {
  const { id } = useParams();

  const navigate = useNavigate();

  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center border-end-secondary pe-1">
          <span className="fs-6 fw-bolder me-1">Handler</span>
          <RippleButton
            className="d-flex justify-content-center"
            color="light"
            size="sm"
          >
            <span className="fs-6 me-1">
              {data?.handler_name ? data.handler_name : "Not Set"}
            </span>
            <Edit2 size={15} />
          </RippleButton>
        </div>
        <div className="d-flex align-items-center ms-1">
          <RippleButton
            className="d-flex justify-content-center me-1"
            color="light"
            size="sm"
          >
            <span
              className={classNames(
                "fs-6",
                data
                  ? data.status === "active"
                    ? "text-success"
                    : data.status === "rejected"
                    ? "text-danger"
                    : data.status === "pending"
                    ? "text-warning"
                    : data.status === "canceled"
                    ? "text-secondary"
                    : "text-primary"
                  : "text-warning"
              )}
            >
              {data ? requestStatus[data.status].title : "Pending"}{" "}
            </span>
            <Target
              size={15}
              color={
                data
                  ? data.status === "active"
                    ? "#198754"
                    : data.status === "rejected"
                    ? "#dc3545"
                    : data.status === "pending"
                    ? "#ffc107"
                    : data.status === "canceled"
                    ? "#6c757d"
                    : "#0d6efd"
                  : "#e7c415"
              }
              className={
                data
                  ? data.status === "active"
                    ? "text-success"
                    : data.status === "rejected"
                    ? "text-danger"
                    : data.status === "pending"
                    ? "text-warning"
                    : data.status === "canceled"
                    ? "text-secondary"
                    : "text-primary"
                  : "text-warning"
              }
            />
            <ChevronDown size={15} />
          </RippleButton>

          {/* <RippleButton
            className="d-flex justify-content-center me-1"
            color="light"
            size="sm"
          >
            <Calendar size={18} color="#68686b" />
          </RippleButton>
          <RippleButton
            className="d-flex justify-content-center"
            color="light"
            size="sm"
          >
            <Bell size={18} color="#68686b" />
          </RippleButton> */}
        </div>
      </div>
    );
  };

  return (
    <CardWrapper
      title="Request Information"
      headerChild={headerRightSide()}
      borderBottom
    >
      {isLoading ? (
        <LoadingData />
      ) : (
        <FormWrapper initialValues={{}} onSubmit={() => {}}>
          <Row className="mt-1 mb-2">
            <Col sm={6}>
              <span
                style={{ width: "45%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1 text-black"
              >
                Requested MLS
              </span>
              <span className="fs-6 text-info">
                {data && data.mls_name ? data.mls_name : "Not Set"}
              </span>
            </Col>
            <Col
              sm={6}
              className="d-flex justify-content-between align-items-center"
            >
              <div style={{ width: "100%" }}>
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-black"
                >
                  FeedType
                </span>
                <span className="fs-6 text-secondary">IDX</span>
              </div>
              <Edit3 size={18} onClick={() => navigate("/alerts/edit/" + id)} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm={6}>
              {/* <div className="mb-1">
                <span className="fs-6 fw-bold me-1 text-black">Request ID</span>
                <span className="fs-6 text-secondary">Rqs-122-45689</span>
              </div> */}
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Website for showing MLS
                </span>
                <span className="fs-6 text-info">
                  {data && data.agent_website ? data.agent_website : "Not Set"}
                </span>
              </div>
              <div>
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Client source
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.client_source ? data.client_source : "Not Set"}
                </span>
              </div>
            </Col>
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Ticket Number
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.ticket_number ? data.ticket_number : "Not Set"}
                </span>
              </div>
              <div>
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Submit Date
                </span>
                <span className="fs-6 text-secondary">
                  {data ? getCustomDate(data.creation_date) : "Not Set"}
                </span>
              </div>
            </Col>
          </Row>

          <Row className="mb-2 border-bottom">
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Agent MLS ID
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.agent_mls_id ? data.agent_mls_id : "Not Set"}
                </span>
              </div>
              {/* <div className="mb-1">
                <span className="fs-6 fw-bold me-1 text-black">
                  Agent Phone
                </span>
                <span className="fs-6 text-secondary">00 22 589 8589</span>
              </div> */}
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Broker MLS ID
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.broker_mls_id ? data.broker_mls_id : "Not Set"}
                </span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Broker Email
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.broker_email ? data.broker_email : "Not Set"}
                </span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Office name
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.office_name ? data.office_name : "Not Set"}
                </span>
              </div>
            </Col>
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Agent Full Name
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.agent_name ? data.agent_name : "Not Set"}
                </span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Agent Email
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.agent_email ? data.agent_email : "No Set"}
                </span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Broker Name
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.broker_name ? data.broker_name : "Not Set"}
                </span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bold me-1 text-black"
                >
                  Office Name
                </span>
                <span className="fs-6 text-secondary">
                  {data && data.office_name ? data.office_name : "Not Set"}
                </span>
              </div>
            </Col>
          </Row>

          <p className="h6 text-primary fw-bolder">Client Information</p>
          <Row className="mt-1 mb-2 border-bottom">
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-black"
                >
                  Client ID
                </span>
                <span className="fs-6 text-info">
                  {clientData && clientData.username
                    ? clientData.username
                    : "Not Set"}
                </span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-black"
                >
                  Company
                </span>
                <span className="fs-6 text-secondary">Realtyna</span>
              </div>
              {/* <div className="mb-1">
                <span className="fs-6 fw-bolder me-1 text-black">Phone</span>
                <span className="fs-6 text-secondary">00 22 888 1369</span>
              </div> */}
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-black"
                >
                  Address
                </span>
                <span className="fs-6 text-secondary">
                  {clientData && clientData.full_address
                    ? clientData.full_address
                    : "Not Set"}
                </span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-black"
                >
                  Job Title
                </span>
                <span className="fs-6 text-secondary">
                  {clientData && clientData.job_title
                    ? clientData.job_title
                    : "Not Set"}
                </span>
              </div>
              {/* <div className="mb-1">
                <span className="fs-6 fw-bolder me-1 text-black">Websites</span>
                <span className="fs-6 text-info">www.xyxrealty.com</span>
              </div>
              <div className="mb-1">
                <span className="fs-6 fw-bolder me-1 text-black">Source</span>
                <span className="fs-6 text-secondary">Realtyna.com</span>
              </div> */}
            </Col>
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-black"
                >
                  Full Name
                </span>
                <span className="fs-6 text-secondary">
                  {clientData && clientData.first_name
                    ? clientData.first_name + " " + clientData.last_name
                    : "Not Set"}
                </span>
              </div>
              <div>
                <span
                  style={{ width: "45%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-black"
                >
                  Email
                </span>
                <span className="fs-6 text-secondary">
                  {clientData && clientData.email
                    ? clientData.email
                    : "Not Set"}
                </span>
              </div>
            </Col>
          </Row>

          <p className="h6 text-black fw-bolder mt-1">Comment</p>
          <Row className="align-items-center">
            <Col xs={10} className="pe-0">
              <span className="text-truncate d-block">
                {data && data.comments ? data.comments : "Not Set"}
              </span>
            </Col>
            <Col xs={2} className="p-0">
              <RippleButton color="link">
                More <ChevronRight size={15} />
              </RippleButton>
            </Col>
          </Row>
        </FormWrapper>
      )}
    </CardWrapper>
  );
};

export { RequestInformation };
