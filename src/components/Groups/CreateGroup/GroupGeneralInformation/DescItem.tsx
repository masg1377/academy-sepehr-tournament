import { Typography } from "@src/components/common/Typography";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { FieldArray, useFormikContext } from "formik";
import React, { FC, useEffect } from "react";
import { ChevronDown, PlusCircle } from "react-feather";
import enFlag from "@assets/images/flags/USA-flag.png";
import frFlag from "@assets/images/flags/France-flag.png";

interface IDescItemProp {
  name: string;
  placeholder: string;
  label: string;
  customeLabelClass?: string;
  wrapperClassName?: string;
}

const DescItem: FC<IDescItemProp> = ({
  name,
  label,
  placeholder,
  customeLabelClass,
  wrapperClassName,
}): JSX.Element => {
  const { values, setFieldValue }: any = useFormikContext();
  useEffect(() => {
    const currentValue = values[name] ? [...values[name]] : [];

    if (currentValue?.length === 0) {
      setFieldValue(name, [{ language: { value: 1, label: "EN" }, text: "" }]);
    }
  }, [values[name]]);

  return (
    <div className="mb-3 mt-2">
      <FieldArray name={name}>
        {(fieldArrayProps: any) => {
          const { form, push } = fieldArrayProps;
          const { values } = form;
          return (
            <div>
              {values[name]?.map((m: any, index: number) => {
                return (
                  <div key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className={
                          customeLabelClass ? customeLabelClass : "ft-14"
                        }
                      >
                        {index === 0 && label}
                      </span>
                      <div className="d-flex align-items-center ">
                        <img
                          src={
                            m?.language?.value === 1 ||
                            (typeof m?.language?.value === "string" &&
                              (m?.language?.value
                                ?.toLowerCase()
                                ?.includes("us") ||
                                m?.language?.value
                                  ?.toLowerCase()
                                  ?.includes("en")))
                              ? enFlag
                              : frFlag
                          }
                          style={{ width: "30px", height: "20px" }}
                        />
                        <SelectOption
                          name={`${name}[${index}].language`}
                          options={[
                            { value: 1, label: "EN" },
                            { value: 2, label: "FR" },
                          ]}
                          placeholder=""
                          customStyle={{
                            valueContainer: (base) => ({
                              ...base,
                              padding: "0 !important ",
                              flex: "none",
                              fontSize: "14px",
                              fontFamily: "MontserratRegular",
                            }),
                            singleValue: (base) => ({
                              ...base,
                              color: "#07aed0 !important",
                              fontSize: "14px",
                              fontFamily: "MontserratRegular",
                            }),
                            container: (base) => ({
                              ...base,
                              border: "none !important",
                            }),
                            control: (base) => ({
                              ...base,
                              border: "none !important",
                              backgroundColor: "(255,255,255,0)",
                              fontSize: "14px",
                              fontFamily: "MontserratRegular",
                            }),
                            menuList: (base, props) => ({
                              fontSize: "12px",
                            }),
                          }}
                          wrapperClassName=" color-blue07  p-0 cursor-pointer"
                          isOutline2
                          myComponents={{
                            DropdownIndicator: () => (
                              <ChevronDown size={20} color="#07aed0" />
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <InputText
                      name={`${name}[${index}].text`}
                      placeholder={placeholder}
                      noColor
                      type="textarea"
                      wrapperClassName={
                        wrapperClassName ? wrapperClassName : "mb-1"
                      }
                      customeLabelClass={
                        customeLabelClass ? customeLabelClass : "fs-18"
                      }
                      inputClassName="h-150 d-flex align-items-center"
                    />
                  </div>
                );
              })}
              <span
                className="cursor-pointer"
                style={{ marginTop: "13px" }}
                onClick={() =>
                  push({ language: { value: 1, label: "EN" }, text: "" })
                }
              >
                <PlusCircle size={20} color="#07aed0" />
                <Typography
                  style={{ color: "#07aed0" }}
                  size={14}
                  className="ms-1"
                >
                  Add title in another language
                </Typography>
              </span>
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default DescItem;
