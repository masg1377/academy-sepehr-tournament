import { getCustomWrittenDate } from "@src/core/utils/date-helper.utils";
import React, { FC } from "react";
import { Col } from "reactstrap";

interface IOneTimeProp {
  data?: any;
}
const OneTime: FC<IOneTimeProp> = ({ data }): JSX.Element => {
  return (
    <>
      <Col sm={6} className="mt-1">
        <span
          style={{ width: "35%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          Nickname
        </span>
        <span className="fs-6 text-black">
          {data &&
          data.payment_methods &&
          data.payment_methods[0] &&
          data.payment_methods[0].nickname
            ? data.payment_methods[0].nickname
            : "Not Set"}
        </span>
      </Col>
      <Col sm={6} className="mt-1">
        <span
          style={{ width: "35%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          Creation Date
        </span>
        <span className="fs-6 text-black">
          {data &&
          data.payment_methods &&
          data.payment_methods[0] &&
          data.payment_methods[0].creation_date
            ? getCustomWrittenDate(data.payment_methods[0].creation_date)
            : "Not Set"}
        </span>
      </Col>{" "}
      <Col sm={6} className="mt-1">
        <span
          style={{ width: "35%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          Payment Type
        </span>
        <span className="fs-6 text-black">{"One Time"}</span>
      </Col>
      <Col sm={6} className="mt-1">
        <span
          style={{ width: "35%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          Unit amount
        </span>
        <span className="fs-6 text-black">
          {data &&
          data.payment_methods &&
          data.payment_methods[0] &&
          data.payment_methods[0].unit_amount
            ? "$" + data.payment_methods[0].unit_amount / 100
            : "Not Set"}
        </span>
      </Col>{" "}
      <Col sm={6} className="mt-1">
        <span
          style={{ width: "35%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          Billing schema
        </span>
        <span className="fs-6 text-black">
          {data &&
          data.payment_methods &&
          data.payment_methods[0] &&
          data.payment_methods[0].billing_schema
            ? data.payment_methods[0].billing_schema
            : "Not Set"}
        </span>
      </Col>
      <Col sm={6} className="mt-1">
        <span
          style={{ width: "35%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          Tires mode
        </span>
        <span className="fs-6 text-black">
          {data &&
          data.payment_methods &&
          data.payment_methods[0] &&
          data.payment_methods[0].tires_mode
            ? data.payment_methods[0].tires_mode
            : "Not Set"}
        </span>
      </Col>
      <Col sm={6} className="mt-1">
        <span
          style={{ width: "35%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          Tax behavior
        </span>
        <span className="fs-6 text-black">
          {data &&
          data.payment_methods &&
          data.payment_methods[0] &&
          data.payment_methods[0].tax_behavior
            ? data.payment_methods[0].tax_behavior
            : "Not Set"}
        </span>
      </Col>{" "}
      <Col sm={6} className="mt-1">
        <span
          style={{ width: "35%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          One time valid days
        </span>
        <span className="fs-6 text-black">
          {data &&
          data.payment_methods &&
          data.payment_methods[0] &&
          data.payment_methods[0].one_time_valid_days
            ? data.payment_methods[0].one_time_valid_days
            : "Not Set"}
        </span>
      </Col>{" "}
      <Col sm={6} className="mt-1">
        <span
          style={{ width: "35%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          Trial period days
        </span>
        <span className="fs-6 text-black">
          {data &&
          data.payment_methods &&
          data.payment_methods[0] &&
          data.payment_methods[0].trial_period_days
            ? data.payment_methods[0].trial_period_days
            : "Not Set"}
        </span>
      </Col>
    </>
  );
};

export { OneTime };
