import React, { FC, useEffect, useState } from "react";
import Select, {
  StylesConfig,
  components,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  ValueContainerProps,
  PlaceholderProps,
  ControlProps,
  GroupBase,
} from "react-select";
import { Label } from "reactstrap";
import { ErrorMessage, Field } from "formik";
import CreatableSelect from "react-select/creatable";
import { selectThemeColors } from "@src/core/utils/Utils";
import OutlineSelectOptions from "./OutlineSelectOptions/OutlineSelectOptions";
import classNames from "classnames";
import { customStyles } from "./../../../../MLSListContainer/MLSDetail/PaymentInfo/data";
import { SelectComponents } from "react-select/dist/declarations/src/components";
import { X } from "react-feather";

interface ISelectOptionProp {
  isClearable?: boolean;
  name: string;
  isMulti?: boolean;
  placeholder: string;
  label?: string;
  id?: string;
  defaultValue?: any;
  options: any[];
  customStyle?: StylesConfig<any>;
  mergeStyle?: boolean;
  wrapperClassName?: string;
  creative?: boolean;
  value?: any;
  onChange?: (val: any, action: any) => void;
  noErrorMessage?: boolean;
  isLoading?: boolean;
  onInputChange?: (val: string) => void;
  noFilter?: boolean;
  disabled?: boolean;
  isOutline?: boolean;
  isOutline2?: boolean;
  isRequired?: boolean;
  customeLabelClass?: string;
  noColor?: boolean;
  myComponents?: Partial<SelectComponents<any, any, GroupBase<any>>>;
  secondStyle?: any;
  nameValue?: boolean;
  onRemoveItem?: (data: any, vals: any) => void;
  onFocus?: () => void;
  wrapperStyle?: any;
  onBlur?: () => void;
  whiteColor?: boolean;
}

const SelectOption: FC<ISelectOptionProp> = ({
  isClearable,
  name,
  isMulti,
  placeholder,
  label,
  id,
  defaultValue,
  options,
  customStyle,
  mergeStyle,
  wrapperClassName,
  creative,
  value,
  onChange,
  noErrorMessage,
  isLoading,
  onInputChange,
  noFilter,
  disabled,
  isOutline,
  isOutline2,
  customeLabelClass,
  noColor,
  myComponents,
  nameValue,
  onRemoveItem,
  onFocus,
  onBlur,
  wrapperStyle,
  isRequired,
  whiteColor,
}): JSX.Element => {
  //   const colorOptions = [
  //     { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  //     { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
  //     { value: "purple", label: "Purple", color: "#5243AA", isFixed: true },
  //     { value: "red", label: "Red", color: "#FF5630", isFixed: false },
  //     { value: "orange", label: "Orange", color: "#FF8B00", isFixed: false },
  //     { value: "yellow", label: "Yellow", color: "#FFC400", isFixed: false },
  //   ];

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
        <div className={wrapperClassName} style={wrapperStyle}>
          {label && (
            <Label
              className={classNames("form-label", customeLabelClass)}
              id={id}
            >
              {label} {isRequired ? <X size={10} color="#f5334f" /> : null}
            </Label>
          )}

          <SelectOptionField
            creative={creative}
            isClearable={isClearable}
            defaultValue={defaultValue}
            isMulti={isMulti}
            name={name}
            id={id}
            isLoading={isLoading}
            options={options}
            onInputChange={onInputChange}
            customStyle={customStyle}
            mergeStyle={mergeStyle}
            meta={meta}
            placeholder={placeholder}
            onChange={onChange}
            setFieldValue={setFieldValue}
            value={value}
            noFilter={noFilter}
            disabled={disabled}
            isOutline={isOutline}
            isOutline2={isOutline2}
            noColor={noColor}
            myComponents={myComponents}
            onRemoveItem={onRemoveItem}
            onFocus={onFocus}
            onBlur={onBlur}
            whiteColor={whiteColor}
            //hideSelectedOptions={hideSelectedOptions}
          />

          {!noErrorMessage && (
            <ErrorMessage
              name={name}
              render={(msg: any) => {
                console.log(name, msg);
                return (
                  <span className="text-error-form fs-8">
                    {typeof msg === "object"
                      ? Array.isArray(msg)
                        ? typeof msg[0] === "object"
                          ? msg[0]?.value || msg[0]?.label
                          : msg[0]
                        : msg?.value || msg?.label
                      : msg}
                  </span>
                );
              }}
              // render={(msg) => {
              //   console.log(msg);
              //   return <span>ss</span>;
              // }}
            />
          )}
        </div>
      )}
    </Field>
  );
};

const MultiValueContainer = (props: MultiValueGenericProps<any>) => {
  return (
    <div className="d-none">
      <components.MultiValueContainer {...props}>
        hello
      </components.MultiValueContainer>
    </div>
  );
};
const ValueContainer = ({ children, ...props }: any) => (
  <components.ValueContainer {...props}>
    <components.Placeholder {...props}>
      {props.selectProps.placeholder}
    </components.Placeholder>
    {React.Children.map(children, (child) =>
      child && child.key !== "placeholder" ? child : null
    )}
  </components.ValueContainer>
);

const SelectOptionField: FC<any> = (props): JSX.Element => {
  const SelectField = props.creative ? CreatableSelect : Select;
  const [selectedVal, setSelectedVal] = useState<any>(null);

  const handleRemoveItemPackage = (data: any) => {
    // props.onRemoveItem && props.onRemoveItem(data, props.meta.value);
    const newVal = props.meta.value.filter((o: any) => o.value !== data);
    props.setFieldValue(props.name, newVal);
    setSelectedVal(newVal);
  };
  useEffect(() => {
    if (props.meta.value) {
      if (props.options && !props.meta.value.label && !props.isMulti) {
        const sel = props.options.find(
          (o: any) => o.value === props.meta.value.value
        );
        setSelectedVal(sel);
      } else setSelectedVal(props.meta.value);
    } else setSelectedVal(null);
  }, [props.meta.value, props.options]);

  return (
    <React.Fragment>
      <SelectField
        isClearable={props.isClearable}
        createOptionPosition="first"
        theme={selectThemeColors}
        defaultValue={props.defaultValue}
        isMulti={props.isMulti}
        name={props.name}
        id={props.id}
        isLoading={props.isLoading}
        loadingMessage={() => (
          <span className="fs-5 text-black">Loading...</span>
        )}
        options={props.options}
        isDisabled={props.disabled}
        onInputChange={
          props.onInputChange ? (val) => props.onInputChange(val) : undefined
        }
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        className="react-select"
        styles={
          props.customStyle
            ? props.mergeStyle
              ? {
                  ...props.customStyle,
                  control: (prop) => ({
                    ...prop,
                    backgroundColor: !props.noColor
                      ? !props.meta.value
                        ? "#f4f3f9"
                        : props.whiteColor
                        ? "white"
                        : undefined
                      : props.whiteColor
                      ? "white"
                      : undefined,

                    border:
                      props.meta.error && props.meta.touched
                        ? "1px solid #ea5455"
                        : !props.meta.error && props.meta.touched
                        ? "1px solid #28c76f"
                        : !props.meta.value
                        ? "1px solid #e1e0ea"
                        : undefined,
                    //...props.customStyle.control(prop),
                  }),
                  menu: (prop) => ({
                    ...prop,
                    zIndex: 100,
                    //...props.customStyle.menu(prop),
                  }),

                  //   container: (prop) => ({ ...prop, height: 10 }),
                  //   input: (prop) => ({ ...prop, height: 10 }),
                  //   valueContainer: (prop) => ({ ...prop, height: 10 }),
                  placeholder: (base, state) => ({
                    ...base,
                    display: state.selectProps.inputValue ? "none" : "block",
                    //...props.customStyle.placeholder(base),
                  }),
                }
              : props.customStyle
            : {
                control: (prop) => ({
                  ...prop,
                  backgroundColor: !props.noColor
                    ? !props.meta.value
                      ? "#f4f3f9"
                      : props.whiteColor
                      ? "white"
                      : undefined
                    : props.whiteColor
                    ? "white"
                    : undefined,

                  border:
                    props.meta.error && props.meta.touched
                      ? "1px solid #ea5455"
                      : !props.meta.error && props.meta.touched
                      ? "1px solid #28c76f"
                      : !props.meta.value
                      ? "1px solid #e1e0ea"
                      : undefined,
                }),
                menu: (prop) => ({ ...prop, zIndex: 100 }),
                //   container: (prop) => ({ ...prop, height: 10 }),
                //   input: (prop) => ({ ...prop, height: 10 }),
                //   valueContainer: (prop) => ({ ...prop, height: 10 }),
                placeholder: (base, state) => ({
                  ...base,
                  display: state.selectProps.inputValue ? "none" : "block",
                }),
              }
        }
        classNamePrefix="select"
        placeholder={props.placeholder}
        onChange={
          props.onChange
            ? props.onChange
            : (opt) => props.setFieldValue(props.name, opt)
        }
        value={props.value ? props.value : selectedVal}
        {...(props.noFilter ? { filterOption: () => true } : {})}
        components={
          props.isOutline
            ? { ValueContainer, MultiValueContainer }
            : props.isOutline2
            ? props.myComponents
            : {}
        }
      />

      {props.isOutline && (
        <OutlineSelectOptions
          outline={props.isOutline}
          metaValue={props.value ? props.value : props.meta.value}
          handleRemoveItem={
            props.onRemoveItem
              ? (data) => props.onRemoveItem(data, props.meta.value)
              : handleRemoveItemPackage
          }
        />
      )}
    </React.Fragment>
  );
};

export { SelectOption };
