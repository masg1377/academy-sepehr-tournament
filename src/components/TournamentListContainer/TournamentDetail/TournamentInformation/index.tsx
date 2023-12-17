import React, { FC } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { Edit, Target, ChevronDown, Calendar, Plus } from "react-feather";
import { Row, Col } from "reactstrap";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import {
  getCustomDate,
  getCustomClock,
} from "@src/core/utils/date-helper.utils";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useNavigate, useParams } from "react-router-dom";

interface IMlsInformationProp {
  data: any;
  isLoading: boolean;
}

const TournamentInformation: FC<IMlsInformationProp> = ({
  data,
  isLoading,
}): JSX.Element => {
  console.log("data", data);
  const { id } = useParams();
  const navigate = useNavigate();
  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
        <SubmitButton
          onClick={() => navigate("/tournament-detail/add-avg/" + id)}
        >
          Set Average
        </SubmitButton>
        {/* <div className="d-flex align-items-center border-end-secondary pe-1">
          <span className="fs-6 fw-bolder me-1">Handler</span>
         
        </div> */}
        {/* <div className="d-flex align-items-center ms-1">
          <RippleButton
            className="d-flex justify-content-center me-1"
            color="light"
            size="sm"
          >
            <span className="fs-6 pending">Pending </span>
            <Target size={15} color="#e7c415" />
            <ChevronDown size={15} />
          </RippleButton>

          <RippleButton
            className="d-flex justify-content-center"
            color="light"
            size="sm"
          >
            <Calendar size={18} color="#68686b" />
          </RippleButton>
        </div> */}
      </div>
    );
  };

  return (
    <CardWrapper
      title="Tournament Information"
      headerChild={headerRightSide()}
      borderBottom
    >
      {isLoading ? (
        <LoadingData wrapperStyle="py-5 my-3" />
      ) : (
        <FormWrapper
          initialValues={{ status: data?.active }}
          enableReinitialize
          onSubmit={() => {}}
        >
          <Row className="mt-1 mb-1">
            <Col sm={6}>
              <span
                style={{ width: "30%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1"
              >
                Tournament Name
              </span>
              <span className="fs-6">
                {data && data.tournamentName ? data.tournamentName : "Not Set"}
              </span>
            </Col>
            <Col sm={6}>
              <span
                style={{ width: "30%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1"
              >
                Describe
              </span>
              <span className="fs-6 text-primary">
                {data && data.describe ? data.describe : "Not Set"}
              </span>
            </Col>
          </Row>
          <div className="d-flex align-items-center mb-1">
            <span
              style={{ width: "14.6%", display: "inline-block" }}
              className="fs-6 fw-bolder me-1"
            >
              Start Date
            </span>
            <div className="d-flex">
              <span className="fs-6 text-primary">
                {data && data.startDate ? getCustomDate(data.startDate) : "-"}
              </span>
            </div>
          </div>
          <Row className="mt-1 mb-1">
            <Col sm={6}>
              <div className="">
                <span
                  style={{ width: "30%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1"
                >
                  End Date
                </span>
                <span className="fs-6 text-primary">
                  {data && data.endDate ? getCustomDate(data.endDate) : "-"}
                </span>
              </div>
            </Col>
          </Row>

          <SwitchBox
            name="status"
            defaultChecked={data && data.active ? data.active : false}
            disabled
            withIcon={false}
            color="success"
            labelClassName="fw-bolder"
            wrapperClassName="mb-2"
          >
            Active
          </SwitchBox>

          <p className="h6 text-primary fw-bolder">Details</p>
          <Row className="mt-1 mb-1">
            <Col sm={6}>
              <div className="">
                <span
                  style={{ width: "30%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1"
                >
                  Group Count
                </span>
                <span className="fs-6">
                  {data && data.groupCount ? data.groupCount : "Not Set"}
                </span>
              </div>
            </Col>
            <Col sm={6}>
              <span
                style={{ width: "30%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1"
              >
                CheckList Count
              </span>
              <span className="fs-6">
                {data && data.checkListCount ? data.checkListCount : "Not Set"}
              </span>
            </Col>
          </Row>
          <Row className="mt-1 mb-1">
            <Col sm={6}>
              <div className="">
                <span
                  style={{ width: "30%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1"
                >
                  reffer Count
                </span>
                <span className="fs-6">
                  {data && data.refferCount ? data.refferCount : "Not Set"}
                </span>
              </div>
            </Col>
          </Row>
          {/* <SwitchBox
            name="status"
            withIcon={false}
            disabled
            defaultChecked={
              data && data.report_required ? data.report_required : false
            }
            color="success"
            labelClassName="fw-bolder"
          >
            Report Required
          </SwitchBox>

          <Row className="mt-1 mb-3">
            <Col sm={6}>
              <span
                style={{ width: "30%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1"
              >
                Report Interval
              </span>
              <span className="fs-6">
                {data && data.report_interval
                  ? data.report_interval
                  : "Not Set"}
              </span>
            </Col>
            <Col sm={6}>
              <span
                style={{ width: "30%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1"
              >
                Report Day of Month
              </span>
              <span className="fs-6">
                {data && data.report_day_of_month
                  ? data.report_day_of_month
                  : "Not Set"}
              </span>
            </Col>
          </Row> */}

          <p className="h6 text-primary fw-bolder">Avrage</p>
          <Row className="mt-1 mb-3">
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "30%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1"
                >
                  avgRange
                </span>
                <span className="fs-6">
                  {data && data.avgRange ? data.avgRange : "Not Set"}
                </span>
              </div>
              {/* <div>
                <span className="fs-6 fw-bolder me-1">Coverage Area</span>
                <span className="fs-6">4617, 7819, 1012, Florida</span>
              </div> */}
            </Col>
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "40%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1"
                >
                  currentCheckListAvrage
                </span>
                <span className="fs-6">
                  {data && data.currentCheckListAvrage
                    ? data.currentCheckListAvrage
                    : "Not Set"}
                </span>
              </div>
            </Col>
            {/* <Col sm={6}>
              <div className="mb-1">
                <span className="fs-6 fw-bolder me-1"># of Clients</span>
                <span className="fs-6">873</span>
              </div>
              <div>
                <span className="fs-6 fw-bolder me-1"># of Agents</span>
                <span className="fs-6">100</span>
              </div>
            </Col> */}
          </Row>

          <p className="h6 text-primary fw-bolder">
            Contact Information For Billing
          </p>
        </FormWrapper>
      )}
    </CardWrapper>
  );
};

export { TournamentInformation };
