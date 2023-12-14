// ** React Imports
import React, { useEffect, FC, useRef, useState } from "react";

// ** Import from reactstrap
import { Row, Col, CardBody, CardTitle, CardHeader, Card } from "reactstrap";

// ** Import from react-select
import Select, {
  components,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  ValueContainerProps,
  PlaceholderProps,
  ControlProps,
  IndicatorsContainerProps,
} from "react-select";

// ** General components
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { FormikProps } from "formik";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { RippleButton } from "@src/components/common/ripple-button";
import classNames from "classnames";
import { useAddStaff } from "@src/core/services/api/auth/auth.api";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { AddStaffValidation } from "@src/core/validations/staff.validation";
import toast from "react-hot-toast";

const AddStaff: FC = (): JSX.Element => {
  const addStaff = useAddStaff();

  const onSubmit = (values: any) => {
    // console.log(values);
    const staffs = values.staffInvite.map((o: any) => o.value);
    // console.log(staffs);
    addStaff.mutate(
      { email: staffs },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const result = res.data.result;

            if (result && Array.isArray(result)) {
              if (staffs.length === 1) {
                result.forEach((o) => {
                  if (o.added)
                    toast.success("Successfully added to whiltelist!");
                  else toast.error("This email exist in whitelist");
                });
              } else {
                result.forEach((o) => {
                  if (o.added) toast.success(o.email + " added to whiltelist!");
                  else toast.error(o.email + " is already in whitelist");
                });
              }
            } else toast.success("Successfully added to whiltelist!");
          }
        },
        onError: () => {
          toast.error("Something went wrong. Please try again!");
        },
      }
    );
  };

  const MultiValueContainer = (props: MultiValueGenericProps<any>) => {
    return (
      <div className="d-none">
        <components.MultiValueContainer {...props}>
          hello
        </components.MultiValueContainer>
      </div>
    );
  };

  const ValueContainer = ({ children, ...props }: any) => {
    return (
      <components.ValueContainer {...props}>
        <components.Placeholder {...props}>
          {props.selectProps.placeholder}
        </components.Placeholder>
        {React.Children.map(children, (child) =>
          child && child.key !== "placeholder" ? child : null
        )}
      </components.ValueContainer>
    );
  };
  const Placeholder = (props: PlaceholderProps<any>) => {
    return <components.Placeholder {...props} />;
  };

  const handleRemoveItem = (value: number, data: any, setValue: any) => {
    const newVal = data.filter((o: any) => o.value !== value);
    setValue(newVal);
  };

  const ControlComponent = (props: ControlProps<any, false>) => {
    console.log(props.selectProps.inputValue);

    return (
      <div
        style={{
          borderRadius: "2px",
          padding: "5px",
          backgroundColor: "rgba(244, 243, 249, 0.6)",
          border: "solid 1px #e1e0ea",
        }}
      >
        <div className="d-flex flex-wrap outlineContainerCustome">
          {props.getValue().map((item: any, index: any) => (
            <div
              key={index + 1}
              className="discount-options-holder2 bg-primary text-light fs-9"
            >
              {item.label}
              <span
                onClick={() =>
                  handleRemoveItem(item.value, props.getValue(), props.setValue)
                }
                className="fs-6-1 cursor-pointer margin-left-9"
              >
                x
              </span>
            </div>
          ))}
        </div>
        <components.Control {...props} />
      </div>
    );
  };

  const IndicatorsContainer = (props: IndicatorsContainerProps<any, true>) => {
    return (
      <div style={{ display: "none" }}>
        <components.IndicatorsContainer {...props} />
      </div>
    );
  };

  return (
    <Card className="">
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom pt-1 pb-1">
        <CardTitle tag="h4" className="d-flex">
          Invite Staff
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs={12} lg={7} md={10} className="mt-1">
            <span className="customeInfoFontSize staffInfoText">
              Invite teammates to collaborate and use products in your
              organization. We will ask new user to enter their personal details
              when they sign up.
            </span>
          </Col>
          <Col xs={12} lg={7} md={10} className="mt-1">
            <FormWrapper
              className=""
              enableReinitialize={true}
              initialValues={{ staffInvite: [] }}
              validationSchema={AddStaffValidation}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }: FormikProps<any>) => (
                <React.Fragment>
                  <Col xs={12} className="mb-1-1 mt-1">
                    <span className="staffInfoText">Email</span>
                  </Col>
                  <Col xs={12}>
                    <SelectOption
                      name="staffInvite"
                      placeholder="Please enter Email ..."
                      label={""}
                      id="staffInvite"
                      options={[]}
                      isMulti
                      isClearable
                      creative
                      customeLabelClass="searchFilterLabelGeneral"
                      noColor
                      isOutline2={true}
                      myComponents={{
                        Control: ControlComponent,
                        IndicatorsContainer,
                        MultiValueContainer,
                        ValueContainer,
                        Placeholder,
                      }}
                      customStyle={{
                        control: (base) => ({
                          ...base,
                          border: 0,
                          boxShadow: "none",
                          backgroundColor: "transparent",
                        }),
                        placeholder: (base, state) => ({
                          ...base,
                          display: state.selectProps.inputValue
                            ? "none"
                            : "block",
                        }),
                        //menu: (prop) => ({ ...prop, display: "none" }),
                      }}
                      //wrapperClassName="mt-1 mb-0"
                    />
                  </Col>
                  <Row className="mt-3">
                    <Col
                      className="text-center text-sm-start mt-1 mt-sm-0"
                      xs={12}
                    >
                      <SubmitButton
                        disabled={values.staffInvite?.length === 0}
                        type="submit"
                        color="info"
                        // style={{
                        //   padding: "9px",
                        // }}
                        isLoading={addStaff.isLoading}
                        className="px-3 saveBtColor fs-8"
                      >
                        Invite
                      </SubmitButton>
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </FormWrapper>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export { AddStaff };
