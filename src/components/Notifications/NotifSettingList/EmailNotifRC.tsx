import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import React, { useState } from "react";
import { Clock, Eye } from "react-feather";
import { Tooltip } from "reactstrap";

const EmailNotifRC = () => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const toggle = () => {
    setTooltipOpen((prevState) => !prevState);
  };
  return (
    <FormWrapper
      initialValues={{}}
      onSubmit={() => {}}
      className="d-flex flex-row justify-content-start align-items-center"
    >
      <SwitchBox name="email-notif-item" />
      <Tooltip
        style={{
          backgroundColor: "#fff",
          color: "#2e2e33",
          boxShadow: "0 0 20px 0 rgba(205, 205, 205, 0.15)",
        }}
        placement="top"
        isOpen={tooltipOpen}
        target="EmailNotifExample"
        toggle={toggle}
      >
        Read only
      </Tooltip>
      <Eye size={17} id="EmailNotifExample" className="cursor-pointer" />
      <Clock size={15} className="ms-1" />
    </FormWrapper>
  );
};

export default EmailNotifRC;
