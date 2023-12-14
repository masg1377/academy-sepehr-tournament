import { Form, Formik, FormikProps } from "formik";
import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
interface FormProps {
  // children: React.ReactNode;
  children:
    | ((form: FormikProps<any>) => JSX.Element | ReactNode)
    | JSX.Element
    | ReactNode;
  initialValues: any;
  onSubmit: any;
  validationSchema?: unknown;
  className?: string;
  enableReinitialize?: boolean;
  noValidate?: boolean;
  noEnter?: boolean;
}
const FormWrapper: React.FC<FormProps> = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  className,
  enableReinitialize,
  noValidate,
  noEnter,
}) => {
  const location = useLocation();

  const onKeyDown = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  // console.log(typeof children);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
    >
      {(form) => {
        useEffect(() => {
          form.resetForm();
        }, [location]);
        return (
          <Form
            {...(noEnter ? { onKeyDown } : {})}
            className={className}
            noValidate={noValidate}
          >
            {typeof children === "function" ? children(form) : children}
          </Form>
        );
      }}
    </Formik>
  );
};

export { FormWrapper };
