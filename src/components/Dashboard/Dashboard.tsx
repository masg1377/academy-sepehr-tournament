import React from "react";
import { Col, Row } from "reactstrap";
import DashboardUserInfo from "./DashboardUserInfo/DashboardUserInfo";
import DashboardStaticsInfo from "./DashboardStaticsInfo/DashboardStaticsInfo";

const DashboardComponent = () => {
  return (
    <div>
      <Row className="mt-2">
        {/* <Col sm={4} md={4} className="rounded-3">
          <DashboardUserInfo />
        </Col>
        <Col sm={8} md={8} className="rounded-3">
          <DashboardStaticsInfo />
        </Col> */}
      </Row>
    </div>
  );
};

export default DashboardComponent;
