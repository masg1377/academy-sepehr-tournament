import React, { FC, useEffect, useState } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import {
  Edit,
  Target,
  ChevronDown,
  Calendar,
  Plus,
  Circle,
  Edit3,
} from "react-feather";
import { Row, Col, Badge } from "reactstrap";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import useWindowDimensions from "@src/core/utils/Utils";
import { Divider } from "@src/components/common/divider/Divider";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { durationDiscountData } from "@src/core/data/discount.data";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";

const PromotionDetail: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [userName, setUserName] = useState<string>("Not Set");

  const { id } = useParams();

  const getDetail = useGetListOfEntity();
  const getUser = useGetListOfEntity();

  useEffect(() => {
    getDetail.mutate(
      {
        entity: "promotions",
        data: { id: id ? +id : 0 },
      },
      {
        onSuccess: (res) => {
          console.log(res.data);
          if (res.data.is_success) {
            if (res.data.result?.admin_user_id)
              getUser.mutate(
                {
                  entity: "users",
                  data: { id: res.data.result?.admin_user_id },
                },
                {
                  onSuccess: (res) => {
                    if (res.data.is_success) {
                      const result = res.data.result;
                      setUserName(result?.first_name + " " + result?.last_name);
                    } else setUserName(res.data.result?.admin_user_id);
                  },
                  onError: () => {
                    setUserName(res.data.result?.admin_user_id);
                  },
                }
              );
            setData(res.data.result);
          }
        },
      }
    );
  }, []);

  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center ms-1">
          <RippleButton
            className="d-flex justify-content-center me-1"
            color="light"
            size="sm"
          >
            <span
              className={
                "fs-6 " + (data && data.valid ? "text-success" : "text-danger")
              }
            >
              {data && data.valid ? "Active" : "Inactive"}
            </span>
            {/* <Circle size={15} color="#21c44c" /> */}
            {/* <span
              style={{
                marginLeft: "3px",
                width: "15px",
                height: "15px",
                borderRadius: "100px",
                backgroundColor: data && data.valid ? "#21c44c" : "",
              }}
            ></span> */}
            {/* <ChevronDown size={15} /> */}
          </RippleButton>
        </div>
      </div>
    );
  };

  return (
    <Row>
      <Col xxl={12} xl={12} md={12}>
        <CardWrapper
          title={data && data.name ? data.name : "Black Friday"}
          headerChild={headerRightSide()}
          borderBottom
        >
          <FormWrapper initialValues={{}} onSubmit={() => {}}>
            {getDetail.isLoading ? (
              <LoadingData />
            ) : (
              <>
                {" "}
                <Row className="mt-1 mb-1">
                  <div
                    className={"d-flex align-items-center justify-content-end"}
                    onClick={() => navigate("/promotion-list/edit/" + id)}
                  >
                    <Edit3 size={20} color="#92969a" />
                  </div>
                  <Col sm={12}>
                    <Row>
                      <Col
                        sm={4}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={6} className="fs-6 fw-bolder ">
                          Created by
                        </Col>
                        <Col
                          sm={6}
                          className="fs-6 "
                          style={{ color: "#07aed0" }}
                        >
                          {getUser.isLoading ? "Loading..." : userName}
                        </Col>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={12} className="mt-1 ">
                    <Row>
                      <Col
                        sm={4}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={6} className="fs-6 fw-bolder ">
                          Name
                        </Col>
                        <Col
                          sm={6}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          {data && data.name ? data.name : "Not Set"}
                        </Col>
                      </Col>
                    </Row>
                  </Col>

                  <Divider wrapperClassName="my-1" />

                  <Col sm={12} className="mt-1">
                    <Row>
                      {/* <Col
                        sm={6}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={4} className="fs-6 fw-bolder ">
                          Currency
                        </Col>
                        <Col
                          sm={6}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          {data && data.currency ? data.currency : "Not Set"}
                        </Col>
                      </Col> */}
                      <Col
                        sm={6}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={4} className="fs-6 fw-bolder ">
                          Expiry date
                        </Col>
                        <Col
                          sm={6}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          {data && data.expiry_date
                            ? getCustomDate(data.expiry_date)
                            : "Not Set"}
                        </Col>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={12} className="mt-1">
                    <Row>
                      <Col
                        sm={6}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={4} className="fs-6 fw-bolder ">
                          Percent off
                        </Col>
                        <Col
                          sm={6}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          {data && data.percent_off
                            ? data.percent_off + "%"
                            : "Not Set"}
                        </Col>
                      </Col>
                      {/* <Col
                        sm={4}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={7} className="fs-6 fw-bolder ">
                          Amount off
                        </Col>
                        <Col
                          sm={5}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          {data && data.amount_off
                            ? data.amount_off + "$"
                            : "Not Set"}
                        </Col>
                      </Col> */}
                    </Row>
                  </Col>
                  <Col sm={12} className="mt-1">
                    <Row>
                      <Col
                        sm={6}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={4} className="fs-6 fw-bolder ">
                          Duration
                        </Col>
                        <Col
                          sm={6}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          {data && data.duration
                            ? durationDiscountData.find(
                                (o) => o.value === data.duration
                              )?.label
                            : "Not Set"}
                        </Col>
                      </Col>
                      <Col
                        sm={4}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={7} className="fs-6 fw-bolder ">
                          Max redemptions
                        </Col>
                        <Col
                          sm={5}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          {data && data.max_redemptions
                            ? data.max_redemptions
                            : "Not Set"}
                        </Col>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={12} className="mt-1">
                    <Row>
                      <Col
                        sm={6}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={4} className="fs-6 fw-bolder ">
                          Times redeemed
                        </Col>
                        <Col
                          sm={6}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          {data ? data.times_redeemed : "Not Set"}
                        </Col>
                      </Col>
                      <Col
                        sm={4}
                        className="row  justify-content-start align-items-center"
                      >
                        <Col sm={7} className="fs-6 fw-bolder ">
                          Discount code
                        </Col>
                        <Col
                          sm={5}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          {data && data.code ? data.code : "Not Set"}
                        </Col>
                      </Col>
                    </Row>
                  </Col>

                  <Col sm={12} className="mt-1">
                    <Row>
                      <Col
                        sm={6}
                        className="row  justify-content-start align-items-start"
                      >
                        <Col
                          sm={6}
                          className="fs-6 "
                          style={{ color: "#2e2e33" }}
                        >
                          <SwitchBox
                            name="isAuto"
                            disabled
                            color="success"
                            defaultChecked={data && data.is_auto}
                          >
                            Is auto
                          </SwitchBox>
                          <SwitchBox
                            name="onTopOfOtherPromotions"
                            disabled
                            defaultChecked={
                              data && data.on_top_of_other_promotions
                            }
                            wrapperClassName="mt-1"
                            color="success"
                          >
                            On Top of Other Promotions
                          </SwitchBox>
                        </Col>
                      </Col>
                      <Col
                        sm={4}
                        // className="row  justify-content-start align-items-center"
                      >
                        <Col sm={6} className="fs-6 fw-bolder ">
                          Description
                        </Col>
                        <Col
                          sm={12}
                          className="fs-6 mt-1"
                          style={{ color: "#2e2e33" }}
                        >
                          {data && data.description
                            ? data.description
                            : "Not Set"}
                        </Col>
                      </Col>
                    </Row>
                  </Col>

                  <Divider wrapperClassName="mt-1" />
                </Row>
                <Col sm={12} className="mt-1">
                  <Row>
                    <Col
                      sm={6}
                      className="row  justify-content-start align-items-start"
                    >
                      <Col sm={12}>
                        <p className="h6 text-primary fw-bolder mt-2">
                          Covered packages
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 8,
                          }}
                          className="mt-1 mb-3"
                        >
                          {data && data.covered_packages ? (
                            data.covered_packages.map(
                              (item: any, index: number) => (
                                <span
                                  key={index}
                                  style={{
                                    backgroundColor: "#04cad0",
                                    padding: "4px 8px",
                                    // marginRight: "8px",
                                    borderRadius: "2px",
                                    color: "#fff",
                                    fontSize: "16px",
                                  }}
                                >
                                  {item.name}
                                </span>
                              )
                            )
                          ) : (
                            <span className="fs-6 text-bold text-black">
                              Not Set
                            </span>
                          )}
                        </div>
                      </Col>
                    </Col>
                    <Col
                      sm={6}
                      // className="row  justify-content-start align-items-center"
                    >
                      <Col sm={12}>
                        <p className="h6 text-primary fw-bolder mt-2">
                          Covered BTT Items
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 8,
                          }}
                          className="mt-1 mb-3"
                        >
                          {data && data.coverage_btts ? (
                            data.coverage_btts.map(
                              (item: any, index: number) => (
                                <span
                                  key={index}
                                  style={{
                                    backgroundColor: "#04cad0",
                                    padding: "4px 8px",
                                    // marginRight: "8px",
                                    borderRadius: "2px",
                                    color: "#fff",
                                    fontSize: "16px",
                                  }}
                                >
                                  {item.name}
                                </span>
                              )
                            )
                          ) : (
                            <span className="fs-6 text-bold text-black">
                              Not Set
                            </span>
                          )}
                        </div>
                      </Col>
                    </Col>
                  </Row>
                </Col>
                <Divider />
                <Col sm={12} className="mt-1">
                  <Row>
                    <Col
                      sm={6}
                      className="row  justify-content-start align-items-start"
                    >
                      <Col sm={12}>
                        <p className="h6 text-primary fw-bolder mt-2">
                          Covered Locations
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 8,
                          }}
                          className="mt-1 mb-3"
                        >
                          {data && data.covered_location ? (
                            data.covered_location.map(
                              (item: any, index: number) => (
                                <span
                                  key={index}
                                  style={{
                                    backgroundColor: "#3897f1",
                                    padding: "4px 8px",
                                    // marginRight: "8px",
                                    borderRadius: "2px",
                                    color: "#fff",
                                    fontSize: "16px",
                                  }}
                                >
                                  {item.name}
                                </span>
                              )
                            )
                          ) : (
                            <span className="fs-6 text-bold text-black">
                              Not Set
                            </span>
                          )}
                        </div>
                      </Col>
                    </Col>
                    <Col
                      sm={6}
                      // className="row  justify-content-start align-items-center"
                    >
                      <Col sm={12}>
                        <p className="h6 text-primary fw-bolder mt-2">
                          Covered Groups
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 8,
                          }}
                          className="mt-1 mb-3"
                        >
                          {data && data.covered_groups ? (
                            data.covered_groups.map(
                              (item: any, index: number) => (
                                <span
                                  key={index}
                                  style={{
                                    backgroundColor: "#3897f1",
                                    padding: "4px 8px",
                                    // marginRight: "8px",
                                    borderRadius: "2px",
                                    color: "#fff",
                                    fontSize: "16px",
                                  }}
                                >
                                  {item.name}
                                </span>
                              )
                            )
                          ) : (
                            <span className="fs-6 text-bold text-black">
                              Not Set
                            </span>
                          )}
                        </div>
                      </Col>
                    </Col>
                  </Row>
                </Col>
              </>
            )}
          </FormWrapper>
        </CardWrapper>
      </Col>
    </Row>
  );
};

export { PromotionDetail };
