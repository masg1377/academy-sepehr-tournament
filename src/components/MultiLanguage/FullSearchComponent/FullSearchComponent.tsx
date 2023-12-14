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
  const [permanentCheck, setPermanentCheck] = useState<boolean>(false);

  // const [loadFlag, setLoadFlag] = useState<any>({
  //   roles: false,
  //   hashtag: false,
  // });

  // *** Initial values of form ***
  const [initialValues, setInitialValues] = useState<any>({
    usecase: "",
    version: "",
    locale: "",
    is_published: "",
    //modified_by: "",
    creation_date: "",
    creationEndDate: "",
  });

  const filterOperators: any = {
    usecase: "like",
    version: "=",
    locale: "in",
    is_published: "in",
    //modified_by: "=",
    creation_date: ">=",
    creationEndDate: "<",
  };

  const [languages, setLanguages] = useState([
    { value: "us-en", label: "en-us" },
    { value: "fr-ca", label: "fr-ca" },
    { value: "es-mx", label: "es-mx" },
  ]);

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    usecase: true,
    version: true,
    locale: true,
    is_published: true,
    //modified_by: true,
    creation_date: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Status", name: "is_published" },
    { value: 2, label: "Usecase", name: "usecase" },
    { value: 3, label: "Version", name: "version" },
    { value: 4, label: "Language", name: "locale" },
    //{ value: 5, label: "ModifiedBy", name: "modified_by" },
    { value: 6, label: "Creation Date", name: "creation_date" },
  ]);

  const onSubmit = (values: any) => {
    setSearchItemCounter(0);
    const mydata = Object.entries(values);
    mydata.forEach((item, index) => {
      if (!item[1] && typeof item[1] !== "number") {
      } else {
        setSearchItemCounter((old: number) => old + 1);
      }
    });
    //console.log(values);

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
      } else if (val && key === "locale") {
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
      } else if (val || val === 0) {
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

    setTimeout(() => {
      setFilterShowFlag(false);
      handleFullFilter(dataFilter);
      setFilterIconFlag(false);
      //console.log(dataFilter);
    }, 500);
  };

  const handleSetShowitem = (data: any) => {
    setInitialValuesShow(data);
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
            {initialValuesShow?.usecase && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="usecase"
                  placeholder="Enter name"
                  label={"UseCase"}
                  id="usecase"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.locale && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="locale"
                  placeholder="Choose langauge"
                  label={"Language"}
                  id="locale"
                  options={languages}
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
            {initialValuesShow?.version && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  type="number"
                  name="version"
                  placeholder="Enter version"
                  label={"Version"}
                  id="version"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.is_published && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="is_published"
                  placeholder="Choose status"
                  label={"Status"}
                  id="is_published"
                  options={[
                    { value: true, label: "Published" },
                    { value: false, label: "Draft" },
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
            {/* {initialValuesShow?.modified_by && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="modified_by"
                  placeholder="Enter name"
                  label={"Modified by"}
                  id="modified_by"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )} */}
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
