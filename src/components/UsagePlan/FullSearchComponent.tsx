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
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import {
  packageRelatedToData,
  packageSourceData,
  packageTypeData,
  packageGetTypeData,
  packageGetRelatedToData,
} from "@src/core/data/package.data";

import classNames from "classnames";

// ** ReactStrap Imports
import { Col, Row } from "reactstrap";
import { PermissionWrapper } from "@src/components/common/PermissionWrapper/PermissionWrapper";
import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";
import { canRole } from "@src/core/utils/Utils";

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
  const [packagesOption, setPackagesOption] = useState<
    { value: number; label: string }[]
  >([]);

  const [mlsOption, setMlsOption] = useState<
    { value: number; label: string }[]
  >([]);

  const { roles } = useSelector((state: RootState) => state.roles);

  const getMLS = useGetMlsServer();

  const getMlsOptions = () => {
    getMLS.mutate(
      {
        entity: "mls_server",
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
            setMlsOption(
              result.map((i: any) => ({ value: i.name, label: i.name }))
            );
          }
        },
        onError: () => {
          setMlsOption([]);
        },
      }
    );
  };

  useEffect(() => {
    if (canRole(["can_view_mls_server"], roles)) getMlsOptions();
  }, [roles]);

  // *** Initial values for search filter ***
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    //tax_code: "",
    type: "",
    location_name: "",
    mls_name: "",
    price: "",
    source: "",
    modification_date: "",
    creation_date: "",
    creationEndDate: "",
    payment_type: "",
    published: "",
    related_to: "",
  });

  // *** Value check for modal items ***
  const [initialValuesShow, setInitialValuesShow] = useState<any>({
    name: true,
    //tax_code: true,
    type: true,
    location_name: true,
    mls_name: true,
    price: true,
    source: true,
    modification_date: true,
    creation_date: true,
    creationEndDate: true,
    payment_type: true,
    published: true,
    related_to: true,
  });

  // *** Values for modal show ***
  const [fieldData, setFieldData] = useState<any>([
    { value: 1, label: "Name", name: "name" },
    //{ value: 2, label: "Tax", name: "tax_code" },
    { value: 3, label: "Location", name: "location_name" },
    { value: 4, label: "Type", name: "type" },
    { value: 5, label: "MLS Name", name: "mls_name" },
    { value: 6, label: "Price", name: "price" },
    { value: 7, label: "Source", name: "source" },
    { value: 8, label: "Modification Date", name: "modification_date" },
    { value: 9, label: "Creation Date", name: "creation_date" },
    { value: 11, label: "Payment Type", name: "payment_type" },
    { value: 12, label: "Status", name: "published" },
    { value: 13, label: "Related To", name: "related_to" },
  ]);

  // *** Filters for operator ***
  const filterOperators: any = {
    name: "like",
    //tax_code: "like",
    type: "=",
    location_name: "like",
    mls_name: "like",
    price: "=",
    source: "like",
    modification_date: "<",
    creation_date: ">=",
    creationEndDate: "<",
    payment_type: "=",
    published: "in",
    related_to: "in",
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
      } else if (val && key === "location_name") {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: "location_name",
          operator: filterOperators[key],
          value: val.Country,
        });
      } else if (
        (val && key === "published") ||
        (val && key === "related_to")
      ) {
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
      } else if (val && key === "location_name") {
        if (dataFilter.length > 0) dataFilter.push("and");
        dataFilter.push({
          field: "location_name",
          operator: filterOperators[key],
          value: val.Country,
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
                ? val.map((o) => o.label)
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
            {initialValuesShow?.location_name && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                {/* <SelectOption
                  name="location_name"
                  placeholder="Choose location"
                  label={"Location"}
                  id="location_name"
                  options={[
                    { value: "Global", label: "Global" },
                    { value: "USA", label: "USA" },
                    { value: "CAN", label: "CAN" },
                  ]}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                /> */}
                <LocationField
                  name="location_name"
                  placeholder="Choose location"
                  label={"Location"}
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  isClearable
                  defaultMargin
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.type && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="type"
                  placeholder="Choose type"
                  label={"Type"}
                  id="type"
                  // options={[
                  //   { value: 1, label: "Premium" },
                  //   { value: 2, label: "Privileged" },
                  //   { value: 3, label: "MLS" },
                  //   { value: 4, label: "Sponsored Listings" },
                  //   {
                  //     value: 5,
                  //     label: "Additional Services",
                  //   },
                  //   { value: 6, label: "reso" },
                  // ]}
                  options={packageGetTypeData}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.payment_type && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="payment_type"
                  placeholder="Choose payment"
                  label={"Payment Type"}
                  id="payment_type"
                  options={[
                    { value: 1, label: "One_time" },
                    { value: 2, label: "Recurring" },
                  ]}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}
            {initialValuesShow?.price && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  label={"Price"}
                  id="price"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )}
            {initialValuesShow?.published && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                {/* <SelectOption
                  name="active"
                  placeholder="Choose status"
                  label={"Status"}
                  id="active"
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                /> */}
                <SelectOption
                  name="published"
                  placeholder="Choose status"
                  label={"Status"}
                  id="published"
                  // options={[
                  //   { value: "active", label: "Active" },
                  //   { value: "inactive", label: "Inactive" },
                  // ]}
                  options={[
                    { value: true, label: "Published" },
                    { value: false, label: "Unpublished" },
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
            {initialValuesShow?.related_to && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="related_to"
                  placeholder="Choose related to"
                  label={"Related To"}
                  id="related_to"
                  options={packageGetRelatedToData}
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
            <PermissionWrapper roles={["can_view_mls_server"]}>
              {initialValuesShow?.mls_name && (
                <Col xs={21} md={6} lg={4} className="mt-1">
                  <SelectOption
                    name="mls_name"
                    placeholder="Choose MLS"
                    label={"MLS Name"}
                    id="mls_name"
                    options={mlsOption}
                    isClearable
                    customeLabelClass="searchFilterLabelGeneral"
                    noColor
                    //wrapperClassName="mt-1 mb-0"
                  />
                </Col>
              )}
            </PermissionWrapper>
            {initialValuesShow?.source && (
              <Col xs={21} md={6} lg={4} className="mt-1">
                <SelectOption
                  name="source"
                  placeholder="Choose Source"
                  label={"Source"}
                  id="source"
                  // options={[
                  //   { value: "realtyfeed", label: "Realtyfeed" },
                  //   { value: "realtyna", label: "Realtyna" },
                  //   { value: "reso", label: "Reso" },
                  // ]}
                  options={packageSourceData}
                  isClearable
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="mt-1 mb-0"
                />
              </Col>
            )}

            {/* {initialValuesShow?.tax_code && (
              <Col xs={12} md={6} lg={4} className="mt-1">
                <InputText
                  type="text"
                  name="tax_code"
                  placeholder="Enter Tax Code"
                  label={"Tax Code"}
                  id="tax_code"
                  customeLabelClass="searchFilterLabelGeneral"
                  noColor
                  //wrapperClassName="ps-0 ms-0"
                />
              </Col>
            )} */}

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
