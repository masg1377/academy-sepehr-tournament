import { Typography } from "@src/components/common/Typography";
import { EFonts } from "@src/core/enum/fonts.enum";
import { useForgotPassword } from "@src/core/services/api/auth/auth.api";
import classNames from "classnames";
import { useFormikContext } from "formik";
import React, { FC, useState } from "react";
import AuthCode from "react-auth-code-input";
import Countdown from "react-countdown";
import toast from "react-hot-toast";
import { CardTitle, Spinner } from "reactstrap";

interface IStepTwoProp {
  hashedEmail: string;
}

const StepTwo: FC<IStepTwoProp> = ({ hashedEmail }): JSX.Element => {
  const [timer, setTimer] = useState(Date.now() + 300000);

  const { values, setFieldValue, errors, touched }: any = useFormikContext();

  const resendCode = useForgotPassword();

  const onResendCode = (email: string) => {
    resendCode.mutate(email, {
      onSuccess: (result) => {
        setTimer(Date.now() + 300000);
      },
      onError: () => {
        toast.error("Somthing whent wrong! please try again");
      },
    });
  };

  return (
    <>
      <CardTitle
        tag="h4"
        className="mb-1 fs-2 text-start text-black font-montserrat-semiBold fs-29"
      >
        Enter Code
      </CardTitle>
      {/* <span className="fs-5">
        We just sent a verification code to <b>{hashedEmail}</b>
      </span> */}
      <Typography
        className=""
        size={18}
        font={EFonts.MontserratMedium}
        style={{
          color: "#000000a3",
        }}
      >
        We just sent a verification code to <b>{hashedEmail}</b>
      </Typography>
      {/* <span className="d-block fs-5">
        Follow the instructions sent to your email address and reset your
        password.
      </span> */}
      <Typography
        className="d-block"
        size={18}
        font={EFonts.MontserratMedium}
        style={{
          color: "#000000a3",
        }}
      >
        Follow the instructions sent to your email address and reset your
        password.
      </Typography>

      <AuthCode
        onChange={(res) => setFieldValue("code", res)}
        allowedCharacters="numeric"
        inputClassName={classNames(
          "code-input-style",
          errors && errors.code && touched.code && "code-input-style-error"
        )}
        containerClassName="code-wrapper-style"
      />

      <div className="d-flex justify-content-center">
        {/* <span className="d-block me-2 fw-bold fs-5">
          Re-send the code after
        </span> */}
        <Typography
          className="d-block me-2"
          size={18}
          font={EFonts.MontserratMedium}
          style={{
            color: "#000000a3",
          }}
        >
          Re-send the code after
        </Typography>
        <Countdown
          date={timer} //300000}
          key={timer}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (completed) {
              // Render a completed state
              return resendCode.isLoading ? (
                <Spinner
                  size={10}
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  color="primary"
                />
              ) : (
                // <span
                //   onClick={() => onResendCode(values.email)}
                //   className="text-primary d-block fw-bold fs-5 cursor-pointer"
                // >
                //   Resend
                // </span>
                <Typography
                  onClick={() => onResendCode(values.email)}
                  className=" d-block cursor-pointer"
                  size={18}
                  font={EFonts.MontserratMedium}
                  style={{
                    color: "#314bc9",
                  }}
                >
                  Resend
                </Typography>
              );
            }
            return (
              // <span className="text-primary d-block fw-bold fs-5">
              //   {minutes}:{seconds > 9 ? seconds : "0" + seconds}
              // </span>
              <Typography
                className=" d-block"
                size={18}
                font={EFonts.MontserratMedium}
                style={{
                  color: "#314bc9",
                }}
              >
                {minutes}:{seconds > 9 ? seconds : "0" + seconds}
              </Typography>
            );
          }}
        ></Countdown>
      </div>
    </>
  );
};

export { StepTwo };
