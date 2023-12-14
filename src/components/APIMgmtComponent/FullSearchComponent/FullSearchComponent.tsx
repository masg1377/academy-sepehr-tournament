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
import { RippleButton } from "@src/components/common/ripple-button/index";
import { AddFilterModal } from "@src/components/common/FilterModal/AddFilterModal";
import { getCustomDate } from "@src/core/utils/date-helper.utils";

import classNames from "classnames";

// ** ReactStrap Imports
import { Col, Row } from "reactstrap";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";

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
  const [loadFlag, setLoadFlag] = useState<any>({
    usagePlan: false,
  });
  const [professionOption, setProfessionOption] = useState<
    { value: number; label: string }[]
  >([]);

  const [filterListProfession, setFilterListProfession] =
    useState<TGetEntities>({
      entity: "usage_plans",
      data: {
        list_filter: {
          limit: 10000,
          offset: 0,
          order_by: "creation_date",
          //filters: [],
        },
      },
    });

  const getPlan = useGetListOfEntity();

  // *** Initial values of form ***
  const [initialValues, setInitialValues] = useState<any>({
    user_id: "",
    username: "",
    cognito_username: "",
    api_key_aws_id: "",
    name: "",
    usage_plan_name: "",
    client_id: "",
    invoice_id: "",
    is_active: "",
  });

  const filterOperators: any = {
    user_id: "=",
    username: "like",
    cognito_username: "like",
    api_key_aws_id: "like",
    name: "like",
    usage_plan_name: "in",
    client_id: "=",
    invoice_id: "=",
    is_active: "in",
  };

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    user_id: true,
    username: true,
    cognito_username: true,
    api_key_aws_id: true,
    name: true,
    usage_plan_name: true,
    client_id: true,
    invoice_id: true,
    is_active: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "User ID", name: "user_id" },
    { value: 2, label: "User Name", name: "username" },
    { value: 3, label: "Cognito User", name: "cognito_username" },
    { value: 4, label: "Api ID", name: "api_key_aws_id" },
    { value: 5, label: "Name", name: "name" },
    { value: 6, label: "Usage Plan", name: "usage_plan_name" },
    { value: 7, label: "Client ID", name: "client_id" },
    { value: 8, label: "Invoice ID", name: "invoice_id" },
    { value: 9, label: "Status", name: "is_active" },
  ]);

  const getUsagePlan = () => {
    getPlan.mutate(filterListProfession, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          setProfessionOption(
            result.map((i: any) => ({ value: i.name, label: i.name }))
          );
        }
      },
      onError: () => {
        setProfessionOption([]);
      },
    });
  };

  const handleDataFilterLoad = (key: string, flag: boolean) => {
    if (key === "usagePlan" && flag === false) {
      getUsagePlan();
      if (professionOption) {
        setLoadFlag({ ...loadFlag, usagePlan: true });
      }
    }
  };

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
            {initialValuesShow?.user_id && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="user_id"
                  placeholder="Enter User id"
                  label={"RF User ID"}
                  id="user_id"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  type="number"
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.username && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="username"
                  placeholder="Enter Username"
                  label={"RF Username"}
                  id="username"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.cognito_username && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="cognito_username"
                  placeholder="Enter Cognito username"
                  label={"Cognito username"}
                  id="cognito_username"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.api_key_aws_id && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="api_key_aws_id"
                  placeholder="Enter key id"
                  label={"API Key ID"}
                  id="api_key_aws_id"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="name"
                  placeholder="Enter Key name"
                  label={"API Key Name"}
                  id="name"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}

            {initialValuesShow?.usage_plan_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="usage_plan_name"
                  placeholder="Choose Usage plan"
                  label={"Usage Plan Name"}
                  id="usage_plan_name"
                  options={professionOption}
                  isMulti
                  isClearable
                  mergeStyle
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  isLoading={getPlan.isLoading}
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
                    handleDataFilterLoad("usagePlan", loadFlag.usagePlan)
                  }
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.client_id && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="client_id"
                  placeholder="Enter Client id"
                  label={"App Client ID"}
                  id="client_id"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.invoice_id && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="invoice_id"
                  placeholder="Enter Invoice id"
                  label={"Invoice ID"}
                  id="invoice_id"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  type="number"
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.is_active && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="is_active"
                  placeholder="Choose status"
                  label={"Record Status"}
                  id="is_active"
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "Inactive" },
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
