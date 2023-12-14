import React, { FC, ReactNode, useState } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { Eye, EyeOff } from "react-feather";
import classNames from "classnames";
import Cleave from "cleave.js/react";
import { CleaveOptions } from "cleave.js/options";
import "cleave.js/dist/addons/cleave-phone.us";

interface INumeralInputProp {
  name: string;
  placeholder: string;
  icon?: JSX.Element | ReactNode;
  type?: string;
  id?: string;
  autoFocus?: boolean;
  label?: string;
  iconSize?: number;
  hideIcon?: any;
  showIcon?: any;
  wrapperClassName?: string;
  noColor?: boolean;
  size?: number;
  bsSize?: "sm" | "lg";
  onChange?: (val: any) => void;
  value?: any;
  noErrorMessage?: boolean;
  customError?: string;
  inputClassName?: string;
  disabled?: boolean;
  customeLabelClass?: string;
  customGroupButton?: JSX.Element | ReactNode;
  min?: string;
  max?: string;
  options: CleaveOptions;
}

const MaskInput: FC<INumeralInputProp> = ({
  name,
  placeholder,
  icon,
  type,
  id,
  autoFocus,
  label,
  iconSize,
  hideIcon,
  showIcon,
  wrapperClassName,
  noColor,
  size,
  bsSize,
  onChange,
  value,
  noErrorMessage,
  customError,
  inputClassName,
  disabled,
  customeLabelClass,
  customGroupButton,
  min,
  max,
  options,
}): JSX.Element => {
  const [inputVisibility, setInputVisibility] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  // console.log(customError);

  const { errors } = useFormikContext<any>();

  // ** Renders Icon Based On Visibility
  const renderIcon = () => {
    const size = iconSize ? iconSize : 14;

    if (inputVisibility === false) {
      return hideIcon ? hideIcon : <Eye size={size} />;
    } else {
      return showIcon ? showIcon : <EyeOff size={size} />;
    }
  };

  return (
    <Field name={name}>
      {({
        field,
        meta,
        form: { setFieldValue, setFieldTouched },
      }: {
        form: any;
        field: any;
        meta: any;
      }) => {
        // console.log(name, errors["language[0].description"]);
        return (
          <div className={wrapperClassName}>
            {label && (
              <Label
                className={classNames("form-label", customeLabelClass)}
                for={id}
              >
                {label}
              </Label>
            )}
            <InputGroup className={classNames("input-group-merge")}>
              <Cleave
                className={classNames(
                  "form-control",
                  !meta.value && !noColor && "bg-input-empty",
                  meta.touched && !meta.error && "is-valid",
                  ((meta.touched && meta.error) || customError) && "is-invalid",
                  (icon || type === "password") && "bg-img-empty",
                  inputClassName
                )}
                placeholder={placeholder}
                disabled={disabled}
                options={
                  options
                  //   {
                  //   numeral: true,
                  //   numeralThousandsGroupStyle: "thousand",
                  //   prefix: prefix,
                  // }
                }
                id={id}
                size={size}
                autoFocus={autoFocus}
                onFocusCapture={() => setFocus(true)}
                onBlurCapture={() => setFocus(false)}
                {...field}
                {...(onChange ? { onChange: onChange } : {})}
                {...(value ? { value: value } : {})}
                min={min}
                max={max}
                type={
                  type === "password"
                    ? inputVisibility === false
                      ? "password"
                      : "text"
                    : type
                }
              />
              {icon && type !== "password" && (
                <InputGroupText
                  className={classNames(
                    !meta.value && !focus && !noColor && "bg-input-empty",
                    meta.touched &&
                      !meta.error &&
                      "is-valid border-success-form",
                    ((meta.touched && meta.error) || customError) &&
                      "is-invalid border-error-form"
                  )}
                >
                  {icon}
                </InputGroupText>
              )}
              {type === "password" && (
                <InputGroupText
                  className={classNames(
                    "cursor-pointer",
                    !meta.value && !focus && !noColor && "bg-input-empty",
                    meta.touched &&
                      !meta.error &&
                      "is-valid border-success-form",
                    ((meta.touched && meta.error) || customError) &&
                      "is-invalid border-error-form"
                  )}
                  onClick={() => setInputVisibility(!inputVisibility)}
                >
                  {renderIcon()}
                </InputGroupText>
              )}
              {customGroupButton && customGroupButton}
            </InputGroup>
            {customError ? (
              <span className="text-error-form fs-8">{customError}</span>
            ) : (
              !noErrorMessage && (
                <ErrorMessage
                  name={name}
                  render={(msg) => {
                    // console.log(name, msg);
                    return <span className="text-error-form fs-8">{msg}</span>;
                  }}
                  // render={(msg) => {
                  //   console.log(msg);
                  //   return <span>ss</span>;
                  // }}
                />
              )
            )}
          </div>
        );
      }}
    </Field>
  );
};

export { MaskInput };
