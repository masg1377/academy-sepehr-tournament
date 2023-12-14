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

interface IMlsInformationProp {
  data: any;
  isLoading: boolean;
}

const MlsInformation: FC<IMlsInformationProp> = ({
  data,
  isLoading,
}): JSX.Element => {
  console.log(data);
  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
        {/* <div className="d-flex align-items-center border-end-secondary pe-1">
          <span className="fs-6 fw-bolder me-1">Handler</span>
          <RippleButton
            className="d-flex justify-content-center"
            color="light"
            size="sm"
          >
            <span className="fs-6 me-1">Nolan M</span>
            <Edit size={15} />
          </RippleButton>
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
      title="MLS Information"
      headerChild={headerRightSide()}
      borderBottom
    >
      {isLoading ? (
        <LoadingData wrapperStyle="py-5 my-3" />
      ) : (
        <FormWrapper initialValues={{}} onSubmit={() => {}}>
          <Row className="mt-1 mb-1">
            <Col sm={6}>
              <span
                style={{ width: "30%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1"
              >
                Full Name
              </span>
              <span className="fs-6">
                {data && data.name ? data.name : "Not Set"}
              </span>
            </Col>
            <Col sm={6}>
              <span
                style={{ width: "30%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1"
              >
                Group Name
              </span>
              <span className="fs-6 text-primary">
                {data && data.group_name ? data.group_name : "Not Set"}
              </span>
            </Col>
          </Row>
          <div className="d-flex align-items-center mb-1">
            <span
              style={{ width: "14.6%", display: "inline-block" }}
              className="fs-6 fw-bolder me-1"
            >
              Feed Type
            </span>
            <div className="d-flex">
              {data && data.feed_types ? (
                data.feed_types.map((feed: any, key: number) =>
                  feed ? (
                    <RippleButton
                      className="d-flex justify-content-center fs-6 me-1"
                      color="light"
                      size="sm"
                      key={key}
                    >
                      {feed && feed.feed_type ? feed.feed_type : "-"}
                    </RippleButton>
                  ) : (
                    <span className="fs-6 text-primary">Not Set</span>
                  )
                )
              ) : (
                <span className="fs-6 text-primary">Not Set</span>
              )}
            </div>
          </div>

          <div className="mb-1">
            <span
              style={{ width: "14.7%", display: "inline-block" }}
              className="fs-6 fw-bolder me-1"
            >
              Last Listings Update
            </span>
            <span className="fs-6">
              {data && data.modification_date
                ? getCustomDate(data.modification_date) +
                  " - " +
                  getCustomClock(data.modification_date)
                : "Not Set"}
            </span>
          </div>

          <SwitchBox
            name="status"
            defaultChecked={data && data.status ? data.status : false}
            disabled
            withIcon={false}
            color="success"
            labelClassName="fw-bolder"
            wrapperClassName="mb-2"
          >
            Status
          </SwitchBox>

          <p className="h6 text-primary fw-bolder">Contract Details</p>
          <SwitchBox
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
          </Row>

          <p className="h6 text-primary fw-bolder">Details</p>
          <Row className="mt-1 mb-3">
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "30%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1"
                >
                  Address
                </span>
                <span className="fs-6">
                  {data && data.address ? data.address : "Not Set"}
                </span>
              </div>
              {/* <div>
                <span className="fs-6 fw-bolder me-1">Coverage Area</span>
                <span className="fs-6">4617, 7819, 1012, Florida</span>
              </div> */}
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
          <Row className="mt-1 pb-1 ">
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "30%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1"
                >
                  Website
                </span>
                <span className="fs-6 text-primary">
                  {data && data.website ? data.website : "Not Set"}
                </span>
              </div>
              {data &&
                data.contact_details &&
                data.contact_details.contact_person1 && (
                  <div className="mb-1">
                    <span
                      style={{ width: "30%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-1"
                    >
                      Contact 1
                    </span>
                    <span className="fs-6">
                      {data.contact_details.contact_person1}
                    </span>
                  </div>
                )}
              {data &&
                data.contact_details &&
                data.contact_details.contact_person2 && (
                  <div>
                    <span
                      style={{ width: "30%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-1"
                    >
                      Contact 2
                    </span>
                    <span className="fs-6">
                      {data.contact_details.contact_person2}
                    </span>
                  </div>
                )}
            </Col>
            <Col sm={6}>
              <div className="mb-1">
                <span
                  style={{ width: "30%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1"
                >
                  Contact Num
                </span>
                <span className="fs-6 ">00 225 558 9966</span>
              </div>
              {data &&
                data.contact_details &&
                data.contact_details.contact_ticket && (
                  <div className="mb-1">
                    <span
                      style={{ width: "30%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-1"
                    >
                      Contact Ticket
                    </span>
                    <span className="fs-6">
                      {data.contact_details.contact_ticket}
                    </span>
                  </div>
                )}
              <div>
                <span
                  style={{ width: "30%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1"
                >
                  Contact Email
                </span>
                <span className="fs-6">
                  {data && data.contact_email ? data.contact_email : "Not Set"}
                </span>
              </div>
            </Col>
          </Row>

          {/* <Row className="mt-1 border-bottom ">
            <Col sm={6}>
              <SelectOption
                name="workflow"
                placeholder="Please select"
                label={"Select Workflow"}
                id="workflow"
                options={[]}
                wrapperClassName="mb-1"
              />
            </Col>
            <Col sm={4}>
              <RippleButton
                className="mt-2"
                type="button"
                color="primary"
                onClick={() => {}}
              >
                <Plus size={15} />
                <span className="align-middle ms-50">Create New</span>
              </RippleButton>
            </Col>
          </Row> */}

          {/* <p className="h6 text-primary fw-bolder mt-1">
            Contact Information For Billing
          </p>
          <div className="mb-1">
            <span className="fs-6 fw-bolder me-1">Model Website</span>
            <span className="fs-6 text-primary">sitename.com/Billing</span>
          </div> */}
        </FormWrapper>
      )}
    </CardWrapper>
  );
};

export { MlsInformation };
