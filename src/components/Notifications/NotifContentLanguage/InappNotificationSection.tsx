import React from "react";
import ContentWrapper from "./ContentWrapper";
import { Col, Row } from "reactstrap";
import { InputText } from "@src/components/common/form/common/InputText/InputText";

const InappNotificationSection = () => {
  return (
    <ContentWrapper title="Inapp notification">
      <>
        <Row className="d-flex">
          <Col sm={4} md={4}>
            <InputText
              name="ShortTextEn"
              label="Short text inapp (En)"
              placeholder="{Username} liked your post"
              noColor
            />
          </Col>
          <Col sm={4} md={4}>
            <InputText
              name="ShortTextCa"
              label="Short text inapp (fr-CA)"
              placeholder="Please enter text …"
            />
          </Col>
          <Col sm={4} md={4}>
            <InputText
              name="ShortTextEs"
              label="Short text inapp (es-ES)"
              placeholder="Please enter text …"
            />
          </Col>
        </Row>
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
      </>
    </ContentWrapper>
  );
};

export {InappNotificationSection};
