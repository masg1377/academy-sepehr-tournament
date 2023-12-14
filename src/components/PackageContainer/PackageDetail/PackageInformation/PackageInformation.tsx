import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { Divider } from "@src/components/common/divider/Divider";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import {
  packageGetTypeData,
  packageSourceData,
  packagePaymentTypeNumber,
} from "@src/core/data/package.data";
import {
  getCustomDate,
  getCustomWrittenDate,
} from "@src/core/utils/date-helper.utils";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { RippleButton } from "@src/components/common/ripple-button/index";
import { OneTime } from "./Payment Info/One Time/OneTime";
import { Recurring } from "./Payment Info/Recurring/Recurring";
import { Edit3 } from "react-feather";

interface IPackageInformationProp {
  isLoading: boolean;
  data: any;
  langData: any;
  bttData: any;
  preBttItems: any;
}

const PackageInformation: FC<IPackageInformationProp> = ({
  isLoading,
  data,
  langData,
  bttData,
  preBttItems,
}): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();

  const headerRightSide = (): JSX.Element => {
    return (
      <div className="d-flex align-items-center">
        {/* <div className="d-flex align-items-center">
          <span className="fs-6 fw-bolder me-1">Handler</span>
          <RippleButton
            className="d-flex justify-content-center"
            color="light"
            size="sm"
          >
            <span className="fs-6 me-1">{true ? "Ben M" : "Not Set"}</span>
            <Edit2 size={15} />
          </RippleButton>
        </div> */}
        <div className="d-flex align-items-center ms-1">
          <RippleButton
            className="d-flex justify-content-center me-1"
            color="light"
            size="sm"
          >
            {data ? (
              data.published ? (
                <>
                  <span className={"fs-6 text-success"}>Published</span>
                  <span className="active-inactive-show bg-success"></span>
                </>
              ) : (
                <>
                  <span className={"fs-6 text-danger"}>Unpublished</span>
                  <span className="active-inactive-show bg-danger"></span>
                </>
              )
            ) : (
              "Loading ..."
            )}
            {/* <ChevronDown size={15} /> */}
          </RippleButton>
        </div>
      </div>
    );
  };

  return (
    <CardWrapper
      title={(data && data.name) || "Package Information"}
      headerChild={headerRightSide()}
      borderBottom
    >
      {isLoading ? (
        <LoadingData />
      ) : (
        <div>
          <Row>
            <div
              className={"d-flex align-items-center justify-content-end mt-1"}
            >
              <Edit3
                className="cursor-pointer"
                size={18}
                color="#92969a"
                onClick={() => navigate("/packages/edit/" + id)}
              />
            </div>
            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Package Name
              </span>
              <span className="fs-6 text-black">
                {(data && data.name) || "Not Set"}
              </span>
            </Col>
            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Price
              </span>
              <span className="fs-6 text-black">
                {/* {data && data.price ? data.price / 100 + "$" : "Not Set"} */}
                {data &&
                data.payment_methods &&
                data.payment_methods.length === 1
                  ? data.payment_methods[0]?.type === 1
                    ? `$${data.payment_methods[0]?.unit_amount / 100}`
                    : `$${data.payment_methods[0]?.unit_amount / 100}${" / "}${
                        data.payment_methods[0]?.recurring_interval
                          ? data.payment_methods[0]?.recurring_interval
                              .slice(0, 1)
                              .toUpperCase()
                          : "-"
                      }`
                  : data &&
                    data.payment_methods &&
                    data.payment_methods.length > 1
                  ? data.payment_methods.some(
                      (item: any) => item?.recurring_interval === "month"
                    )
                    ? "$" +
                      data.payment_methods.find(
                        (it: any) => it.recurring_interval === "month"
                      )?.unit_amount /
                        100 +
                      " / M"
                    : `$${data.payment_methods[0]?.unit_amount / 100}${" / "}${
                        data.payment_methods[0]?.recurring_interval
                          ? data.payment_methods[0]?.recurring_interval
                              .slice(0, 1)
                              .toUpperCase()
                          : "-"
                      }`
                  : "Not Set"}
              </span>
            </Col>

            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Payment
              </span>
              <span className="fs-6 text-black">
                {data && data.payment_methods && data.payment_methods[0]
                  ? data.payment_methods[0].type === 1
                    ? "One Time"
                    : "Recurring"
                  : "Not Set"}
              </span>
            </Col>
            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Type
              </span>
              <span className="fs-6 text-black">
                {data && data.type
                  ? packageGetTypeData.find((o) => o.value === data.type)?.label
                  : "Not Set"}
              </span>
            </Col>

            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Multiple
              </span>
              <span className="fs-6 text-black">
                {data && data.hasOwnProperty("multiple")
                  ? data.multiple
                    ? "Yes"
                    : "No"
                  : "Not Set"}
              </span>
            </Col>
            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Source
              </span>
              <span className="fs-6 text-black">
                {data && data.type
                  ? packageSourceData.find((o) => o.value === data.source)
                      ?.label
                  : "Not Set"}
              </span>
            </Col>
            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Creation Date
              </span>
              <span className="fs-6 text-black">
                {data && data.creation_date
                  ? getCustomDate(data.creation_date)
                  : "Not Set"}
              </span>
            </Col>
          </Row>
          <Divider wrapperClassName="mb-1 mt-2" />
          <Row>
            <Col xs={12} className="mt-1">
              <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                MLS Information
              </span>
            </Col>
            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Mls Id
              </span>
              <span className="fs-6 text-black">
                {data && data.mls_id ? data.mls_id : "Not Set"}
              </span>
            </Col>
            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Feed Type
              </span>
              <span className="fs-6 text-black">
                {data && data.feed_type ? data.feed_type : "Not Set"}
              </span>
            </Col>

            <Col sm={6} className="mt-1">
              <span
                style={{ width: "35%", display: "inline-block" }}
                className="fs-6 fw-bolder me-2 text-secondary"
              >
                Mls Contract Type
              </span>
              <span className="fs-6 text-black">
                {data && data.mls_contract_type
                  ? data.mls_contract_type
                  : "Not Set"}
              </span>
            </Col>
          </Row>
          <Divider wrapperClassName="mb-1 mt-2" />
          <Row>
            <Col xs={12} className="mt-1">
              <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                Payment Information
              </span>
            </Col>
            {data && data.payment_methods && data.payment_methods[0] ? (
              data.payment_methods[0].type === 1 ? (
                <OneTime data={data} />
              ) : (
                <Recurring data={data.payment_methods} />
              )
            ) : (
              <Col sm={6} className="mt-1">
                <span className="fs-6 fw-bolder me-2 text-secondary">
                  Not Set
                </span>
              </Col>
            )}
          </Row>
          <Divider
            wrapperClassName={`mb-1 ${
              data && data.payment_methods && data.payment_methods[0]
                ? data.payment_methods[0].type === 1
                  ? "mt-2"
                  : "mt-1"
                : "mt-2"
            }`}
          />
          <Row className="px-1">
            <Col xs={12} md={6} className="m-0 p-0">
              <Col xs={12} className="mt-1">
                <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                  User Profession
                </span>
              </Col>
              <Col sm={6} className="mt-1 w-100">
                {data && data.user_professions
                  ? data?.user_professions.length !== 0
                    ? data?.user_professions.map((item: any, index: number) => (
                        <span
                          key={index + 10}
                          className="fs-7 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                          style={{
                            padding: "5px",
                            background: "#f8f8f8",
                          }}
                        >
                          {item?.name}
                        </span>
                      ))
                    : "-"
                  : "-"}
              </Col>
            </Col>
            <Divider wrapperClassName="mb-1 mt-2 d-block d-md-none" />

            <Col xs={12} md={6} className="m-0 ps-0 ps-md-1">
              <Col xs={12} className="mt-1">
                <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                  Locations
                </span>
              </Col>
              <Col sm={6} className="mt-1 w-100">
                {data && data.locations
                  ? data?.locations.length !== 0
                    ? data?.locations.map((item: any, index: number) => (
                        <span
                          key={index + 10}
                          className="fs-7 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                          style={{
                            padding: "5px",
                            background: "#f8f8f8",
                          }}
                        >
                          {item?.name}
                        </span>
                      ))
                    : "-"
                  : "-"}
              </Col>
            </Col>
          </Row>
          <Divider wrapperClassName="mb-1 mt-2" />
          <Row className="px-1">
            <Col xs={12} md={6} className="m-0 p-0">
              <Col xs={12} className="mt-1">
                <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                  Languages
                </span>
              </Col>
              <Col sm={6} className="mt-1 w-100">
                {langData && langData.length > 0
                  ? langData?.map((item: any, index: number) => (
                      <span
                        key={index + 10}
                        className="fs-7 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                        style={{
                          padding: "5px",
                          background: "#f8f8f8",
                        }}
                      >
                        {item?.language_code}
                      </span>
                    ))
                  : "-"}
              </Col>
            </Col>
            <Divider wrapperClassName="mb-1 mt-2 d-block d-md-none" />
            <Col xs={12} md={6} className="m-0 ps-0 ps-md-1">
              <Col xs={12} className="mt-1">
                <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                  Usage Plan ID
                </span>
              </Col>
              <Col sm={6} className="mt-1 w-100">
                <span className="fs-6 text-black">
                  {data && data.usage_plan_id ? (
                    <span
                      className="fs-7 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                      style={{
                        padding: "5px",
                        background: "#f8f8f8",
                      }}
                    >
                      {data.usage_plan_id}
                    </span>
                  ) : (
                    "Not Set"
                  )}
                </span>
              </Col>
            </Col>
          </Row>
          <Divider wrapperClassName="mb-1 mt-2" />
          <Row className="px-1">
            <Col xs={12} md={6} className="m-0 p-0">
              <Col xs={12} className="mt-1">
                <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                  BTT Items
                </span>
              </Col>
              <Col sm={6} className="mt-1 w-100">
                {bttData && bttData.length > 0
                  ? bttData?.map((item: any, index: number) => (
                      <span
                        key={index + 10}
                        className="fs-9 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                        style={{
                          padding: "5px 9px",
                          color: "#fff",
                          background: "#04cad0",
                        }}
                      >
                        {item?.packages_btt_item_name}
                      </span>
                    ))
                  : "-"}
              </Col>
            </Col>
            <Divider wrapperClassName="mb-1 mt-2 d-block d-md-none" />
            <Col xs={12} md={6} className="m-0 ps-0 ps-md-1">
              <Col xs={12} className="mt-1">
                <span style={{ color: "#314bc9" }} className="fs-7 fw-bolder">
                  Pre Req BTT Items
                </span>
              </Col>
              <Col sm={6} className="mt-1 w-100">
                {preBttItems && preBttItems.length > 0
                  ? preBttItems?.map((item: any, index: number) => (
                      <span
                        key={index + 10}
                        className="fs-9 customeInfoFontSize rounded me-1 mb-1 d-inline-block"
                        style={{
                          padding: "5px 9px",
                          color: "#fff",
                          background: "#04cad0",
                        }}
                      >
                        {item?.btt_type_item_name}
                      </span>
                    ))
                  : "-"}
              </Col>
            </Col>
          </Row>
        </div>
      )}
    </CardWrapper>
  );
};

export { PackageInformation };
