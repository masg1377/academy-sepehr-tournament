import { Divider } from "@src/components/common/divider/Divider";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";

interface IAddCredentialProp {
  editMode?: boolean;
  paymentData?: any;
}

const AddCredential: FC<IAddCredentialProp> = ({
  editMode,
  paymentData,
}): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<any>();

  const [isSetted, setIsSetted] = useState<boolean>(false);
  const [professionOption, setProfessionOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [filterListProfession, setFilterListProfession] =
    useState<TGetEntities>({
      entity: "payment_method",
      data: {
        list_filter: {
          limit: 10000,
          offset: 0,
          order_by: "creation_date",
          filters: [{ field: "type", operator: "=", value: 1 }],
        },
      },
    });

  const getPayment = useGetListOfEntity();

  useEffect(() => {
    if (values && values["paymentMethod"] && !isSetted) {
      setIsSetted(true);
      const paymentMethod = values["paymentMethod"];
      // paymentMethod.nickname
      //   ? setFieldValue("nickname", paymentMethod.nickname)
      //   : setFieldValue("nickname", "");
      paymentMethod.unit_amount &&
        paymentMethod.unit_amount_decimal &&
        setFieldValue("unitAmount", paymentMethod.unit_amount);
      paymentMethod.unit_amount &&
        !paymentMethod.unit_amount_decimal &&
        setFieldValue("unitAmount", paymentMethod.unit_amount);
      paymentMethod.unit_amount_decimal &&
        !paymentMethod.unit_amount &&
        setFieldValue("unitAmount", paymentMethod.unit_amount_decimal);
      !paymentMethod.unit_amount &&
        !paymentMethod.unit_amount_decimal &&
        setFieldValue("unitAmount", 0);
      paymentMethod.tax_behavior &&
        setFieldValue("taxBehavior", {
          value: paymentMethod.tax_behavior,
          label: paymentMethod.tax_behavior,
        });
      paymentMethod.billing_schema &&
        setFieldValue("billingSchema", {
          value: paymentMethod.billing_schema,
          label: paymentMethod.billing_schema,
        });
      paymentMethod.tires_mode &&
        setFieldValue("tiresMods", {
          value: paymentMethod.tires_mode,
          label: paymentMethod.tires_mode,
        });
      paymentMethod.trial_period_days
        ? setFieldValue("trialPeriodDays", paymentMethod.trial_period_days)
        : setFieldValue("trialPeriodDays", 0);
      paymentMethod.one_time_valid_days
        ? setFieldValue("oneTimeValidDays", paymentMethod.one_time_valid_days)
        : setFieldValue("oneTimeValidDays", 0);
      paymentMethod.recurring_aggregate_usage &&
        setFieldValue("recurring_aggregate_usage", {
          value: paymentMethod.recurring_aggregate_usage,
          label: paymentMethod.recurring_aggregate_usage,
        });
      paymentMethod.recurring_usage_type &&
        setFieldValue("usageType", {
          value: paymentMethod.recurring_usage_type,
          label: paymentMethod.recurring_usage_type,
        });
      paymentMethod.recurring_interval_count
        ? setFieldValue("intervalCount", paymentMethod.recurring_interval_count)
        : setFieldValue("intervalCount", 0);
      paymentMethod.recurring_interval &&
        setFieldValue("interval", {
          value: paymentMethod.recurring_interval,
          label: paymentMethod.recurring_interval,
        });
    }
  }, [values, isSetted]);

  useEffect(() => {
    getPayment.mutate(filterListProfession);
  }, []);

  useEffect(() => {
    if (getPayment.isSuccess) {
      let result = getPayment.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      if (result) result = result.filter((o: any) => !o.recurring_interval);
      // if (result && !Array.isArray(result)) result = [result];
      if (result)
        setProfessionOption(
          result.map((i: any) => ({
            ...i,
            value: i.id,
            label: i.nickname ? i.nickname : "-",
          }))
        );
      else setProfessionOption([]);
    }
  }, [getPayment.isSuccess]);

  return (
    <>
      <RowWrappers sm={6} md={6}>
        <Divider title="Add New Credential" />
      </RowWrappers>
      <RowWrappers sm={6} md={4}>
        <SelectOption
          name="paymentMethod"
          placeholder="Please select"
          label={"Payment Method"}
          id="paymentType"
          options={professionOption}
          // isMulti
          isLoading={getPayment.isLoading}
          onChange={(opt) => {
            setIsSetted(false);
            setFieldValue("paymentMethod", opt);
          }}
          wrapperClassName="mb-1 "
          // onInputChange={()=>}
        />
      </RowWrappers>
      <RowWrappers sm={6} md={4}>
        <InputText
          name="nickname"
          placeholder="Please enter Name ..."
          label={"Nickname"}
          id="nickname"
          wrapperClassName="mb-1"
        />
      </RowWrappers>
      <RowWrappers sm={6} md={4}>
        <InputText
          type="number"
          name="unitAmount"
          placeholder="Please enter Unit Amount ..."
          label={"Unit Amount"}
          id="unitAmount"
          wrapperClassName="mb-1"
          // noColor
        />
      </RowWrappers>
      {values["paymentType"] && values["paymentType"].value === 2 && (
        <RowWrappers sm={6} md={4}>
          <SelectOption
            name="interval"
            placeholder="select ..."
            label={"Interval"}
            id="interval"
            options={[
              { value: "month", label: "Month" },
              { value: "year", label: "Year" },
              { value: "week", label: "Week" },
              { value: "day", label: "Day" },
            ]}
            wrapperClassName="mb-1"
          />
          <InputText
            type="number"
            name="intervalCount"
            placeholder="enter ..."
            label={"Interval Count"}
            id="intervalCount"
            wrapperClassName="mb-1"
          />
        </RowWrappers>
      )}
      {values["paymentType"] && values["paymentType"].value === 2 && (
        <RowWrappers sm={6} md={4}>
          <SelectOption
            name="usageType"
            placeholder="select ..."
            label={"Usage Type"}
            id="usageType"
            options={[
              { value: "metered", label: "Metered" },
              { value: "licensed", label: "Licensed" },
            ]}
            // isMulti
            // isLoading={getPayment.isLoading}
            wrapperClassName="mb-1 "
          />
        </RowWrappers>
      )}
      {values["paymentType"] &&
        values["paymentType"].value === 2 &&
        values["usageType"] &&
        values["usageType"].value === "licensed" && (
          <RowWrappers sm={6} md={4}>
            <SelectOption
              name="recurring_aggregate_usage"
              placeholder="select ..."
              label={"Recurring Aggregate Usage"}
              id="recurring_aggregate_usage"
              options={[
                { value: "sum", label: "Sum" },
                { value: "last_during_period", label: "Last during period" },
                { value: "last_ever", label: "Last Ever" },
                { value: "max", label: "Max" },
              ]}
              wrapperClassName="mb-1"
            />
          </RowWrappers>
        )}
      <Divider />
      <RowWrappers sm={6} md={4}>
        <RowWrappers
          sm={12}
          md={12}
          xl={values["billingSchema"]?.value === "tiered" ? 6 : 12}
          rowClassName="mt-0 mb-0"
        >
          <SelectOption
            name="billingSchema"
            placeholder="select ..."
            label={"Billing Schema"}
            id="billingSchema"
            options={[
              { value: "per_unit", label: "Per Unit" },
              { value: "tiered", label: "Tiered" },
            ]}
            // isMulti
            // isLoading={getPayment.isLoading}
            wrapperClassName="mb-1 "
          />
          {values["billingSchema"]?.value === "tiered" && (
            <SelectOption
              name="tiresMods"
              placeholder="select ..."
              label={"Tires Mods"}
              id="tiresMods"
              options={[
                { value: "graduated", label: "Graduated" },
                { value: "volume", label: "Volume" },
              ]}
              // isMulti
              // isLoading={getPayment.isLoading}
              wrapperClassName="mb-1 "
            />
          )}
        </RowWrappers>
        <RowWrappers sm={12} md={12} xl={6} rowClassName="mt-0 mb-0">
          <SelectOption
            name="taxBehavior"
            placeholder="select ..."
            label={"Tax Behavior"}
            id="taxBehavior"
            options={[
              { value: "inclusive", label: "Inclusive" },
              { value: "exclusive", label: "Exclusive" },
              { value: "unspecified", label: "Unspecified" },
            ]}
            // isMulti
            // isLoading={getPayment.isLoading}
            wrapperClassName="mb-1 "
          />
        </RowWrappers>
      </RowWrappers>
      <RowWrappers sm={6} md={4}>
        {/* <RowWrappers sm={12} md={12} xl={6} rowClassName="mt-0 mb-0"> */}
        {/* <InputText
            type="number"
            name="trialPeriodDays"
            placeholder="enter ..."
            label={"Trial Period Days"}
            id="trialPeriodDays"
            wrapperClassName="mb-1"
          /> */}
        <InputText
          type="number"
          name="oneTimeValidDays"
          placeholder="enter ..."
          label={"One time valid days"}
          id="oneTimeValidDays"
          wrapperClassName="mb-1"
          disabled={editMode ? (!paymentData ? false : true) : false}
        />
        {/* </RowWrappers> */}
      </RowWrappers>
    </>
  );
};

export { AddCredential };
