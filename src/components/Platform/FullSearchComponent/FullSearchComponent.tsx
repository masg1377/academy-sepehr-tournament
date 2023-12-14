// ** React Imports
import React, { FC, useState, useEffect } from "react";

// ** Import from Formik
import { FormikProps, useFormikContext } from "formik";

// ** Generalcomponents
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { RippleButton } from "@src/components/common/ripple-button/index";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { AddFilterModal } from "@src/components/common/FilterModal/AddFilterModal";
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
  // *** Initial values for search filter ***
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    username: "",
    //creation_date: "",
    //creationEndDate: "",
  });

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    name: true,
    username: true,
    //creation_date: true,
    //creationEndDate: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Name", name: "name" },
    { value: 2, label: "User Name", name: "username" },
    //{ value: 4, label: "Creation Date", name: "creation_date" },
  ]);

  // *** Filters for operator ***
  const filterOperators: any = {
    name: "like",
    username: "like",
    //creation_date: ">=",
    //creationEndDate: "<",
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
      // if (val && key === "creationEndDate") {
      //   if (dataFilter.length > 0) dataFilter.push("and");
      //   dataFilter.push({
      //     field: "creation_date",
      //     operator: filterOperators[key],
      //     value: val,
      //   });
      // }
      // else
      if (val) {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: key,
          operator: filterOperators[key],
          value:
            typeof val === "object"
              ? Array.isArray(val)
                ? val.map((o) => o.label)
                : val.label
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
            {initialValuesShow?.username && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="username"
                  placeholder="Enter userName"
                  label={"User Name"}
                  id="username"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {/* {initialValuesShow?.creation_date && (
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
