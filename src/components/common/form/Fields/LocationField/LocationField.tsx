import React, { FC, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { SelectOption } from "../../common/SelectOption/SelectOption";
import {
  useGetLocationDetail,
  useGetLocationSuggest,
} from "@src/core/services/api/suggestion/suggestion.api";
import { useFormikContext } from "formik";

interface ILocationFieldProp {
  name: string;
  placeholder: string;
  label?: string;
  wrapperClassName?: string;
  isMulti?: boolean;
  isOutline?: boolean;
  disabled?: boolean;
  customeLabelClass?: string;
  noColor?: boolean;
  isClearable?: boolean;
  defaultMargin?: boolean;
  mergeStyle?: boolean;
  customeStyleMultiActive?: boolean;
  creative?: boolean;
  whiteColor?: boolean;
}

const LocationField: FC<ILocationFieldProp> = ({
  name,
  placeholder,
  label,
  wrapperClassName,
  isMulti,
  isOutline,
  disabled,
  customeLabelClass,
  noColor,
  isClearable,
  defaultMargin,
  mergeStyle,
  customeStyleMultiActive,
  creative,
  whiteColor,
}): JSX.Element => {
  const [locationOptions, setLocationOptions] = useState<any>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const getLocation = useGetLocationSuggest();
  const getDetail = useGetLocationDetail();

  const multiStyle: any = {
    multiValueLabel: (base: any) => ({
      ...base,
      color: "#2e2e33 !important",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: "#e6e5ea",
      color: "#2e2e33 !important",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "#2e2e33 !important",
    }),
    valueContainer: (base: any) => ({
      ...base,
      backgroundColor: "#fff",
    }),
  };

  const inputRef = useRef<any>();
  const onInputChange = (val: string) => {
    clearTimeout(inputRef.current);
    let timeOut: any;
    let value = val;
    setInputVal(val);
    if (value && value !== inputVal) {
      value = encodeURIComponent(value);
      timeOut = setTimeout(() => {
        getLocation.mutate(
          { q: val },
          {
            onSuccess: (res) => {
              //console.log(res.data);
              if (res.data.is_success && res.data.result) {
                const result = res.data.result;
                setLocationOptions(
                  result.map((o: any, index: number) => ({
                    value: index + 1,
                    label: o.Text,
                  }))
                );
              }
            },
          }
        );
      }, 500);
      inputRef.current = timeOut;
    }
  };

  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    if (values[name] && typeof values[name] === "string") {
      onChange({ value: 1, label: values[name] }, true);
    }
  }, [values[name]]);

  const onChange = (opt: any, fromApi?: boolean) => {
    //console.log(opt);
    // setFieldValue(name, { ...opt });
    if (isMulti) {
      let val = values[name] ? values[name] : [];
      const op = opt.filter(
        (o: any) => !val.some((i: any) => i.label === o.label)
      );
      val = val.filter((v: any) => opt.some((i: any) => v.label === i.label));
      // console.log(val, op);
      setFieldValue(name, [...val, ...op]);

      if (op && op.length === 1)
        getDetail.mutate(
          { q: op[0].label },
          {
            onSuccess: (vall) => {
              if (vall.data.is_success) {
                const result = vall.data.result;
                if (result && result.length > 0)
                  setFieldValue(name, [
                    ...val,
                    { ...op[0], ...result[0].Place },
                  ]);
                else setFieldValue(name, [...val, { ...op[0] }]);
              }
            },
          }
        );
    } else {
      setFieldValue(name, { ...opt });
      if (opt && opt.label) {
        getDetail.mutate(
          { q: opt.label },
          {
            onSuccess: (val) => {
              if (val.data.is_success) {
                const result = val.data.result;

                if (result && result.length > 0) {
                  if (fromApi) {
                    setInputVal(result[0].Place?.Label);
                    setLocationOptions([{ ...opt }]);
                  }
                  setFieldValue(name, {
                    ...result[0].Place,
                    label: result[0].Place?.Label,
                    value: 1,
                  });
                } else if (!creative) setFieldValue(name, null);
              }
            },
          }
        );
      }
    }
  };

  return (
    <div>
      <SelectOption
        name={name}
        placeholder={getDetail.isLoading ? "Loading..." : placeholder}
        label={label}
        id={name}
        isLoading={getLocation.isLoading || getDetail.isLoading}
        options={locationOptions}
        isMulti={isMulti}
        disabled={getDetail.isLoading || disabled}
        onChange={onChange}
        onInputChange={onInputChange}
        isOutline={isOutline}
        creative={creative}
        wrapperClassName={classNames(
          !defaultMargin ? "mb-1" : "",
          wrapperClassName
        )}
        customeLabelClass={customeLabelClass}
        noColor={noColor}
        isClearable={isClearable}
        mergeStyle={mergeStyle}
        customStyle={customeStyleMultiActive ? multiStyle : null}
        whiteColor={whiteColor}
      />
    </div>
  );
};

export { LocationField };
