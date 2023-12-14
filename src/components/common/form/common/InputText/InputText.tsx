import React, { FC, ReactNode, useState } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { Eye, EyeOff, X } from "react-feather";
import classNames from "classnames";

interface IInputTextProp {
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
  onKeyDown?: any;
  value?: any;
  noErrorMessage?: boolean;
  isRequired?: boolean;
  customError?: string;
  inputClassName?: string;
  disabled?: boolean;
  customeLabelClass?: string;
  customGroupButton?: JSX.Element | ReactNode;
  min?: string;
  max?: string;
  hasTik?: boolean;
  customStyle?: any;
  wrapperStyle?: any;
}

const InputText: FC<IInputTextProp> = ({
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
  onKeyDown,
  value,
  noErrorMessage,
  customError,
  inputClassName,
  disabled,
  customeLabelClass,
  customGroupButton,
  min,
  max,
  hasTik,
  customStyle,
  wrapperStyle,
  isRequired,
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
          <div style={wrapperStyle} className={wrapperClassName}>
            {label && (
              <Label
                className={classNames("form-label", customeLabelClass)}
                for={id}
              >
                {label} {isRequired ? <X size={10} color="#f5334f" /> : null}
              </Label>
            )}
            <InputGroup className={classNames("input-group-merge")}>
              <Input
                placeholder={placeholder}
                disabled={disabled}
                onKeyDown={onKeyDown}
                type={
                  type === "password"
                    ? inputVisibility === false
                      ? "password"
                      : "text"
                    : type
                }
                className={classNames(
                  !meta.value && !noColor && "bg-input-empty",
                  meta.touched && !meta.error
                    ? hasTik
                      ? "is-valid"
                      : "is-valid no-back-bg"
                    : "",
                  ((meta.touched && meta.error) || customError) && "is-invalid",
                  (icon || type === "password") && "bg-img-empty",
                  inputClassName
                )}
                id={id}
                size={size}
                bsSize={bsSize}
                autoFocus={autoFocus}
                onFocusCapture={() => setFocus(true)}
                onBlurCapture={() => setFocus(false)}
                {...field}
                {...(onChange ? { onChange: onChange } : {})}
                {...(value ? { value: value } : {})}
                min={min}
                max={max}
                style={customStyle}
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

export { InputText };
