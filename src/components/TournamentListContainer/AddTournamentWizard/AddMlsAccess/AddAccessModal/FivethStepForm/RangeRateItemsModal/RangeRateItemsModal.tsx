import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { Modal } from "@src/components/common/Modal/Modal";
import {
  mlsContractTpe,
  mlsPerType,
  mlsTargetType,
  reportIntervalData,
} from "@src/core/data/mls.data";
import {
  useAddMlsAccessPaymentRangeRateItem,
  useEditMlsAccessPaymentRangeRateItem,
} from "@src/core/services/api/mls/mls.api";
import {
  TAddMlsAccessPaymentRangeRateItems,
  TEditMlsAccessPaymentFlatRateItems,
  TEditMlsAccessPaymentRangeRateItems,
} from "@src/core/services/api/mls/type";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { addMlsRangeRateItemValidation } from "@src/core/validations/mls.validation";
import { FormikProps } from "formik";
import { FC, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

interface IFlatRateItemsModalProp {
  isOpen: boolean;
  onToggle: () => void;
  mlsAccessPaymentMethodId: number;
  selectedItem: any;
  setSelectedItem: any;
}

const RangeRateItemsModal: FC<IFlatRateItemsModalProp> = ({
  onToggle,
  isOpen,
  mlsAccessPaymentMethodId,
  selectedItem,
  setSelectedItem,
}): JSX.Element => {
  const [initialValues, setInitialValues] = useState<any>({
    flatRatesFee: "",
    flatRatesInterval: null,
    paymentDay: "",
    flatRatesTarget: "",
    flatRatesDescription: "",
    contractType: null,
    from: "",
    to: "",
    perType: null,
    startDate: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setInitialValues({
        flatRatesDescription: selectedItem.description,
        flatRatesFee: selectedItem.fee,
        flatRatesInterval: {
          value: selectedItem.interval,
          label: selectedItem.interval,
        },
        startDate: selectedItem.start_date,
        paymentDay: selectedItem.payment_day_of_month,
        flatRatesStartDate: selectedItem.start_date,
        flatRatesTarget: {
          value: selectedItem.target,
          label: selectedItem.target,
        },
        contractType: {
          value: selectedItem.contract_type,
          label: selectedItem.contract_type,
        },
        from: selectedItem.from_number,
        to: selectedItem.to_number,
        perType: { value: selectedItem.per_type, label: selectedItem.per_type },
      });
    }
  }, [selectedItem]);

  const addPaymentRangeRate = useAddMlsAccessPaymentRangeRateItem();
  const editRangeRate = useEditMlsAccessPaymentRangeRateItem();

  const onSubmit = (values: any) => {
    if (selectedItem) {
      const obj: TEditMlsAccessPaymentRangeRateItems = {
        entity: "mls_access_payment_method_range_rate_item",
        data: {
          fee: +values.flatRatesFee,
          interval: values.flatRatesInterval
            ? values.flatRatesInterval.value
            : "",
          payment_day_of_month: +values.paymentDay,
          start_date: values.startDate ? getCustomDate(values.startDate) : "",
          target: values.flatRatesTarget ? values.flatRatesTarget.value : "",
          description: values.flatRatesDescription,
          id: selectedItem.id,
          contract_type: values.contractType ? values.contractType.value : "",
          from_number: +values.from,
          to_number: +values.to,
          per_type: values.perType ? values.perType.value : "",
        },
      };

      editRangeRate.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            onToggle();
          }
        },
      });
    } else {
      const obj: TAddMlsAccessPaymentRangeRateItems = {
        entity: "mls_access_payment_method_range_rate_item",
        data: {
          fee: values.flatRatesFee ? +values.flatRatesFee : 0,
          interval: values.flatRatesInterval
            ? values.flatRatesInterval.value
            : "",
          payment_day_of_month: +values.paymentDay,
          start_date: values.startDate ? getCustomDate(values.startDate) : "",
          target: values.flatRatesTarget ? values.flatRatesTarget.value : "",
          description: values.flatRatesDescription,
          mls_access_payment_method_id: mlsAccessPaymentMethodId,
          contract_type: values.contractType ? values.contractType.value : "",
          from_number: +values.from,
          per_type: values.perType ? values.perType.value : "",
          to_number: +values.to,
        },
      };

      addPaymentRangeRate.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            onToggle();
          }
        },
      });
    }
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={addMlsRangeRateItemValidation}
    >
      {({ handleSubmit }: FormikProps<any>) => (
        <Modal
          isOpen={isOpen}
          onToggle={onToggle}
          modalTitle={"Add Range Rate Item"}
          bodyClassName="overflow-visible pb-3"
        >
          {{
            main: (
              <>
                <SelectOption
                  name={`flatRatesInterval`}
                  placeholder="Type..."
                  options={reportIntervalData}
                  label="Interval"
                  wrapperClassName="mb-1"
                />
                <SelectOption
                  name={`contractType`}
                  placeholder="Type..."
                  options={mlsContractTpe}
                  label="Contract Type"
                  wrapperClassName="mb-1"
                />
                <DatePicker
                  name={`startDate`}
                  // label="Aggrement Start Date"
                  placeholder="Enter start date"
                  id={`startDate`}
                  label="Start date"
                />
                <Row>
                  <Col sm={6}>
                    <InputText
                      name={`from`}
                      placeholder="Enter ..."
                      label="From"
                      wrapperClassName="mb-1 mt-1"
                    />
                  </Col>
                  <Col sm={6}>
                    <InputText
                      name={`to`}
                      placeholder="Enter ..."
                      label="To"
                      wrapperClassName="mb-1 mt-1"
                    />
                  </Col>
                </Row>

                <InputText
                  name={`flatRatesFee`}
                  placeholder="$"
                  label="Fee"
                  wrapperClassName="mb-1"
                />
                <SelectOption
                  name={`perType`}
                  placeholder="Select"
                  options={mlsPerType}
                  label="Per type"
                  wrapperClassName="mb-1"
                />
                <SelectOption
                  name={`flatRatesTarget`}
                  placeholder="Select"
                  options={mlsTargetType}
                  label="Target"
                  wrapperClassName="mb-1"
                />
                <InputText
                  name={`paymentDay`}
                  placeholder="Enter ..."
                  label="Payment Day"
                  wrapperClassName="mb-1"
                />
                <InputText
                  name={`flatRatesDescription`}
                  placeholder="Enter ..."
                  label="Description"
                  wrapperClassName="mb-1"
                />
              </>
            ),

            footer: (
              <SubmitButton
                type="submit"
                color="primary"
                outline
                className="btn-next"
                isLoading={
                  editRangeRate.isLoading || addPaymentRangeRate.isLoading
                }
                onClick={handleSubmit}
              >
                Save
              </SubmitButton>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { RangeRateItemsModal };
