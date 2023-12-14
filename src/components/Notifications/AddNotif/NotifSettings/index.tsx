import React, { FC } from "react";
import { AddNotifWrapper } from "../AddNotifWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { Col, Row } from "reactstrap";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";

interface INotifSettingsProp {
  stepper: any;
}

const NotifSettings: FC<INotifSettingsProp> = ({ stepper }): JSX.Element => {
  const loadSwitches = (pre: string, title: string) => (
    <Row style={{ marginTop: 20 }}>
      <Col sm={8} md={6}>
        <div className="border p-1 rounded-2">
          <span className="fs-5 text-darker fw-bold">{title}</span>

          <RowWrappers sm={4} md={4}>
            <SwitchBox name={`${pre}-enable`} color="success">
              Enable
            </SwitchBox>

            <SwitchBox name={`${pre}-readOnly`} color="success">
              Read only
            </SwitchBox>

            <SwitchBox name={`${pre}-immediateOnly`} color="success">
              Immediate only
            </SwitchBox>
          </RowWrappers>
        </div>
      </Col>
    </Row>
  );

  return (
    <>
      <div
        style={{
          boxShadow: "0 4px 24px 0 rgba(34, 41, 47, 0.1)",
          padding: "1.5rem 1.5rem",
          borderRadius: "0.5rem",
          marginBottom: 30,
        }}
        className="bg-white"
      >
        <div className="d-flex align-items-center border-bottom pb-1">
          <span className="h5 fw-bolderer text-darker me-1">
            Notification Info
          </span>
        </div>

        <RowWrappers sm={4} md={4}>
          <InputText
            name="notificationCode"
            placeholder="Please enter..."
            label="Notification code"
          />

          <InputText
            name="notificationName"
            placeholder="Please enter..."
            label="Notification name"
          />

          <InputText
            name="categoryName"
            placeholder="Please enter..."
            label="Category name"
          />
        </RowWrappers>
      </div>

      <AddNotifWrapper
        stepName="Notification setting"
        stepNum={2}
        stepper={stepper}
        hasPrev
        btnNextText="Finish"
      >
        {loadSwitches("notif", "Push Notification")}

        {loadSwitches("email", "Email")}

        {loadSwitches("sms", "SMS")}
      </AddNotifWrapper>
    </>
  );
};

export { NotifSettings };
