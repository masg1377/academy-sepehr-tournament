import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { RippleButton } from "@src/components/common/ripple-button";
import React, { FC } from "react";
import { Edit3 } from "react-feather";

const MlsToRfPaymentPlan: FC = (): JSX.Element => {
  const headerChild = (): JSX.Element => (
    <div className="d-flex align-items-center">
      <RippleButton
        className="d-flex justify-content-center"
        color="light"
        size="sm"
      >
        <Edit3 size={15} color="#92969a" />
      </RippleButton>
    </div>
  );

  const detailRow = (title: string, value: string): JSX.Element => (
    <div className="mt-1">
      <span className="d-block fs-7 text-gray2">{title}</span>
      <span className="d-block fs-3 text-darker">{value}</span>
    </div>
  );

  return (
    <CardWrapper
      title="MLS TO RF PAYMENT PLAN"
      headerChild={headerChild()}
      borderBottom
    >
      <RowWrappers sm={12} md={12}>
        <span className="d-block bg-light-purple py-1 px-6 fs-3 fw-bold text-purple-lighter text-center mt-1 rounded-2">
          There is no information Please add
        </span>
        {/* <div>
          {detailRow("individual fee", "$200")}
          {detailRow("currency", "USD")}
        </div>
        <div>
          {detailRow("MLS member fee type", "flat fee")}
          {detailRow("modification date", "USD")}
        </div> */}
      </RowWrappers>
    </CardWrapper>
  );
};

export { MlsToRfPaymentPlan };
