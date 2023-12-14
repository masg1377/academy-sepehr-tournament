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

const MlsComplienceList: FC = (): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <Col sm="12" xs={12}>
      <CardActions
        title="Mls Complience List"
        actions={[]}
        noShadow
        endReload={(endLoading: any) => {}}
      >
        <CardBody className="pt-0">
          <Table
            responsive="xs"
            bordered
            className="overflow-visible"
            size="sm"
          >
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <FieldArray
                name="complience"
                render={(arrayHelpers) => (
                  <>
                    {values.complience && values.complience.length > 0
                      ? values.complience.map((comp: any, index: number) => (
                          <tr key={index}>
                            <td>
                              <InputText
                                name={`complience.provider-${index}`}
                                placeholder="Provider"
                                noColor
                                size={30}
                                bsSize="sm"
                              />
                            </td>
                            <td>
                              <SelectOption
                                name={`complience.type-${index}`}
                                placeholder="Type..."
                                options={[]}
                                customStyle={SelectCustomStyle}
                              />
                            </td>
                            <td>
                              <InputText
                                name={`complience.order-${index}`}
                                placeholder="Order"
                                noColor
                                size={10}
                                bsSize="sm"
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
              const oldArr = values.complience ? [...values.complience] : [];
              oldArr.push({
                [`provider-` + oldArr.length]: "",
                [`type-` + oldArr.length]: "",
                [`order-` + oldArr.length]: "",
              });
              setFieldValue("complience", oldArr);
            }}
          >
            + Add Item
          </SubmitButton>
        </CardBody>
      </CardActions>
    </Col>
  );
};

export { MlsComplienceList };
