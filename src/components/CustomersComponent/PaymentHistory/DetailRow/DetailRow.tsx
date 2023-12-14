import React, { FC, useState, useEffect, Fragment } from "react";
import { Col, Row } from "reactstrap";
import { getCustomWrittenDate } from "@src/core/utils/date-helper.utils";

interface IDetailRowProp {
  data?: any;
}
const DetailRow: FC<any> = ({ data }): JSX.Element => {
  const [itemData, setItemData] = useState<any>();

  return (
    <Fragment>
      <Row className="p-1 pb-0">
        <Col xs={12} className="">
          <span
            style={{ color: "#314bc9" }}
            className="fs-7 fw-bolder blue-color-invoice"
          >
            Invoice Items
          </span>
        </Col>
      </Row>
      {data &&
      data.invoice_item_package &&
      data.invoice_item_package.length > 0 ? (
        data.invoice_item_package?.map((item: any, index: number) => (
          <Row className="p-1 border-bottom">
            <Col className="d-flex">
              <span
                style={{ width: "220px" }}
                className="me-2 d-inline-block text-truncate"
              >
                {/* RealtyFeed premium feature */}
                {item?.package?.name ? item?.package?.name : "Not Set"}
              </span>
              {/* <span className="me-5 blue-color-invoice fs-5">
                --- subscription
              </span> */}
              <span className="me-2 ms-4 blue-color-invoice">
                {/* SD: 11/22/1234 */}SD:{" "}
                {item?.invoice_item?.period_start
                  ? getCustomWrittenDate(item?.invoice_item?.period_start)
                  : "Not Set"}
              </span>
              <span className="me-5 blue-color-invoice">
                {/* ED: 11/44/3355 */}ED:{" "}
                {item?.invoice_item?.period_end
                  ? getCustomWrittenDate(item?.invoice_item?.period_end)
                  : "Not Set"}
              </span>
              <span className="me-2 ms-5 ps-4 black-color-invoice">
                X {item?.invoice_item?.quantity}
              </span>
              {/* <span
                style={{
                  background: "#2c80f5",
                  padding: "2px 9px",
                  borderRadius: "17px 1px 17px 1px",
                }}
                className="me-2 text-white"
              >
              ----%
              </span> */}
              {/* <span
                style={{ color: "#bcbcbc" }}
                className="me-2 text-decoration-line-through"
              >
                $--
              </span> */}
              <span className="me-2 ms-4 black-color-invoice">
                {/* $39 */}$
                {item?.invoice_item?.selected_unit_amount
                  ? item?.invoice_item?.selected_unit_amount / 100
                  : "Not Set"}
              </span>
            </Col>
          </Row>
        ))
      ) : (
        <Row className="p-1 border-bottom">No Item</Row>
      )}
    </Fragment>
  );
};

export { DetailRow };
