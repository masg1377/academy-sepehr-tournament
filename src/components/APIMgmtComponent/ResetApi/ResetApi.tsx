import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useResetAPIKeyQuota } from "@src/core/services/api/api-key";
import { TGetAPIKey, TResetApiKey } from "@src/core/services/api/api-key/type";
import { resetApiValidation } from "@src/core/validations/apikey.validation";
import { FormikProps } from "formik";
import React, { FC, Fragment, useState } from "react";
import toast from "react-hot-toast";

interface IResetApiProp {
  isOpen: boolean;
  onToggle: () => void;
  id: number;
}

const ResetApi: FC<IResetApiProp> = ({ isOpen, onToggle, id }): JSX.Element => {
  const [isReseted, setIsReseted] = useState<boolean>(false);

  const resetApi = useResetAPIKeyQuota();

  const onSubmit = (values: {
    description: string;
    quota_extension: number;
  }) => {
    const obj: TResetApiKey = {
      description: values.description,
      quota_extension: values.quota_extension,
      user_api_key_id: id,
    };

    resetApi.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          const result = res.data.result;
          setIsReseted(true);
        } else {
          toast.error(
            res.data.error || "Error occurred while reseting. please try again"
          );
          onToggle();
        }
      },
      onError: (err) => {
        toast.error("Error occurred while reseting. please try again");
        onToggle();
      },
    });
  };

  return (
    <FormWrapper
      initialValues={{ description: "", quota_extension: "" }}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={resetApiValidation}
    >
      {({ submitForm }: FormikProps<any>) => (
        <Modal
          // size="sm"
          isOpen={isOpen}
          onToggle={() => {
            onToggle();
          }}
          unmountOnClose
          modalTitle="Reset API Key Quota"
          bodyClassName="overflow-visible pb-2"
        >
          {{
            main: isReseted ? (
              <div className="d-flex flex-column align-items-center mt-1">
                <img
                  src={
                    require("../../../assets/images/pages/successfull-quota.svg")
                      .default
                  }
                />
                <span className="d-block fs-5 text-darker mt-1">
                  The <span className="fw-bolder">API Key Quota</span> reset
                  successfully
                </span>
              </div>
            ) : (
              <>
                <span className="d-block my-1 fs-5 text-darker">
                  To reset the API Key Quota, please fill in the following
                  fields
                </span>
                <InputText
                  name="description"
                  placeholder="Please enter..."
                  type="textarea"
                  label="Description"
                  wrapperClassName="mb-1"
                />
                <InputText
                  name="quota_extension"
                  placeholder="Extension quota value"
                  label="Extension quota value"
                  wrapperClassName="mb-1"
                />
              </>
            ),
            footer: (
              <div className="w-100 d-flex justify-content-end">
                {isReseted ? (
                  <SubmitButton
                    type={"button"}
                    // outline
                    // disabled={resetApi.isLoading}
                    className="btn-next w-50"
                    // schema={
                    //   editCellData ? editMlsDocValidation : addMlsDocValidation
                    // }
                    // values={}
                    onClick={onToggle}
                  >
                    <span className={"align-middle d-sm-inline-block"}>
                      Done
                    </span>
                  </SubmitButton>
                ) : (
                  <Fragment>
                    <SubmitButton
                      type={"button"}
                      color="link"
                      // outline
                      disabled={resetApi.isLoading}
                      className="btn-next w-50"
                      // schema={
                      //   editCellData ? editMlsDocValidation : addMlsDocValidation
                      // }
                      // values={}
                      onClick={onToggle}
                    >
                      <span className={"align-middle d-sm-inline-block"}>
                        Cancel
                      </span>
                    </SubmitButton>
                    <SubmitButton
                      type={resetApi.isLoading ? "button" : "submit"}
                      color="primary"
                      // outline
                      isLoading={resetApi.isLoading}
                      className="btn-next w-50"
                      // schema={
                      //   editCellData ? editMlsDocValidation : addMlsDocValidation
                      // }
                      // values={}
                      onClick={submitForm}
                    >
                      <span className={"align-middle d-sm-inline-block"}>
                        Reset
                      </span>
                    </SubmitButton>
                  </Fragment>
                )}
              </div>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { ResetApi };
