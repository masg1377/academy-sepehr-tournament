// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { FC, useRef, useState, useEffect } from "react";

// ** Custom Components
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";

// ** Reactstrap Imports
import { Row, Col, Button, CardTitle } from "reactstrap";

// ** Styles
import "@src/assets/scss/react/pages/page-authentication.scss";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { Mail, User } from "react-feather";

// ** Images
import RealtyBack from "@assets/images/pages/RegisterRealtyLogo1.png";
import RegisterBack2 from "@assets/images/pages/RegisterBack2.webp";
import {
  useEmailAuthorization,
  useSigninUser,
  useSignUpStaffUser,
} from "@src/core/services/api/auth/auth.api";
import { TCreateStaffUser } from "@src/core/services/api/auth/type";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@src/redux/store";
import { registerValidation } from "@src/core/validations/auth.validation";
import { handleAuthEmail, handleLogin } from "@src/redux/user";
import { ValidatePasswordStrong } from "@src/components/common/ValidatePasswordStrong/ValidatePasswordStrong";
import { FormikProps } from "formik";
import { Typography } from "@src/components/common/Typography";
import { EFonts } from "@src/core/enum/fonts.enum";

const Register: FC = (): JSX.Element => {
  const register = useSignUpStaffUser();
  const loginUser = useSigninUser();
  const emailAuth = useEmailAuthorization();

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const userStore = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (userStore && userStore.authEmail) {
      setInitialValues((old) => ({ ...old, email: userStore.authEmail }));
    }
  }, [userStore]);

  const onSubmit = (values: any) => {
    const obj: TCreateStaffUser = {
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      password: values.password,
    };

    if (userStore.authEmail !== values.email) {
      emailAuth.mutate(
        { email: values.email },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              if (res.data.result.exists) {
                toast.error("User already exists. Please login!");
                dispatch(handleAuthEmail(values.email));
                navigate("/login");
              } else {
                register.mutate(obj, {
                  onSuccess: (res) => {
                    if (
                      res.data.is_success &&
                      res.data.result.signup_completed
                    ) {
                      emailAuth.mutate(
                        { email: values.email },
                        {
                          onSuccess: (e) => {
                            if (e.data.is_success) {
                              if (e.data.result.exists)
                                loginUser.mutate(
                                  {
                                    username: values.email,
                                    password: values.password,
                                  },
                                  {
                                    onSuccess: (log) => {
                                      navigate("/profileSetup");
                                      setTimeout(() => {
                                        dispatch(
                                          handleLogin({ email: values.email })
                                        );
                                        dispatch(handleAuthEmail(values.email));
                                      }, 100);
                                    },
                                    onError: (err) => {
                                      toast.error(
                                        "Error occured please try again"
                                      );
                                    },
                                  }
                                );
                              // else
                              //   toast.error(
                              //     "Error occured. please try login from login page!"
                              //   );
                            } else toast.error(res.data.error);
                          },
                        }
                      );
                    }
                  },
                });
              }
            } else {
              toast.error(res.data.error);
              navigate("/emailCheck");
            }
          },
        }
      );
    } else
      register.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success && res.data.result.signup_completed) {
            emailAuth.mutate(
              { email: values.email },
              {
                onSuccess: (e) => {
                  if (e.data.is_success) {
                    if (e.data.result.exists)
                      loginUser.mutate(
                        {
                          username: values.email,
                          password: values.password,
                        },
                        {
                          onSuccess: (log) => {
                            navigate("/profileSetup");
                            setTimeout(() => {
                              dispatch(handleLogin({ email: values.email }));
                            }, 100);
                          },
                          onError: (err) => {
                            toast.error("Error occured please try again");
                          },
                        }
                      );
                    // else
                    //   toast.error(
                    //     "Error occured. please try login from login page!"
                    //   );
                  } else toast.error(res.data.error);
                },
              }
            );
          }
        },
      });
  };

  return (
    <div className="auth-wrapper auth-cover bg-white">
      <Row className="auth-inner m-0">
        <Col
          lg={7}
          className="overflow-hidden bg-white text-end d-flex justify-content-center align-items-center flex-column"
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
            style={{ paddingTop: "15%" }}
          >
            <FormWrapper
              initialValues={initialValues}
              validationSchema={registerValidation}
              onSubmit={onSubmit}
              className="h-100 w-100 d-inline-block"
              enableReinitialize
            >
              {({ values }: FormikProps<any>) => (
                <>
                  <CardTitle
                    tag="h4"
                    className="mb-0 text-start text-black font-montserrat-semiBold fs-29"
                  >
                    Sign Up
                  </CardTitle>
                  {/* <span className="fs-8">
                    Please complete the following information
                  </span> */}
                  <Typography
                    className="d-block mb-2"
                    size={16}
                    font={EFonts.MontserratMedium}
                    style={{
                      color: "#000000a3",
                    }}
                  >
                    Please complete the following information
                  </Typography>
                  <Row>
                    <Col xs={12} md={6}>
                      <InputText
                        name="firstName"
                        placeholder="your Name"
                        label={"First Name"}
                        id="firstName"
                        icon={<User size="15" />}
                        wrapperClassName="mb-1 mt-2"
                        customeLabelClass="font-montserrat-medium fs-18"
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <InputText
                        name="lastName"
                        placeholder="your lastName"
                        label={"Last Name"}
                        id="lastName"
                        icon={<User size="15" />}
                        wrapperClassName="mb-1 mt-0 mt-md-2"
                        customeLabelClass="font-montserrat-medium fs-18"
                      />
                    </Col>
                  </Row>
                  <InputText
                    name="email"
                    placeholder="someone@mail.com"
                    label={"Email Address"}
                    id="email"
                    icon={<Mail size="15" />}
                    wrapperClassName="mb-1"
                    customeLabelClass="font-montserrat-medium fs-18"
                  />
                  <InputText
                    name="password"
                    placeholder="············"
                    label={"Password"}
                    id="password"
                    type="password"
                    wrapperClassName="mb-1"
                    customeLabelClass="font-montserrat-medium fs-18"
                  />

                  <ValidatePasswordStrong
                    value={values.password ? values.password : ""}
                  />

                  <SubmitButton
                    className="w-100 mt-2 mb-2 font-montserrat-medium fs-21"
                    color="primary"
                    isLoading={
                      register.isLoading ||
                      loginUser.isLoading ||
                      emailAuth.isLoading
                    }
                    block
                    type="submit"
                    schema={registerValidation}
                  >
                    Sign up
                  </SubmitButton>
                  <div className="w-100 text-center">
                    {/* <span className="fs-8 me-1">Do you have an account?</span> */}
                    <Typography
                      className="me-1"
                      size={18}
                      font={EFonts.MontserratMedium}
                      style={{
                        color: "#1d1d1d",
                      }}
                    >
                      Do you have an account?
                    </Typography>
                    <Link
                      to="/login"
                      className="font-montserrat-semiBold fs-19"
                      style={{ color: "#19257c" }}
                    >
                      Sign In
                    </Link>
                  </div>
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
              <CardTitle
                tag="h2"
                className="mb-0 text-center text-light font-montserrat-semiBold fs-40"
              >
                Welcome to
              </CardTitle>
              <CardTitle
                tag="h1"
                className="mb-0 text-center text-light font-montserrat-semiBold fs-40"
              >
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

export { Register };
