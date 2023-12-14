import React, { useState } from "react";
import { Typography } from "@src/components/common/Typography";
import { Divider } from "@src/components/common/divider/Divider";
import { Cast, Info, Settings } from "react-feather";
import ContentWrapper from "./ContentWrapper";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { variablesData } from "./fakeDatas";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { Col, Row, Tooltip } from "reactstrap";
import { InappNotificationSection } from "./InappNotificationSection";
import { PushNotificationSection } from "./PushNotificationSection";
import SmsNotificationSection from "./SmsNotificationSection";
import EmailNotificationSection from "./EmailNotificationSection";
import kingdomFlag from "@assets/images/icons/kingdom.png";
import { CustomIcon } from "@src/components/common/CustomIcon";

const NotifContentLanguageComponent = () => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const toggle = () => {
    setTooltipOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-white rounded-2 d-flex flex-column p-2">
      <FormWrapper initialValues={{}} onSubmit={() => {}}>
        <Typography size={16} className="text-black">
          Like post
        </Typography>
        <Divider wrapperClassName="w-100 my-2" />
        <div className="d-flex justify-content-start align-items-center">
          <div
            style={{
              backgroundColor: "#564ec1",
              borderRadius: "3px",
              width: "25px",
              height: "25px",
            }}
            className="d-flex justify-content-center align-items-center p-1"
          >
            <Cast color="#fff" size={15} />
          </div>
          <Typography size={16} className="ms-1 fw-bold">
            language system message Template
          </Typography>
        </div>
        <RowWrappers sm={6} md={5}>
          <SelectOption
            wrapperClassName="mt-2"
            name="Language"
            placeholder="Please select"
            label={"Language"}
            options={[
              { label: "EN", value: "1" },
              { label: "FR", value: "2" },
            ]}
            isMulti
            noColor
          />
        </RowWrappers>
        {/* Variables */}
        <RowWrappers sm={6} md={8}>
          <div
            className="d-flex flex-column justify-content-center align-items-start w-100 rounded-2 px-2 py-0/5"
            style={{ border: "solid 1px #e1e0ea" }}
          >
            <div className="d-flex justify-content-start align-items-center mb-1">
              <Typography className="text-black" size={14}>
                Variables
              </Typography>
              <Tooltip
                style={{
                  backgroundColor: "#fff",
                  color: "#2e2e33",
                  boxShadow: "0 0 20px 0 rgba(205, 205, 205, 0.15)",
                }}
                placement="top"
                isOpen={tooltipOpen}
                target="variables-info"
                toggle={toggle}
              >
                <Typography size={12}>
                  To use Variables in text, just click to select them
                </Typography>
              </Tooltip>
              <Info
                color="#151aae"
                size={16}
                className="ms-0/5 cursor-pointer"
                id="variables-info"
              />
            </div>
            <div className="d-flex justify-content-start align-items-center gap-1">
              {variablesData?.map((item) => (
                <Typography
                  style={{
                    backgroundColor: "rgba(21, 26, 174, 0.06)",
                    color: "#151aae",
                    borderRadius: "5px",
                  }}
                  className="px-1 py-0/5"
                  size={14}
                  key={item?.id}
                >
                  {item?.text}
                </Typography>
              ))}
            </div>
          </div>
        </RowWrappers>
        {/* Sections */}
        <InappNotificationSection />
        <PushNotificationSection />
        <SmsNotificationSection />
        <EmailNotificationSection />
        <div className="d-flex justify-content-start align-items-center mt-4">
          <div
            style={{
              backgroundColor: "#564ec1",
              borderRadius: "3px",
              width: "25px",
              height: "25px",
            }}
            className="d-flex justify-content-center align-items-center p-1"
          >
            <Settings color="#fff" size={15} />
          </div>
          <Typography size={16} className="ms-1 fw-bold">
            Settings
          </Typography>
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start mt-1">
          <Col className="mt-1" sm={4} md={4}>
            <InputText
              name="EnSmsSender"
              label="English language sms sender"
              placeholder="+15856254865831"
              icon={
                <CustomIcon
                  src={kingdomFlag}
                  wrapperStyle={{ width: "25px", height: "25px" }}
                  wrapperClasses="w-100 h-100"
                />
              }
              noColor
            />
          </Col>
          <Col className="mt-1" sm={4} md={4}>
            <InputText
              name="FrSmsSender"
              label="France language sms sender"
              placeholder="+15856254865831"
              icon={
                <CustomIcon
                  src={kingdomFlag}
                  wrapperStyle={{ width: "25px", height: "25px" }}
                  wrapperClasses="w-100 h-100"
                />
              }
              noColor
            />
          </Col>
          <Col className="mt-1" sm={4} md={4}>
            <InputText
              name="SpSmsSender"
              label="Spain language sms sender"
              placeholder="+15856254865831"
              icon={
                <CustomIcon
                  src={kingdomFlag}
                  wrapperStyle={{ width: "25px", height: "25px" }}
                  wrapperClasses="w-100 h-100"
                />
              }
              noColor
            />
          </Col>
        </div>
      </FormWrapper>
    </div>
  );
};

export { NotifContentLanguageComponent };
