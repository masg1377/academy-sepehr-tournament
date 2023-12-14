import { CardActions } from "@src/components/common/card-actions";
import { InputText } from "@src/components/common/form/common/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
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

interface IExtraDataListProp {
  fullWidth?: boolean;
  title?: string;
}

const PermissionDetails: FC<IExtraDataListProp> = ({
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
                <th>Permissions</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <FieldArray
                name="permissions"
                render={(arrayHelpers) => (
                  <>
                    {values.permissions && values.permissions.length > 0
                      ? values.permissions
                          .filter((f: any) => !(f.isRemove && !f.isUpdate))
                          .map((comp: any, index: number) => (
                            <tr key={index}>
                              <td>
                                <InputText
                                  name={`permissions[${index}].description`}
                                  placeholder="description"
                                  noColor
                                  size={30}
                                  bsSize="sm"
                                  onChange={() => {}}
                                  noErrorMessage
                                />
                              </td>
                              <td>
                                {comp.isBoolean ? (
                                  <SelectOption
                                    name={`permissions[${index}].data`}
                                    placeholder="Value..."
                                    options={[
                                      { value: 1, label: "true" },
                                      { value: 2, label: "false" },
                                    ]}
                                    defaultValue={{ value: 1, label: "true" }}
                                    customStyle={SelectCustomStyle}
                                    onChange={(opt: any) => {
                                      let value = values.permissions
                                        ? [...values.permissions]
                                        : [];
                                      value[index] = {
                                        ...value[index],
                                        toggleSelected: true,
                                        data: opt,
                                      };
                                      if (value[index].isServer) {
                                        value[index] = {
                                          ...value[index],
                                          isRemove: true,
                                          isUpdate: true,
                                        };
                                      }
                                      setFieldValue("permissions", value);
                                    }}
                                    noErrorMessage
                                  />
                                ) : (
                                  <InputText
                                    name={`permissions[${index}].data`}
                                    placeholder="Value..."
                                    noColor
                                    // size={30}
                                    bsSize="sm"
                                    type="number"
                                    onChange={(opt: any) => {
                                      let value = values.permissions
                                        ? [...values.permissions]
                                        : [];
                                      value[index] = {
                                        ...value[index],
                                        toggleSelected: true,
                                        data: opt.target.value,
                                      };
                                      if (value[index].isServer) {
                                        value[index] = {
                                          ...value[index],
                                          isRemove: true,
                                          isUpdate: true,
                                        };
                                      }
                                      setFieldValue("permissions", value);
                                    }}
                                    // onChange={() => {}}
                                    noErrorMessage
                                  />
                                )}
                              </td>
                              <td
                                onClick={() => {
                                  let value = [...values.permissions];
                                  if (value[index].isServer) {
                                    console.log(value[index]);
                                    value[index] = {
                                      ...value[index],
                                      isRemove: true,
                                      isUpdate: false,
                                      toggleSelected: false,
                                    };
                                    setFieldValue("permissions", value);
                                  } else {
                                    // arrayHelpers.remove(index);
                                    value = value.filter(
                                      (f) => f.id !== value[index].id
                                    );
                                    setFieldValue("permissions", value);
                                    // console.log(arrayHelpers)
                                  }
                                }}
                              >
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
          {/* <SubmitButton
            className="rounded-0 text-gray2 fs-6"
            outline
            color="light"
            block
            type="button"
            onClick={() => {
              const oldArr = values.permissions ? [...values.permissions] : [];
              oldArr.push({
                description: "",
                value: "",
              });
              setFieldValue("permissions", oldArr);
            }}
          >
            + Add Item
          </SubmitButton> */}
        </CardBody>
      </CardActions>
    </Col>
  );
};

export { PermissionDetails };
