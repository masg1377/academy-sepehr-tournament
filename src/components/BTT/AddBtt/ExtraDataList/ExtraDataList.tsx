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

const ExtraDataList: FC = (): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <Col sm={12} xs={12} md={12} xl={8} className="ps-0 pe-0">
      <CardActions
        title="Extra Data"
        actions={[]}
        noShadow
        endReload={(endLoading: any) => {}}
        headerClassName="ps-0 pe-0"
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
                <th>Key</th>
                <th>Type</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <FieldArray
                name="extraData"
                render={(arrayHelpers) => (
                  <>
                    {values.extraData && values.extraData.length > 0
                      ? values.extraData.map((comp: any, index: number) => (
                          <tr key={index}>
                            <td>
                              <InputText
                                name={`extraData.key-${index}`}
                                placeholder="key"
                                noColor
                                size={30}
                                bsSize="sm"
                              />
                            </td>
                            <td>
                              <SelectOption
                                name={`extraData.type-${index}`}
                                placeholder="Type..."
                                options={[]}
                                customStyle={SelectCustomStyle}
                              />
                            </td>
                            <td>
                              <InputText
                                name={`extraData.order-${index}`}
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
              const oldArr = values.extraData ? [...values.extraData] : [];
              oldArr.push({
                [`key-` + oldArr.length]: "",
                [`type-` + oldArr.length]: "",
                [`order-` + oldArr.length]: "",
              });
              setFieldValue("extraData", oldArr);
            }}
          >
            + Add Item
          </SubmitButton>
        </CardBody>
      </CardActions>
    </Col>
  );
};

export { ExtraDataList };
