import React, { FC } from "react";
import { InputText } from "@src/components/common/form/common/InputText";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { FormikProps } from "formik";
import { Modal } from "@src/components/common/Modal/Modal";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { mlsAuthType, mlsRequestMethodType } from "@src/core/data/mls.data";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { addMlsAccessCredentialValidation } from "@src/core/validations/mls.validation";
import { Col, Row } from "reactstrap";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useParams } from "react-router-dom";
import {
  useAddMlsAccessCredential,
  useEditMlsAccessCredential,
} from "@src/core/services/api/mls/mls.api";
import toast from "react-hot-toast";
import { TEditMlsAccessCredential } from "@src/core/services/api/mls/type";

interface ICredentialModal {
  isOpen: boolean;
  onToggle: () => void;
  data: any;
}

const CredentialModal: FC<ICredentialModal> = ({
  isOpen,
  onToggle,
  data,
}): JSX.Element => {
  const { accessId } = useParams();

  const addAccessCredential = useAddMlsAccessCredential();
  const editAccessCredential = useEditMlsAccessCredential();

  const onSubmit = (values: any) => {
    if (data && data.id) {
      let editObjCredential: TEditMlsAccessCredential = {
        entity: "mls_access_credential",
        data: {
          id: data.id,
          agent_password: values.agentPassword ? values.agentPassword : null,
          agent_user_name: values.agentUsername ? values.agentUsername : null,
          auth_type: values.authType ? values.authType.value : null,
          class_name: values.className ? values.className : null,
          is_media: values.isMedia ? values.isMedia : false,
          login_url: values.loginURL ? values.loginURL : null,
          media_object_type: values.mediaObjectType
            ? values.mediaObjectType
            : null,
          media_resource: values.mediaSource ? values.mediaSource : null,
          request_method: values.requestMethod
            ? values.requestMethod.value
            : null,
          version: values.version ? values.version : null,
          rets_password: values.retsPassword ? values.retsPassword : null,
          rets_user_name: values.retsUserName ? values.retsUserName : null,
        },
      };
      editAccessCredential.mutate(editObjCredential, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            onToggle();
          } else {
            toast.error("Error Occurred. Please try again!");
          }
        },
      });
    } else {
      addAccessCredential.mutate(
        {
          entity: "mls_access_credential",
          data: {
            mls_access_id: accessId ? +accessId : 0,
            auth_type: values.authType.value,
            class_name: values.className ? values.className : null,
            is_media: values.isMedia ? values.isMedia : false,
            login_url: values.loginURL ? values.loginURL : null,
            media_object_type: values.mediaObjectType
              ? values.mediaObjectType
              : null,
            media_resource: values.mediaSource ? values.mediaSource : null,
            request_method: values.requestMethod.value,
            rets_password: values.retsPassword ? values.retsPassword : null,
            rets_user_name: values.retsUserName ? values.retsUserName : null,
            version: values.version ? values.version : null,
            agent_password: values.agentPassword ? values.agentPassword : null,
            agent_user_name: values.agentUsername ? values.agentUsername : null,
          },
        },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              onToggle();
            } else {
              toast.error("Error Occurred. Please try again!");
            }
          },
          onError: (er) => {
            toast.error("Error Occurred. Please try again!");
          },
        }
      );
    }
  };

  return (
    <FormWrapper
      initialValues={{
        isMedia: data && data.is_media ? data.is_media : false,
        className: data && data.class_name ? data.class_name : "",
        version: data && data.version ? data.version : "",
        mediaSource: data && data.media_resource ? data.media_resource : "",
        mediaObjectType:
          data && data.media_object_type ? data.media_object_type : "",
        loginURL: data && data.login_url ? data.login_url : "",
        authType:
          data && data.auth_type
            ? {
                value: data.auth_type,
                label: "",
              }
            : null,
        retsUserName: data && data.rets_password ? data.rets_password : "",
        retsPassword: data && data.rets_password ? data.rets_password : "",
        agentUsername: data && data.agent_user_name ? data.agent_user_name : "",
        agentPassword: data && data.agent_password ? data.agent_password : "",
        requestMethod:
          data && data.request_method
            ? {
                value: data.request_method,
                label: data.request_method,
              }
            : null,
        options: "",
      }}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={addMlsAccessCredentialValidation}
    >
      {({ values, handleSubmit }: FormikProps<any>) => (
        <Modal
          size={"lg"}
          isOpen={isOpen}
          onToggle={onToggle}
          modalTitle={"MLS Accesses Credential"}
          bodyClassName="overflow-visible"
        >
          {{
            main: (
              <div>
                <Row className="pb-1 border-bottom mb-1">
                  <Col sm={6}>
                    <InputText
                      name="className"
                      placeholder="Please enter ..."
                      label={"Class Name"}
                      id="className"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                  <Col sm={6}>
                    <InputText
                      name="version"
                      placeholder="Please enter ..."
                      label={"Version"}
                      id="version"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                </Row>

                <CheckBox
                  label="Is Media"
                  name="isMedia"
                  id="isMedia"
                  wrapperClass="mb-1"
                  defaultChecked={values.isMedia}
                />

                <Row className="pb-1 border-bottom mb-1">
                  <Col sm={6}>
                    <InputText
                      name="mediaSource"
                      placeholder="Please enter ..."
                      label={"Media Source"}
                      id="mediaSource"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                  <Col sm={6}>
                    <InputText
                      name="mediaObjectType"
                      placeholder="Please enter ..."
                      label={"Media Object Type"}
                      id="mediaObjectType"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                </Row>

                <Row className="pb-1 border-bottom mb-1">
                  <Col sm={6}>
                    <InputText
                      name="loginURL"
                      placeholder="Please enter ..."
                      label={"Login URL"}
                      id="loginURL"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                  <Col sm={6}>
                    <SelectOption
                      name="authType"
                      placeholder="Please select..."
                      label={"Auth Type"}
                      id="authType"
                      options={mlsAuthType}
                      // isLoading={getPlatforms.isLoading}
                      // onInputChange={(val: any) => onPlatformChange(val)}
                      wrapperClassName="mb-1"
                      // noFilter
                    />
                  </Col>
                  <Col sm={6}>
                    <InputText
                      name="retsUserName"
                      placeholder="Please enter ..."
                      label={"Rets User Name"}
                      id="retsUserName"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                  <Col sm={6}>
                    <InputText
                      name="retsPassword"
                      placeholder="Please enter ..."
                      label={"Rets Password"}
                      id="retsPassword"
                      type="password"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <InputText
                      name="agentUsername"
                      placeholder="Please enter ..."
                      label={"Agent Username"}
                      id="agentUsername"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                  <Col sm={6}>
                    <InputText
                      name="agentPassword"
                      placeholder="Please enter ..."
                      label={"Agent Password"}
                      id="agentPassword"
                      type="password"
                      wrapperClassName="mb-1"
                    />
                  </Col>
                </Row>
                <div className="pb-1 border-bottom mb-1">
                  <SelectOption
                    name="requestMethod"
                    placeholder="Please select..."
                    label={"Request Method"}
                    id="requestMethod"
                    options={mlsRequestMethodType}
                    // isLoading={getPlatforms.isLoading}
                    // onInputChange={(val: any) => onPlatformChange(val)}
                    wrapperClassName="mb-1"
                    // noFilter
                  />
                </div>

                <InputText
                  name="options"
                  placeholder="Please enter ..."
                  label={"Options"}
                  id="options"
                  wrapperClassName="mb-1"
                />
              </div>
            ),
            footer: (
              <div className="d-flex justify-content-between w-100">
                <SubmitButton
                  type="button"
                  color="link"
                  outline
                  className="btn-next border-0 text-primary"
                  onClick={onToggle}
                >
                  <span className={"align-middle d-sm-inline-block"}>
                    Cancel
                  </span>
                </SubmitButton>
                <SubmitButton
                  type="submit"
                  color="primary"
                  outline
                  className="btn-next"
                  isLoading={
                    addAccessCredential.isLoading ||
                    editAccessCredential.isLoading
                  }
                  onClick={handleSubmit}
                  schema={addMlsAccessCredentialValidation}
                >
                  <span className={"align-middle d-sm-inline-block"}>Save</span>
                </SubmitButton>
              </div>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { CredentialModal };
