// ** React Imports
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// ** Icons Imports
import { Mail } from "react-feather";

// ** Custom Components
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import toast from "react-hot-toast";
import { useEmailAuthorization } from "@src/core/services/api/auth/auth.api";
import { emailAuthValidation } from "@src/core/validations/auth.validation";

// ** Reactstrap Imports
import { CardTitle, Row, Col } from "reactstrap";

// ** Images
import RealtyBack from "@assets/images/pages/RegisterRealtyLogo1.png";
import RegisterBack2 from "@assets/images/pages/RegisterBack2.webp";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { handleAuthEmail } from "@src/redux/user";
import { Typography } from "@src/components/common/Typography";
import { EFonts } from "@src/core/enum/fonts.enum";

const EmailCheck: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailAuth = useEmailAuthorization();

  const onSubmit = (value: any, { setFieldError }: any) => {
    const obj: { email: string } = {
      email: value.email,
    };
    emailAuth.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          if (res.data.result.exists) {
            navigate("/login");
          } else {
            navigate("/register");
          }
          dispatch(handleAuthEmail(value.email));
        } else {
          setFieldError("email", res.data.error);
          toast.error(res.data.error);
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
            style={{ paddingTop: "18%" }}
          >
            <FormWrapper
              initialValues={{
                email: "",
              }}
              validationSchema={emailAuthValidation}
              onSubmit={onSubmit}
              className="h-100 w-100 d-inline-block"
            >
              <CardTitle
                tag="h4"
                className="mb-0 text-start text-black font-montserrat-semiBold fs-29"
              >
                Email Check
              </CardTitle>
              {/* <span className="fs-8">Please enter your email address</span> */}
              <Typography
                size={18}
                font={EFonts.MontserratMedium}
                style={{
                  color: "#1d1d1da3",
                }}
              >
                Please enter your email address
              </Typography>

              <InputText
                name="email"
                placeholder="someone@mail.com"
                label={"Email Address"}
                id="email"
                icon={<Mail size="15" />}
                wrapperClassName="mb-1 mt-2"
                customeLabelClass="font-montserrat-medium fs-18"
              />
              <SubmitButton
                color="primary"
                isLoading={emailAuth.isLoading}
                block
                className="w-100 mb-2 mt-2 font-montserrat-medium fs-21"
              >
                Next
              </SubmitButton>
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

export { EmailCheck };
