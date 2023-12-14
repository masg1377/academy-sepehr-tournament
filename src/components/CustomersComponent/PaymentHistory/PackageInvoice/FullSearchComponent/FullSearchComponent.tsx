// ** React Imports
import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// ** Import from Formik
import { FormikProps } from "formik";
import * as yup from "yup";

// ** Generalcomponents
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { RippleButton } from "@src/components/common/ripple-button/index";
import { AddFilterModal } from "@src/components/common/FilterModal/AddFilterModal";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { invoiceTypeNumber } from "@src/core/data/mls.data";
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
  const { id } = useParams();

  const [packagesOption, setPackagesOption] = useState<
    { value: number; label: string }[]
  >([]);

  // *** Initial values of form ***
  const [initialValues, setInitialValues] = useState<any>({
    number: "",
    receipt_number: "",
    status: "",
    amount_paid: "",
    user_id: "",
    creation_date: "",
    creationEndDate: "",
  });

  const filterOperators: any = {
    number: "like",
    receipt_number: "like",
    status: "=",
    user_id: "=",
    amount_paid: "=",
    creation_date: ">=",
    creationEndDate: "<",
  };

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    status: true,
    number: true,
    receipt_number: true,
    user_id: true,
    amount_paid: true,
    creation_date: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Status", name: "status" },
    { value: 2, label: "Number", name: "number" },
    { value: 3, label: "Receipt Number", name: "receipt_number" },
    { value: 5, label: "User ID", name: "user_id" },
    { value: 4, label: "Amount Paid", name: "amount_paid" },
    { value: 19, label: "Creation Date", name: "creation_date" },
  ]);

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
    dataFilter.push({
      field: "package_id",
      operator: "=",
      value: id ? +id : 0,
    });
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
            {initialValuesShow?.number && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="number"
                  placeholder="Enter number"
                  label={"Number"}
                  id="number"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.receipt_number && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="receipt_number"
                  placeholder="Enter receipt number"
                  label={"Receipt Number"}
                  id="receipt_number"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.status && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="status"
                  placeholder="Choose status"
                  label={"Status"}
                  id="status"
                  options={invoiceTypeNumber}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.user_id && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  type="number"
                  name="user_id"
                  placeholder="Enter id"
                  label={"User Id"}
                  id="user_id"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.amount_paid && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  type="number"
                  name="amount_paid"
                  placeholder="Enter amount"
                  label={"Amount Paid"}
                  id="amount_paid"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
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
