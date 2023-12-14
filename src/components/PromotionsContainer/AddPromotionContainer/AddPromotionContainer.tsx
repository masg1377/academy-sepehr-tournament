import React, { FC, useEffect, useRef, useState } from "react";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { FormWrapper as Wrapper } from "./FormWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import {
  useCreatePromotion,
  useEditPromotion,
} from "@src/core/services/api/promotion/promotion.api";
import {
  TCreatePromotion,
  TEditPromotion,
} from "@src/core/services/api/promotion/type";
import { addPromotionValidation } from "@src/core/validations/promotion.validation";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProps } from "formik";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import {
  durationDiscountData,
  durationNumDiscountData,
} from "@src/core/data/discount.data";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import { UuidField } from "@src/components/common/form/Fields/UuidField/UuidField";
// import { v4 as uuidv4 } from "uuid";

const AddPromotionContainer: FC = (): JSX.Element => {
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
  //group
  const [groupOption, setGroupOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [groupInput, setGroupInput] = useState("");
  const [filterListGroup, setFilterListGroup] = useState<TGetEntities>({
    entity: "groups",
    data: {
      select_fields: ["id", "name", "group_name_id"],
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
  //locations
  const [locationsOption, setlocationsOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [locationsInput, setlocationsInput] = useState("");

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
    discountCode: "",
    timesRedeemed: "",
    onTopOfOtherPromotions: false,
    isAuto: false,
    coveredLocations: null,
    coveredGroups: null,
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const getDetail = useGetListOfEntity();
  const getBTTItems = useGetListOfEntity();
  // const getLocationItems = useGetListOfEntity();
  const getPackagesItems = useGetListOfEntity();
  const getGroupsItems = useGetListOfEntity();
  const addPromotion = useCreatePromotion();
  const editPromotion = useEditPromotion();

  useEffect(() => {
    if (id) {
      getDetail.mutate(
        {
          entity: "promotions",
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
                  name: result.name,
                  maxRedemptions: result.max_redemptions,
                  percentOff: result.percent_off ? result.percent_off : "",
                  status: result.valid,
                  coveredPackages: result.covered_packages
                    ? result.covered_packages.map((o: any) => ({
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
                  coveredGroups: result.covered_groups
                    ? result.covered_groups.map((o: any) => ({
                        value: o.id,
                        label: o.name,
                      }))
                    : null,
                  isAuto: result.is_auto,
                  onTopOfOtherPromotions: result.on_top_of_other_promotions,
                  timesRedeemed: result.times_redeemed,
                  discountCode: result.code,
                  coveredLocations: result.covered_location
                    ? result.covered_location.map((o: any) => ({
                        value: o.location_id,
                        label: o.name,
                        promotionLocationId: o.promotion_on_location_id,
                      }))
                    : null,
                });
            }
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    getBTTItems.mutate(filterListBTT);
    getPackagesItems.mutate(filterListPackages);
    // getLocationItems.mutate(filterListLocations);
    getGroupsItems.mutate(filterListGroup);
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
    if (getGroupsItems.isSuccess) {
      let result = getGroupsItems.data.data.result;
      // console.log(result);
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setGroupOption(
          result.map((i: any) => ({
            value: i.id,
            label: i.name ? i.name : i.group_name_id ? i.group_name_id : i.id,
          }))
        );
    }
  }, [getGroupsItems.isSuccess]);

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

  const groupRef = useRef<any>();

  const onGroupInput = (val: string) => {
    clearTimeout(groupRef.current);
    setGroupInput(val);
    if (groupInput !== val) {
      const timeOut = setTimeout(() => {
        const obj: TGetEntities = { ...filterListGroup };
        // @ts-ignore
        obj.data.list_filter["filters"] = [
          { field: "name", operator: "like", value: val },
        ];
        setFilterListGroup(obj);
        getGroupsItems.mutate(obj);
      }, 500);
      groupRef.current = timeOut;
    }
  };

  const onSubmit = (values: any) => {
    if (id) {
      const oldPackages = initialValues.coveredPackages
        ? initialValues.coveredPackages
        : [];
      const oldBTTs = initialValues.covered_BTT_Items
        ? initialValues.covered_BTT_Items
        : [];
      const oldLocations = initialValues.coveredLocations
        ? initialValues.coveredLocations
        : [];
      const oldGroups = initialValues.coveredGroups
        ? initialValues.coveredGroups
        : [];

      const newPackages = values.coveredPackages ? values.coveredPackages : [];
      const newBTT = values.covered_BTT_Items ? values.covered_BTT_Items : [];
      const newLocation = values.coveredLocations
        ? values.coveredLocations
        : [];
      const newGroup = values.coveredGroups ? values.coveredGroups : [];

      const removePackages = oldPackages.filter(
        (o: any) => !newPackages.some((i: any) => i.value === o.value)
      );
      const removeBTT = oldBTTs.filter(
        (o: any) => !newBTT.some((i: any) => i.value === o.value)
      );
      const removeLocation = oldLocations.filter(
        (o: any) => !newLocation.some((i: any) => i.value === o.value)
      );
      const removeGroup = oldGroups.filter(
        (o: any) => !newGroup.some((i: any) => i.value === o.value)
      );

      const addPackages = newPackages.filter(
        (o: any) => !oldPackages.some((i: any) => i.value === o.value)
      );
      const addBTT = newBTT.filter(
        (o: any) => !oldBTTs.some((i: any) => i.value === o.value)
      );
      const addLocation = newLocation.filter(
        (o: any) => !oldLocations.some((i: any) => i.value === o.value)
      );
      const addGroup = newGroup.filter(
        (o: any) => !oldGroups.some((i: any) => i.value === o.value)
      );

      const obj: TEditPromotion = {
        // currency: values.currency && values.currency.value,
        description: values.description ? values.description : null,
        percent_off: +values.percentOff,
        // duration: values.duration && values.duration.value,
        expiry_date: values.expiryDate
          ? getCustomDate(values.expiryDate)
          : null,
        max_redemptions: values.maxRedemptions ? values.maxRedemptions : null,
        name: values.name,
        valid: values.status,
        is_auto: values.isAuto,
        on_top_of_other_promotions: values.onTopOfOtherPromotions,
        code: values.discountCode ? values.discountCode : null,
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
            addLocation && addLocation.length > 0
              ? { object_type: "location", location_data: addLocation }
              : { object_type: "location", location_data: [] },
            // ...addLocation.map((p: any) => ({
            //   object_type: "location",
            //   object_id: p,
            // })),
            ...addGroup.map((p: any) => ({
              object_type: "group",
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
            ...removeLocation.map((p: any) => ({
              object_type: "location",
              object_id: p.value,
            })),
            ...removeGroup.map((p: any) => ({
              object_type: "group",
              object_id: p.value,
            })),
          ],
        },
      };
      editPromotion.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setTimeout(() => {
              navigate("/promotion-list/detail/" + id);
            }, 600);
          }
        },
      });
    } else {
      const percent: any = +values.percentOff;

      const obj: TCreatePromotion = {
        // currency: values.currency && values.currency.value,
        description: values.description ? values.description : null,
        // duration: values.duration && values.duration.value,
        expiry_date: values.expiryDate
          ? getCustomDate(values.expiryDate)
          : null,
        // amount_off: percent ? 0 : +amount,
        max_redemptions: values.maxRedemptions ? values.maxRedemptions : null,
        name: values.name,
        percent_off: +percent,
        valid: values.status,
        is_auto: values.isAuto,
        on_top_of_other_promotions: values.onTopOfOtherPromotions,
        // times_redeemed: values.timesRedeemed ? +values.timesRedeemed : 0,
        code: values.discountCode ? values.discountCode : null,
        covering_btt_type_item_id_list: values.covered_BTT_Items
          ? values.covered_BTT_Items.map((o: any) => o.value)
          : [],
        covering_group_id_list: values.coveredGroups
          ? values.coveredGroups.map((o: any) => o.value)
          : [],
        covering_package_id_list: values.coveredPackages
          ? values.coveredPackages.map((o: any) => o.value)
          : [],
        covering_location_object: values.coveredLocations
          ? values.coveredLocations
          : [],
      };

      addPromotion.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setTimeout(() => {
              navigate(
                "/promotion-list/detail/" + res.data.result.promotion_id
              );
            }, 600);
          }
        },
      });
    }
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      validationSchema={addPromotionValidation}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values }: FormikProps<any>) => (
        <Wrapper
          title={id ? "Edit Promotion" : "Add Promotion"}
          isLoading={
            addPromotion.isLoading ||
            getDetail.isLoading ||
            editPromotion.isLoading
          }
        >
          {getDetail.isLoading ? (
            <LoadingData wrapperStyle="my-5" />
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
                  options={[{ value: "usd", label: "usd" }]}
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
                  placeholder="Please write the amount off"
                  label={"Amount off"}
                  id="amount_off"
                  disabled={values["percentOff"]}
                  // wrapperClassName="mb-1"
                /> */}
              </RowWrappers>

              <RowWrappers sm={6} md={4}>
                {/* <SelectOption
                  name="duration"
                  placeholder="Please select"
                  label={"Duration"}
                  id="duration"
                  options={[
                    { value: 1, label: "forever" },
                    { value: 2, label: "once" },
                    { value: 3, label: "repeating" },
                  ]}
                  // wrapperClassName="mb-1"
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

              <RowWrappers sm={6} md={4}>
                <DatePicker
                  name="expiryDate"
                  label="Expiry  date"
                  id="expiryDate"
                  options={{ minDate: new Date() }}
                  placeholder="Please select a date"
                />
                {/* <InputText
                  name="discountCode"
                  placeholder="Please enter code"
                  label={"Discount code"}
                  id="discountCode"
                  // wrapperClassName="mb-1"
                /> */}
                <UuidField
                  name="discountCode"
                  label="Discount code"
                  placeholder="Please generate code"
                />
              </RowWrappers>

              {/* <RowWrappers sm={6} md={4}>
                <InputText
                  type="number"
                  name="timesRedeemed"
                  placeholder="Please enter Name"
                  label={"Times redeemed"}
                  id="timesRedeemed"
                  // wrapperClassName="mb-1"
                />
              </RowWrappers> */}

              <RowWrappers sm={6} md={4}>
                <div>
                  <SwitchBox
                    name="isAuto"
                    color="success"
                    defaultChecked={false}
                    wrapperClassName="mt-1"
                    labelClassName="text-black"
                  >
                    Is auto
                  </SwitchBox>
                  <SwitchBox
                    name="onTopOfOtherPromotions"
                    color="success"
                    defaultChecked={false}
                    wrapperClassName="mt-1"
                    labelClassName="text-black"
                  >
                    On Top of Other Promotions
                  </SwitchBox>
                </div>
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
                <SelectOption
                  name="covered_BTT_Items"
                  placeholder="Please select"
                  label={"Covered BTT Items"}
                  id="covered_BTT_Items"
                  options={bttOption}
                  isMulti
                  noFilter
                  isOutline
                  onInputChange={onBttInput}
                  isLoading={getBTTItems.isLoading}
                  // wrapperClassName="mb-1"
                />
              </RowWrappers>

              <RowWrappers sm={6} md={4}>
                <LocationField
                  name="coveredLocations"
                  placeholder="Please select"
                  label="Covered Locations"
                  isMulti
                  isOutline
                />
                {/* <SelectOption
                  name="coveredLocations"
                  placeholder="Please select"
                  label={"Covered Locations"}
                  id="coveredLocations"
                  options={locationsOption}
                  onInputChange={onLocationInput}
                  isMulti
                  noFilter
                  isLoading={getLocationItems.isLoading}
                  // wrapperClassName="mb-1"
                /> */}
                <SelectOption
                  name="coveredGroups"
                  placeholder="Please select"
                  label={"Covered Groups"}
                  id="coveredGroups"
                  isMulti
                  options={groupOption}
                  isLoading={getGroupsItems.isLoading}
                  onInputChange={onGroupInput}
                  isOutline
                  noFilter
                  // wrapperClassName="mb-1"
                />
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
      )}
    </FormWrapper>
  );
};

export { AddPromotionContainer };
