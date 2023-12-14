import React, { FC, useEffect, useState } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { Badge, CardBody, Col, Row, Table } from "reactstrap";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import BttLogo from "@assets/images/icons/btt-logo.png";
import { Divider } from "@src/components/common/divider/Divider";
import { TBttTypesNumber, TBttBoostTypes } from "@src/core/data/btt.data";
import { Edit2, Edit3 } from "react-feather";
import { CardActions } from "@src/components/common/card-actions";

const BttDetails: FC = (): JSX.Element => {
  const headerRightSide = () => <></>;

  const { id } = useParams();

  const [data, setData] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");

  const getDetail = useGetListOfEntity();
  const getUser = useGetListOfEntity();

  useEffect(() => {
    getDetail.mutate(
      { entity: "btt_type_items", data: { id: id ? +id : 0 } },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const result = res.data.result;
            setData(result);
            getUser.mutate(
              {
                entity: "users",
                data: { id: result.creator_id, select_fields: ["username"] },
              },
              {
                onSuccess: (res) => {
                  if (res.data.is_success) {
                    const result = res.data.result;
                    setUserName(result.username);
                  }
                },
              }
            );
          }
        },
      }
    );
  }, []);

  const navigate = useNavigate();

  return (
    <CardWrapper
      title="BTT Details"
      headerChild={headerRightSide()}
      borderBottom
    >
      {getDetail.isLoading ? (
        <LoadingData />
      ) : (
        <FormWrapper initialValues={{}} onSubmit={() => {}}>
          <Row className="mt-2 mb-1">
            <Col xs={9} className="mb-1">
              <span
                //style={{ width: "22.6%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1 text-secondary"
              >
                Created by
              </span>
              <span className="fs-6 text-info ">
                {getUser.isLoading
                  ? "Loading..."
                  : userName
                  ? userName
                  : "Not Set"}
              </span>
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
              <Edit3
                size={20}
                className="cursor-pointer"
                onClick={() => navigate("/btt-list/edit/" + id)}
              />
            </Col>

            <Col sm={6}>
              <span
                style={{ width: "22.6%", display: "inline-block" }}
                className="fs-6 fw-bolder me-1 text-secondary"
              >
                Name
              </span>
              <span className="fs-6 text-black">
                {data && data.name ? data.name : "Not Set"}
              </span>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>
              <div className="mb-1">
                <span
                  style={{ width: "35%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-secondary"
                >
                  Type
                </span>
                <span className="fs-6 text-black">
                  {data && data.type
                    ? TBttTypesNumber.find((f) => f.value === data.type)?.label
                    : "Not Set"}
                </span>
              </div>

              <div className="mb-1">
                <span
                  style={{ width: "35%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-secondary"
                >
                  Boost Type
                </span>
                <span className="fs-6 text-black">
                  {data && data.boost_type
                    ? TBttBoostTypes.find((f) => f.id === data.boost_type)
                        ?.label
                    : "Not Set"}
                </span>
              </div>

              <SwitchBox
                name="graphRelation"
                color="success"
                defaultChecked={data && data.is_asset ? data.is_asset : false}
                labelClassName="text-black"
                disabled
              >
                Is asset
              </SwitchBox>
            </Col>
            <Col md={4}>
              <div className="mb-1">
                <span
                  style={{ width: "35%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-secondary"
                >
                  Creation Date
                </span>
                <span className="fs-6 text-black">
                  {data && data.creation_date
                    ? getCustomDate(data.creation_date)
                    : "Not Set"}
                </span>
              </div>

              <div className="mb-1">
                <span
                  style={{ width: "35%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-secondary"
                >
                  Available Period
                </span>
                <span className="fs-6 text-black">6</span>
              </div>
              <div className="mb-1">
                <span
                  style={{ width: "35%", display: "inline-block" }}
                  className="fs-6 fw-bolder me-1 text-secondary"
                >
                  Expiry date
                </span>
                <span className="fs-6 text-black">
                  {data && data.expiry_date
                    ? getCustomDate(data.expiry_date)
                    : "Not Set"}
                </span>
              </div>
            </Col>

            <Col md={3}>
              <SwitchBox
                name="graphRelation"
                color="success"
                defaultChecked={
                  data && data.graph_relation ? data.graph_relation : false
                }
                labelClassName="text-black"
                disabled
              >
                Graph Relation
              </SwitchBox>

              <SwitchBox
                name="isGlobal"
                color="success"
                defaultChecked={data && data.is_global ? data.is_global : false}
                // wrapperClassName="mt-1"
                labelClassName="text-black"
                disabled
              >
                Is Global
              </SwitchBox>
            </Col>

            {data?.main_icon && (
              <Col md={1}>
                <img
                  src={data && data.main_icon ? data.main_icon : BttLogo}
                  style={{ width: "50px", height: "50px" }}
                  className="d-block ms-auto me-0"
                />
              </Col>
            )}
          </Row>

          <Divider />

          {/* <Row className="mt-2 mb-1">
            <Col sm={12}>
              <span className="fs-6 fw-bolder me-1 text-secondary">Type</span>
              <span className="fs-6 text-black ">
                {data && data.type ? data.type : "Not Set"}
              </span>
            </Col>
          </Row> */}

          {data?.btt_permissions && (
            <Row className="mb-2 mt-2">
              <Col md={6}>
                {/* <div className="mb-1">
                <span className="fs-6 fw-bolder me-1 text-secondary">
                  Target Type
                </span>
                <span className="fs-6 text-black">
                  {data && data.target_type ? data.target_type : "Not Set"}
                </span>
              </div> */}

                <div>
                  <span className="fs-6 fw-bolder me-1 text-primary d-block">
                    Permissions
                  </span>

                  <div
                    className="d-flex align-items-center flex-wrap"
                    style={{ marginTop: "4px" }}
                  >
                    {data && data.btt_permissions
                      ? data.btt_permissions.map((o: any, ind: number) => (
                          <Badge
                            key={ind}
                            color="info"
                            style={{ marginRight: "5px", marginBottom: "5px" }}
                          >
                            {o.key}
                          </Badge>
                        ))
                      : "Not Set"}
                  </div>
                </div>
              </Col>
              {/* <Col md={6}>
              <div className="mb-1">
                <span className="fs-6 fw-bolder me-1 text-secondary">
                  Boost Type
                </span>
                <span className="fs-6 text-black">
                  {data && data.boost_type ? data.boost_type : "Not Set"}
                </span>
              </div>
            </Col> */}
            </Row>
          )}

          <Divider />

          <Row className="mb-2 mt-2">
            <Col md={6}>
              {/* <div className="mb-1">
                <span className="fs-6 fw-bolder me-1 text-secondary">
                  Target Type
                </span>
                <span className="fs-6 text-black">
                  {data && data.target_type ? data.target_type : "Not Set"}
                </span>
              </div> */}

              <div>
                <span className="fs-6 fw-bolder me-1 text-primary d-block">
                  Pre-requirement BTT
                </span>

                <div
                  className="d-flex align-items-center flex-wrap"
                  style={{ marginTop: "4px" }}
                >
                  {data && data.pre_required_btts
                    ? data.pre_required_btts.map((o: any, ind: number) => (
                        <Badge
                          key={o.id + ind}
                          color="info"
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                        >
                          {o.name}
                        </Badge>
                      ))
                    : "Not Set"}
                </div>
              </div>
            </Col>
            {/* <Col md={6}>
              <div className="mb-1">
                <span className="fs-6 fw-bolder me-1 text-secondary">
                  Boost Type
                </span>
                <span className="fs-6 text-black">
                  {data && data.boost_type ? data.boost_type : "Not Set"}
                </span>
              </div>
            </Col> */}
          </Row>

          <Divider />

          <SwitchBox
            name="isHidden"
            color="success"
            defaultChecked={data ? !data.is_hidden : false}
            labelClassName="text-black"
            wrapperClassName="mt-2 mb-1"
            disabled
          >
            Visibility
          </SwitchBox>

          <Row className="my-2">
            <Col md={8}>
              <div>
                <span className="fs-6 fw-bolder me-1 text-primary d-block mb-1">
                  Languages
                </span>

                {data?.descriptions
                  ? data?.descriptions.map((item: any, indd: number) => (
                      <Row
                        className="rounded-3 p-2 w-100 m-0"
                        style={{ border: "1px solid #e9e9e9" }}
                        key={item.id + indd}
                      >
                        <Col sm={12} className="m-0">
                          <Row>
                            <Col sm={7}>
                              <span
                                className="d-block fs-6 fw-bold"
                                style={{ color: "#2e2e33" }}
                              >
                                {item?.icon && (
                                  <img
                                    src={item?.icon}
                                    alt="icon"
                                    style={{ height: 18, marginRight: 10 }}
                                  />
                                )}
                                {item?.language_code?.toLowerCase() === "en"
                                  ? "English"
                                  : item?.language_code?.toLowerCase() === "fr"
                                  ? "France"
                                  : "English"}
                              </span>
                            </Col>
                            <Col sm={5}>
                              <span
                                className="fs-6 fw-bold me-2"
                                style={{ color: "#92969a" }}
                              >
                                Language code
                              </span>
                              <span
                                className=" fs-6 fw-bold"
                                style={{ color: "#2e2e33" }}
                              >
                                {item?.language_code}
                              </span>
                            </Col>
                          </Row>

                          <Row className="mt-3">
                            <Col sm={7}>
                              <span
                                className="d-block fs-6 fw-bold"
                                style={{ color: "#2e2e33" }}
                              >
                                Short description
                              </span>
                              <span
                                className="d-block fs-7 "
                                style={{ color: "#92969a" }}
                              >
                                {item?.short_description
                                  ? item.short_description
                                  : "Not Set"}
                              </span>
                            </Col>
                            <Col sm={5}>
                              <span
                                className="d-block fs-6 fw-bold"
                                style={{ color: "#2e2e33" }}
                              >
                                Notice description
                              </span>
                              <span
                                className="d-block fs-7 "
                                style={{ color: "#92969a" }}
                              >
                                {item?.notice_description
                                  ? item.notice_description
                                  : "Not Set"}
                              </span>
                            </Col>
                          </Row>

                          <Row className="mt-3">
                            <Col sm={7}>
                              <span
                                className="d-block fs-6 fw-bold"
                                style={{ color: "#2e2e33" }}
                              >
                                Condition description
                              </span>
                              <span
                                className="d-block fs-7 "
                                style={{ color: "#92969a" }}
                              >
                                {item?.condition_description
                                  ? item.condition_description
                                  : "Not Set"}
                              </span>
                            </Col>
                          </Row>

                          <CardActions
                            title="Description"
                            actions={[]}
                            noShadow
                            endReload={(endLoading: any) => {}}
                            headerClassName="ps-0 pe-0 mt-1"
                            titleClassName="fs-6 fw-bold"
                          >
                            <CardBody className="pt-0 ps-0 pe-0">
                              <Table
                                responsive="xs"
                                bordered
                                className="overflow-visible"
                                size="sm"
                              >
                                <thead>
                                  <tr>
                                    <th style={{ width: "35%" }}>Key</th>
                                    <th>Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <>
                                    {item?.description &&
                                    Object.keys(item?.description)?.length > 0
                                      ? Object.keys(item?.description).map(
                                          (comp: any, index: number) => (
                                            <tr key={comp + index}>
                                              <td>{comp}</td>
                                              <td>{item?.description[comp]}</td>
                                            </tr>
                                          )
                                        )
                                      : null}
                                  </>
                                </tbody>
                              </Table>
                            </CardBody>
                          </CardActions>
                        </Col>
                      </Row>
                    ))
                  : "Not Set"}
              </div>
            </Col>
          </Row>
          <Divider />

          <Row className="mt-2">
            {/* <Col md={5}>
              <span className="fs-6 fw-bolder me-1 text-primary d-block">
                Locations
              </span>

              <div
                className="d-flex align-items-center flex-wrap"
                style={{ marginTop: "4px" }}
              >
                {data && data.locations ? (
                  Array.isArray(data.locations) ? (
                    data.locations.map((o: any, ind: number) => (
                      <Badge
                        key={ind}
                        color="info"
                        style={{ marginRight: "5px", marginBottom: "5px" }}
                      >
                        {o.name ? o.name : o.key}
                      </Badge>
                    ))
                  ) : (
                    <Badge
                      color="info"
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    >
                      {data.locations.name}
                    </Badge>
                  )
                ) : (
                  "Not Set"
                )}
              </div>
            </Col> */}

            <Col md={12}>
              <span className="fs-6 fw-bolder me-1 text-primary d-block">
                Hashtags
              </span>

              <div
                className="d-flex align-items-center flex-wrap"
                style={{ marginTop: "4px" }}
              >
                {data && data.hashtags
                  ? data.hashtags.map((o: any, ind: number) => (
                      <Badge
                        key={ind}
                        color="info"
                        style={{ marginRight: "5px", marginBottom: "5px" }}
                      >
                        {o.name}
                      </Badge>
                    ))
                  : "Not Set"}
              </div>
            </Col>
          </Row>
        </FormWrapper>
      )}
    </CardWrapper>
  );
};

export { BttDetails };
