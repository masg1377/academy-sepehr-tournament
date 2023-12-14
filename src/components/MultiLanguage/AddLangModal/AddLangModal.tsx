import { DropZone } from "@src/components/common/form/common/DropZone/DropZone";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { Modal } from "@src/components/common/Modal";
// import { TGetEntities } from "@src/core/services/api/entities/type";
import { useAddMultiLang } from "@src/core/services/api/multilang/multilang.api";
import { TAddMultiLang } from "@src/core/services/api/multilang/type";
import { addMultiLangValidation } from "@src/core/validations/multilang.validation";
import { ErrorMessage, FormikProps } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Col, Row } from "reactstrap";

interface IAddLangModalProp {
  isOpen: boolean;
  onToggle: () => void;
}

const AddLangModal: FC<IAddLangModalProp> = ({
  isOpen,
  onToggle,
}): JSX.Element => {
  // const [langFilter, setLangFilter] = useState<TGetEntities>({
  //   entity: "languages",
  //   data: { list_filter: { limit: 40, offset: 0 } },
  // });
  const [languages, setLanguages] = useState([
    { value: "en-US", label: "en-US" },
    { value: "fr-CA", label: "fr-CA" },
    { value: "es-MX", label: "es-MX" },
  ]);
  const [files, setFiles] = useState("");

  const addLang = useAddMultiLang();

  const handleChange = (
    event: any,
    setFieldValue: (name: string, val: any) => void
  ) => {
    console.log(event);
    const fileReader = new FileReader();
    fileReader.readAsText(event[0], "UTF-8");
    fileReader.onload = (e: any) => {
      // console.log("e.target.result", JSON.parse(e.target.result));
      const obj = JSON.parse(e.target.result);
      setFiles(obj?.translations || obj);
      setFieldValue("file", obj?.translations || obj);
    };
  };

  // const getLangList = () => {
  //   // let langFilterObj = {...langFilter};
  //   // langFilterObj.data.list_filter.
  //   getLangs.mutate(langFilter, {
  //     onSuccess: (res) => {
  //       if (res.data.is_success) {
  //         let result = res.data.result;
  //         if (result && !Array.isArray(result)) result = [result];
  //         setLanguages(
  //           result.map((o: any) => ({
  //             value: o.id,
  //             label: o.name,
  //             abbr: o.abbr,
  //           }))
  //         );
  //       }
  //     },
  //   });
  // };

  // useEffect(() => {
  //   getLangList();
  // }, []);

  const onSubmit = (values: any) => {
    let obj: TAddMultiLang = {
      locale: values?.language?.value,
      usecase: values?.useCase?.value,
      // version: +values?.version,
      translations: {},
    };
    if (values?.file) obj["translations"] = values?.file;
    console.log(obj);
    addLang.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          console.log(res.data.result);
          onToggle();
        } else {
          console.log(res.data);
          toast.error(res.data.error);
        }
      },
      onError: () => {
        // toast.error("An error has occurred");
      },
    });
  };

  return (
    <FormWrapper
      initialValues={{ useCase: null, language: null, version: "", file: null }}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={addMultiLangValidation}
    >
      {({ submitForm, setFieldValue }: FormikProps<any>) => (
        <Modal
          isOpen={isOpen}
          onToggle={onToggle}
          modalTitle="Add new language"
          //   size="lg"
        >
          {{
            main: (
              <>
                {false ? (
                  <LoadingData />
                ) : (
                  <>
                    <Row className=" pb-1 mb-1">
                      <Col sm={12}>
                        <SelectOption
                          name={`useCase`}
                          placeholder="Please Select"
                          options={[
                            { value: "UI", label: "UI" },
                            { value: "RESO", label: "RESO" },
                          ]}
                          label={"UseCase"}
                          creative
                          wrapperClassName="mb-1"
                          //   isLoading={getEntity.isLoading}
                        />
                      </Col>
                      <Col sm={12}>
                        <SelectOption
                          name={`language`}
                          placeholder="Type..."
                          options={languages}
                          label={"language"}
                          wrapperClassName="mb-1"
                          // isLoading={getLangs.isLoading}
                          //   isLoading={getEntity.isLoading}
                        />
                      </Col>
                      {/* <Col sm={6}>
                        <InputText
                          name="version"
                          placeholder="Please enter ..."
                          label={"Version"}
                          id="version"
                          wrapperClassName="mb-1"
                        />
                      </Col> */}

                      <span
                        className="d-block fs-6"
                        style={{
                          color: "#2e2e33",
                          marginTop: 25,
                          marginBottom: 5,
                        }}
                      >
                        also You can upload the UseCase file
                      </span>
                      <DropZone
                        name="file"
                        onChange={(e) => handleChange(e, setFieldValue)}
                        accept={{
                          "application/json": [".json"],
                        }}
                        fileFormat="json"
                        fileSize="1 GB"
                      />
                      <ErrorMessage
                        name="file"
                        render={(msg) => {
                          return (
                            <span className="text-error-form fs-8">{msg}</span>
                          );
                        }}
                      />
                    </Row>
                  </>
                )}
              </>
            ),
            footer: (
              <div className="d-flex justify-content-end w-100 gap-2">
                <SubmitButton
                  type={"button"}
                  color="white"
                  disabled={addLang.isLoading}
                  //   outline
                  className="ps-5 pe-5 flex-fill border-0 text-primary bg-transparent"
                  onClick={onToggle}
                  //   isLoading={addCredential.isLoading || editDetail.isLoading}
                >
                  Cancel
                </SubmitButton>
                <SubmitButton
                  type={"submit"}
                  color="primary"
                  disabled={addLang.isLoading}
                  className="ps-5 pe-5 flex-fill"
                  onClick={submitForm}
                  isLoading={addLang.isLoading}
                  schema={addMultiLangValidation}
                >
                  Save
                </SubmitButton>
              </div>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { AddLangModal };
