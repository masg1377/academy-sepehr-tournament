import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { FlatRateItems } from "@src/components/MLSListContainer/AddMlsWizard/AddMlsAccess/AddAccessModal/FivethStepForm/FlatRateItems/FlatRateItems";
import { RangeRateItems } from "@src/components/MLSListContainer/AddMlsWizard/AddMlsAccess/AddAccessModal/FivethStepForm/RangeRateItems/RangeRateItems";
import { useGetMlsList } from "@src/core/services/api/mls/mls.api";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { PaymentMethodModal } from "./PaymentMethodModal/PaymentMethodModal";
import { addMlsPaymentMethodValidation } from "@src/core/validations/mls.validation";
import { Edit3 } from "react-feather";

const PaymentMethod: FC = (): JSX.Element => {
  const { accessId } = useParams();

  const [paymentData, setPaymentData] = useState<any>();
  const [paymentMethodModal, setPaymentMethodModal] = useState<boolean>(false);

  const getList = useGetMlsList();

  useEffect(() => {
    getList.mutate(
      {
        entity: "mls_access_payment_method",
        data: {
          list_filter: {
            limit: 10,
            offset: 0,
            filters: [
              {
                field: "mls_access_id",
                operator: "=",
                value: accessId ? +accessId : "",
              },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const result = res.data.result;
            console.log(result);
            result && !Array.isArray(result) && setPaymentData(result);
            result &&
              Array.isArray(result) &&
              result.length > 0 &&
              setPaymentData(result[0]);
          }
        },
      }
    );
  }, []);

  console.log(paymentData);

  return (
    <CardWrapper title="Add Payment Method" headerChild={<></>} borderBottom>
      {getList.isLoading ? (
        <LoadingData wrapperStyle="py-5 my-3" />
      ) : (
        <FormWrapper
          initialValues={{
            isAutoBilling:
              paymentData && paymentData?.is_auto_billing ? true : false,
          }}
          onSubmit={() => {}}
          validationSchema={addMlsPaymentMethodValidation}
          className="mt-1"
          enableReinitialize
        >
          <Row className="mt-1 mb-1 align-items-center">
            <Col sm={6} className="d-flex align-items-center">
              <div className="d-flex align-items-center mb-1 d-flex">
                <span className="fs-6 fw-bolder d-block" style={{ width: 150 }}>
                  Data URL
                </span>

                <span className="fs-6 text-primary">
                  {paymentData && paymentData.data_url
                    ? paymentData.data_url
                    : "Not Set"}
                </span>
              </div>
            </Col>
            <Col sm={5}>
              <div className="d-flex align-items-center mb-1 d-flex">
                <span className="fs-6 fw-bolder d-block" style={{ width: 150 }}>
                  Setup Fee
                </span>

                <span className="fs-6">
                  {paymentData && paymentData.setup_fee
                    ? paymentData.setup_fee
                    : "Not Set"}
                </span>
              </div>
            </Col>
            <Col
              sm={1}
              className="d-flex justify-content-end mb-2 cursor-pointer"
              onClick={() => setPaymentMethodModal(true)}
            >
              <Edit3 size={18} />
            </Col>

            <Col sm={12} className="d-flex align-items-center">
              <div className="d-flex align-items-center mb-1 d-flex">
                <span className="fs-6 fw-bolder d-block" style={{ width: 150 }}>
                  Reactivation Fee
                </span>

                <span className="fs-6">
                  {paymentData && paymentData.reactivation_fee
                    ? paymentData.reactivation_fee
                    : "Not Set"}
                </span>
              </div>
            </Col>

            <Col sm={6} className="d-flex align-items-center">
              <div className="d-flex align-items-center mb-1 d-flex">
                <span className="fs-6 fw-bolder d-block" style={{ width: 150 }}>
                  Lambda Arn
                </span>

                <span className="fs-6">
                  {paymentData && paymentData.lambda_arn
                    ? paymentData.lambda_arn
                    : "Not Set"}
                </span>
              </div>
            </Col>

            <Col sm={6} className="d-flex align-items-center">
              <div className="d-flex align-items-center mb-1 d-flex">
                <span className="fs-6 fw-bolder d-block" style={{ width: 150 }}>
                  Username
                </span>

                <span className="fs-6">
                  {paymentData && paymentData.payment_username
                    ? paymentData.payment_username
                    : "Not Set"}
                </span>
              </div>
            </Col>

            <Col sm={6} className="d-flex align-items-center">
              <div className="d-flex align-items-center mb-1 d-flex">
                <span className="fs-6 fw-bolder d-block" style={{ width: 150 }}>
                  Payment URL
                </span>

                <span className="fs-6 text-primary">
                  {paymentData && paymentData.payment_url
                    ? paymentData.payment_url
                    : "Not Set"}
                </span>
              </div>
            </Col>

            <Col sm={6} className="d-flex align-items-center">
              <div className="d-flex align-items-center mb-1 d-flex">
                <span className="fs-6 fw-bolder d-block" style={{ width: 150 }}>
                  Password
                </span>

                <span className="fs-6">
                  {paymentData && paymentData.payment_password
                    ? "*************"
                    : "Not Set"}
                </span>
              </div>
            </Col>

            <Col sm={12} className="d-flex align-items-center">
              <div className="d-flex align-items-center mb-1 d-flex">
                <span className="fs-6 fw-bolder d-block" style={{ width: 150 }}>
                  Payment Details
                </span>

                <span className="fs-6">
                  {paymentData && paymentData.payment_details
                    ? paymentData.payment_details
                    : "Not Set"}
                </span>
              </div>
            </Col>

            <Col sm={12}>
              <CheckBox
                name="isAutoBilling"
                label="Is Auto Billing"
                id="isAutoBilling"
                disabled
              />
            </Col>

            {paymentData && (
              <Col
                sm={12}
                className="mt-2 rounded"
                style={{ border: "1px solid #e5e5e5" }}
              >
                <FlatRateItems
                  mlsAccessPaymentMethodId={paymentData && paymentData.id}
                />
              </Col>
            )}

            {paymentData && (
              <Col
                sm={12}
                className="mt-2 rounded"
                style={{ border: "1px solid #e5e5e5" }}
              >
                <RangeRateItems
                  mlsAccessPaymentMethodId={paymentData && paymentData.id}
                />
              </Col>
            )}
          </Row>
        </FormWrapper>
      )}
      {paymentMethodModal && (
        <PaymentMethodModal
          isOpen={paymentMethodModal}
          paymentData={paymentData}
          onToggle={() => setPaymentMethodModal(false)}
          setPaymentData={setPaymentData}
        />
      )}
    </CardWrapper>
  );
};

export { PaymentMethod };
