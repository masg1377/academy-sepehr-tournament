import React, { FC } from "react";
import { Check, X } from "react-feather";
import { Field } from "formik";
import { Input, Label } from "reactstrap";
import classNames from "classnames";

interface ISwitchBoxProp {
  name: string;
  defaultChecked?: boolean;
  color?: string;
  children?: any;
  wrapperClassName?: string;
  labelClassName?: string;
  withIcon?: boolean;
  onChange?: (val: boolean) => void;
  //   name: string;
  disabled?: boolean;
  wrapperStyle?: any;
  dFlex?: boolean;
}

const SwitchBox: FC<ISwitchBoxProp> = ({
  name,
  defaultChecked,
  color,
  children,
  labelClassName,
  wrapperClassName,
  withIcon,
  onChange,
  disabled,
  wrapperStyle,
  dFlex,
}): JSX.Element => {
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
      }) => (
        <div
          style={wrapperStyle}
          className={classNames(
            !dFlex ? "d-flex" : "",
            wrapperClassName,
            "form-switch form-check-" + color
          )}
        >
          <Input
            type="switch"
            defaultChecked={defaultChecked}
            id={name}
            name={name}
            checked={meta.value}
            disabled={disabled}
            onChange={
              onChange
                ? (e) => onChange(e.target.checked)
                : (e) => {
                    setFieldValue(name, e.target.checked);
                  }
            }
          />
          {withIcon && <CustomLabel htmlFor={name} />}
          <Label
            for={name}
            className={classNames(
              "form-check-label mb-50 ms-1",
              labelClassName
            )}
          >
            {children}
          </Label>
        </div>
      )}
    </Field>
  );
};

const CustomLabel: FC<any> = ({ htmlFor }) => {
  return (
    <Label className="form-check-label" htmlFor={htmlFor}>
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  );
};

export { SwitchBox };
