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
  const [mlsOption, setMlsOption] = useState<
    { value: number; label: string }[]
  >([]);

  const [loadFlag, setLoadFlag] = useState<any>({
    mls: false,
  });

  const getList = useGetMlsServer();

  const getMLSList = () => {
    getList.mutate(
      {
        entity: "mls_server",
        data: {
          list_filter: {
            limit: 100000000,
            offset: 0,
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setMlsOption(
              result.map((i: any) => ({
                value: i.id,
                label: i.name,
              }))
            );
          }
        },
        onError: () => {
          setMlsOption([]);
        },
      }
    );
  };

  const handleDataFilterLoad = (key: string, flag: boolean) => {
    if (key === "mls" && flag === false) {
      getMLSList();
      if (mlsOption) {
        setLoadFlag({ ...loadFlag, mls: true });
      }
    }
  };

  // *** Initial values for search filter ***
  const [initialValues, setInitialValues] = useState<any>({
    //handler_name: "",
    agent_name: "",
    //office_name: "",
    mls_id: "",
    broker_name: "",
    status: "",
    creation_date: "",
    creationEndDate: "",
    modification_date: "",
  });

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    //handler_name: true,
    agent_name: true,
    //office_name: true,
    mls_id: true,
    broker_name: true,
    status: true,
    creation_date: true,
    creationEndDate: true,
    modification_date: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    //{ value: 1, label: "Handler Name", name: "handler_name" },
    { value: 2, label: "Agent Name", name: "agent_name" },
    //{ value: 3, label: "Office Name", name: "office_name" },
    { value: 8, label: "MLS Name", name: "mls_id" },
    { value: 4, label: "Broker Name", name: "broker_name" },
    { value: 5, label: "Status", name: "status" },
    { value: 6, label: "Creation Date", name: "creation_date" },
    { value: 7, label: "Modification Date", name: "modification_date" },
  ]);

  // *** Filters for operator ***
  const filterOperators: any = {
    //handler_name: "like",
    agent_name: "like",
    //office_name: "like",
    mls_id: "in",
    broker_name: "like",
    status: "in",
    creation_date: ">",
    creationEndDate: "<",
    modification_date: "=",
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
      } else if (val && key === "modification_date") {
        const today = new Date(val);
        const nextDate = new Date(
          today.getTime() + 24 * 60 * 60 * 1000
        ).toString();
        const isoNextDate = getCustomDate(nextDate);
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: key,
          operator: ">",
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
            {/* {initialValuesShow?.handler_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="handler_name"
                  placeholder="Enter Handler"
                  label={"Handler Name"}
                  id="handler_name"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )} */}
            {initialValuesShow?.mls_id && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="mls_id"
                  placeholder="Choose Mls"
                  label={"Mls Name"}
                  id="mls_id"
                  options={mlsOption}
                  isMulti
                  isClearable
                  mergeStyle
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  isLoading={getList.isLoading}
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
                  onFocus={() => handleDataFilterLoad("mls", loadFlag.mls)}
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.agent_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="agent_name"
                  placeholder="Enter agent"
                  label={"Agent Name"}
                  id="agent_name"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {/* {initialValuesShow?.office_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="office_name"
                  placeholder="Enter office"
                  label={"Office Name"}
                  id="office_name"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )} */}
            {initialValuesShow?.broker_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  name="broker_name"
                  placeholder="Enter broker"
                  label={"Broker Name"}
                  id="broker_name"
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
                  options={[
                    { value: "active", label: "Active" },
                    { value: "rejected", label: "Rejected" },
                    { value: "pending", label: "Pending" },
                  ]}
                  isMulti
                  isClearable
                  mergeStyle
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  isLoading={getList.isLoading}
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
            {initialValuesShow?.modification_date && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <DatePicker
                  name="modification_date"
                  label="Modification Date"
                  customeLabelClass="searchFilterLabelGeneral"
                  placeholder="Select date"
                  noColor
                  //customeLabelClass="customeDateColor"
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
