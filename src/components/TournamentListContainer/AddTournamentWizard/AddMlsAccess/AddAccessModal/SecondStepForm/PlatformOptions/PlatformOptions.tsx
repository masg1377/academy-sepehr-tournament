import { CardActions } from "@src/components/common/card-actions";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { mlsTargetType, reportIntervalData } from "@src/core/data/mls.data";
import { useFormikContext } from "formik";
import React, { FC } from "react";
import { X } from "react-feather";
import { StylesConfig } from "react-select";
import { Table } from "reactstrap";

const SelectCustomStyle: StylesConfig = {
  control: (prop) => ({
    ...prop,
    padding: 0,
    minHeight: 30,
  }),
  valueContainer: (prop) => ({
    ...prop,
    paddingTop: 0,
    marginTop: 0,
  }),
  indicatorsContainer: (prop) => ({ ...prop, height: 30 }),
};

const PlatformOptions: FC = (): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<any>();

  const { platformOptions } = values;

  const handleRemoveDesc = (index: number) => {
    setFieldValue(
      "platformOptions",
      platformOptions
        ? platformOptions.filter((o: any, ind: number) => ind !== index)
        : []
    );
  };

  const handleAdd = () => {
    let valList = platformOptions ? [...platformOptions] : [];
    valList.push({
      type: null,
      description: "",
      value: "",
    });

    setFieldValue("platformOptions", valList);
  };

  return (
    <CardActions
      title="Options"
      actions={[]}
      noShadow
      endReload={(endLoading: any) => {}}
      noBottom
    >
      <div>
        <Table responsive="xs" bordered className="overflow-visible" size="sm">
          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {platformOptions && platformOptions.length > 0
              ? platformOptions.map((comp: any, index: number) => (
                  <tr key={index}>
                    <td>
                      <InputText
                        name={`platformOptions[${index}].description`}
                        placeholder="Enter ..."
                        noColor
                        size={20}
                        noErrorMessage
                        bsSize="sm"
                      />
                    </td>
                    <td>
                      <SelectOption
                        name={`platformOptions[${index}].type`}
                        placeholder="Select"
                        options={[
                          { value: 1, label: "Text" },
                          { value: 2, label: "Number" },
                        ]}
                        noErrorMessage
                        customStyle={SelectCustomStyle}
                      />
                    </td>
                    <td>
                      <InputText
                        name={`platformOptions[${index}].value`}
                        placeholder="Enter ..."
                        noColor
                        size={20}
                        noErrorMessage
                        bsSize="sm"
                      />
                    </td>
                    <td onClick={() => handleRemoveDesc(index)}>
                      <X size={18} className="cursor-pointer" />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
        <SubmitButton
          className="rounded-0 text-gray2 fs-6 text-primary"
          outline
          color="light"
          block
          type="button"
          onClick={() => handleAdd()}
        >
          + Add Item
        </SubmitButton>
      </div>
    </CardActions>
  );
};

export { PlatformOptions };
