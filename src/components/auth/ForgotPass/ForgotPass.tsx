// ** React Imports
import { FormikProps } from "formik";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// ** Icons Imports

// ** Custom Components
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import {
  useForgotPassword,
  useForgotPasswordSubmit,
  useSigninUser,
} from "@src/core/services/api/auth/auth.api";
import {
  codeCheckValidation,
  emailAuthValidation,
  resetPassValidation,
} from "@src/core/validations/auth.validation";
import { StepOne } from "./StepOne";

// ** Reactstrap Imports
import { CardTitle, Col, Row } from "reactstrap";

// ** Images
import RegisterBack2 from "@assets/images/pages/RegisterBack2.webp";
import RealtyBack from "@assets/images/pages/RegisterRealtyLogo1.png";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import toast from "react-hot-toast";
import { handleLogin } from "@src/redux/user";

const ForgotPass: FC = (): JSX.Element => {
  const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch();
  const [hashedEmail, setHashedEmail] = useState<string>("");

  const navigate = useNavigate();

  const forgotPass = useForgotPassword();
  const forgotPassSubmit = useForgotPasswordSubmit();
  const login = useSigninUser();

  const onSubmit = (value: any, { setErrors, setFieldError }: any) => {
    // const obj: { email: string } = {
    //   email: value.email,
    // };
    if (step === 1)
      forgotPass.mutate(value.email, {
        onSuccess: (result) => {
          setHashedEmail(result.CodeDeliveryDetails.Destination);
          setStep(2);
          setErrors(null);
        },
        onError: (error: any) => {
          if (
            error.message ===
            "UserMigration failed with error 'NoneType' object has no attribute 'get'."
          ) {
            setFieldError("email", "This mail is not registered!");
          } else {
            setFieldError("email", error.message);
          }
        },
      });
    else if (step === 2) {
      setStep(3);
      setErrors(null);
    } else if (step === 3) {
      forgotPassSubmit.mutate(
        {
          email: value.email,
          newPass: value.password,
          validationCode: value.code,
        },
        {
          onSuccess: (res) => {
            const obj = {
              username: value.email,
              password: value.password,
            };
            login.mutate(obj, {
              onSuccess: (val) => {
                dispatch(handleLogin({ email: value.email }));
              },
              onError: (res: any) => {
                // toast.error(
                //   res.message ? res.message : "Error Occured! Please try again"
                // );
                navigate("/login");
              },
            });
          },
          onError: (error: any) => {
            toast.error(error.message);
          },
        }
      );
    }
  };

  return (
    <div className="auth-wrapper auth-cover bg-white">
      <Row className="auth-inner m-0">
        <Col
          lg={7}
          className="overflow-hidden bg-white text-end d-flex justify-content-center align-items-center flex-column "
        >
          <Col xs={12} className="text-center text-lg-start mt-5 pt-1">
            <h2 className="mt-4 ms-0 mt-lg-3 ms-lg-2 ms-xl-4 register-dashboard-name font-montserrat-semiBold fs-35">
              Dashboard
            </h2>
          </Col>
          <Col className="text-center text-lg-start" xs={12}>
            <span className="d-inline-block ms-0 ms-lg-5 register-logo-liner-big"></span>
            {[1, 2].map((item, index) => (
              <span
                key={index + 1}
                className="d-inline-block register-logo-liner-small"
              ></span>
            ))}
          </Col>
          <Col
            xs={11}
            sm={9}
            md={9}
            lg={11}
            xl={7}
            className="text-start bg-white h-100"
            style={{ paddingTop: "18%" }}
          >
            <FormWrapper
              initialValues={{
                email: "",
                code: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={
                step === 1
                  ? emailAuthValidation
                  : step === 2
                  ? codeCheckValidation
                  : resetPassValidation
              }
              onSubmit={onSubmit}
              className="h-100 w-100 d-inline-block"
            >
              {({ values }: FormikProps<any>) => (
                <>
                  {step === 1 ? (
                    <StepOne />
                  ) : step === 2 ? (
                    <StepTwo hashedEmail={hashedEmail} />
                  ) : (
                    <StepThree />
                  )}
                  <SubmitButton
                    color="primary"
                    isLoading={
                      forgotPass.isLoading ||
                      forgotPassSubmit.isLoading ||
                      login.isLoading
                    }
                    block
                    schema={
                      step === 1
                        ? emailAuthValidation
                        : step === 2
                        ? codeCheckValidation
                        : resetPassValidation
                    }
                    type="submit"
                    className="w-100 mb-2 mt-2 font-montserrat-medium fs-21"
                  >
                    Next
                  </SubmitButton>
                </>
              )}
            </FormWrapper>
          </Col>
        </Col>
        <Col
          md={5}
          className="d-none d-lg-block p-0 position-relative overflow-hidden registerContainerbackgroundColor"
        >
          <div className="w-100 h-100 d-flex flex-column maxWidth-750 my-0 mx-auto">
            <div className="w-100 mt-2 ms-2">
              <img
                className="registerRealtyLogo"
                src={RealtyBack}
                alt="Register BackLogo"
              />
            </div>
            <div className="w-100 text-center marginTop-100">
              <CardTitle tag="h2" className="mb-0 text-center text-light font-montserrat-semiBold fs-40">
                Welcome to
              </CardTitle>
              <CardTitle tag="h1" className="mb-0 text-center text-light font-montserrat-semiBold fs-40">
                RealtyFeed BACKEND
              </CardTitle>
            </div>
            <div className="w-100 mt-auto rtlDirection">
              <img
                className="w-75 registerBigLogo"
                src={RegisterBack2}
                alt="Register BackLogo"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export { ForgotPass };
