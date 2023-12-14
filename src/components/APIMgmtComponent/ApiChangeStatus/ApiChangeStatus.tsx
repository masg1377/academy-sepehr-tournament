import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useChangeApiKeyStatus } from "@src/core/services/api/api-key";
import {
  TChangeAPIKeyStatus,
  TResetApiKey,
} from "@src/core/services/api/api-key/type";
import { changeStatusApiValidation } from "@src/core/validations/apikey.validation";
import { FormikProps } from "formik";
import { FC, Fragment, useState } from "react";
import toast from "react-hot-toast";

interface IApiChangeStatusProp {
  isOpen: boolean;
  onToggle: () => void;
  id: number;
  isActive: boolean;
}

const ApiChangeStatus: FC<IApiChangeStatusProp> = ({
  isOpen,
  onToggle,
  id,
  isActive,
}): JSX.Element => {
  const [isReseted, setIsReseted] = useState<boolean>(false);

  const changeApiStatus = useChangeApiKeyStatus();

  const onSubmit = (values: {
    description: string;
    quota_extension: number;
  }) => {
    const obj: TChangeAPIKeyStatus = {
      description: values.description,
      user_api_keys_id: id,
      is_active: !isActive,
    };

    changeApiStatus.mutate(obj, {
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
      initialValues={{ description: "" }}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={changeStatusApiValidation}
    >
      {({ submitForm }: FormikProps<any>) => (
        <Modal
          // size="sm"
          isOpen={isOpen}
          onToggle={() => {
            onToggle();
          }}
          unmountOnClose
          modalTitle={(isActive ? "Deactive" : "Active") + " API Key"}
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
                  The <span className="fw-bolder">API Key</span>{" "}
                  {isActive ? "deactivated " : "activated "}
                  successfully
                </span>
              </div>
            ) : (
              <>
                <span className="d-block my-1 fs-5 text-darker">
                  To {isActive ? "deactive" : "active"} the API Key, please fill
                  in the following fields
                </span>
                <InputText
                  name="description"
                  placeholder="Please enter..."
                  type="textarea"
                  label="Description"
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
                      disabled={changeApiStatus.isLoading}
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
                      type={changeApiStatus.isLoading ? "button" : "submit"}
                      color="primary"
                      // outline
                      isLoading={changeApiStatus.isLoading}
                      className="btn-next w-50"
                      // schema={
                      //   editCellData ? editMlsDocValidation : addMlsDocValidation
                      // }
                      // values={}
                      onClick={submitForm}
                    >
                      <span className={"align-middle d-sm-inline-block"}>
                        Save
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

export { ApiChangeStatus };
