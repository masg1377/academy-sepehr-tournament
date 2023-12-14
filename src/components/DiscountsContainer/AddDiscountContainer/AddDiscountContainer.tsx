import React, { useEffect, useRef, useState } from "react";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { FormWrapper as Wrapper } from "./FormWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import {
  useCreateDiscount,
  useEditDiscount,
} from "@src/core/services/api/discount/discount.api";
import {
  TCreateDiscount,
  TEditDiscount,
} from "@src/core/services/api/discount/type";
import { addDiscountValidation } from "@src/core/validations/discount.validation";
import { FormikProps } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import {
  currencyData,
  durationDiscountData,
  durationNumDiscountData,
} from "@src/core/data/discount.data";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
const AddDiscountContainer = () => {
  //btt
  const [bttOption, setBttOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [bttInput, setBttInput] = useState("");
  const [filterListBTT, setFilterListBTT] = useState<TGetEntities>({
    entity: "btt_type_items",
    data: {
      select_fields: ["id", "name"],
      list_filter: {
        limit: 20,
        offset: 0,
        filters: [],
      },
    },
  });
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
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    status: true,
    currency: null,
    percentOff: "",
    duration: null,
    maxRedemptions: "",
    expiryDate: "",
    coveredPackages: null,
    covered_BTT_Items: null,
    description: "",
    amount_off: "",
    isGlobal: false,
    permanent: false,
    location: null,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const getDetail = useGetListOfEntity();
  const getBTTItems = useGetListOfEntity();
  const getPackagesItems = useGetListOfEntity();

  useEffect(() => {
    getBTTItems.mutate(filterListBTT);
    getPackagesItems.mutate(filterListPackages);
  }, []);

  useEffect(() => {
    if (getBTTItems.isSuccess) {
      let result = getBTTItems.data.data.result;
      // console.log(result);
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setBttOption(result.map((i: any) => ({ value: i.id, label: i.name })));
    }
  }, [getBTTItems.isSuccess]);

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

  useEffect(() => {
    if (id) {
      getDetail.mutate(
        {
          entity: "discounts",
          data: { id: id ? +id : 0 },
        },
        {
          onSuccess: (res) => {
            console.log(res.data);
            if (res.data.is_success) {
              const result = res.data.result;
              result &&
                setInitialValues({
                  amount_off: result.amount_off ? result.amount_off : "",
                  currency: result.currency && {
                    value: result.currency,
                    label: result.currency,
                  },
                  description: result.description,
                  duration: result.duration
                    ? durationNumDiscountData.find(
                        (o) => o.value === result.duration
                      )
                    : null,
                  expiryDate: result.expiry_date,
                  permanent: result.expiry_date ? false : true,
                  isGlobal: true, // should change later
                  name: result.name,
                  maxRedemptions: result.max_redemptions,
                  percentOff: result.percent_off ? result.percent_off : "",
                  status: result.valid,
                  coveredPackages: result.coverage_packages
                    ? result.coverage_packages.map((o: any) => ({
                        value: o.id,
                        label: o.name,
                      }))
                    : null,
                  covered_BTT_Items: result.coverage_btts
                    ? result.coverage_btts.map((o: any) => ({
                        value: o.id,
                        label: o.name,
                      }))
                    : null,
                });
            }
          },
        }
      );
    }
  }, []);

  const bttRef = useRef<any>();

  const onBttInput = (val: string) => {
    clearTimeout(bttRef.current);
    setBttInput(val);
    if (bttInput !== val) {
      const timeOut = setTimeout(() => {
        const obj: TGetEntities = { ...filterListBTT };
        // @ts-ignore
        obj.data.list_filter["filters"] = [
          { field: "name", operator: "like", value: val },
        ];
        setFilterListBTT(obj);
        getBTTItems.mutate(obj);
      }, 500);
      bttRef.current = timeOut;
    }
  };

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

  const addDiscount = useCreateDiscount();
  const editDiscount = useEditDiscount();

  const onSubmit = (values: any) => {
    // console.log(values);

    if (id) {
      const oldPackages = initialValues.coveredPackages
        ? initialValues.coveredPackages
        : [];
      const oldBTTs = initialValues.covered_BTT_Items
        ? initialValues.covered_BTT_Items
        : [];
      const newPackages = values.coveredPackages ? values.coveredPackages : [];
      const newBTT = values.covered_BTT_Items ? values.covered_BTT_Items : [];

      const removePackages = oldPackages.filter(
        (o: any) => !newPackages.some((i: any) => i.value === o.value)
      );
      const removeBTT = oldBTTs.filter(
        (o: any) => !newBTT.some((i: any) => i.value === o.value)
      );

      const addPackages = newPackages.filter(
        (o: any) => !oldPackages.some((i: any) => i.value === o.value)
      );
      const addBTT = newBTT.filter(
        (o: any) => !oldBTTs.some((i: any) => i.value === o.value)
      );

      const obj: TEditDiscount = {
        // currency: values.currency && values.currency.value,
        description: values.description ? values.description : undefined,
        percent_off: values.percentOff ? +values.percentOff : undefined,
        // duration: values.duration && values.duration.label,
        // expiry_date: values.expiryDate
        //   ? getCustomDate(values.expiryDate)
        //   : undefined,
        max_redemptions: values.maxRedemptions
          ? values.maxRedemptions
          : undefined,
        name: values.name,
        valid: values.status,
        id: id ? +id : 0,
        relations: {
          add: [
            ...addPackages.map((p: any) => ({
              object_type: "package",
              object_id: p.value,
            })),
            ...addBTT.map((p: any) => ({
              object_type: "btt_item",
              object_id: p.value,
            })),
          ],
          remove: [
            ...removePackages.map((p: any) => ({
              object_type: "package",
              object_id: p.value,
            })),
            ...removeBTT.map((p: any) => ({
              object_type: "btt_item",
              object_id: p.value,
            })),
          ],
        },
        // is_global: values.isGlobal,
      };

      if (!values.permanent && values.expiryDate)
        obj["expiry_date"] = getCustomDate(values.expiryDate);

      // if (!values.isGlobal && values.location?.length > 0)
      //   obj["locations"] = values.location;

      editDiscount.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) navigate("/discounts-list/detail/" + id);
        },
      });
    } else {
      const percent: any = +values.percentOff;
      // const amount: any = +values.amount_off;
      let obj: TCreateDiscount = {
        // currency: values.currency && values.currency.value,
        description: values.description ? values.description : undefined,
        // duration: values.duration && values.duration.value,
        // expiry_date: values.expiryDate
        //   ? getCustomDate(values.expiryDate)
        //   : undefined,
        // amount_off: percent ? 0 : amount.toFixed(2),
        max_redemptions: values.maxRedemptions
          ? values.maxRedemptions
          : undefined,
        name: values.name,
        percent_off: +percent,
        valid: values.status,
        is_global: values.isGlobal,
      };

      const newPackages = values.coveredPackages ? values.coveredPackages : [];

      if (newPackages && newPackages.length > 0)
        obj["covered_packages_id"] = newPackages.map((i: any) => i.value);

      // if (!values.isGlobal && values.location?.length > 0)
      //   obj["locations"] = values.location;
      if (!values.permanent && values.expiryDate)
        obj["expiry_date"] = getCustomDate(values.expiryDate);

      addDiscount.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success)
            navigate("/discounts-list/detail/" + res.data.result.discount_id);
        },
      });
    }
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      validationSchema={addDiscountValidation}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values }: FormikProps<any>) => (
        <>
          <Wrapper
            title={id ? "Edit Discount" : "Add Discount"}
            isLoading={
              addDiscount.isLoading ||
              editDiscount.isLoading ||
              getDetail.isLoading
            }
          >
            {getDetail.isLoading ? (
              <LoadingData wrapperStyle="my-1 py-5" />
            ) : (
              <>
                <span className="fs-6 fw-bolder text-primary mt-1 d-block">
                  Request Info
                </span>

                <RowWrappers sm={6} md={4}>
                  <InputText
                    name="name"
                    placeholder="Please enter ..."
                    label={"Name"}
                    id="name"
                    // wrapperClassName="mb-1"
                  />
                  <SwitchBox
                    name="status"
                    wrapperClassName="mt-2"
                    color="success"
                    // defaultChecked={hasMLS}
                    labelClassName="text-black"
                    // onChange={(val) => sethasMLS(val)}
                  >
                    Valid
                  </SwitchBox>
                </RowWrappers>

                {/* <RowWrappers sm={6} md={4}>
                  <SelectOption
                    name="currency"
                    placeholder="Please select"
                    label={"Currency"}
                    id="currency"
                    options={currencyData}
                    // wrapperClassName="mb-1"
                  />
                </RowWrappers> */}

                <RowWrappers sm={6} md={4}>
                  <InputText
                    name="percentOff"
                    placeholder="Please write the discount percentage"
                    label={"Percent off"}
                    id="percentOff"
                    disabled={values["amount_off"]}
                    // wrapperClassName="mb-1"
                  />
                  {/* <InputText
                    name="amount_off"
                    placeholder="Please enter"
                    label={"Amount off"}
                    id="amount_off"
                    disabled={values["percentOff"]}
                    // wrapperClassName="
                    mb-1"
                  /> */}
                  <InputText
                    type="number"
                    name="maxRedemptions"
                    placeholder="Please enter Name"
                    label={"Max Redemptions"}
                    id="maxRedemptions"
                    // wrapperClassName="mb-1"
                  />
                </RowWrappers>

                {/* <RowWrappers sm={6} md={4}>
                  <SelectOption
                    name="duration"
                    placeholder="Please select"
                    label={"Duration"}
                    id="duration"
                    options={[
                      { value: "forever", label: "forever" },
                      { value: "once", label: "once" },
                      { value: "repeating", label: "repeating" },
                    ]}
                    // wrapperClassName="mb-1"
                  />
                 
                </RowWrappers> */}

                <RowWrappers sm={6} md={4}>
                  {/* <DatePicker
                    name="expiryDate"
                    label="Expiry  date"
                    options={{ minDate: new Date() }}
                    id="expiryDate"
                    placeholder="Please select a date"
                  /> */}
                </RowWrappers>

                <RowWrappers sm={6} md={4} rowClassName="">
                  <>
                    <SwitchBox
                      name="permanent"
                      color="success"
                      defaultChecked={false}
                      // wrapperClassName="mt-1"
                      labelClassName="text-black"
                    >
                      Permanent
                    </SwitchBox>
                    {!values["permanent"] && (
                      <DatePicker
                        name="expiryDate"
                        label="Expiry date"
                        id="expiryDate"
                        placeholder="Please select a date"
                        // disabled={values["permanent"]}
                        options={{ minDate: new Date() }}
                      />
                    )}
                  </>
                </RowWrappers>

                <RowWrappers sm={6} md={4} rowClassName="">
                  <>
                    <SwitchBox
                      name="isGlobal"
                      color="success"
                      defaultChecked={false}
                      // wrapperClassName="mt-1"
                      labelClassName="text-black"
                    >
                      Is Global
                    </SwitchBox>
                    {!values["isGlobal"] && (
                      <LocationField
                        name="location"
                        placeholder="Please select"
                        label={"Location"}
                        isMulti
                        wrapperClassName="mb-1"
                        isOutline
                        // disabled={values["isGlobal"]}
                      />
                    )}
                  </>
                </RowWrappers>

                <RowWrappers sm={6} md={4}>
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
                  {/* <SelectOption
                    name="covered_BTT_Items"
                    placeholder="Please select"
                    label={"Covered BTT Items"}
                    id="covered_BTT_Items"
                    options={bttOption}
                    isMulti
                    isOutline
                    noFilter
                    onInputChange={onBttInput}
                    isLoading={getBTTItems.isLoading}
                    // wrapperClassName="mb-1"
                  /> */}
                </RowWrappers>

                <RowWrappers sm={12} md={8}>
                  <InputText
                    name="description"
                    placeholder="Please enter Email"
                    label={"Description"}
                    id="description"
                    type="textarea"
                    wrapperClassName="mb-3"
                  />
                </RowWrappers>
              </>
            )}
          </Wrapper>
        </>
      )}
    </FormWrapper>
  );
};

export { AddDiscountContainer };
