import React from "react";
import ContentWrapper from "./ContentWrapper";
import { Col, Row } from "reactstrap";
import { InputText } from "@src/components/common/form/common/InputText/InputText";

const PushNotificationSection = () => {
  return (
    <ContentWrapper title="Push notification">
      <>
        <Row className="d-flex">
          <Col sm={4} md={4}>
            <InputText
              name="ShortTextPush(En)"
              label="Short text push (En)"
              placeholder="{Username} liked your post"
              noColor
            />
          </Col>
          <Col sm={4} md={4}>
            <InputText
              name="ShortTextPush(fr-CA)"
              label="Short text push (fr-CA)"
              placeholder="Please enter text …"
            />
          </Col>
          <Col sm={4} md={4}>
            <InputText
              name="ShortTextInapp(es-ES)"
              label="Short text inapp (es-ES)"
              placeholder="Please enter text …"
            />
          </Col>
        </Row>
        <Row className="d-flex mt-1">
          <Col sm={4} md={4}>
            <InputText
              name="FullTextPush(En)"
              label="Full text push (En)"
              placeholder="Please enter text …"
              type="textarea"
              customStyle={{ maxHeight: "85px" }}
            />
          </Col>
          <Col sm={4} md={4}>
            <InputText
              name="FullTextPush(fr-CA)"
              label="Full text push (fr-CA)"
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

export {PushNotificationSection};
