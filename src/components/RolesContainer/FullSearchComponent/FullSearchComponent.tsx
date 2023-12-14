// ** React Imports
import React, { FC, useState, useEffect } from "react";

// ** Import from Formik
import { FormikProps } from "formik";

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
import { getCustomDate } from "@src/core/utils/date-helper.utils";

import classNames from "classnames";

// ** ReactStrap Imports
import { Col, Row } from "reactstrap";
import { TBttBoostTypes } from "@src/core/data/btt.data";

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

  // *** Initial values for search filter ***
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    expiry_date: "",
    boost_type: "",
    is_hidden: "",
  });

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    name: true,
    expiry_date: true,
    boost_type: true,
    is_hidden: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Name", name: "name" },
    { value: 4, label: "Expiry Date", name: "expiry_date" },
    { value: 2, label: "Boost Type", name: "boost_type" },
    { value: 5, label: "Is Hidden", name: "is_hidden" },
  ]);

  // *** Filters for operator ***
  const filterOperators: any = {
    name: "like",
    expiry_date: "=",
    boost_type: "=",
    is_hidden: "in",
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
    dataFilter.push({
      field: "type",
      operator: "=",
      value: 1,
    });
    Object.keys(values).forEach((key: string) => {
      const val = values[key];
      if (val && key === "creationEndDate") {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: "creation_date",
          operator: filterOperators[key],
          value: val,
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
    //console.log(dataFilter);
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
