// ** React Imports
import React, { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ** ReactStrap Imports
import { Row, Col, Button, Input } from "reactstrap";

// ** General components
import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { RippleButton } from "@src/components/common/ripple-button";
import { Note } from "@src/components/Platform/PlatformDetail/Note/Note";
import { Divider } from "@src/components/common/divider/Divider";
import classNames from "classnames";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { getCustomWrittenDate } from "@src/core/utils/date-helper.utils";
import { columns, customStyles } from "./data";

// React feather
import { Edit3, Edit2, Download } from "react-feather";

// ** Import Pictures
import Def from "@src/assets/images/portrait/small/profileDef.png";
import {
  useGetProfileDetails,
  useGetProfileDetailsById,
} from "@src/core/services/api/profileSetup/profile-setup.api";
import { Timeline } from "@src/components/common/timeline";
import Verify from "@src/assets/images/icons/Verify.png";
import { invoiceTypeNumber } from "@src/core/data/mls.data";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { ListTable } from "@src/components/common/ListTable/ListTable";
import { FileText, RefreshCw, Send, DollarSign, Check } from "react-feather";

const PaymentDetail = () => {
  const [staffDetail, setStaffDetail] = useState<any>([]);
  const [staffProfile, setStaffProfile] = useState<any>([]);
  const [invoiceDetail, setInvoiceDetail] = useState<any>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [invoicepackage, setInvoicepackage] = useState<any>([]);
  const [data, setData] = useState<any>([]);

  const navigate = useNavigate();
  const { userId, invoiceId } = useParams();

  const getStaff = useGetListOfEntity();
  const getInvoices = useGetListOfEntity();
  const getInvoiceItemPackage = useGetListOfEntity();

  const getInvoiceItemsPackages = () => {
    getInvoiceItemPackage.mutate(
      {
        entity: "invoice_item_packages",
        data: {
          list_filter: {
            limit: 100000,
            offset: 0,
            filters: [
              {
                field: "invoice_id",
                operator: "=",
                value: invoiceId ? +invoiceId : 0,
              },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            const totalItems = result.reduce((obj: any, sum: any) => {
              return {
                totalCount: +obj.quantity + sum.quantity,
                totalPrice:
                  +obj.price_befor_discount + sum.price_befor_discount,
                totalDiscount: +obj.price_discount + sum.price_discount,
                totalinalPrice:
                  +obj.selected_unit_amount + sum.selected_unit_amount,
              };
            });
            setInvoicepackage(result);
            setData((old: any) => [
              ...result.map((o: any, index: number) => {
                return {
                  ...o,
                  row_id: index + 1,
                };
              }),
              {
                row_id: null,
                package: { name: "Total" },
                quantity: totalItems?.totalCount,
                price_befor_discount: totalItems?.totalPrice,
                price_discount: totalItems?.totalDiscount,
                selected_unit_amount: totalItems?.totalinalPrice,
              },
            ]);
            res.data.result_count && setTotalCount(res.data.result_count);
          }
        },
        onError: () => {
          setInvoicepackage([]);
        },
      }
    );
  };

  const getStaffDetailSingle = () => {
    getStaff.mutate(
      {
        entity: "customers",
        data: { id: userId ? +userId : 0 },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setStaffDetail(result);
          }
        },
        onError: () => {
          setStaffDetail([]);
        },
      }
    );
  };

  const getInvoceDetail = () => {
    getInvoices.mutate(
      {
        entity: "invoices",
        data: {
          list_filter: {
            limit: 100000,
            offset: 0,
            filters: [
              { field: "id", operator: "=", value: invoiceId ? +invoiceId : 0 },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setInvoiceDetail(result);
          } else setInvoiceDetail([]);
        },
      }
    );
  };

  useEffect(() => {
    getStaffDetailSingle();
    getInvoceDetail();
    setTimeout(getInvoiceItemsPackages, 500);
  }, []);

  const headerRightSide = (): JSX.Element => {
    const types = invoiceTypeNumber;
    let currentType = types.filter((i) => i.value === invoiceDetail?.status);
    return (
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <RippleButton
            className="d-flex justify-content-center"
            color="light"
            size="sm"
          >
            <a
              className="d-inline-block me-1 text-dark"
              href={
                invoiceDetail?.invoice_pdf && invoiceDetail?.invoice_pdf !== ""
                  ? invoiceDetail?.invoice_pdf
                  : "#"
              }
              target={
                invoiceDetail?.invoice_pdf && invoiceDetail?.invoice_pdf !== ""
                  ? "_blank"
                  : "_self"
              }
            >
              Invoice PDF
            </a>
            <Download size={15} />
          </RippleButton>
        </div>
        <div className="d-flex align-items-center ms-1">
          <RippleButton
            className="d-flex justify-content-center me-1"
            color="light"
            size="sm"
          >
            {invoiceDetail && invoiceDetail.status ? (
              <>
                <span className={`fs-6 ${currentType[0]?.text}`}>
                  {currentType[0]?.label}
                </span>
                <span
                  className={`active-inactive-show2 ${currentType[0]?.class}`}
                ></span>
              </>
            ) : (
              "Loading ..."
            )}
            {/* <ChevronDown size={15} /> */}
          </RippleButton>
        </div>
      </div>
    );
  };

  const paymentData = [
    {
      //title: "Invoice payment page was created.",
      content: "Invoice payment page was created.",
      icon: <FileText size={15} />,
      // meta: (
      //   <span className="fs-6 text-success">
      //     Paid <Check size={15} color="#21c44c" />
      //   </span>
      // ),
      className: "border-start-0",
      customContent: (
        <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
          <div className="text-start">
            {/* <div>
              <span className="fs-6 fw-bolder lh-base">Request: </span>
              <span className="fs-6 lh-base">Rqs-122-45689</span>
            </div>
            <div>
              <span className="fs-6 fw-bolder lh-base text-primary">
                Paid By:{" "}
              </span>
              <span className="fs-6 lh-base">card **** **** **** 5583</span>
            </div> */}
            {/* <div>
              <span className="fs-6 lh-base">$8,400.00</span>
            </div> */}
            <span className="fs-6 lh-base">12 Jun 2021 - 10:30 PM</span>
          </div>
        </div>
      ),
    },
    {
      title: "50$ payment succeeded.",
      //content: "Invoice payment page was created.",
      icon: <DollarSign size={15} />,
      // meta: (
      //   <span className="fs-6 text-success">
      //     Paid <Check size={15} color="#21c44c" />
      //   </span>
      // ),
      className: "border-start-0",
      customContent: (
        <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
          <div className="text-start">
            {/* <div>
              <span className="fs-6 fw-bolder lh-base">Request: </span>
              <span className="fs-6 lh-base">Rqs-122-45689</span>
            </div>
            <div>
              <span className="fs-6 fw-bolder lh-base text-primary">
                Paid By:{" "}
              </span>
              <span className="fs-6 lh-base">card **** **** **** 5583</span>
            </div> */}
            {/* <div>
              <span className="fs-6 lh-base">$8,400.00</span>
            </div> */}
            <span className="fs-6 lh-base">12 Jun 2021 - 10:30 PM</span>
          </div>
        </div>
      ),
    },
    {
      title: "Invoice was finalized.",
      //content: "Invoice was finalized.",
      icon: <FileText size={15} />,
      // meta: (
      //   <span className="fs-6 text-success">
      //     Paid <Check size={15} color="#21c44c" />
      //   </span>
      // ),
      className: "border-start-0",
      customContent: (
        <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
          <div className="text-start">
            {/* <div>
              <span className="fs-6 fw-bolder lh-base">Request: </span>
              <span className="fs-6 lh-base">Rqs-122-45689</span>
            </div>
            <div>
              <span className="fs-6 fw-bolder lh-base text-primary">
                Paid By:{" "}
              </span>
              <span className="fs-6 lh-base">card **** **** **** 5583</span>
            </div> */}
            {/* <div>
              <span className="fs-6 lh-base">$8,400.00</span>
            </div> */}
            <span className="fs-6 lh-base">12 Jun 2021 - 10:30 PM</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Row>
      <Col xs={12}>
        <CardWrapper
          title={
            (staffDetail && staffDetail.first_name) ||
            (staffDetail && staffDetail.last_name)
              ? staffDetail?.first_name +
                " " +
                staffDetail?.last_name +
                "'s Invoice"
              : "Loading ..."
          }
          headerChild={headerRightSide()}
          borderBottom
        >
          {getStaff.isLoading ||
          getInvoiceItemPackage.isLoading ||
          getInvoices.isLoading ? (
            <LoadingData wrapperStyle="py-5 my-3" />
          ) : (
            <>
              <Row style={{ minHeight: "140px" }} className="mb-1">
                {/* <div
                  className={
                    "d-flex align-items-center justify-content-end mt-1"
                  }
                >
                  <Edit3
                    className="cursor-pointer"
                    size={15}
                    color="#92969a"
                    //onClick={() => navigate("/customer-list/edit/" + id)}
                  />
                </div> */}
                <Col xs={12} lg={8} className="">
                  <Row>
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Invoice number
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {invoiceDetail && invoiceDetail.number
                          ? "#" + invoiceDetail?.number
                          : "Not Set"}
                      </span>
                    </Col>
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Receipt number
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {invoiceDetail && invoiceDetail.receipt_number
                          ? "#" + invoiceDetail?.receipt_number
                          : "Not Set"}
                      </span>
                    </Col>{" "}
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Customer
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {staffDetail && staffDetail.email
                          ? staffDetail?.email
                          : "Not Set"}
                      </span>
                    </Col>{" "}
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Amount due
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {invoiceDetail && invoiceDetail.amount_due
                          ? invoiceDetail?.amount_due / 100 + "$"
                          : "Not Set"}
                      </span>
                    </Col>{" "}
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Amount paid
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {invoiceDetail && invoiceDetail.amount_paid
                          ? invoiceDetail?.amount_paid / 100 + "$"
                          : "Not Set"}
                      </span>
                    </Col>{" "}
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Amount remaining
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {invoiceDetail && invoiceDetail.amount_remaining
                          ? invoiceDetail?.amount_remaining / 100
                          : "Not Set"}
                      </span>
                    </Col>{" "}
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Currency
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {invoiceDetail && invoiceDetail.currency
                          ? invoiceDetail?.currency === "usd"
                            ? "USD - US Dollar"
                            : invoiceDetail?.currency
                          : "Not Set"}
                      </span>
                    </Col>{" "}
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Collection method
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {invoiceDetail && invoiceDetail.collection_method
                          ? invoiceDetail?.collection_method
                          : "Not Set"}
                      </span>
                    </Col>{" "}
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Billing reason
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {invoiceDetail && invoiceDetail.billing_reason
                          ? invoiceDetail?.billing_reason
                          : "Not Set"}
                      </span>
                    </Col>{" "}
                    <Col xs={12} lg={6} className="mt-1">
                      <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                        Tax rates
                      </span>
                      <span className="customeInfoFontSize staffInfoText text-truncate">
                        {invoiceDetail && invoiceDetail.tax_rates
                          ? invoiceDetail?.tax_rates
                          : "Not Set"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  lg={4}
                  className="d-flex justify-content-start align-items-center mt-4 mt-lg-0"
                >
                  {/* <Timeline data={paymentData} /> */}
                </Col>
              </Row>
              {/* <Divider wrapperClassName="my-1" /> */}
              <Row>
                <Col
                  style={{ background: "#f2f2f2" }}
                  xs={12}
                  className="mb-1 mt-1 py-1 fs-7 fw-bolder text-dark"
                >
                  <span>#</span> <span className="ms-1">Invoice Items</span>
                </Col>
                {invoicepackage &&
                  invoicepackage.length > 0 &&
                  invoicepackage?.map((item: any, index: number) => (
                    <React.Fragment key={index + 10}>
                      {index > 0 && <Divider wrapperClassName="mt-1" />}
                      <Col xs={12} className="mt-1">
                        <span
                          style={{ color: "#314bc9" }}
                          className="fs-7 fw-bolder"
                        >
                          <span>{index + 1}</span>{" "}
                          <span className="ms-1">{item?.package?.name}</span>
                        </span>
                      </Col>
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle ms-0 ms-md-2">
                          Quantity
                        </span>
                        <span className="customeInfoFontSize staffInfoText text-truncate">
                          {item.quantity ? item?.quantity : "Not Set"}
                        </span>
                      </Col>
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                          Type
                        </span>
                        <span className="customeInfoFontSize staffInfoText text-truncate">
                          {item.payment_type ? item?.payment_type : "Not Set"}
                        </span>
                      </Col>{" "}
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle ms-0 ms-md-2">
                          Amount with discount
                        </span>
                        <span className="customeInfoFontSize staffInfoText text-truncate">
                          {item.selected_unit_amount
                            ? item?.selected_unit_amount / 100 + "$"
                            : "Not Set"}
                        </span>
                      </Col>{" "}
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                          Recurring interval
                        </span>
                        <span className="customeInfoFontSize staffInfoText text-truncate">
                          {item?.payment_method?.recurring_interval
                            ? item?.payment_method?.recurring_interval
                            : "Not Set"}
                        </span>
                      </Col>{" "}
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle ms-0 ms-md-2">
                          Discount percent
                        </span>

                        <span
                          style={{
                            background: "#2c80f5",
                            padding: "2px 9px",
                            borderRadius: "17px 1px 17px 1px",
                          }}
                          className="customeInfoFontSize staffInfoText text-truncate text-white"
                        >
                          {item?.price_discount ? item?.price_discount : 0}%
                        </span>
                      </Col>{" "}
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                          Recurring interval count
                        </span>
                        <span className="customeInfoFontSize staffInfoText text-truncate">
                          {item?.payment_method.recurring_interval_count
                            ? item?.payment_method.recurring_interval_count
                            : "Not Set"}
                        </span>
                      </Col>
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle ms-0 ms-md-2">
                          Period start
                        </span>
                        <span className="customeInfoFontSize staffInfoText text-truncate">
                          {item.period_start
                            ? getCustomWrittenDate(item?.period_start)
                            : "Not Set"}
                        </span>
                      </Col>{" "}
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                          Trial used
                        </span>

                        <FormWrapper
                          className="d-inline"
                          initialValues={{ trial: item?.trial_used }}
                          onSubmit={() => {}}
                          enableReinitialize
                        >
                          <span>
                            {" "}
                            <SwitchBox
                              name="trial"
                              disabled
                              withIcon={false}
                              color="success"
                              labelClassName="fw-bolder d-inline"
                              wrapperClassName="d-inline"
                              wrapperStyle={{ display: "inline !important" }}
                              dFlex={true}
                            />
                          </span>
                        </FormWrapper>
                      </Col>{" "}
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle ms-0 ms-md-2">
                          Period end
                        </span>
                        <span className="customeInfoFontSize staffInfoText text-truncate">
                          {item.period_end
                            ? getCustomWrittenDate(item?.period_end)
                            : "Not Set"}
                        </span>
                      </Col>{" "}
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                          Status
                        </span>
                        <span
                          className={`customeInfoFontSize staffInfoText text-truncate ${
                            item?.status === 2 ? "text-success" : "text-danger"
                          }`}
                        >
                          {item.status
                            ? item?.status === 2
                              ? "Active"
                              : "Cancel"
                            : "Not Set"}
                        </span>
                      </Col>{" "}
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle ms-0 ms-md-2">
                          Tax behavior
                        </span>
                        <span className="customeInfoFontSize staffInfoText text-truncate">
                          {item?.payment_method?.tax_behavior
                            ? item?.payment_method?.tax_behavior
                            : "Not Set"}
                        </span>
                      </Col>{" "}
                      <Col xs={12} md={6} className="mt-1">
                        <span className="fs-6 fw-bolder me-5 staffInfoTitle">
                          Tiers mode
                        </span>
                        <span className="customeInfoFontSize staffInfoText text-truncate">
                          {item?.payment_method?.tires_mode
                            ? item?.payment_method?.tires_mode
                            : "Not Set"}
                        </span>
                      </Col>{" "}
                    </React.Fragment>
                  ))}
              </Row>
              <Row>
                <Col className="px-0 mt-2" xs={12}>
                  <ListTable
                    columns={columns}
                    noHeader
                    rounded={false}
                    noReload
                    noSearch
                    customStyle={customStyles}
                    data={data}
                    totalCount={totalCount}
                    yayShowHide
                  />
                </Col>
              </Row>
            </>
          )}
        </CardWrapper>
      </Col>
    </Row>
  );
};

export { PaymentDetail };
