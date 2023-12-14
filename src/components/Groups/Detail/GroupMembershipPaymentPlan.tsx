import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { RippleButton } from "@src/components/common/ripple-button";
import React, { FC } from "react";
import { Edit3, Plus } from "react-feather";

const GroupMembershipPaymentPlan: FC = (): JSX.Element => {
  const headerChild = (): JSX.Element => (
    <div className="d-flex align-items-center">
      <RippleButton
        className="d-flex justify-content-center"
        color="light"
        size="sm"
      >
        <Plus size={20} color="#92969a" />
      </RippleButton>
    </div>
  );

  return (
    <CardWrapper
      title="GROUP MEMBERSHIP PAYMENT PLAN"
      headerChild={headerChild()}
      borderBottom
    >
      <span className="d-block bg-light-purple py-1 px-6 fs-3 fw-bold text-purple-lighter text-center my-2 rounded-2">
        There is no information Please add
      </span>
    </CardWrapper>
  );
};

export { GroupMembershipPaymentPlan };
