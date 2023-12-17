import React, { FC } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { MoreHorizontal, ChevronUp } from "react-feather";
import { Row, Col } from "reactstrap";

const CostBenefit: FC = (): JSX.Element => {
  return (
    <CardWrapper
      borderBottom
      title="Cost-Benefit Analysis"
      headerChild={
        <RippleButton size="sm" color="light">
          <MoreHorizontal size={18} />
        </RippleButton>
      }
    >
      <Row className="mt-1">
        <Col sm={6}>
          <div className="mb-1">
            <span className="d-block fs-6 lh-base text-secondary">
              Paid So far
            </span>
            <span className="d-block fs-4 lh-base text-black">$8,400.00</span>
          </div>
          <div>
            <span className="d-block fs-6 lh-base text-secondary">
              Sold So Far
            </span>
            <span className="d-block fs-4 lh-base text-black">$32,400.00</span>
          </div>
        </Col>
        <Col sm={6} className="d-flex flex-column align-items-end">
          <span className=" fs-6 lh-base text-secondary">Benefit</span>
          <span className=" fs-1 fw-bolder lh-base text-black">
            <ChevronUp size={28} color="#21c44c" /> 385%
          </span>
        </Col>
      </Row>
    </CardWrapper>
  );
};

export { CostBenefit };
