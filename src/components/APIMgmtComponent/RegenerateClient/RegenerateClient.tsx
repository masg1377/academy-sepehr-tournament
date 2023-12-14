import { CopyTextInput } from "@src/components/common/CopyTextInput";
import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import {
  useGetAPIMgmtCredential,
  useGetAPIMgmtList,
  useRegenerateAPIKey,
  useRegenerateClientId,
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

interface IRegenerateClientProp {
  isOpen: boolean;
  onToggle: () => void;
  id: number;
}

const RegenerateClient: FC<IRegenerateClientProp> = ({
  isOpen,
  onToggle,
  id,
}): JSX.Element => {
  const [isRegenerated, setIsRegenerated] = useState<boolean>(false);
  const [clientId, setClientId] = useState<string | undefined>("");

  const regenerateClient = useRegenerateClientId();

  const onSubmit = (values: {
    description: string;
    quota_extension: number;
  }) => {
    const obj: TRegenerateAPIKey = {
      user_api_keys_id: id,
    };

    regenerateClient.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          const result = res.data.result;
          setIsRegenerated(true);
          setClientId(result?.client_id);
          // loadClientId();
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
          modalTitle="Regenerate App Client ID"
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
                  text={clientId}
                  title="App Client ID"
                />
              </div>
            ) : (
              <div className="my-2">
                <span className="d-block text-darker fs-4">
                  Are you sure to Regenerate{" "}
                  <span className="fw-bold">App Client ID?</span>
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
                      disabled={regenerateClient.isLoading}
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
                      type={regenerateClient.isLoading ? "button" : "submit"}
                      color="primary"
                      // outline
                      isLoading={regenerateClient.isLoading}
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

export { RegenerateClient };
