import React from "react";
import ContentWrapper from "./ContentWrapper";
import { Col, Row } from "reactstrap";
import { InputText } from "@src/components/common/form/common/InputText/InputText";

const SmsNotificationSection = () => {
  return (
    <ContentWrapper title="SMS">
      <Row className="d-flex mt-1">
        <Col sm={4} md={4}>
          <InputText
            name="TextAreaEs"
            label="Short text inapp (es-ES)"
            placeholder="Please enter text …"
            type="textarea"
            customStyle={{ maxHeight: "85px" }}
          />
        </Col>
        <Col sm={4} md={4}>
          <InputText
            name="TextAreaCa"
            label="Full text inapp (fr-CA)"
            placeholder="Please enter text …"
            type="textarea"
            customStyle={{ maxHeight: "85px" }}
          />
        </Col>
        <Col sm={4} md={4}>
          <InputText
            name="TextAreaEs"
            label="Full text inapp (es-ES)"
            placeholder="Please enter text …"
            type="textarea"
            customStyle={{ maxHeight: "85px" }}
          />
        </Col>
      </Row>
    </ContentWrapper>
  );
};

export default SmsNotificationSection;
