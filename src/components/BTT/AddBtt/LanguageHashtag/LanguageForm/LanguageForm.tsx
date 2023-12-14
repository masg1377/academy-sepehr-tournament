import Lang from "@src/assets/images/icons/lang.png";
import { CardActions } from "@src/components/common/card-actions";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { LogoUploader } from "@src/components/common/form/Fields/LogoUploader/LogoUploader";
import { RippleButton } from "@src/components/common/ripple-button";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { FC, useState } from "react";
import { ChevronDown, ChevronUp, X } from "react-feather";
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

interface ILanguageFormProp {
  language: any;
  index: number;
}

const LanguageForm: FC<ILanguageFormProp> = ({
  language,
  index: indexLang,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { values, setFieldValue, errors } = useFormikContext<any>();

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
      type: { value: "text", label: "Text" },
      value: "",
    });
    const curIndex = valList.findIndex((val) => val.value === lang.value);
    valList[curIndex] = lang;
    setFieldValue("language", valList);
  };

  // const handleChangeDesc = (
  //   key: string,
  //   value: any,
  //   index: number,
  //   descKey: string
  // ) => {
  //   let valList = [...values["language"]];
  //   const newDesc = language[descKey].map((v: any, ind: number) => {
  //     if (ind === index) return { ...v, [key]: value };
  //     else return v;
  //   });
  //   let lang = language;
  //   lang[descKey] = newDesc;
  //   const curIndex = valList.findIndex((val) => val.value === lang.value);
  //   valList[curIndex] = lang;
  //   setFieldValue("language", valList);
  // };

  // const customLangDescError = (key: string, index: number, type: string) => {
  //   const lang: any = errors["language"];

  //   console.log("lang", lang);
  //   if (lang && lang[indexLang]) {
  //     let desc: any = lang[indexLang];
  //     desc = desc[type];
  //     console.log("desc", desc);
  //     if (desc && desc[index]) {
  //       const er = desc[index][key];
  //       console.log("er", er, desc[index]);
  //       return er;
  //     } else return "";
  //   }
  //   return "";
  // };

  return (
    <Col xxl={8} className="border border-2 rounded-3 p-2 mb-1">
      <div
        className={classNames("d-flex justify-content-between", {
          "mb-2": isOpen,
        })}
      >
        <span className="fs-6 text-black">
          <img src={Lang} alt="lang" style={{ width: 20 }} /> {language.name}
        </span>

        <div className="d-flex">
          <RippleButton
            color="link"
            className="text-danger pt-0 pb-0"
            size="sm"
            onClick={handleRemove}
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
          <LogoUploader
            name={`language[${indexLang}].icon`}
            label="Icon"
            id="icon"
            wrapperClassName="pt-0 mb-1"
            mode="one"
            customImage={language.icon}
            fileFormat="png, jpg"
            fileSize="5 MB"
          />

          <InputText
            name={`language[${indexLang}].description`}
            placeholder="Please enter ..."
            label="Short Description"
            // onChange={(e) => {}}
            // value={comp && comp.key}
            size={15}
            type="textarea"
            // bsSize="sm"
            wrapperClassName="mb-1"
          />

          <CardActions
            title="Description"
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
                    <th>Key</th>
                    <th>Type</th>
                    <th>Value</th>
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
                              />
                            </td>
                            <td>
                              <InputText
                                name={`language[${indexLang}].shortDescription[${index}].value`}
                                placeholder="Value"
                                noColor
                                size={20}
                                bsSize="sm"
                                noErrorMessage
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
          </CardActions>

          <InputText
            name={`language[${indexLang}].noticeDescription`}
            placeholder="Please enter ..."
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
            placeholder="Please enter ..."
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
