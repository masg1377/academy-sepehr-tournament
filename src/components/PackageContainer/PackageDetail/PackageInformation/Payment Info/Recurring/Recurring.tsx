import { Divider } from "@src/components/common/divider/Divider";
import { getCustomWrittenDate } from "@src/core/utils/date-helper.utils";
import React, { FC, useState } from "react";
import { Col, Row } from "reactstrap";
import { ChevronUp, ChevronDown } from "react-feather";

interface IRecurringProp {
  data?: any;
}

const Recurring: FC<IRecurringProp> = ({ data }): JSX.Element => {
  return (
    <>
      <Col sm={12} className="mt-1">
        <span
          style={{ width: "17%", display: "inline-block" }}
          className="fs-6 fw-bolder me-2 text-secondary"
        >
          Payment Type
        </span>
        <span className="fs-6 text-black">{"Recurring"}</span>
      </Col>
      <Col sm={12} className="">
        <span
          style={{ display: "block", width: "100%" }}
          className="border-bottom mt-1"
        ></span>
      </Col>
      {data &&
        data.map((item: any, index: number) => {
          const [open, setOpen] = useState<boolean>(false);
          const [recNumber, setRecNumber] = useState<number>(0);
          return (
            <Col sm={12} className="px-4" key={item?.id + 10}>
              <Row className="p-0 m-0 w-100">
                <Col sm={6} className="mt-1 ps-0">
                  <span
                    onClick={() => {
                      setOpen((old: any) => !old);
                    }}
                    style={{
                      width: "23px",
                      height: "23px",
                      border: "1px solid #92969a",
                      borderRadius: "6px",
                      lineHeight: "20px",
                      marginRight: "20px",
                      textAlign: "center",
                    }}
                    className="d-inline-block cursor-pointer"
                  >
                    {!open ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ChevronUp size={15} />
                    )}
                  </span>
                  <span className="fs-6 text-black">
                    {item?.nickname ? item?.nickname : "Not Set"}
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
                    {item?.creation_date
                      ? getCustomWrittenDate(item?.creation_date)
                      : "Not Set"}
                  </span>
                </Col>
                <Row
                  style={{
                    backgroundColor: "#f8f8f8",
                    borderRadius: "10px",
                    height: open ? "auto" : 0,
                    overflow: "hidden",
                    visibility: open ? "visible" : "hidden",
                    opacity: open ? 1 : 0,
                    transition: "0.1s",
                  }}
                  className={`m-0 ${open ? "mt-1 pb-1" : ""}`}
                >
                  <Col sm={6} className="mt-1">
                    <span
                      style={{ width: "35%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-2 text-secondary"
                    >
                      Unit amount
                    </span>
                    <span className="fs-6 text-black">
                      {item?.unit_amount
                        ? "$" + item?.unit_amount / 100
                        : "Not Set"}
                    </span>
                  </Col>
                  <Col sm={6} className="mt-1">
                    <span className="fs-6 fw-bolder me-2 text-secondary"></span>
                    <span className="fs-6 text-black"></span>
                  </Col>
                  <Col sm={6} className="mt-1">
                    <span
                      style={{ width: "35%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-2 text-secondary"
                    >
                      Interval
                    </span>
                    <span className="fs-6 text-black">
                      {item?.recurring_interval
                        ? item?.recurring_interval
                        : "Not Set"}
                    </span>
                  </Col>
                  <Col sm={6} className="mt-1">
                    <span
                      style={{ width: "35%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-2 text-secondary"
                    >
                      Interval count
                    </span>
                    <span className="fs-6 text-black">
                      {item?.recurring_interval_count
                        ? item?.recurring_interval_count
                        : "Not Set"}
                    </span>
                  </Col>{" "}
                  <Col sm={6} className="mt-1">
                    <span
                      style={{ width: "35%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-2 text-secondary"
                    >
                      Usage type
                    </span>
                    <span className="fs-6 text-black">
                      {item?.recurring_usage_type
                        ? item?.recurring_usage_type
                        : "Not Set"}
                    </span>
                  </Col>
                  <Col sm={6} className="mt-1">
                    <span
                      style={{ width: "35%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-2 text-secondary"
                    >
                      Aggregate usage
                    </span>
                    <span className="fs-6 text-black">
                      {item?.recurring_aggregate_usage
                        ? item?.recurring_aggregate_usage
                        : "Not Set"}
                    </span>
                  </Col>
                  <Col sm={6} className="mt-1">
                    <span
                      style={{ width: "35%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-2 text-secondary"
                    >
                      Billing schema
                    </span>
                    <span className="fs-6 text-black">
                      {item?.billing_schema ? item?.billing_schema : "Not Set"}
                    </span>
                  </Col>{" "}
                  <Col sm={6} className="mt-1">
                    <span
                      style={{ width: "35%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-2 text-secondary"
                    >
                      Tires mode
                    </span>
                    <span className="fs-6 text-black">
                      {item?.tires_mode ? item?.tires_mode : "Not Set"}
                    </span>
                  </Col>{" "}
                  <Col sm={6} className="mt-1">
                    <span
                      style={{ width: "35%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-2 text-secondary"
                    >
                      Tax behavior
                    </span>
                    <span className="fs-6 text-black">
                      {item?.tax_behavior ? item?.tax_behavior : "Not Set"}
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
                      {item?.trial_period_days
                        ? item?.trial_period_days
                        : "Not Set"}
                    </span>
                  </Col>{" "}
                  <Col sm={6} className="mt-1">
                    <span
                      style={{ width: "35%", display: "inline-block" }}
                      className="fs-6 fw-bolder me-2 text-secondary"
                    >
                      Currency
                    </span>
                    <span className="fs-6 text-black">
                      {item?.currency
                        ? item?.currency === "usd"
                          ? "USD"
                          : item?.currency
                        : "Not Set"}
                    </span>
                  </Col>
                </Row>
              </Row>
            </Col>
          );
        })}
    </>
  );
};

export { Recurring };
