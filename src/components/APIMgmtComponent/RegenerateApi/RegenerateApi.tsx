import { CopyTextInput } from "@src/components/common/CopyTextInput";
import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import {
  useGetAPIMgmtCredential,
  useRegenerateAPIKey,
  useResetAPIKeyQuota,
} from "@src/core/services/api/api-key";
import {
  TGetAPIKey,
  TRegenerateAPIKey,
  TResetApiKey,
} from "@src/core/services/api/api-key/type";
import { FormikProps } from "formik";
import React, { FC, Fragment, useState } from "react";
import toast from "react-hot-toast";

interface IRegenerateApiProp {
  isOpen: boolean;
  onToggle: () => void;
  id: number;
}

const RegenerateApi: FC<IRegenerateApiProp> = ({
  isOpen,
  onToggle,
  id,
}): JSX.Element => {
  const [isRegenerated, setIsRegenerated] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | undefined>("");

  const regenerateApi = useRegenerateAPIKey();

  const onSubmit = (values: {
    description: string;
    quota_extension: number;
  }) => {
    const obj: TRegenerateAPIKey = {
      user_api_keys_id: id,
    };

    regenerateApi.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          const result = res.data.result;
          setIsRegenerated(true);
          // loadApiKey();
          setApiKey(result?.api_key);
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
    <FormWrapper initialValues={{}} onSubmit={onSubmit} enableReinitialize>
      {({ submitForm }: FormikProps<any>) => (
        <Modal
          // size="sm"
          isOpen={isOpen}
          onToggle={() => {
            onToggle();
          }}
          unmountOnClose
          modalTitle="New API Key"
          bodyClassName="overflow-visible pb-2"
        >
          {{
            main: isRegenerated ? (
              <div className=" mt-1">
                <div className="d-flex align-items-center ">
                  <img
                    style={{
                      width: "19.1px",
                      height: "19.1px",
                      marginRight: 7,
                    }}
                    src={
                      require("../../../assets/images/pages/successfull-quota.svg")
                        .default
                    }
                  />
                  <span className="d-block fs-4 fw-bold text-success">
                    Done successfully
                  </span>
                </div>

                <CopyTextInput
                  wrapperClassName="mt-1"
                  text={apiKey}
                  title="API Key"
                />
              </div>
            ) : (
              <div className="my-2">
                <span className="d-block text-darker fs-4">
                  Are you sure to{" "}
                  <span className="fw-bold">Generate New API Key?</span>
                </span>
              </div>
            ),
            footer: (
              <div className="w-100 d-flex justify-content-end">
                {isRegenerated ? (
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
                      disabled={regenerateApi.isLoading}
                      className="btn-next w-50"
                      // schema={
                      //   editCellData ? editMlsDocValidation : addMlsDocValidation
                      // }
                      // values={}
                      onClick={onToggle}
                    >
                      <span className={"align-middle d-sm-inline-block"}>
                        No
                      </span>
                    </SubmitButton>
                    <SubmitButton
                      type={regenerateApi.isLoading ? "button" : "submit"}
                      color="primary"
                      // outline
                      isLoading={regenerateApi.isLoading}
                      className="btn-next w-50"
                      // schema={
                      //   editCellData ? editMlsDocValidation : addMlsDocValidation
                      // }
                      // values={}
                      onClick={submitForm}
                    >
                      <span className={"align-middle d-sm-inline-block"}>
                        Yes
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

export { RegenerateApi };
