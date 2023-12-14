import classNames from "classnames";
import { Field } from "formik";
import React, { FC } from "react";
import { Input, Label } from "reactstrap";

interface ICheckBoxProp {
  name: string;
  defaultChecked?: boolean;
  label: string;
  id?: string;
  color?: string;
  wrapperClass?: string;
  onChange?: (e?: any) => void;
  labelClass?: string;
  checked?: boolean;
  disabled?: boolean;
}

const CheckBox: FC<ICheckBoxProp> = ({
  name,
  defaultChecked,
  label,
  id,
  color = "primary",
  wrapperClass,
  labelClass,
  checked,
  onChange,
  disabled,
}): JSX.Element => {
  return (
    <Field name={name}>
      {({ field, meta, form }: { form: any; field: any; meta: any }) => (
        <div
          className={classNames(
            "form-check",
            `form-check-${color}`,
            wrapperClass
          )}
        >
          <Input
            type="checkbox"
            id={id}
            defaultChecked={defaultChecked}
            {...field}
            checked={meta.value}
            onChange={
              onChange
                ? onChange
                : (e) => form.setFieldValue(name, e.target.checked)
            }
            disabled={disabled}
          />
          <Label
            className={classNames("form-check-label", labelClass)}
            for={id}
          >
            {label}
          </Label>
        </div>
      )}
    </Field>
  );
};

export { CheckBox };
