// import React from "react";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { Timeline } from "@src/components/common/timeline";
import { Plus } from "react-feather";
import { paymentData } from "./timelineData";

const PaymentHistory = () => {
  return (
    <CardWrapper
      title="Payment History"
      headerChild={
        <RippleButton color="light" size="sm">
          <Plus size={18} color="#92969a" />
        </RippleButton>
      }
      borderBottom
    >
      <Timeline data={paymentData} className="mt-1" />
    </CardWrapper>
  );
};

export { PaymentHistory };
