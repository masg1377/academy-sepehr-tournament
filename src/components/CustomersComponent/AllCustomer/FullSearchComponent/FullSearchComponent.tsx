// ** React Imports
import React, { FC, useState, useEffect } from "react";

// ** Import from Formik
import { FormikProps } from "formik";
import * as yup from "yup";

// ** Generalcomponents
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { RippleButton } from "@src/components/common/ripple-button/index";
import { AddFilterModal } from "@src/components/common/FilterModal/AddFilterModal";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import {
  packageSourceData,
  packageGetTypeData,
} from "@src/core/data/package.data";
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
  setModalToggle,
  handleModalShow,
  handleFullFilter,
  setFilterIconFlag,
  setFilterShowFlag,
}): JSX.Element => {
  const [packagesOption, setPackagesOption] = useState<
    { value: number; label: string }[]
  >([]);

  const [loadFlag, setLoadFlag] = useState<any>({
    package: false,
  });

  // *** Initial values of form ***
  const [initialValues, setInitialValues] = useState<any>({
    all: "",
    is_active: "",
    is_inactive: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    location_name: "",
    package_name: "",
    package_type: "",
    package_source: "",
    job_title: "",
    creation_date: "",
    creationEndDate: "",
  });

  const filterOperators: any = {
    all: "in",
    is_active: "=",
    is_inactive: "=",
    first_name: "like",
    last_name: "like",
    username: "like",
    email: "like",
    location_name: "in",
    package_name: "in",
    package_type: "=",
    package_source: "like",
    job_title: "like",
    creation_date: ">=",
    creationEndDate: "<",
  };

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    status: true,
    first_name: true,
    last_name: true,
    username: true,
    email: true,
    location_name: true,
    package_name: true,
    package_type: true,
    package_source: true,
    job_title: true,
    creation_date: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Status", name: "status" },
    { value: 2, label: "First Name", name: "first_name" },
    { value: 3, label: "Last Name", name: "last_name" },
    { value: 4, label: "User Name", name: "username" },
    { value: 5, label: "Email", name: "email" },
    { value: 6, label: "Location", name: "location_name" },
    { value: 7, label: "Packages", name: "package_name" },
    { value: 20, label: "Package Type", name: "package_type" },
    { value: 8, label: "package Source", name: "package_source" },
    { value: 9, label: "Job Title", name: "job_title" },
    { value: 19, label: "Creation Date", name: "creation_date" },
  ]);

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

  const handleDataFilterLoad = (key: string, flag: boolean) => {
    if (key === "package" && flag === false) {
      getPackages();
      if (packagesOption) {
        setLoadFlag({ ...loadFlag, package: true });
      }
    }
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
        const current = new Date(val);
        const nextDate = new Date(
          current.getTime() + 24 * 60 * 60 * 1000
        ).toString();
        const isoNextDate = getCustomDate(nextDate);
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: "creation_date",
          operator: filterOperators[key],
          value: isoNextDate,
        });
      } else if (val && key === "is_active") {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: "status",
          operator: filterOperators[key],
          value: 1,
        });
      } else if (val && key === "is_inactive") {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: "status",
          operator: filterOperators[key],
          value: 2,
        });
      } else if (val && key === "all") {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: "status",
          operator: filterOperators[key],
          value: [1, 2],
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
                ? val.map((o) => o.Municipality)
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

    setTimeout(() => {
      setFilterShowFlag(false);
      handleFullFilter(dataFilter);
      setFilterIconFlag(false);
      console.log(dataFilter);
    }, 500);
  };

  const handleSetShowitem = (data: any) => {
    setInitialValuesShow(data);
  };

  const handleOnChangeSingleCheckbox = (
    e: any,
    values: any,
    setValues: any,
    name: string
  ) => {
    setValues("all", false);
    if (name === "is_active") {
      setValues(name, e.target.checked);
      setValues("is_inactive", false);
    } else if (name === "is_inactive") {
      setValues(name, e.target.checked);
      setValues("is_active", false);
    }
  };

  const handleOnChangeCheckbox = (e: any, values: any, setValues: any) => {
    setValues("all", e.target.checked);
    setValues("is_active", false);
    setValues("is_inactive", false);
  };

  return (
    <React.Fragment>
      <FormWrapper
        initialValues={initialValues}
        // validationSchema={yup
        //   .object()
        //   .shape({ email: yup.string().email("Enter valid email") })}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }: FormikProps<any>) => (
          <Row className="mb-2 mx-0 w-100">
            {initialValuesShow?.status && (
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
                  onChange={(e: any) =>
                    handleOnChangeCheckbox(e, values, setFieldValue)
                  }
                />
                <span className="p-0 m-0">
                  <CheckBox
                    wrapperClass="d-inline-block ms-5"
                    name="is_active"
                    label="Active"
                    onChange={(e) =>
                      handleOnChangeSingleCheckbox(
                        e,
                        values,
                        setFieldValue,
                        "is_active"
                      )
                    }
                  />
                </span>
                <span className="p-0 m-0">
                  <CheckBox
                    wrapperClass="d-inline-block ms-5"
                    name="is_inactive"
                    label="Inactive"
                    onChange={(e) =>
                      handleOnChangeSingleCheckbox(
                        e,
                        values,
                        setFieldValue,
                        "is_inactive"
                      )
                    }
                  />
                </span>
              </Col>
            )}
            {initialValuesShow?.first_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="first_name"
                  placeholder="Enter name"
                  label={"First Name"}
                  id="first_name"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.last_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="last_name"
                  placeholder="Enter last Name"
                  label={"Last Name"}
                  id="last_name"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.username && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="username"
                  placeholder="Enter userName"
                  label={"UserName"}
                  id="username"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.email && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="email"
                  placeholder="Enter email"
                  label={"Email"}
                  id="email"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.job_title && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="job_title"
                  placeholder="Enter title"
                  label={"Job Title"}
                  id="job_title"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.package_source && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="package_source"
                  placeholder="Choose Source"
                  label={"Customer Source"}
                  id="package_source"
                  options={packageSourceData}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.package_type && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="package_type"
                  placeholder="Choose type"
                  label={"Package Type"}
                  id="package_type"
                  options={packageGetTypeData}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {/* {initialValuesShow?.package_name && (
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
                  //wrapperClassName="mt-1 mb-0"
                  isLoading={getPackage.isLoading}
                  onFocus={() =>
                    handleDataFilterLoad("package", loadFlag.package)
                  }
                />
              </Col>
            )} */}
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
                  isMulti
                  mergeStyle
                  customeStyleMultiActive
                  //wrapperClassName="mt-1 mb-0"
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
            <Col xs={12} className="w-100 mt-2 text-center text-md-end mt-1">
              <Row className="p-0 m-0 w-100">
                <Col xs={12} className="text-center text-md-end">
                  <RippleButton
                    color="white"
                    className="general-size-ripple-button text-primary"
                    onClick={() => {
                      setSearchItemCounter(0);
                    }}
                    type="reset"
                    //ripple={false}
                  >
                    Reset
                  </RippleButton>
                  <RippleButton
                    type="submit"
                    color="primary"
                    className="general-size-ripple-button"
                    //onClick={}
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
