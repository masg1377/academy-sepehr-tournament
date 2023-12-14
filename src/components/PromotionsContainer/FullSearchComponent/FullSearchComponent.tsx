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
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";

import classNames from "classnames";

// ** ReactStrap Imports
import { Col, Row } from "reactstrap";

interface IFullSearchComponentProp {
  setSearchItemCounter: (val: any) => void;
  handleModalShow: boolean;
  setModalToggle: () => void;
  handleFullFilter: (val: any) => void;
  setFilterIconFlag: (val: boolean) => void;
  setFilterShowFlag: (val: boolean) => void;
}

const FullSearchComponent: FC<IFullSearchComponentProp> = ({
  setSearchItemCounter,
  handleModalShow,
  setModalToggle,
  handleFullFilter,
  setFilterIconFlag,
  setFilterShowFlag,
}): JSX.Element => {
  const [permanentCheck, setPermanentCheck] = useState<boolean>(false);
  const [bttOption, setBttOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [groupOption, setGroupOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [packagesOption, setPackagesOption] = useState<
    { value: number; label: string }[]
  >([]);

  const [loadFlag, setLoadFlag] = useState<any>({
    package: false,
    bttItem: false,
    group: false,
  });

  const btt = useGetListOfEntity();
  const getGroupp = useGetListOfEntity();
  const getPackage = useGetListOfEntity();

  const getBtt = () => {
    btt.mutate(
      {
        entity: "btt_type_items",
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
            setBttOption(
              result.map((i: any) => ({ value: i.id, label: i.name }))
            );
          }
        },
        onError: () => {
          setBttOption([]);
        },
      }
    );
  };
  const getGroup = () => {
    getGroupp.mutate(
      {
        entity: "groups",
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
            setGroupOption(
              result.map((i: any) => ({ value: i.id, label: i.name }))
            );
          }
        },
        onError: () => {
          setGroupOption([]);
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
              result.map((i: any) => ({ value: i.id, label: i.name }))
            );
          }
        },
        onError: () => {
          setPackagesOption([]);
        },
      }
    );
  };

  const handleDataFilterLoad = (key: string, flag: boolean) => {
    if (key === "bttItem" && flag === false) {
      getBtt();
      if (bttOption) {
        setLoadFlag({ ...loadFlag, bttItem: true });
      }
    } else if (key === "package" && flag === false) {
      getPackages();
      if (packagesOption) {
        setLoadFlag({ ...loadFlag, package: true });
      }
    } else if (key === "group" && flag === false) {
      getGroup();
      if (groupOption) {
        setLoadFlag({ ...loadFlag, group: true });
      }
    }
  };

  // *** Initial values for search filter ***
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    //description: "",
    percent_off: "",
    valid: "",
    package_name: "",
    btt_type_item_name: "",
    expiry_date: "",
    expiryEndDate: "",
    code: "",
    group_name: "",
    location_name: "",
  });

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    name: true,
    //description: true,
    percent_off: true,
    valid: true,
    package_name: true,
    btt_type_item_name: true,
    expiry_date: true,
    expiryEndDate: true,
    code: true,
    group_name: true,
    location_name: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Name", name: "name" },
    //{ value: 2, label: "Description", name: "description" },
    { value: 3, label: "Percent Off", name: "percent_off" },
    { value: 4, label: "Valid", name: "valid" },
    { value: 7, label: "BTT Items", name: "btt_type_item_name" },
    { value: 8, label: "Expiry Date", name: "expiry_date" },
    { value: 12, label: "Discount Code", name: "code" },
    { value: 13, label: "Group", name: "group_name" },
    { value: 14, label: "Location", name: "location_name" },
    { value: 16, label: "Package", name: "package_name" },
  ]);

  // *** Filters for operator ***
  const filterOperators: any = {
    name: "like",
    //description: "like",
    percent_off: "=",
    valid: "in",
    package_name: "in",
    btt_type_item_name: "in",
    expiry_date: ">",
    expiryEndDate: "<",
    code: "=",
    group_name: "in",
    location_name: "in",
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
    console.log(values);
    let dataFilter: any = [];
    Object.keys(values).forEach((key: string) => {
      const val = values[key];
      if (val && key === "expiryEndDate") {
        if (dataFilter.length > 0) dataFilter.push("and");
        const current = new Date(val);
        const nextDate = new Date(
          current.getTime() + 24 * 60 * 60 * 1000
        ).toString();
        const isoNextDate = getCustomDate(nextDate);
        dataFilter.push({
          field: "expiry_date",
          operator: filterOperators[key],
          value: isoNextDate,
        });
      } else if (val && key === "location_name") {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: "location_name",
          operator: filterOperators[key],
          //value: val.Country,
          value:
            typeof val === "object"
              ? Array.isArray(val)
                ? val.map((o) => o.Country)
                : val.value
              : val,
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
    console.log(dataFilter);
    setTimeout(() => {
      setFilterShowFlag(false);
      handleFullFilter(dataFilter);
      setFilterIconFlag(false);
      console.log(dataFilter);
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
            {initialValuesShow?.percent_off && (
              <Col xs={21} md={6} lg={4} className="mt-1">
                <InputText
                  type="number"
                  name="percent_off"
                  placeholder="Enter percent"
                  label={"Percent Off"}
                  id="percent_off"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {/* {initialValuesShow?.amount_off && (
              <Col xs={21} md={6} lg={4} className="mt-1">
                <InputText
                  type="number"
                  name="amount_off"
                  placeholder="Enter amount"
                  label={"Amount Off"}
                  id="amount_off"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.duration && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="duration"
                  placeholder="Choose duration"
                  label={"Duration"}
                  id="duration"
                  options={[
                    { value: 1, label: "Forever" },
                    { value: 2, label: "Once" },
                    { value: 3, label: "Repeating" },
                  ]}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )} */}
            {/* {initialValuesShow?.valid && (
              <Col
                xs={12}
                md={6}
                lg={4}
                className="d-flex justify-content-start justify-content-md-center align-items-end mt-3 mt-lg-3"
              >
                <SwitchBox
                  name="valid"
                  wrapperClassName="position-relative"
                  wrapperStyle={{ bottom: "0px" }}
                  color="success"
                  // defaultChecked={hasMLS}
                  labelClassName="text-black"
                >
                  Status
                </SwitchBox>
              </Col>
            )} */}
            {initialValuesShow?.valid && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="valid"
                  placeholder="Choose status"
                  label={"Valid"}
                  id="valid"
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
            {initialValuesShow?.package_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="package_name"
                  placeholder="Choose Package"
                  label={"Covered Packages"}
                  id="package_name"
                  options={packagesOption}
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
                  isLoading={getPackage.isLoading}
                  onFocus={() =>
                    handleDataFilterLoad("package", loadFlag.package)
                  }
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.btt_type_item_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="btt_type_item_name"
                  placeholder="Choose BTT"
                  label={"Covered BTT Items"}
                  id="btt_type_item_name"
                  options={bttOption}
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
                  isLoading={btt.isLoading}
                  onFocus={() =>
                    handleDataFilterLoad("bttItem", loadFlag.bttItem)
                  }
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.group_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="group_name"
                  placeholder="Choose Group"
                  label={"Covered Groups"}
                  id="group_name"
                  options={groupOption}
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
                  isLoading={getGroupp.isLoading}
                  onFocus={() => handleDataFilterLoad("group", loadFlag.group)}
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.location_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                {/* <SelectOption
                  name="location_name"
                  placeholder="Choose Location"
                  label={"Covered Locations"}
                  id="location_name"
                  options={[
                    { value: "usa", label: "USA" },
                    { value: "can", label: "CAN" },
                    { value: "global", label: "Global" },
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
                /> */}
                <LocationField
                  name="location_name"
                  placeholder="Choose location"
                  label={"Covered Locations"}
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  isClearable
                  defaultMargin
                  isMulti
                  mergeStyle
                  customeStyleMultiActive
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.code && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                {/* <SelectOption
                  name="code"
                  placeholder="Choose code"
                  label={"Discount Code"}
                  id="code"
                  options={[]}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                /> */}
                <InputText
                  name="code"
                  placeholder="Enter code"
                  label={"Discount Code"}
                  id="code"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.expiry_date && (
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
                      name="expiry_date"
                      label="Expiry Date"
                      customeLabelClass="searchFilterLabelGeneral"
                      placeholder="Start date"
                      noColor
                      options={
                        {
                          //maxDate: new Date().toISOString(),
                        }
                      }
                    />
                  </Col>

                  <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className="ms-0 ms-md- ps-md-0 mt-1 mt-md-0"
                  >
                    <DatePicker
                      name="expiryEndDate"
                      label="To"
                      customeLabelClass="searchFilterLabelGeneral"
                      placeholder="End date"
                      options={{
                        minDate: values["expiry_date"],
                        //maxDate: new Date().toISOString(),
                      }}
                      noColor
                      //customeLabelClass="customeDateColor"
                    />
                  </Col>
                </Row>
              </Col>
            )}
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
