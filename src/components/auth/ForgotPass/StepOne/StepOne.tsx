import React, { FC } from "react";
import { CardTitle } from "reactstrap";
import { InputText } from "@src/components/common/form/common/InputText";
import { Mail } from "react-feather";
import { Typography } from "@src/components/common/Typography";
import { EFonts } from "@src/core/enum/fonts.enum";

const StepOne: FC = (): JSX.Element => {
  return (
    <>
      <CardTitle
        tag="h4"
        className="mb-1 fs-2 text-start text-black font-montserrat-semiBold fs-29"
      >
        Recover your password
      </CardTitle>
      {/* <span className="fs-5">Please enter your email address</span> */}
      <Typography
        className=""
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
        label={"Email address"}
        id="email"
        icon={<Mail size="15" />}
        wrapperClassName="mb-1 mt-2"
        customeLabelClass="font-montserrat-medium fs-18"
      />
    </>
  );
};

export { StepOne };
