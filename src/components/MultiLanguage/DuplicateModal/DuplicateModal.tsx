import React, { FC, useState } from "react";
import { FormikProps } from "formik";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { Modal } from "@src/components/common/Modal";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { Col, Row } from "reactstrap";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { TAddMultiLang } from "@src/core/services/api/multilang/type";
import { useAddMultiLang } from "@src/core/services/api/multilang/multilang.api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handleRefresh } from "@src/redux/refresh";

interface IDuplicateModalProp {
  isOpen: boolean;
  onToggle: () => void;
  item: any;
}

const DuplicateModal: FC<IDuplicateModalProp> = ({
  isOpen,
  onToggle,
  item,
}): JSX.Element => {
  console.log(item);
  const [languages, setLanguages] = useState([
    { value: "en-US", label: "en-US" },
    { value: "fr-CA", label: "fr-CA" },
    { value: "es-MX", label: "es-MX" },
  ]);

  const addMultiLang = useAddMultiLang();
  const dispatch = useDispatch();

  const onSubmit = (values: any) => {
    const obj: TAddMultiLang = {
      locale: values.language?.value || item?.locale,
      usecase: item?.usecase,
      translations: item?.translations,
    };

    addMultiLang.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          toast.success("Successfully duplicated");
          dispatch(handleRefresh("multiLang"));
          onToggle();
        } else toast.error("Error occured. Please try again!");
      },
      onError: (err) => {
        toast.error("Error occured. Please try again!");
      },
    });
  };

  return (
    <FormWrapper
      initialValues={{
        language: item?.locale
          ? { value: item?.locale, label: item?.locale }
          : undefined,
      }}
      enableReinitialize
      onSubmit={onSubmit}
      //   validationSchema={addPlatformCredentialValidation}
    >
      {({ submitForm }: FormikProps<any>) => (
        <Modal
          isOpen={isOpen}
          onToggle={onToggle}
          modalTitle="Duplicate"
          //   size="lg"
        >
          {{
            main: (
              <>
                {false ? (
                  <LoadingData />
                ) : (
                  <>
                    <span
                      className="d-block fs-6"
                      style={{
                        color: "#2e2e33",
                        marginTop: 24,
                        marginBottom: 22,
                      }}
                    >
                      To duplicate the file, you can edit the following fields
                    </span>
                    <Row className=" pb-1 mb-1">
                      <Col sm={12}>
                        <SelectOption
                          name={`language`}
                          placeholder="Type..."
                          options={languages}
                          label={"language"}
                          creative
                          wrapperClassName="mb-1"
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
                  //   disabled={getDetail.isLoading}
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
                  //   disabled={getDetail.isLoading}
                  className="ps-5 pe-5 flex-fill"
                  onClick={submitForm}
                  isLoading={addMultiLang.isLoading}
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

export { DuplicateModal };
