// ** React Imports
import React, { FC, useState, useEffect } from "react";

// ** Import from Formik
import { FormikProps, useFormikContext } from "formik";

// ** Generalcomponents
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { RippleButton } from "@src/components/common/ripple-button/index";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { AddFilterModal } from "@src/components/common/FilterModal/AddFilterModal";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import classNames from "classnames";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import { useSuggestionHashtag } from "@src/core/services/api/suggestion/suggestion.api";

import {
  TBttTypesNumber,
  TBttTypes,
  TBttBoostTypes,
} from "@src/core/data/btt.data";

// ** ReactStrap Imports
import { Col, Row } from "reactstrap";

interface IFullSearchComponentProp {
  setSearchItemCounter: (val: any) => void;
  handleModalShow: boolean;
  setModalToggle: () => void;
  handleFullFilter: (val: any) => void;
  setFilterIconFlag: (val: boolean) => void;
  setFilterShowFlag: (val: boolean) => void;
  filterShowFlag?: boolean;
}

const FullSearchComponent: FC<IFullSearchComponentProp> = ({
  setSearchItemCounter,
  handleModalShow,
  setModalToggle,
  handleFullFilter,
  setFilterIconFlag,
  setFilterShowFlag,
  filterShowFlag,
}): JSX.Element => {
  const [permanentCheck, setPermanentCheck] = useState<boolean>(false);
  const [packagesOption, setPackagesOption] = useState<
    { value: number; label: string }[]
  >([]);

  const [hashtagoptions, setHashtagOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [discountOption, setDiscountOption] = useState<
    { value: number; label: string }[]
  >([]);

  const [allCreators, setAllCreators] = useState<
    { value: number; label: string }[]
  >([]);

  const [permissions, setPermissions] = useState<
    { value: number; label: string; id: number }[]
  >([]);

  const [loadFlag, setLoadFlag] = useState<any>({
    discount: false,
    user: false,
    package: false,
    permission: false,
    hashtag: false,
  });

  const hashtags = useSuggestionHashtag();
  const getPackage = useGetListOfEntity();
  const getDiscount = useGetListOfEntity();
  const getUser = useGetListOfEntity();
  const getPermissions = useGetListOfEntity();

  const getPermission = () => {
    getPermissions.mutate(
      {
        entity: "btt_permission_advantages",
        data: {
          list_filter: {
            limit: 100000,
            offset: 0,
            //filters: [{ field: "target_type", operator: "=", value: 3 }],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            if (result)
              setPermissions(
                result.map((i: any) => ({
                  id: i.id,
                  value: i.id,
                  label: i.key,
                }))
              );
          }
        },
      }
    );
  };

  const getUsers = () => {
    getUser.mutate(
      {
        entity: "users",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setAllCreators(
              result.map((i: any) => ({
                value: i.id,
                label:
                  i.first_name || i.last_name
                    ? `${i.first_name} ${i.last_name}`
                    : i.id,
              }))
            );
          }
        },
        onError: () => {
          setAllCreators([]);
        },
      }
    );
  };

  const getHashtag = () => {
    hashtags.mutate(
      { hashtag_name: "" },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setHashtagOptions(
              result.map((i: any) => ({ value: i.id, label: i.name }))
            );
          }
        },
        onError: (err) => {
          setHashtagOptions([]);
        },
      }
    );
  };
  const getPackages = () => {
    getPackage.mutate(
      {
        entity: "packages",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setPackagesOption(
              result.map((i: any) => ({ value: i.name, label: i.name }))
            );
          }
        },
        onError: () => {
          setPackagesOption([]);
        },
      }
    );
  };
  const getDiscounts = () => {
    getDiscount.mutate(
      {
        entity: "discounts",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setDiscountOption(
              result.map((i: any) => ({ value: i.name, label: i.name }))
            );
          }
        },
        onError: () => {
          setDiscountOption([]);
        },
      }
    );
  };

  const handleDataFilterLoad = (key: string, flag: boolean) => {
    if (key === "discount" && flag === false) {
      getDiscounts();
      if (discountOption) {
        setLoadFlag({ ...loadFlag, discount: true });
      }
    } else if (key === "hashtag" && flag === false) {
      getHashtag();
      if (hashtagoptions) {
        setLoadFlag({ ...loadFlag, hashtag: true });
      }
    } else if (key === "user" && flag === false) {
      getUsers();
      if (allCreators) {
        setLoadFlag({ ...loadFlag, user: true });
      }
    } else if (key === "package" && flag === false) {
      getPackages();
      if (packagesOption) {
        setLoadFlag({ ...loadFlag, package: true });
      }
    } else if (key === "permission" && flag === false) {
      getPermission();
      if (permissions) {
        setLoadFlag({ ...loadFlag, permission: true });
      }
    }
  };

  // *** Initial values for search filter ***
  const [initialValues, setInitialValues] = useState<any>({
    // all: false,
    // active: false,
    // inactive: false,
    hashtag_name: "",
    name: "",
    type: "",
    is_hidden: "",
    boost_type: "",
    btt_permissions: "",
    location_name: "",
    coverage_package_name: "",
    discount_name: "",
    discount_percent_off: "",
    expiry_date: "",
    creation_date: "",
    creationEndDate: "",
    creator_id: "",
  });

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    // status: false,
    hashtag_name: true,
    name: true,
    type: true,
    location_name: true,
    is_hidden: true,
    boost_type: true,
    expiry_date: true,
    creation_date: true,
    creator_id: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    // { value: 1, label: "Status", name: "status" },
    { value: 6, label: "Hashtag", name: "hashtag_name" },
    { value: 2, label: "Name", name: "name" },
    { value: 3, label: "Location", name: "location_name" },
    { value: 4, label: "Type", name: "type" },
    { value: 9, label: "Is Hidden", name: "is_hidden" },
    { value: 10, label: "Boost Type", name: "boost_type" },
    { value: 7, label: "ExpiryDate", name: "expiry_date" },
    { value: 8, label: "Creationdate", name: "creation_date" },
    { value: 9, label: "Creator", name: "creator_id" },
  ]);

  // *** Filters for operator ***
  const filterOperators: any = {
    // all: "like",
    // active: "like",
    // inactive: "like",
    hashtag_name: "in",
    name: "like",
    is_hidden: "in",
    boost_type: "=",
    type: "=",
    btt_permissions: "in",
    location_name: "like",
    coverage_package_name: "in",
    discount_name: "like",
    discount_percent_off: "=",
    expiry_date: "=",
    creation_date: ">",
    creationEndDate: "<",
    creator_id: "=",
  };

  const handleSetShowitem = (data: any) => {
    setInitialValuesShow(data);
  };

  const onSubmit = (values: any) => {
    setSearchItemCounter(0);
    const mydata = Object.entries(values);
    mydata.forEach((item, index) => {
      if (!item[1]) {
      } else {
        setSearchItemCounter((old: number) => old + 1);
      }
    });
    //console.log(values);
    let dataFilter: any = [];
    Object.keys(values).forEach((key: string) => {
      const val = values[key];
      if (val && key === "creationEndDate") {
        if (dataFilter.length > 0) dataFilter.push("and");
        const current = new Date(val);
        const nextDate = new Date(
          current.getTime() + 24 * 60 * 60 * 1000
        ).toString();
        const isoNextDate = getCustomDate(nextDate);
        dataFilter.push({
          field: "creation_date",
          operator: filterOperators[key],
          value: isoNextDate,
        });
      } else if (val && key === "location_name") {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: "location_name",
          operator: filterOperators[key],
          value: val.Country,
        });
      } else if (val && key === "expiry_date") {
        const today = new Date(val);
        const nextDate = new Date(
          today.getTime() + 24 * 60 * 60 * 1000
        ).toString();
        const isoNextDate = getCustomDate(nextDate);
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: key,
          operator: ">=",
          value: val,
        });
        dataFilter.push("and");
        dataFilter.push({
          field: key,
          operator: "<",
          value: isoNextDate,
        });
      } else if (val) {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: key,
          operator: filterOperators[key],
          value:
            typeof val === "object"
              ? Array.isArray(val)
                ? val.map((o) => o.label)
                : val.value
              : val,
        });
      }
    });
    setTimeout(() => {
      setFilterShowFlag(false);
      handleFullFilter(dataFilter);
      setFilterIconFlag(false);
      //console.log(dataFilter);
    }, 500);
  };

  return (
    <React.Fragment>
      <FormWrapper
        initialValues={initialValues}
        //validationSchema={}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }: FormikProps<any>) => (
          <Row className="mb-2 mx-0 w-100">
            {/* {initialValuesShow?.status && (
              <Col xs={12} className="w-100 mt-1 mb-1">
                <h6
                  style={{ width: "200px" }}
                  className="searchFilterLabelGeneral d-inline ps-0 ms-0"
                >
                  Status
                </h6>
                <CheckBox
                  wrapperClass="d-inline-block ms-5"
                  name="all"
                  label="All"
                  id="all"
                />
                <CheckBox
                  wrapperClass="d-inline-block ms-5"
                  name="active"
                  label="Active"
                />
                <CheckBox
                  wrapperClass="d-inline-block ms-5"
                  name="inactive"
                  label="Inactive"
                />
              </Col>
            )} */}
            {initialValuesShow?.name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="name"
                  placeholder="Enter name"
                  label={"Name"}
                  id="name"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.location_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <LocationField
                  name="location_name"
                  placeholder="Choose location"
                  label={"Location"}
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  isClearable
                  defaultMargin
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.type && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="type"
                  placeholder="Choose type"
                  label={"Type"}
                  id="type"
                  options={TBttTypesNumber}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {values["type"] &&
              values["type"].value === 2 &&
              initialValuesShow?.type && (
                <React.Fragment>
                  <Col xs={21} md={6} lg={4} className="mt-1">
                    <SelectOption
                      name="discount_name"
                      placeholder="Choose discountName"
                      label={"Discount Name"}
                      id="discount_name"
                      options={discountOption}
                      isClearable
                      customeLabelClass="searchFilterLabelGeneral"
                      noColor
                      isLoading={getDiscount.isLoading}
                      onFocus={() =>
                        handleDataFilterLoad("discount", loadFlag.discount)
                      }
                      //wrapperClassName="mt-1 mb-0"
                    />
                  </Col>
                  <Col xs={12} md={6} lg={4} className="mt-1">
                    <InputText
                      type="number"
                      name="discount_percent_off"
                      placeholder="Enter percent"
                      label={"Percent Off"}
                      id="discount_percent_off"
                      customeLabelClass="searchFilterLabelGeneral"
                      noColor
                      //min={"0"}
                      //max={"100"}
                      //wrapperClassName="ps-0 ms-0"
                    />
                  </Col>
                  <Col xs={12} md={6} lg={4} className="mt-1">
                    <SelectOption
                      name="coverage_package_name"
                      placeholder="Choose coveredPackages"
                      label={"Covered Packages"}
                      id="coverage_package_name"
                      options={packagesOption}
                      isMulti
                      isClearable
                      mergeStyle
                      customeLabelClass="searchFilterLabelGeneral"
                      noColor
                      isLoading={getPackage.isLoading}
                      customStyle={{
                        multiValueLabel: (base) => ({
                          ...base,
                          color: "#2e2e33 !important",
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: "#e6e5ea",
                          color: "#2e2e33 !important",
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          color: "#2e2e33 !important",
                        }),
                      }}
                      onFocus={() =>
                        handleDataFilterLoad("package", loadFlag.package)
                      }
                      //wrapperClassName="mt-1 mb-0"
                    />
                  </Col>
                </React.Fragment>
              )}
            {initialValuesShow?.boost_type && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="boost_type"
                  placeholder="Choose boostType"
                  label={"Boost Type"}
                  id="boost_type"
                  options={TBttBoostTypes}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {values["type"] &&
              values["type"].value !== 2 &&
              initialValuesShow?.type && (
                <Col xs={12} md={6} lg={4} className="mt-1">
                  <SelectOption
                    name="btt_permissions"
                    placeholder="Choose permissions"
                    label={"Permissions"}
                    id="btt_permissions"
                    options={permissions}
                    isMulti
                    isClearable
                    mergeStyle
                    customeLabelClass="searchFilterLabelGeneral"
                    noColor
                    isLoading={getPermissions.isLoading}
                    customStyle={{
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#2e2e33 !important",
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#e6e5ea",
                        color: "#2e2e33 !important",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: "#2e2e33 !important",
                      }),
                    }}
                    onFocus={() =>
                      handleDataFilterLoad("permission", loadFlag.permission)
                    }
                    //wrapperClassName="mt-1 mb-0"
                  />
                </Col>
              )}
            {initialValuesShow?.hashtag_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="hashtag_name"
                  placeholder="Choose hashtags"
                  label={"Hashtag"}
                  id="hashtag_name"
                  options={hashtagoptions}
                  isMulti
                  isClearable
                  mergeStyle
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  isLoading={hashtags.isLoading}
                  customStyle={{
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "#2e2e33 !important",
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#e6e5ea",
                      color: "#2e2e33 !important",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#2e2e33 !important",
                    }),
                  }}
                  onFocus={() =>
                    handleDataFilterLoad("hashtag", loadFlag.hashtag)
                  }
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.is_hidden && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="is_hidden"
                  placeholder="Choose status"
                  label={"Is Hidden"}
                  id="is_hidden"
                  options={[
                    { value: true, label: "Yes" },
                    { value: false, label: "No" },
                  ]}
                  isMulti
                  isClearable
                  mergeStyle
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  customStyle={{
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "#2e2e33 !important",
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#e6e5ea",
                      color: "#2e2e33 !important",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#2e2e33 !important",
                    }),
                  }}
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.creator_id && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="creator_id"
                  placeholder="Choose creator"
                  label={"Created By"}
                  id="creator_id"
                  options={allCreators}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  isLoading={getUser.isLoading}
                  onFocus={() => handleDataFilterLoad("user", loadFlag.user)}
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.expiry_date && (
              <Col xs={12} md={6} lg={4} className="mt-1 mb-2 mb-md-0">
                <div
                  className={classNames(
                    "p-0",
                    "m-0",
                    permanentCheck ? "disbaled-content" : ""
                  )}
                >
                  <DatePicker
                    name="expiry_date"
                    label="Expiry Date"
                    customeLabelClass="searchFilterLabelGeneral"
                    placeholder="Select date"
                    noColor
                    //customeLabelClass="customeDateColor"
                  />
                </div>
                <CheckBox
                  wrapperClass="position-absolute mt-1-1 ms-1-1"
                  name="expiryPermanent"
                  label="Permanent"
                  onChange={() => {
                    setPermanentCheck(!permanentCheck);
                    setFieldValue("expiry_date", "");
                  }}
                />
              </Col>
            )}
            {initialValuesShow?.creation_date && (
              <Col
                xs={12}
                md={6}
                lg={4}
                //className="ms-0 ps-0 mt-1 mt-lg-0"
                className="mt-1"
              >
                <Row>
                  <Col xs={12} md={6} lg={6}>
                    <DatePicker
                      name="creation_date"
                      label="Creation Date"
                      customeLabelClass="searchFilterLabelGeneral"
                      placeholder="Start date"
                      noColor
                      options={{
                        maxDate: new Date().toISOString(),
                      }}
                    />
                  </Col>

                  <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className="ms-0 ms-md- ps-md-0 mt-1 mt-md-0"
                  >
                    <DatePicker
                      name="creationEndDate"
                      label="To"
                      customeLabelClass="searchFilterLabelGeneral"
                      placeholder="End date"
                      options={{
                        minDate: values["creation_date"],
                        maxDate: new Date().toISOString(),
                      }}
                      noColor
                      //customeLabelClass="customeDateColor"
                    />
                  </Col>
                </Row>
              </Col>
            )}
            {/* {initialValuesShow?.is_asset && (
              <Col
                xs={12}
                md={6}
                lg={4}
                className="d-flex justify-content-start justify-content-md-center align-items-end mt-3 mt-md-4"
              >
                <SwitchBox
                  name="is_asset"
                  wrapperClassName="position-relative"
                  wrapperStyle={{ bottom: "4px" }}
                  color="success"
                  // defaultChecked={hasMLS}
                  labelClassName="text-black"
                  // onChange={(val) => sethasMLS(val)}
                >
                  Is Asset
                </SwitchBox>
              </Col>
            )} */}
            <Col xs={12} className="w-100 mt-2 text-center text-sm-end">
              <Row className="p-0 m-0 w-100">
                <Col xs={12} className="text-center text-md-end">
                  <RippleButton
                    color="white"
                    className="general-size-ripple-button text-primary"
                    onClick={() => {
                      setSearchItemCounter(0);
                    }}
                    type="reset"
                  >
                    Reset
                  </RippleButton>
                  <RippleButton
                    type="submit"
                    color="primary"
                    className="general-size-ripple-button"
                  >
                    Apply
                  </RippleButton>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </FormWrapper>
      <AddFilterModal
        isOpen={handleModalShow}
        onToggle={() => setModalToggle()}
        setItemShow={handleSetShowitem}
        initialValuesShow={initialValuesShow}
        fieldData={fieldData}
      />
    </React.Fragment>
  );
};

export { FullSearchComponent };
