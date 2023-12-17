import { FourthStepForm } from "@src/components/MLSListContainer/AddMlsWizard/AddMlsAccess/AddAccessModal/FourthStepForm/FourthStepForm";
import { Modal } from "@src/components/common/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import {
  useAddMlsAccessPaymentMethod,
  useEditMlsAccessPaymentMethod,
} from "@src/core/services/api/mls/mls.api";
import {
  TAddMlsAccessPaymentMethod,
  TEditMlsAccessPaymentMethod,
} from "@src/core/services/api/mls/type";
import {
  addMlsPaymentMethodDetailValidation,
  addMlsPaymentMethodValidation,
} from "@src/core/validations/mls.validation";
import { FormikProps } from "formik";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

interface IPaymentMethodModalProp {
  isOpen: boolean;
  onToggle: () => void;
  paymentData: any;
  setPaymentData: (val: any) => void;
}

const PaymentMethodModal: FC<IPaymentMethodModalProp> = ({
  isOpen,
  onToggle,
  paymentData,
  setPaymentData,
}): JSX.Element => {
  const { accessId } = useParams();

  const addPaymentMethod = useAddMlsAccessPaymentMethod();
  const editPaymentMethod = useEditMlsAccessPaymentMethod();

  const onSubmit = (values: any) => {
    if (paymentData?.id) {
      let obj: TEditMlsAccessPaymentMethod = {
        entity: "mls_access_payment_method",
        data: {
          id: paymentData.id,
          is_auto_billing: values?.is_auto_billing
            ? values?.is_auto_billing
            : false,
          data_url: values?.data_url,
          lambda_arn: values?.lambda_arn,
          // payment_details: paymentDetails,
          payment_password: values?.payment_password,
          payment_url: values?.payment_url,
          payment_username: values?.payment_username,
          reactivation_fee: values?.reactivation_fee
            ? +values?.reactivation_fee
            : 0,
          setup_fee: values?.setup_fee ? +values?.setup_fee : 0,
        },
      };
      editPaymentMethod.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setPaymentData(res.data.result);
            onToggle();
          }
        },
      });
    } else {
      const obj: TAddMlsAccessPaymentMethod = {
        entity: "mls_access_payment_method",
        data: {
          data_url: values?.data_url,
          is_auto_billing: values?.is_auto_billing
            ? values?.is_auto_billing
            : false,
          mls_access_id: accessId ? +accessId : 0,
          lambda_arn: values?.lambda_arn,
          // payment_details: paymentDetails,
          setup_fee: values?.setup_fee ? +values?.setup_fee : 0,
          payment_password: values?.payment_password,
          payment_url: values?.payment_url,
          payment_username: values?.payment_username,
          reactivation_fee: values?.reactivation_fee
            ? +values?.reactivation_fee
            : 0,
        },
      };

      addPaymentMethod.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setPaymentData(res.data.result);
            onToggle();
          }
        },
      });
    }
  };

  return (
    <FormWrapper
      initialValues={{
        is_auto_billing: paymentData?.is_auto_billing
          ? paymentData?.is_auto_billing
          : false,
        data_url: paymentData?.data_url,
        lambda_arn: paymentData?.lambda_arn,
        // payment_details: paymentDetails,
        payment_password: paymentData?.payment_password,
        payment_url: paymentData?.payment_url,
        payment_username: paymentData?.payment_username,
        reactivation_fee: paymentData?.reactivation_fee
          ? +paymentData?.reactivation_fee
          : null,
        setup_fee: paymentData?.setup_fee ? +paymentData?.setup_fee : null,
      }}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={addMlsPaymentMethodDetailValidation}
    >
      {({ submitForm }: FormikProps<any>) => (
        <Modal
          isOpen={isOpen}
          modalTitle="Add Payment Method"
          onToggle={onToggle}
        >
          {{
            main: (
              <div>
                <span className="d-block fs-8 text-black fw-bold mb-1">
                  Add Payment Method
                </span>
                <InputText
                  name="data_url"
                  placeholder="Please enter ..."
                  label={"Data URL"}
                  id="data_url"
                  wrapperClassName="mb-1"
                />
                <InputText
                  name="setup_fee"
                  placeholder="Please enter ..."
                  label={"Setup Fee"}
                  id="setup_fee"
                  wrapperClassName="mb-1"
                />
                <div className="pb-1 border-bottom mb-1">
                  <InputText
                    name="reactivation_fee"
                    placeholder="Please enter ..."
                    label={"Reactivation Fee"}
                    id="reactivation_fee"
                    wrapperClassName="mb-1"
                  />
                </div>
                <InputText
                  name="lambda_arn"
                  placeholder="Please enter ..."
                  label={"Lambda Arn"}
                  id="lambda_arn"
                  wrapperClassName="mb-1"
                />
                <InputText
                  name="payment_url"
                  placeholder="Please enter ..."
                  label={"Payment URL"}
                  id="payment_url"
                  wrapperClassName="mb-1"
                />
                <InputText
                  name="payment_username"
                  placeholder="Please enter ..."
                  label={"User Name"}
                  id="payment_username"
                  wrapperClassName="mb-1"
                />
                <div className="pb-1 border-bottom mb-1">
                  <InputText
                    name="payment_password"
                    placeholder="Please enter ..."
                    label={"Password"}
                    id="payment_password"
                    wrapperClassName="mb-1"
                    type="password"
                  />
                </div>

                <InputText
                  name="paymentDetails"
                  placeholder="Please enter ..."
                  label={"Payment Details"}
                  id="paymentDetails"
                  wrapperClassName="mb-1"
                />
                <CheckBox
                  name="is_auto_billing"
                  label="Is Auto Billing"
                  id={"is_auto_billing"}
                />
              </div>
            ),
            footer: (
              <SubmitButton
                type={
                  addPaymentMethod.isLoading || editPaymentMethod.isLoading
                    ? "button"
                    : "submit"
                }
                color="primary"
                outline
                isLoading={
                  addPaymentMethod.isLoading || editPaymentMethod.isLoading
                }
                className="btn-next w-25"
                schema={addMlsPaymentMethodDetailValidation}
                // values={}
                onClick={submitForm}
              >
                <span className={"align-middle d-sm-inline-block"}>Save</span>
              </SubmitButton>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { PaymentMethodModal };
