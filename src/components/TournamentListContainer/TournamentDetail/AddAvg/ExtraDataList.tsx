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
        title="Check Lists"
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
                <th>Title</th>
                <th>Score</th>
                <th>Total</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              <FieldArray
                name="checkLists"
                render={(arrayHelpers) => (
                  <>
                    {values.checkLists && values.checkLists.length > 0
                      ? values.checkLists.map((comp: any, index: number) => (
                          <tr key={index}>
                            <td>{comp.title}</td>
                            <td>
                              <InputText
                                name={`checkLists[${index}].score`}
                                placeholder="Order"
                                noColor
                                size={10}
                                bsSize="sm"
                              />
                            </td>
                            <td>{comp.totalScore}</td>
                          </tr>
                        ))
                      : null}
                  </>
                )}
              />
            </tbody>
          </Table>
        </CardBody>
      </CardActions>
    </Col>
  );
};

export { ExtraDataList };
