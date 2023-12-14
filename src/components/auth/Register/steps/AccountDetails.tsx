// ** React Imports
import { FC, Fragment } from "react";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft, ChevronRight, ChevronsRight } from "react-feather";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

// ** Custom Components
import { InputPasswordToggle } from "@src/components/common/input-password-toggle";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { FormikProps } from "formik";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";

const defaultValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const AccountDetails: FC<any> = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref(`password`), null], "Passwords must match"),
  });

  // ** Hooks

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues,
  //   resolver: yupResolver(SignupSchema),
  // });

  // const onSubmit = (data) => {
  //   if (Object.values(data).every((field) => field.length > 0)) {
  //     stepper.next();
  //   }
  // };

  return (
    <Fragment>
      <div className="content-header mb-2">
        <h2 className="fw-bolder mb-75">Account Information</h2>
        <span>Enter your username password details</span>
      </div>
      <FormWrapper
        initialValues={{}}
        onSubmit={() => {
          stepper.next();
        }}
      >
        {({}: FormikProps<any>) => (
          <>
            <RowWrappers sm={6} md={6} xl={6}>
              <InputText
                name="firstName"
                placeholder="Please enter ..."
                label={"First Name"}
                id="firstName"
                wrapperClassName="mb-1"
              />
              <InputText
                name="lastName"
                placeholder="Please enter ..."
                label={"Last Name"}
                id="lastName"
                wrapperClassName="mb-1"
              />
            </RowWrappers>
            <RowWrappers sm={6} md={6} xl={6}>
              <InputText
                name="email"
                placeholder="Please enter ..."
                label={"Email"}
                id="email"
                wrapperClassName="mb-1"
              />

              <InputText
                name="password"
                placeholder="Please enter ..."
                label={"Password"}
                id="password"
                wrapperClassName="mb-1"
              />
            </RowWrappers>

            <Row className="mt-1">
              <Col sm={6} className="d-flex justify-content-start">
                <SubmitButton
                  disabled
                  type="button"
                  outline
                  color="secondary"
                  className="d-flex justify-content-center align-items-center"
                >
                  <ChevronLeft size={18} />
                  <span> Previous</span>
                </SubmitButton>
              </Col>
              <Col sm={6} className="d-flex justify-content-end">
                <SubmitButton
                  color="primary"
                  className="d-flex justify-content-center align-items-center"
                >
                  <span>Next </span>
                  <ChevronRight size={18} />
                </SubmitButton>
              </Col>
            </Row>
          </>
        )}
      </FormWrapper>
    </Fragment>
  );
};

export default AccountDetails;
