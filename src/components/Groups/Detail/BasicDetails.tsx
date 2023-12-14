import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { RippleButton } from "@src/components/common/ripple-button";
import React, { FC, useEffect, useState } from "react";
import { Calendar, ChevronDown, Edit3 } from "react-feather";
import Logo from "@assets/images/pages/GroupLogo.webp";
import { Col, Row } from "reactstrap";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";

interface IBasicDetailsProp {
  detail: any;
  isLoading?: boolean;
}

const BasicDetails: FC<IBasicDetailsProp> = ({
  detail = {},
  isLoading,
}): JSX.Element => {
  const {
    logo_url,
    name,
    short_name,
    mention_name: username,
    user_id,
    contact_number,
    contact_email,
    description,
    group_type_name,
    hashtag_name,
    is_published,
  } = detail;

  const [userNameDetail, setUserNameDetail] = useState("");

  const getUser = useGetListOfEntity();

  useEffect(() => {
    if (user_id) {
      getUser.mutate(
        { entity: "users", data: { id: user_id } },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const result = res.data.result;
              // console.log(result);
              setUserNameDetail(result?.username);
            } else {
            }
          },
        }
      );
    }
  }, [user_id]);

  const headerChild = (): JSX.Element => (
    <div className="d-flex align-items-center">
      <div className="d-flex align-items-center ms-1">
        <RippleButton
          className="d-flex justify-content-center me-1"
          color="light"
          size="sm"
        >
          <span
            className={
              "fs-6 " + (is_published ? "text-success" : "text-danger")
            }
          >
            {is_published ? "Active" : "Inactive"}
          </span>
          <span
            className={`active-inactive-show ${
              is_published ? "bg-success" : "bg-danger"
            }`}
          ></span>

          {/* <ChevronDown size={15} /> */}
        </RippleButton>
      </div>

      <RippleButton
        className="d-flex justify-content-center"
        color="light"
        size="sm"
      >
        <Calendar size={15} color="#68686b" />
      </RippleButton>
    </div>
  );

  const basicDetails = (
    key: string,
    value: string,
    option?: {
      xl?: { left: number; right: number };
      md?: { left: number; right: number };
      sm?: { left: number; right: number };
      xxl?: { left: number; right: number };
    }
  ) => (
    <Row className="mb-1">
      <Col
        sm={option?.sm?.left || 4}
        md={option?.md?.left}
        xl={option?.xl?.left}
        xxl={option?.xxl?.left}
        className="fs-5 fw-bold text-gray2"
      >
        {key}
      </Col>
      <Col
        sm={option?.sm?.right || 8}
        md={option?.md?.right}
        xl={option?.xl?.right}
        xxl={option?.xxl?.right}
        className="fs-5 fw-bold text-darker"
      >
        {value}
      </Col>
    </Row>
  );

  const bigTitle = (text: string) => (
    <span className="d-block fw-bolder fs-4 text-purple">{text}</span>
  );

  return (
    <CardWrapper
      title={isLoading ? "Loading..." : name}
      headerChild={headerChild()}
      borderBottom
    >
      {isLoading ? (
        <LoadingData />
      ) : (
        <>
          <RowWrappers
            sm={12}
            md={12}
            xl={6}
            rowClassName="align-items-end position-relative"
          >
            <div>
              <img
                src={logo_url ? logo_url : Logo}
                alt="group-logo"
                style={{ height: 101, borderRadius: 6 }}
              />

              <div className="mt-1">
                {basicDetails("Group Name", name || "Not Set")}
                {basicDetails(
                  "Username",
                  username ? "@" + username : "Not Set"
                )}
                {basicDetails(
                  "User",
                  getUser.isLoading ? "Loading..." : userNameDetail || "Not Set"
                )}
              </div>
            </div>

            <div>
              {basicDetails("Group Short Name", short_name, {
                xl: { left: 6, right: 6 },
                md: { left: 4, right: 8 },
              })}
              {basicDetails("Contact Number", contact_number, {
                xl: { left: 6, right: 6 },
                md: { left: 4, right: 8 },
              })}
              {basicDetails("Contact Email", contact_email, {
                xl: { left: 6, right: 6 },
                md: { left: 4, right: 8 },
              })}
            </div>

            <Edit3
              size={20}
              color="#92969a"
              className="position-absolute top-0 cursor-pointer"
              style={{ right: 10 }}
            />
          </RowWrappers>
          {basicDetails(
            "Group Description",
            description ? description["en-US"] : "Not Set",
            {
              sm: { left: 12, right: 6 },
            }
          )}

          <Row className="position-relative">
            <Col sm={6}>{bigTitle("Group Type")}</Col>
            <Col sm={5}>
              <span className="d-block text-darker fs-5 fw-bold">
                {group_type_name || "Not Set"}
              </span>
            </Col>
            <Col sm={1}>
              <Edit3
                size={20}
                color="#92969a"
                className="position-absolute top-0 cursor-pointer"
                style={{ right: 10 }}
              />
            </Col>
          </Row>

          <Row className="position-relative mt-2">
            <Col sm={11}>
              {hashtag_name?.length > 0 && (
                <>
                  {bigTitle("Group Experties")}
                  <div className="d-flex gap-1 mt-1 mb-2">
                    {hashtag_name?.map((it: string, index: number) => (
                      <span
                        className="bg-light-blue d-block fs-5 fw-bold text-blue-darker rounded-1"
                        style={{ padding: "3px 10px" }}
                        key={index}
                      >
                        #{it}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Area of Activity */}
              {bigTitle("Area of Activity")}
              <div className="d-flex gap-1 mt-1">
                <span
                  className="bg-light-blue d-block fs-5 fw-bold text-blue-darker rounded-1"
                  style={{ padding: "3px 10px" }}
                >
                  125478 NY
                </span>
                <span
                  className="bg-light-blue d-block fs-5 fw-bold text-blue-darker rounded-1"
                  style={{ padding: "3px 10px" }}
                >
                  125478 NY
                </span>
              </div>
            </Col>

            <Col sm={1}>
              <Edit3
                size={20}
                color="#92969a"
                className="position-absolute top-0 cursor-pointer"
                style={{ right: 10 }}
              />
            </Col>
          </Row>
        </>
      )}
    </CardWrapper>
  );
};

export { BasicDetails };
