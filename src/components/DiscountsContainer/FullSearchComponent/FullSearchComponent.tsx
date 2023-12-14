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
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";

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
  const [packagesOption, setPackagesOption] = useState<
    { value: number; label: string }[]
  >([]);

  const [loadFlag, setLoadFlag] = useState<any>({
    package: false,
  });

  const getPackage = useGetListOfEntity();

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
    if (key === "package" && flag === false) {
      getPackages();
      if (packagesOption) {
        setLoadFlag({ ...loadFlag, package: true });
      }
    }
  };

  // *** Initial values for search filter ***
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    description: "",
    percent_off: "",
    valid: "",
    //currency: "",
    //duration: "",
    coverage_package_id: "",
    expiry_date: "",
    creation_date: "",
    creationEndDate: "",
  });

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    name: true,
    description: true,
    percent_off: true,
    valid: true,
    //currency: true,
    //duration: true,
    coverage_package_id: true,
    expiry_date: true,
    creation_date: true,
    creationEndDate: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Name", name: "name" },
    { value: 2, label: "Description", name: "description" },
    { value: 3, label: "Percent Off", name: "percent_off" },
    { value: 4, label: "Valid", name: "valid" },
    //{ value: 5, label: "Currency", name: "currency" },
    //{ value: 6, label: "Duration", name: "duration" },
    { value: 7, label: "Coverage Package", name: "coverage_package_id" },
    { value: 8, label: "Expiry Date", name: "expiry_date" },
    { value: 9, label: "Creation Date", name: "creation_date" },
  ]);

  // *** Filters for operator ***
  const filterOperators: any = {
    name: "like",
    description: "like",
    percent_off: "=",
    valid: "in",
    //currency: "=",
    //duration: "=",
    coverage_package_id: "in",
    expiry_date: "=",
    creation_date: ">=",
    creationEndDate: "<",
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
      if (val && key === "creationEndDate") {
        if (dataFilter.length > 0) dataFilter.push("and");
        const today = new Date(val);
        const nextDate = new Date(
          today.getTime() + 24 * 60 * 60 * 1000
        ).toString();
        const isoNextDate = getCustomDate(nextDate);
        dataFilter.push({
          field: "creation_date",
          operator: filterOperators[key],
          value: isoNextDate,
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
                ? val.map((o) => o.value)
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
            {initialValuesShow?.description && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="description"
                  placeholder="Enter description"
                  label={"Description"}
                  id="description"
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
                  id="discount_percent_off"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor

                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {/* {initialValuesShow?.currency && (
              <Col xs={21} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="currency"
                  placeholder="Choose currency"
                  label={"Currency"}
                  id="currency"
                  options={[{ value: "usd", label: "USD" }]}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
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
            {initialValuesShow?.coverage_package_id && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="coverage_package_id"
                  placeholder="Choose coveredPackages"
                  label={"Covered Packages"}
                  id="coverage_package_id"
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
            {/* {initialValuesShow?.valid && (
              <Col
                xs={12}
                md={6}
                lg={4}
                className="d-flex justify-content-start justify-content-md-center align-items-end mt-3"
              >
                <SwitchBox
                  name="valid"
                  wrapperClassName="position-relative"
                  wrapperStyle={{ bottom: "4px" }}
                  color="success"
                  // defaultChecked={hasMLS}
                  labelClassName="text-black"
                >
                  Valid
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
