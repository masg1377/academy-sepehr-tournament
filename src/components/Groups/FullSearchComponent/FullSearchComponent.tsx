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
  // *** Initial values of form ***
  const [initialValues, setInitialValues] = useState<any>({
    group_name: "",
    total_members_lte: "",
    total_members_gte: "",
    creation_date_lte: null,
    creation_date_gte: null,
    is_published: null,
    group_type: null,
  });

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    group_name: "",
    total_members_lte: "",
    total_members_gte: "",
    creation_date_lte: null,
    creation_date_gte: null,
    is_published: null,
    group_type: null,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Status", name: "publish_status" },
    { value: 2, label: "Name", name: "name" },
    { value: 3, label: "Description", name: "description" },
    { value: 6, label: "Member Since", name: "creation_date" },
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
    // console.log(values);

    setTimeout(() => {
      setFilterShowFlag(false);
      handleFullFilter(values);
      setFilterIconFlag(false);
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
        {({ values, setFieldValue, resetForm }: FormikProps<any>) => (
          <Row className="mb-2 mx-0 w-100">
            <Col xs={12} md={6} lg={4}>
              <InputText
                name="group_name"
                placeholder="Enter name"
                label={"Group Name"}
                id="group_name"
                customeLabelClass="searchFilterLabelGeneral"
                noColor
                //wrapperClassName="ps-0 ms-0"
              />{" "}
            </Col>

            <Col xs={12} md={6} lg={4}>
              <SelectOption
                name="group_type"
                placeholder="Choose type"
                label={"Group Type"}
                id="group_type"
                options={[
                  { value: "mls", label: "Mls" },
                  { value: "brokerage", label: "Brokerage" },
                ]}
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

            <Col xs={12} md={6} lg={4}>
              <SelectOption
                name="is_published"
                placeholder="Please select"
                label={"Is Published"}
                id="is_published"
                options={[
                  { value: 1, label: "Published" },
                  { value: 2, label: "Inactive" },
                ]}
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

            <Col
              xs={12}
              md={6}
              lg={4}
              //className="ms-0 ps-0 mt-1 mt-lg-0"
              className="mt-1"
            >
              <Row>
                <Col xs={12} md={6} lg={6} className="mt-1 mt-md-0">
                  <DatePicker
                    name="creation_date_gte"
                    label="Start date"
                    customeLabelClass="searchFilterLabelGeneral"
                    placeholder="Start date"
                    noColor
                    options={{
                      maxDate: new Date().toISOString(),
                    }}
                  />
                </Col>

                <Col xs={12} md={6} lg={6}>
                  <DatePicker
                    name="creation_date_lte"
                    label="End date"
                    customeLabelClass="searchFilterLabelGeneral"
                    placeholder="End date"
                    noColor
                    options={{
                      maxDate: new Date().toISOString(),
                    }}
                  />
                </Col>
              </Row>
            </Col>

            <Col
              xs={12}
              md={6}
              lg={4}
              //className="ms-0 ps-0 mt-1 mt-lg-0"
              className="mt-1"
            >
              <Row>
                <Col xs={12} md={6} lg={6} className="mt-1 mt-md-0">
                  <InputText
                    name="total_members_gte"
                    label="Total members greater than"
                    customeLabelClass="searchFilterLabelGeneral"
                    placeholder="greater than"
                    noColor
                  />
                </Col>

                <Col xs={12} md={6} lg={6}>
                  <InputText
                    name="total_members_lte"
                    id="total_members_lte"
                    label="Total members lower than"
                    customeLabelClass="searchFilterLabelGeneral"
                    placeholder="lower than"
                    // type="number"
                    noColor
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={12} className="w-100 mt-2 text-center text-sm-end">
              <Row className="p-0 m-0 w-100">
                <Col xs={12} className="text-center text-md-end">
                  <RippleButton
                    color="white"
                    className="general-size-ripple-button text-primary"
                    onClick={() => {
                      setSearchItemCounter(0);
                      resetForm();
                    }}
                    type="button"
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
