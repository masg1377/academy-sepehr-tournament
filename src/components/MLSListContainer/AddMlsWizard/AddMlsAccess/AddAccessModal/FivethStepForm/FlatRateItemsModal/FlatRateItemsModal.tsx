import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { Modal } from "@src/components/common/Modal/Modal";
import { mlsTargetType, reportIntervalData } from "@src/core/data/mls.data";
import {
  useAddMlsAccessPaymentFlatRateItem,
  useEditMlsAccessPaymentFlatRateItem,
} from "@src/core/services/api/mls/mls.api";
import {
  TAddMlsAccessPaymentFlatRateItems,
  TEditMlsAccessPaymentFlatRateItems,
} from "@src/core/services/api/mls/type";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { addMlsFlatRateItemValidation } from "@src/core/validations/mls.validation";
import { FormikProps } from "formik";
import React, { FC, useEffect, useState } from "react";

interface IFlatRateItemsModalProp {
  isOpen: boolean;
  onToggle: () => void;
  mlsAccessPaymentMethodId: number;
  selectedItem: any;
  setSelectedItem: any;
}

const FlatRateItemsModal: FC<IFlatRateItemsModalProp> = ({
  onToggle,
  isOpen,
  mlsAccessPaymentMethodId,
  selectedItem,
  setSelectedItem,
}): JSX.Element => {
  const [initialValues, setInitialValues] = useState<any>({
    flatRatesFee: "",
    flatRatesInterval: null,
    flatRatesStartDate: "",
    flatRatesPaymentDayInMth: "",
    flatRatesTarget: "",
    flatRatesDescription: "",
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
        flatRatesPaymentDayInMth: selectedItem.payment_day_of_month,
        flatRatesStartDate: selectedItem.start_date,
        flatRatesTarget: {
          value: selectedItem.target,
          label: selectedItem.target,
        },
      });
    }
  }, [selectedItem]);

  const addPaymentFlatRate = useAddMlsAccessPaymentFlatRateItem();
  const editFlatRate = useEditMlsAccessPaymentFlatRateItem();

  const onSubmit = (values: any) => {
    if (selectedItem) {
      const obj: TEditMlsAccessPaymentFlatRateItems = {
        entity: "mls_access_payment_method_flat_rate_item",
        data: {
          fee: +values.flatRatesFee,
          interval: values.flatRatesInterval
            ? values.flatRatesInterval.value
            : "",
          payment_day_of_month: +values.flatRatesPaymentDayInMth,
          start_date: values.flatRatesStartDate
            ? getCustomDate(values.flatRatesStartDate)
            : "",
          target: values.flatRatesTarget ? values.flatRatesTarget.value : "",
          description: values.flatRatesDescription,
          id: selectedItem.id,
        },
      };

      editFlatRate.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            onToggle();
          }
        },
      });
    } else {
      const obj: TAddMlsAccessPaymentFlatRateItems = {
        entity: "mls_access_payment_method_flat_rate_item",
        data: {
          fee: +values.flatRatesFee,
          interval: values.flatRatesInterval
            ? values.flatRatesInterval.value
            : "",
          payment_day_of_month: +values.flatRatesPaymentDayInMth,
          start_date: values.flatRatesStartDate
            ? getCustomDate(values.flatRatesStartDate)
            : "",
          target: values.flatRatesTarget ? values.flatRatesTarget.value : "",
          description: values.flatRatesDescription,
          mls_access_payment_method_id: mlsAccessPaymentMethodId,
        },
      };

      addPaymentFlatRate.mutate(obj, {
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
      validationSchema={addMlsFlatRateItemValidation}
    >
      {({ handleSubmit }: FormikProps<any>) => (
        <Modal
          isOpen={isOpen}
          onToggle={onToggle}
          modalTitle={"Add Flat Rate Item"}
          bodyClassName="overflow-visible pb-3"
        >
          {{
            main: (
              <>
                <InputText
                  name={`flatRatesFee`}
                  placeholder="$"
                  label="Fee"
                  wrapperClassName="mb-1"
                />
                <SelectOption
                  name={`flatRatesInterval`}
                  placeholder="Type..."
                  options={reportIntervalData}
                  label="Interval"
                  wrapperClassName="mb-1"
                />
                <DatePicker
                  name={`flatRatesStartDate`}
                  // label="Aggrement Start Date"
                  id={`rangeRatesStartDate`}
                  placeholder="Enter ..."
                  label="Start Date"
                  //   dateClassName="mb-1"
                />
                <InputText
                  name={`flatRatesPaymentDayInMth`}
                  placeholder="Enter ..."
                  label="Payment day in month"
                  wrapperClassName="mb-1 mt-1"
                />
                <SelectOption
                  name={`flatRatesTarget`}
                  placeholder="Select"
                  options={mlsTargetType}
                  label="Target"
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
                  editFlatRate.isLoading || addPaymentFlatRate.isLoading
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

export { FlatRateItemsModal };
