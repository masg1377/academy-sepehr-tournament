import { right } from "@popperjs/core";
import Lang from "@src/assets/images/icons/lang.png";
import { CardActions } from "@src/components/common/card-actions";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { RippleButton } from "@src/components/common/ripple-button";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { FC, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  X,
  Edit,
  Settings,
  Sliders,
} from "react-feather";
import { StylesConfig } from "react-select";
import { CardBody, Col, Table } from "reactstrap";

const SelectCustomStyle: StylesConfig = {
  control: (prop) => ({
    ...prop,
    padding: 0,
    minHeight: 30,
    // zIndex: 10,
  }),
  valueContainer: (prop) => ({
    ...prop,
    paddingTop: 0,
    marginTop: 0,
  }),
  indicatorsContainer: (prop) => ({ ...prop, height: 30 }),
};

interface ILanguageFormProp {
  language: any;
  index: number;
  editMode?: boolean;
}

const LanguageForm: FC<ILanguageFormProp> = ({
  language,
  index: indexLang,
  editMode,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(
    indexLang === 0 && !editMode ? true : false
  );

  const { values, setFieldValue, errors } = useFormikContext<any>();

  //console.log(values["language"].length);

  const handleRemove = () => {
    const valList = [...values["language"]];
    const filteredData = valList.filter((val) => val.value !== language.value);
    setFieldValue("language", filteredData);
  };

  const handleRemoveDesc = (index: number, descKey: string) => {
    let valList = [...values["language"]];
    const newDesc = language[descKey].filter(
      (v: any, ind: number) => ind !== index
    );
    let lang = language;
    lang[descKey] = newDesc;
    const curIndex = valList.findIndex((val) => val.value === lang.value);
    valList[curIndex] = lang;
    setFieldValue("language", valList);
  };

  const handleAddDesc = (descKey: string) => {
    let valList = [...values["language"]];
    let lang = language;
    lang[descKey].push({
      key: "",
      type: { value: "boolean", label: "Boolean" },
      value: { value: true, label: "True" },
    });
    const curIndex = valList.findIndex((val) => val.value === lang.value);
    valList[curIndex] = lang;
    setFieldValue("language", valList);
  };

  const handleChangeDesc = (
    key: string,
    value: any,
    index: number,
    descKey: string
  ) => {
    let valList = [...values["language"]];
    const newDesc = language[descKey].map((desItem: any, desIndex: number) => {
      if (desIndex === index) {
        if (value?.value === "boolean") {
          return {
            ...desItem,
            type: { value: "boolean", label: "Boolean" },
            value: { value: true, label: "True" },
          };
        } else if (value?.value === "number") {
          return {
            ...desItem,
            type: { value: "number", label: "Number" },
            value: "",
          };
        } else if (value?.value === "text") {
          return {
            ...desItem,
            type: { value: "text", label: "Text" },
            value: "",
          };
        }
      } else return desItem;
    });
    let lang = language;
    lang[descKey] = newDesc;
    const curIndex = valList.findIndex((val) => val.value === lang.value);
    valList[curIndex] = lang;
    setFieldValue("language", valList);
  };

  const customLangDescError = (key: string, index: number, type: string) => {
    const lang: any = errors["language"];

    console.log("lang", lang);
    if (lang && lang[indexLang]) {
      let desc: any = lang[indexLang];
      desc = desc[type];
      console.log("desc", desc);
      if (desc && desc[index]) {
        const er = desc[index][key];
        console.log("er", er, desc[index]);
        return er;
      } else return "";
    }
    return "";
  };

  const handleChangeDesOrder = (index: number, opKey: string) => {
    let allLangList = [...values["language"]];
    let currentDesc = language["description"];

    let prevCurrentTarget = currentDesc?.find(
      (tItem: any, tIndex: number) => tIndex === index - 1
    );
    let currentTarget = currentDesc?.find(
      (tItem: any, tIndex: number) => tIndex === index
    );
    let nextCurrentTarget = currentDesc?.find(
      (tItem: any, tIndex: number) => tIndex === index + 1
    );

    let newDescOrder: any = [];

    if (opKey === "TOP") {
      if (index !== 0) {
        currentDesc?.forEach((fItem: any, fIndex: number) => {
          if (fIndex === index) {
            newDescOrder.push(prevCurrentTarget);
          } else if (fIndex === index - 1) {
            newDescOrder.push(currentTarget);
          } else {
            newDescOrder.push(fItem);
          }
        });
      }
    } else if (opKey === "BOT") {
      if (index !== currentDesc.length - 1) {
        currentDesc?.forEach((fItem: any, fIndex: number) => {
          if (fIndex === index) {
            newDescOrder.push(nextCurrentTarget);
          } else if (fIndex === index + 1) {
            newDescOrder.push(currentTarget);
          } else {
            newDescOrder.push(fItem);
          }
        });
      }
    }

    if (newDescOrder?.length > 0) {
      let lang = language;
      lang["description"] = newDescOrder;
      const curIndex = allLangList.findIndex((val) => val.value === lang.value);
      allLangList[curIndex] = lang;
      setFieldValue("language", allLangList);
    }
  };

  return (
    <Col xxl={8} className="border border-2 rounded-3 p-2 mb-1">
      <div
        className={classNames("d-flex justify-content-between", {
          "mb-2": isOpen,
        })}
      >
        <span className="fs-6 text-black">
          <img src={Lang} alt="lang" style={{ width: 20 }} />{" "}
          {/* {editMode && language.label === "Fa" ? "France" : language.name} */}
          {language.name}
        </span>

        <div className="d-flex">
          <RippleButton
            color="link"
            className="text-danger pt-0 pb-0"
            size="sm"
            onClick={handleRemove}
            disabled={values["language"].length === 1 ? true : false}
          >
            Remove
          </RippleButton>

          {!isOpen ? (
            <ChevronDown
              size={25}
              className="cursor-pointer ms-1"
              onClick={() => setIsOpen(true)}
            />
          ) : (
            <ChevronUp
              size={25}
              className="cursor-pointer ms-1"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
      </div>

      {isOpen && (
        <>
          <CardActions
            title="Details"
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
                    <th>Description</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>
                      <Edit
                        style={{ position: "relative", bottom: 1 }}
                        size={15}
                        color="#6e6b7b"
                      />
                    </th>
                    <th>
                      <Sliders
                        style={{ position: "relative", bottom: 1 }}
                        size={15}
                        color="#6e6b7b"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {language.description && language.description.length > 0
                    ? language.description.map((comp: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <InputText
                              name={`language[${indexLang}].description[${index}].key`}
                              placeholder="Key"
                              noColor
                              // onChange={(e) =>
                              //   handleChangeDesc(
                              //     "key",
                              //     e.target.value,
                              //     index,
                              //     "description"
                              //   )
                              // }
                              // value={comp && comp.key}
                              size={15}
                              bsSize="sm"
                              noErrorMessage
                              // customError={customLangDescError(
                              //   "key",
                              //   index,
                              //   "description"
                              // )}
                            />
                          </td>
                          <td>
                            <SelectOption
                              name={`language[${indexLang}].description[${index}].type`}
                              placeholder="Type..."
                              options={[
                                { value: "text", label: "Text" },
                                { value: "boolean", label: "Boolean" },
                                { value: "number", label: "Number" },
                              ]}
                              noErrorMessage
                              customStyle={{
                                control: (prop) => ({
                                  ...prop,
                                  padding: 0,
                                  minHeight: 30,
                                  //zIndex: 10,
                                }),
                                valueContainer: (prop) => ({
                                  ...prop,
                                  paddingTop: 0,
                                  marginTop: 0,
                                }),
                                indicatorsContainer: (prop) => ({
                                  ...prop,
                                  height: 30,
                                }),
                              }}
                              //value={comp && comp.type}
                              onChange={(e: any) =>
                                handleChangeDesc(
                                  "type",
                                  e,
                                  index,
                                  "description"
                                )
                              }
                            />
                          </td>
                          {values["language"][indexLang]?.description[index]
                            ?.type?.value === "boolean" && (
                            <td>
                              {/* <InputText
                                type={"number"}
                                name={`language[${indexLang}].description[${index}].key`}
                                placeholder="Key"
                                noColor
                                // onChange={(e) =>
                                //   handleChangeDesc(
                                //     "key",
                                //     e.target.value,
                                //     index,
                                //     "description"
                                //   )
                                // }
                                // value={comp && comp.key}
                                size={15}
                                bsSize="sm"
                                noErrorMessage
                                // customError={customLangDescError(
                                //   "key",
                                //   index,
                                //   "description"
                                // )}
                              /> */}
                              <SelectOption
                                name={`language[${indexLang}].description[${index}].value`}
                                placeholder="Choose status"
                                options={[
                                  { value: true, label: "True" },
                                  { value: false, label: "False" },
                                ]}
                                noErrorMessage
                                customStyle={SelectCustomStyle}
                                // value={comp && comp.type}
                                // onChange={(e: any) =>
                                //   handleChangeDesc(
                                //     "type",
                                //     e,
                                //     index,
                                //     "description"
                                //   )
                                // }
                              />
                            </td>
                          )}
                          {values["language"][indexLang]?.description[index]
                            ?.type?.value === "number" && (
                            <td>
                              <InputText
                                type="number"
                                name={`language[${indexLang}].description[${index}].value`}
                                placeholder="key"
                                noColor
                                // onChange={(e) =>
                                //   handleChangeDesc(
                                //     "key",
                                //     e.target.value,
                                //     index,
                                //     "description"
                                //   )
                                // }
                                // value={comp && comp.key}
                                size={15}
                                bsSize="sm"
                                noErrorMessage
                                // customError={customLangDescError(
                                //   "key",
                                //   index,
                                //   "description"
                                // )}
                              />
                            </td>
                          )}
                          {values["language"][indexLang]?.description[index]
                            ?.type?.value === "text" && (
                            <td>
                              <InputText
                                type="text"
                                name={`language[${indexLang}].description[${index}].value`}
                                placeholder="key"
                                noColor
                                // onChange={(e) =>
                                //   handleChangeDesc(
                                //     "key",
                                //     e.target.value,
                                //     index,
                                //     "description"
                                //   )
                                // }
                                // value={comp && comp.key}
                                size={15}
                                bsSize="sm"
                                noErrorMessage
                                // customError={customLangDescError(
                                //   "key",
                                //   index,
                                //   "description"
                                // )}
                              />
                            </td>
                          )}
                          <td
                            style={{
                              position: "relative",
                            }}
                            onClick={() =>
                              // values["language"][indexLang]?.description
                              //   .length === 1
                              //   ? null
                              //   :
                              handleRemoveDesc(index, "description")
                            }
                          >
                            <X size={18} className="cursor-pointer" />
                          </td>
                          <td
                            style={{
                              position: "relative",
                              width: "80px",
                              paddingLeft: "9px",
                            }}
                            onClick={() => {}}
                          >
                            <ChevronDown
                              size={19}
                              className=""
                              style={{
                                opacity:
                                  index === language?.description?.length - 1
                                    ? 0.4
                                    : 1,
                                cursor:
                                  index === language?.description?.length - 1
                                    ? undefined
                                    : "pointer",
                              }}
                              onClick={() => handleChangeDesOrder(index, "BOT")}
                            />
                            <ChevronDown
                              size={20}
                              style={{
                                transform: "rotate(180deg)",
                                marginLeft: "7px",
                                opacity: index === 0 ? 0.4 : 1,
                                cursor: index === 0 ? undefined : "pointer",
                              }}
                              className=""
                              onClick={() => handleChangeDesOrder(index, "TOP")}
                            />
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
          {/* <CardActions
            title="Short Description"
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
                    <th>Description</th>
                    <th>Type</th>
                    <th>Order</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {language.shortDescription &&
                  language.shortDescription.length > 0
                    ? language.shortDescription.map(
                        (comp: any, index: number) => (
                          <tr key={index}>
                            <td>
                              <InputText
                                name={`language[${indexLang}].shortDescription[${index}].key`}
                                placeholder="Key"
                                noColor
                                // onChange={(e) =>
                                //   handleChangeDesc(
                                //     "key",
                                //     e.target.value,
                                //     index,
                                //     "shortDescription"
                                //   )
                                // }
                                // value={comp && comp.key}
                                size={15}
                                noErrorMessage
                                bsSize="sm"
                              />
                            </td>
                            <td>
                              <SelectOption
                                name={`language[${indexLang}].shortDescription[${index}].type`}
                                placeholder="Type..."
                                options={[{ value: "text", label: "Text" }]}
                                customStyle={SelectCustomStyle}
                                noErrorMessage
                                // value={comp && comp.type}
                                // onChange={(e: any) =>
                                //   handleChangeDesc(
                                //     "type",
                                //     e,
                                //     index,
                                //     "shortDescription"
                                //   )
                                // }
                              />
                            </td>
                            <td>
                              <InputText
                                name={`language[${indexLang}].shortDescription[${index}].value`}
                                placeholder="Value"
                                noColor
                                size={20}
                                bsSize="sm"
                                // value={comp && comp.value}
                                noErrorMessage
                                // onChange={(e) =>
                                //   handleChangeDesc(
                                //     "value",
                                //     e.target.value,
                                //     index,
                                //     "shortDescription"
                                //   )
                                // }
                              />
                            </td>
                            <td
                              onClick={() =>
                                handleRemoveDesc(index, "shortDescription")
                              }
                            >
                              <X size={18} className="cursor-pointer" />
                            </td>
                          </tr>
                        )
                      )
                    : null}
                </tbody>
              </Table>
              <SubmitButton
                className="rounded-0 text-gray2 fs-6 text-primary"
                outline
                color="light"
                block
                type="button"
                onClick={() => handleAddDesc("shortDescription")}
              >
                + Add Item
              </SubmitButton>
            </div>
          </CardActions> */}
          <InputText
            name={`language[${indexLang}].longDescription`}
            placeholder="Key"
            label="Long Description"
            // onChange={(e) => {}}
            // value={comp && comp.key}
            size={15}
            type="textarea"
            // bsSize="sm"
            wrapperClassName="mb-1 mt-2"
            //customStyle={{ zIndex: 5 }}
          />
          <InputText
            name={`language[${indexLang}].shortDescription`}
            placeholder="Key"
            label="Short Description"
            // onChange={(e) => {}}
            // value={comp && comp.key}
            size={15}
            type="textarea"
            // bsSize="sm"
            wrapperClassName="mb-1 mt-2"
            //customStyle={{ zIndex: 5 }}
          />
          <InputText
            name={`language[${indexLang}].noticeDescription`}
            placeholder="Key"
            label="Notice Description"
            // onChange={(e) => {}}
            // value={comp && comp.key}
            size={15}
            type="textarea"
            // bsSize="sm"
            wrapperClassName="mb-1"
          />
          <InputText
            name={`language[${indexLang}].conditionDescription`}
            placeholder="Key"
            label="Condition Description"
            // onChange={(e) => {}}
            // value={comp && comp.key}
            size={15}
            type="textarea"
            // bsSize="sm"
          />
        </>
      )}
    </Col>
  );
};

export { LanguageForm };
