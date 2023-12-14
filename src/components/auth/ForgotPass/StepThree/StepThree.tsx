import { InputText } from "@src/components/common/form/common/InputText";
import { Typography } from "@src/components/common/Typography";
import { ValidatePasswordStrong } from "@src/components/common/ValidatePasswordStrong/ValidatePasswordStrong";
import { EFonts } from "@src/core/enum/fonts.enum";
import { validPasswordRegex } from "@src/core/utils/regex.utils";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { FC } from "react";
import { CardTitle } from "reactstrap";

const StepThree: FC = (): JSX.Element => {
  const { values }: any = useFormikContext();

  return (
    <>
      <CardTitle tag="h4" className="mb-1 fs-2 text-start text-black font-montserrat-semiBold fs-29">
        Update password
      </CardTitle>
      {/* <span className="fs-5">Please choose a new password</span> */}
      <Typography
        className=""
        size={18}
        font={EFonts.MontserratMedium}
        style={{
          color: "#000000a3",
        }}
      >
        Please choose a new password
      </Typography>

      <InputText
        name="password"
        placeholder="*************"
        label={"New Password"}
        id="password"
        type="password"
        // icon={<Pass size="15" />}
        wrapperClassName="mb-1 mt-2"
        customeLabelClass="font-montserrat-medium fs-18"
      />

      <ValidatePasswordStrong value={values.password ? values.password : ""} />

      <InputText
        name="confirmPassword"
        placeholder="*************"
        label={"Confirm password"}
        id="confirmPassword"
        type="password"
        // icon={<Pass size="15" />}
        wrapperClassName="mb-1 mt-2"
        customeLabelClass="font-montserrat-medium fs-18"
      />
    </>
  );
};

export { StepThree };
