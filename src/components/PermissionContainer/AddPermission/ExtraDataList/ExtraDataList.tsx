import { CardActions } from "@src/components/common/card-actions";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import { PermissionTargetTypes } from "@src/core/data/btt.data";
import { FieldArray, useFormikContext } from "formik";
import { FC } from "react";
import { X } from "react-feather";
import { StylesConfig } from "react-select";
import { CardBody, Col, Table } from "reactstrap";

const SelectCustomStyle: StylesConfig = {
  control: (prop) => {
    return {
      ...prop,
      padding: 0,
      minHeight: 30,
    };
  },
  valueContainer: (prop) => ({
    ...prop,
    paddingTop: 0,
    marginTop: 0,
    width: 50,
  }),
  indicatorsContainer: (prop) => ({ ...prop, height: 30 }),
};

interface IPermissionsListProp {
  fullWidth?: boolean;
  title?: string;
}

const PermissionsList: FC<IPermissionsListProp> = ({
  fullWidth,
  title,
}): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <Col sm={12} xs={12} md={12} xl={fullWidth ? 12 : 8} className="ps-0 pe-0">
      <CardActions
        title={title ? title : "Permissions Details"}
        actions={[]}
        noShadow
        endReload={(endLoading: any) => {}}
        headerClassName="ps-0 pe-0 mt-1"
      >
        <CardBody className="pt-0 ps-0 pe-0">
          <Table
            responsive="xs"
            bordered
            className="overflow-visible"
            size="sm"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Target type</th>
                <th>Is boolean</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <FieldArray
                name="permissions"
                render={(arrayHelpers) => (
                  <>
                    {values.permissions && values.permissions.length > 0
                      ? values.permissions.map((comp: any, index: number) => (
                          <tr key={index}>
                            <td>
                              <InputText
                                name={`permissions[${index}].key`}
                                placeholder="Name..."
                                noColor
                                size={30}
                                bsSize="sm"
                                noErrorMessage
                              />
                            </td>
                            <td>
                              <SelectOption
                                name={`permissions[${index}].type`}
                                placeholder="Type..."
                                options={PermissionTargetTypes}
                                defaultValue={{
                                  value: "staff",
                                  label: "Staff",
                                }}
                                customStyle={SelectCustomStyle}
                                noErrorMessage
                              />
                            </td>
                            <td>
                              <SelectOption
                                name={`permissions[${index}].is_boolean`}
                                placeholder="Type..."
                                options={[
                                  { value: 1, label: "True" },
                                  { value: 2, label: "False" },
                                ]}
                                customStyle={SelectCustomStyle}
                                defaultValue={{ value: 1, label: "True" }}
                                noErrorMessage
                              />
                            </td>
                            <td onClick={() => arrayHelpers.remove(index)}>
                              <X size={18} className="cursor-pointer" />
                            </td>
                          </tr>
                        ))
                      : null}
                  </>
                )}
              />
            </tbody>
          </Table>
          <SubmitButton
            className="rounded-0 text-gray2 fs-6"
            outline
            color="light"
            block
            type="button"
            onClick={() => {
              const oldArr = values.permissions ? [...values.permissions] : [];
              oldArr.push({
                key: "",
                type: { value: "staff", label: "Staff" },
                is_boolean: { value: 1, label: "True" },
              });
              setFieldValue("permissions", oldArr);
            }}
          >
            + Add Item
          </SubmitButton>
        </CardBody>
      </CardActions>
    </Col>
  );
};

export { PermissionsList };
