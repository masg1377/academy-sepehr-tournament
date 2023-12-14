import { RippleButton } from "@src/components/common/ripple-button";
import classNames from "classnames";
import { useFormikContext } from "formik";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { Spinner } from "reactstrap";
import * as yup from "yup";

interface ISubmitButtonProp {
  type?: string;
  isLoading?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  color?: string;
  block?: boolean;
  outline?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: string;
  schema?: yup.ObjectSchema<any>;
  values?: any;
  noForm?: boolean;
}

const SubmitButton: FC<ISubmitButtonProp> = ({
  type,
  isLoading,
  children,
  color,
  block,
  outline,
  className,
  onClick,
  disabled,
  size,
  schema,
  values,
  noForm,
}): JSX.Element => {
  const form = noForm ? undefined : useFormikContext();
  // console.log(form);
  const onValidate = () => {
    schema
      ?.validate(form && form.values ? form.values : values)
      .then((res) => {})
      .catch((err) => {
        toast.error(err.message ? err.message : "Fill all fields on form!");
      });
  };

  return (
    <RippleButton
      outline={outline}
      color={color ? color : "primary"}
      type={isLoading ? "button" : type ? type : "submit"}
      className={block ? classNames(className, "w-100") : className}
      onClick={() => {
        onClick && onClick();
        // console.log(schema, type);
        if (schema && type === "submit") {
          onValidate();
        }
      }}
      disabled={isLoading ? true : disabled}
      size={size}
    >
      {isLoading ? (
        <>
          <Spinner
            color={outline ? (color ? color : "primary") : "white"}
            size="sm"
          />
          <span className="ms-50">Loading...</span>
        </>
      ) : (
        children
      )}
    </RippleButton>
  );
};

export { SubmitButton };
