import React, { FC, Fragment, useState } from "react";
import { ErrorMessage, Field } from "formik";
import { InputGroup, InputGroupText, Label } from "reactstrap";
import Flatpickr from "react-flatpickr";
import classNames from "classnames";
import { Calendar } from "react-feather";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { BaseOptions } from "flatpickr/dist/types/options";

interface IDatePickerProp {
  name: string;
  label?: string;
  id?: string;
  dateClassName?: string;
  noColor?: boolean;
  placeholder?: string;
  size?: number;
  options?: Partial<BaseOptions>;
  customeLabelClass?: string;
  disabled?: boolean;
  fullDate?: boolean;
}

const DatePicker: FC<IDatePickerProp> = ({
  name,
  label,
  id,
  dateClassName,
  noColor,
  placeholder,
  size,
  options,
  customeLabelClass,
  disabled,
  fullDate,
}): JSX.Element => {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <Field name={name}>
      {({
        field,
        meta,
        form: { setFieldValue },
      }: {
        form: any;
        field: any;
        meta: any;
      }) => (
        <Fragment>
          {label && (
            <Label
              className={classNames("form-label", customeLabelClass)}
              for={id}
            >
              {label}
            </Label>
          )}
          <InputGroup className={classNames("input-group-merge")}>
            <InputGroupText
              className={classNames(
                !meta.value && !focus && !noColor && "bg-input-empty",
                meta.touched && !meta.error && "is-valid border-success-form",
                meta.touched && meta.error && "is-invalid border-error-form"
              )}
            >
              <Calendar size={15} />
            </InputGroupText>
            <Flatpickr
              options={options}
              className={classNames(
                "form-control",
                dateClassName,
                !meta.value && !noColor
                  ? "bg-input-empty opacity-100"
                  : "opacity-100 bg-white",
                meta.touched && !meta.error && "is-valid",
                meta.touched && meta.error && "is-invalid"
              )}
              value={meta.value}
              disabled={disabled}
              onChange={(date) =>
                setFieldValue(
                  name,
                  date
                    ? Array.isArray(date) && date.length > 0
                      ? fullDate
                        ? date[0].toISOString()
                        : getCustomDate(date[0].toString())
                      : ""
                    : ""
                )
              }
              id={id}
              placeholder={placeholder}
              // name={name}
              //onFocus={() => setFocus(true)}
              onFocus={() => setFocus(true)}
              size={size}
              //onBlur={() => setFocus(false)}
              onBlur={() => setFocus(false)}
              readOnly={false}
              // {...field}
            />
          </InputGroup>
          <ErrorMessage
            name={name}
            render={(msg) => (
              <span className="text-error-form fs-8">{msg}</span>
            )}
          />
        </Fragment>
      )}
    </Field>
  );
};

export { DatePicker };
