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
import { useSuggestionHashtag } from "@src/core/services/api/suggestion/suggestion.api";
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
  const [hashtagoptions, setHashtagOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [roles, setRoles] = useState<{ value: number; label: string }[]>([]);

  const [listFilter, setListFilter] = useState<TGetEntities>({
    entity: "btt_type_items",
    data: {
      list_filter: {
        limit: 100000,
        offset: 0,
        filters: [{ field: "type", operator: "=", value: 1 }],
      },
    },
  });

  const [loadFlag, setLoadFlag] = useState<any>({
    roles: false,
    hashtag: false,
  });

  // *** Initial values of form ***
  const [initialValues, setInitialValues] = useState<any>({
    all: "",
    is_active: "",
    is_inactive: "",
    first_name: "",
    email: "",
    hashtag_name: "",
    btt_type_item_name: "",
    creation_date: "",
    creationEndDate: "",
  });

  const filterOperators: any = {
    is_active: "=",
    is_inactive: "=",
    all: "in",
    first_name: "like",
    last_name: "like",
    email: "like",
    hashtag_name: "in",
    btt_type_item_name: "in",
    creation_date: ">=",
    creationEndDate: "<",
  };

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    status: true,
    first_name: true,
    email: true,
    hashtag_name: true,
    btt_type_item_name: true,
    creation_date: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Status", name: "status" },
    { value: 2, label: "Name", name: "first_name" },
    { value: 3, label: "Email", name: "email" },
    { value: 4, label: "Hashtag", name: "hashtag_name" },
    { value: 5, label: "Roles", name: "btt_type_item_name" },
    { value: 6, label: "Member Since", name: "creation_date" },
  ]);

  const hashtags = useSuggestionHashtag();
  const getRoles = useGetListOfEntity();

  const getHashtag = () => {
    hashtags.mutate(
      { hashtag_name: "" },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            setHashtagOptions(
              result.map((i: any) => ({ value: i.id, label: i.name }))
            );
          }
        },
        onError: (err) => {
          setHashtagOptions([]);
        },
      }
    );
  };

  const getRoless = () => {
    getRoles.mutate(listFilter, {
      onSuccess: (res) => {
        let result = res.data.result;
        setRoles(result.map((i: any) => ({ value: i.id, label: i.name })));
      },
    });
  };

  const handleDataFilterLoad = (key: string, flag: boolean) => {
    if (key === "roles" && flag === false) {
      getRoless();
      if (roles) {
        setLoadFlag({ ...loadFlag, roles: true });
      }
    } else if (key === "hashtag" && flag === false) {
      getHashtag();
      if (hashtagoptions) {
        setLoadFlag({ ...loadFlag, hashtag: true });
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
                  label={"Name"}
                  id="first_name"
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
            {initialValuesShow?.hashtag_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="hashtag_name"
                  placeholder="Choose hashtags"
                  label={"Hashtag"}
                  id="hashtag_name"
                  options={hashtagoptions}
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
                  isLoading={hashtags.isLoading}
                  onFocus={() =>
                    handleDataFilterLoad("hashtag", loadFlag.hashtag)
                  }
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.btt_type_item_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="btt_type_item_name"
                  placeholder="Choose roles"
                  label={"Roles"}
                  id="btt_type_item_name"
                  options={roles}
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
                  isLoading={getRoles.isLoading}
                  onFocus={() => handleDataFilterLoad("roles", loadFlag.roles)}
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
                      label="Member Since"
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
