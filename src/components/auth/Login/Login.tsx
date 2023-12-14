// ** React Imports
import { FormikProps } from "formik";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// ** Icons Imports
import { Mail } from "react-feather";

// ** Custom Components

// ** Images
import RegisterBack2 from "@assets/images/pages/RegisterBack2.webp";
import RealtyBack from "@assets/images/pages/RegisterRealtyLogo1.png";

// ** Reactstrap Imports
import { CardTitle, Col, Row } from "reactstrap";

// ** Styles
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import {
  useEmailAuthorization,
  useSigninUser,
} from "@src/core/services/api/auth/auth.api";
import { loginValidation } from "@src/core/validations/auth.validation";
import { RootState } from "@src/redux/store";
import { handleAuthEmail, handleLogin } from "@src/redux/user";
import "@styles/react/pages/page-authentication.scss";
import toast from "react-hot-toast";
import { Typography } from "@src/components/common/Typography";
import { EFonts } from "@src/core/enum/fonts.enum";

const Login: FC = (): JSX.Element => {
  const [initialValue, setInitialValue] = useState({
    remember: false,
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState<boolean>(false);
  const userStore = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailAuth = useEmailAuthorization();

  useEffect(() => {
    if (userStore && userStore.authEmail) {
      setInitialValue((old) => ({ ...old, email: userStore.authEmail }));
    }
  }, [userStore]);

  // useEffect(() => {
  //   if (userStore && userStore.authEmail) {
  //   } else navigate("/emailCheck");
  // }, []);

  const login = useSigninUser();

  const onSubmit = (value: any, { setErrors }: any) => {
    const obj = {
      username: value.email,
      password: value.password,
    };
    // if (userStore.authEmail !== value.email) {
    //   emailAuth.mutate(
    //     { email: value.email },
    //     {
    //       onSuccess: (res) => {
    //         if (res.data.is_success) {
    //           if (res.data.result.exists) {
    //             login.mutate(obj, {
    //               onSuccess: (val) => {
    //                 dispatch(handleLogin({ email: value.email }));
    //                 dispatch(handleAuthEmail(value.email));
    //                 navigate("/");
    //               },
    //               onError: (res: any) => {
    //                 setErrors({ password: true, email: true });
    //                 setApiError(true);
    //                 toast.error(
    //                   res.message
    //                     ? res.message
    //                     : "Error Occured! Please try again"
    //                 );
    //               },
    //             });
    //           } else {
    //             toast.error("Please register first!");
    //             dispatch(handleAuthEmail(value.email));
    //             navigate("/register");
    //           }
    //         } else {
    //           toast.error(res.data.error);
    //           dispatch(handleAuthEmail(value.email));
    //           navigate("/emailCheck");
    //         }
    //       },
    //     }
    //   );
    // } else
    login.mutate(obj, {
      onSuccess: (val) => {
        dispatch(handleLogin({ email: value.email, token: val?.data?.token }));
        dispatch(handleAuthEmail(value.email));
        console.log(val.data);
        navigate("/");
      },
      onError: (res: any) => {
        setErrors({ password: true, email: true });
        setApiError(true);
        toast.error(
          res.message ? res.message : "Error Occured! Please try again"
        );
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
              initialValues={initialValue}
              validationSchema={loginValidation}
              onSubmit={onSubmit}
              enableReinitialize
              className="h-100 w-100 d-inline-block"
            >
              {({ setFieldValue }: FormikProps<any>) => (
                <>
                  {apiError && (
                    // <span
                    //   className="d-block mb-2"
                    //   style={{
                    //     backgroundColor: "rgba(245, 51, 79, 0.03)",
                    //     color: "#ff0000",
                    //     padding: "13px 18px",
                    //     fontSize: 16,
                    //     fontWeight: 500,
                    //     lineHeight: "28px",
                    //     borderRadius: 10,
                    //   }}
                    // >
                    //   The email or password you entered doesn't match our
                    //   records. Please double-check and try again
                    // </span>
                    <Typography
                      className="d-block mb-2"
                      size={16}
                      font={EFonts.MontserratMedium}
                      style={{
                        backgroundColor: "rgba(245, 51, 79, 0.03)",
                        color: "#ff0000",
                        padding: "13px 18px",
                        fontWeight: 500,
                        lineHeight: "28px",
                        borderRadius: 10,
                      }}
                    >
                      The email or password you entered doesn't match our
                      records. Please double-check and try again
                    </Typography>
                  )}
                  <CardTitle
                    tag="h2"
                    className="mb-0 text-start text-black font-montserrat-semiBold fs-29"
                  >
                    Sign In
                  </CardTitle>
                  {/* <span className="fs-8">
                    Please enter the email address and password
                  </span> */}
                  <Typography
                    size={18}
                    font={EFonts.MontserratMedium}
                    style={{
                      color: "#000000a3",
                    }}
                  >
                    Please enter the email address and password
                  </Typography>
                  <InputText
                    name="email"
                    placeholder="someone@mail.com"
                    label={"Email Address"}
                    id="email"
                    icon={<Mail size="15" />}
                    onChange={(val) => {
                      setFieldValue("email", val.target.value);
                      setApiError(false);
                    }}
                    wrapperClassName="mb-1 mt-2"
                    customeLabelClass="font-montserrat-medium fs-18"
                  />
                  <InputText
                    name="password"
                    placeholder="············"
                    label={"Password"}
                    id="password"
                    type="password"
                    onChange={(val) => {
                      setFieldValue("password", val.target.value);
                      setApiError(false);
                    }}
                    wrapperClassName="mb-1 mt-2"
                    customeLabelClass="font-montserrat-medium fs-18"
                  />
                  <div className="d-flex justify-content-between mt-1 mb-3">
                    <CheckBox
                      name="remember"
                      label="Remember password"
                      id="remember"
                      labelClass="font-montserrat-medium fs-15"
                    />
                    <Link to="/forgot-password">
                      <small
                        className="font-montserrat-medium fs-15"
                        style={{ color: "#3144c4" }}
                      >
                        Forgot Password?
                      </small>
                    </Link>
                  </div>
                  <SubmitButton
                    color="primary"
                    isLoading={login.isLoading || emailAuth.isLoading}
                    block
                    className="w-100 mb-2 font-montserrat-medium fs-21"
                    type="submit"
                    schema={loginValidation}
                  >
                    Sign in
                  </SubmitButton>
                  <div className="w-100 text-center">
                    {/* <span className="fs-8 me-1">Don't have an account?</span> */}
                    <Typography
                      className="me-1"
                      size={18}
                      font={EFonts.MontserratMedium}
                      style={{
                        color: "#1d1d1d",
                      }}
                    >
                      Don't have an account?
                    </Typography>
                    <Link
                      to="/register"
                      className="font-montserrat-semiBold fs-19"
                      style={{ color: "#19257c" }}
                    >
                      Sign Up
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

export { Login };
