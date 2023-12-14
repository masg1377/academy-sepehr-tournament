// ** React Imports
import { FC, Fragment } from "react";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "react-feather";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { FormikProps } from "formik";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";

const defaultValues = {
  address: "",
  firstName: "",
};

const PersonalInfo: FC<any> = ({ stepper }) => {
  return (
    <Fragment>
      <div className="content-header mb-2">
        <h2 className="fw-bolder mb-75">Personal Information</h2>
        <span>
          We’ve sent a confirmation code to your email address. Enter it to
          verify.
        </span>
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
                name="verificationCode"
                placeholder="Please enter ..."
                label={"Verification Code"}
                id="verificationCode"
                wrapperClassName="mb-1"
              />
            </RowWrappers>

            <Row className="mt-1">
              <Col sm={6} className="d-flex justify-content-start">
                <SubmitButton
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

export default PersonalInfo;
