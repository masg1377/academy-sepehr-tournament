import { Divider } from "@src/components/common/divider/Divider";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import {
  currencyData,
  durationDiscountData,
} from "@src/core/data/discount.data";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import React, { FC, useEffect, useRef, useState } from "react";

const AddDiscount: FC = (): JSX.Element => {
  //packages
  const [packagesOption, setPackagesOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [packagesInput, setPackagesInput] = useState("");
  const [filterListPackages, setFilterListPackages] = useState<TGetEntities>({
    entity: "packages",
    data: {
      // select_fields: ["id"],
      select_fields: ["id", "name"],
      list_filter: {
        limit: 20,
        offset: 0,
        filters: [],
      },
    },
  });

  const getPackagesItems = useGetListOfEntity();

  useEffect(() => {
    getPackagesItems.mutate(filterListPackages);
  }, []);

  useEffect(() => {
    if (getPackagesItems.isSuccess) {
      let result = getPackagesItems.data.data.result;
      // console.log(result);
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setPackagesOption(
          result.map((i: any) => ({ value: i.id, label: i.name }))
        );
    }
  }, [getPackagesItems.isSuccess]);

  const packageRef = useRef<any>();

  const onPackageInput = (val: string) => {
    clearTimeout(packageRef.current);
    setPackagesInput(val);
    if (packagesInput !== val) {
      const timeOut = setTimeout(() => {
        const obj: TGetEntities = { ...filterListPackages };
        // @ts-ignore
        obj.data.list_filter["filters"] = [
          { field: "name", operator: "like", value: val },
        ];
        setFilterListPackages(obj);
        getPackagesItems.mutate(obj);
      }, 500);
      packageRef.current = timeOut;
    }
  };

  return (
    <>
      <span className="fs-6 fw-bold text-primary d-block mt-2 mb-1">
        Add Discount
      </span>

      {/* <Divider /> */}
      <RowWrappers md={6} xl={4}>
        <InputText
          name={`discountName`}
          placeholder="Please enter ..."
          label="Name"
          id="discountName"
          wrapperClassName="mb-1"
        />
        <SwitchBox
          name="isValid"
          color="success"
          defaultChecked={false}
          wrapperClassName="mt-2 pt-1"
          labelClassName="text-black"
        >
          Valid
        </SwitchBox>
      </RowWrappers>

      <RowWrappers md={6} xl={4}>
        {/* <SelectOption
          name="currency"
          placeholder="Please select"
          id="currency"
          label="Currency"
          options={currencyData}
          wrapperClassName="mb-1"
        /> */}
        <InputText
          name={`percentOff`}
          placeholder="Please write the discount percentage"
          label="Percent off"
          id="percentOff"
          wrapperClassName="mb-1"
          type="number"
        />
      </RowWrappers>

      {/* <RowWrappers md={6} xl={4}>
        <SelectOption
          name="duration"
          placeholder="Please select"
          id="duration"
          label="Duration"
          options={durationDiscountData}
          wrapperClassName="mb-1"
        />
      
      </RowWrappers> */}

      <RowWrappers sm={6} md={4}>
        <InputText
          name={`maxRedemptions`}
          placeholder="Please enter ..."
          label="Max Redemptions"
          id="maxRedemptions"
          wrapperClassName="mb-1"
          type="number"
        />
        <DatePicker
          name="expiryDate"
          label="Expiry  date"
          options={{ minDate: new Date() }}
          id="expiryDate"
          placeholder="Please select a date"
        />
      </RowWrappers>

      <RowWrappers md={6} xl={4}>
        <SelectOption
          name="coveredPackages"
          placeholder="Please select"
          label={"Covered Packages"}
          id="coveredPackages"
          options={packagesOption}
          isMulti
          isOutline
          onInputChange={onPackageInput}
          noFilter
          isLoading={getPackagesItems.isLoading}
          // wrapperClassName="mb-1"
        />
      </RowWrappers>

      <RowWrappers md={12} xl={8}>
        <InputText
          name={`description`}
          placeholder="Please enter ..."
          label="Description"
          id="description"
          wrapperClassName="mb-5"
          type="textarea"
        />
      </RowWrappers>
    </>
  );
};

export { AddDiscount };
