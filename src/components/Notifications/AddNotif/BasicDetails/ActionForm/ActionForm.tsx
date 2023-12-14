import Lang from "@src/assets/images/icons/lang.png";
import { CardActions } from "@src/components/common/card-actions";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { RippleButton } from "@src/components/common/ripple-button";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { FC, useState } from "react";
import { ChevronDown, ChevronUp, X } from "react-feather";
import { StylesConfig } from "react-select";
import { CardBody, Col, Table } from "reactstrap";

interface IActionFormProp {
  editMode?: boolean;
}

const ActionForm: FC<IActionFormProp> = ({ editMode }): JSX.Element => {
  const { values, setFieldValue, errors } = useFormikContext<any>();

  //console.log(values["language"].length);

  // const handleRemove = () => {
  //   const valList = [...values["action"]];
  //   const filteredData = valList.filter((val) => val.value !== action.value);
  //   setFieldValue("action", filteredData);
  // };

  const handleRemoveDesc = (index: number, descKey: string) => {
    let valList = [...values["action"]];
    // const newDesc = valList.filter((v: any, ind: number) => ind !== index);
    // let lang = valList;
    // lang[descKey] = newDesc;
    // const curIndex = valList.findIndex((val) => val.value === lang.value);
    // valList[curIndex] = lang;
    setFieldValue(
      "action",
      valList.filter((v: any, ind: number) => ind !== index)
    );
  };

  const handleAddDesc = (descKey: string) => {
    let valList = [...values["action"]];
    valList.push({
      name: "",
      url: "",
      noticeMessage: "",
    });

    setFieldValue("action", valList);
  };

  return (
    // <Col xxl={8} className="border border-2 rounded-3 p-2 mb-1">
    <>
      <CardActions
        title=""
        actions={[]}
        noShadow
        endReload={(endLoading: any) => {}}
        noBottom
      >
        <div>
          <Table
            responsive="xs"
            bordered
            className="overflow-visible"
            size="sm"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Notice message</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {values["action"] && values["action"].length > 0
                ? values["action"].map((comp: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <InputText
                          name={`action[${index}].name`}
                          placeholder="Name..."
                          noColor
                          size={15}
                          bsSize="sm"
                          noErrorMessage
                        />
                      </td>
                      <td>
                        <InputText
                          name={`action[${index}].url`}
                          placeholder="Url..."
                          noColor
                          size={15}
                          bsSize="sm"
                          noErrorMessage
                        />
                      </td>
                      <td>
                        <InputText
                          name={`action[${index}].noticeMessage`}
                          placeholder="Notice message..."
                          noColor
                          size={15}
                          bsSize="sm"
                          noErrorMessage
                        />
                      </td>

                      <td
                        onClick={() => handleRemoveDesc(index, "description")}
                      >
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
            onClick={() => handleAddDesc("description")}
          >
            + Add Item
          </SubmitButton>
        </div>
      </CardActions>
    </>
    // </Col>
  );
};

export { ActionForm };
