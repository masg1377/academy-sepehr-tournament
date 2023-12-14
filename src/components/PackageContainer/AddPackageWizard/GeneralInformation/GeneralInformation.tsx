import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { LogoUploader } from "@src/components/common/form/Fields/LogoUploader/LogoUploader";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import {
  packageRelatedToData,
  packageSourceData,
  packageTypeData,
} from "@src/core/data/package.data";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { FormikProps, useFormikContext } from "formik";
import { FC, useEffect, useState } from "react";
import { MultiValueRemoveProps, components } from "react-select";
import { Col } from "reactstrap";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { LanguageForm } from "./LanguageForm/LanguageForm";

interface IAddMlsDataProp {
  stepper: any;
  type?: string;
  setIndexStep: any;
  indexStep?: number;
  schema: any;
  isLoading?: any;
  editMode?: boolean;
  onSubmit?: (val: any, isSave: boolean) => void;
  submitLoading?: boolean;
}

const GeneralInformation: FC<IAddMlsDataProp> = ({
  stepper,
  setIndexStep,
  indexStep,
  schema,
  isLoading,
  editMode,
  onSubmit,
  submitLoading,
}): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<any>();

  const [languageOptions, setLanguageOptions] = useState<any>(null);

  const getLanguage = useGetListOfEntity();

  const getLanguageList = () => {
    getLanguage.mutate(
      {
        entity: "languages",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
            filters: [],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            setLanguageOptions(
              result.map((item: any, index: number) => ({
                value: item.id,
                label: item.abbr,
                name: item.name,
                description: [],
                longDescription: "",
                shortDescription: "",
                noticeDescription: "",
                conditionDescription: "",
              }))
            );
          }
        },
      }
    );
  };

  useEffect(() => {
    getLanguageList();
  }, []);

  return (
    <FormStepsWrapper
      stepper={stepper}
      stepNum={1}
      stepName="Package form"
      onSave={onSubmit}
      isLoading={submitLoading}
      // setIndexStep={setIndexStep}
      schema={schema}
    >
      {isLoading ? (
        <LoadingData wrapperStyle="pt-5 pb-4 my-5" />
      ) : (
        <>
          <RowWrappers sm={6} md={4}>
            <SelectOption
              name="type"
              placeholder="Please select"
              label={"Type"}
              id="type"
              options={packageTypeData}
              wrapperClassName="mb-1"
              onChange={(val) => {
                setFieldValue("type", val);
                if (
                  val &&
                  val.value === 6 //"data feed" || val.value === "realtyfeed app")
                ) {
                  setFieldValue("hasMls", true);
                }
              }}
            />
            <Col xl={6}>
              <SelectOption
                name="multiple"
                placeholder="Please select"
                label={"Multiple"}
                id="multiple"
                options={[
                  { value: 1, label: "Yes" },
                  { value: 2, label: "No" },
                ]}
                wrapperClassName="mb-1"
              />
            </Col>
          </RowWrappers>
          <RowWrappers sm={6} md={4}>
            <InputText
              name="name"
              placeholder="Please enter Name ..."
              label={"Name"}
              id="name"
              wrapperClassName="mb-1"
            />
          </RowWrappers>
          <RowWrappers sm={6} md={4}>
            <SelectOption
              name="source"
              placeholder="Please select"
              label={"Source"}
              id="source"
              options={packageSourceData}
              onChange={(val) => {
                setFieldValue("source", val);
                if (val && val.value === "reso") {
                  setFieldValue("hasUsagePlan", true);
                }
              }}
              wrapperClassName="mb-1"
            />
            <Col xl={6}>
              <SelectOption
                name="sourceRelatedTo"
                placeholder="Please select"
                label={"Related to"}
                id="sourceRelatedTo"
                options={packageRelatedToData}
                wrapperClassName="mb-1"
              />
            </Col>
          </RowWrappers>
          <RowWrappers
            sm={6}
            md={4}
            rowClassName={`pb-1 ${!editMode ? "border-bottom" : ""}`}
          >
            <InputText
              name="taxCode"
              placeholder="Please enter tax code ..."
              label={"Tax Code"}
              id="taxCode"
              wrapperClassName="mb-1"
            />
          </RowWrappers>
          {editMode && (
            <RowWrappers sm={6} md={4} rowClassName="border-bottom pb-1">
              <SwitchBox
                name="publishedPackage"
                color="success"
                //defaultChecked={false}
                wrapperClassName="mb-1"
                labelClassName="text-black"
              >
                Published
              </SwitchBox>
            </RowWrappers>
          )}
          <span className="fs-6 fw-bolder text-primary d-block mt-2">
            Images
          </span>
          <RowWrappers sm={6} md={4} rowClassName="mb-0">
            <LogoUploader
              name="mobile_icon"
              label="Mobile icon"
              id="mobile_icon"
              buttonLabel="Upload Image"
              square
            />
            <LogoUploader
              name="web_icon"
              label="Web icon"
              id="web-icon"
              buttonLabel="Upload Image"
            />
          </RowWrappers>
          <RowWrappers sm={6} md={4} rowClassName="mt-0 border-bottom pb-1">
            <LogoUploader
              name="banner_image"
              label="Banner Image"
              id="banner-image"
              buttonLabel="Upload Image"
              fileFormat="png, jpg"
              fileSize="5 MB"
            />
          </RowWrappers>
          <span className="fs-6 fw-bolder text-primary d-block mt-2">
            Language and Descriptions
          </span>
          <RowWrappers sm={6} md={4}>
            <SelectOption
              isClearable={false}
              name="language"
              placeholder="Please select"
              label={"Language"}
              id="language"
              noErrorMessage
              isLoading={getLanguage.isLoading}
              options={languageOptions}
              isMulti
              wrapperClassName="mb-1"
              //myComponents={{ MultiValueRemove,MultiValueContainer }}
              customStyle={{
                multiValueRemove: (base) => ({
                  ...base,
                  border: "1px solid transparent",
                  display:
                    values["language"].length === 1 ? "none" : "inline-block",
                }),
                multiValue: (base) => ({
                  ...base,
                  paddingRight: values["language"].length === 1 ? "5px" : 0,
                  paddingLeft: values["language"].length === 1 ? "5px" : 0,
                }),
              }}
            />
          </RowWrappers>
          {values["language"] &&
            values["language"].map((language: any, index: number) => (
              <LanguageForm
                key={index}
                language={language}
                index={index}
                editMode={editMode}
              />
            ))}
        </>
      )}

      {/* <SwitchBox name="status" color="success" defaultChecked withIcon>
          Status
        </SwitchBox> */}
    </FormStepsWrapper>
  );
};

export { GeneralInformation };
