import React, { FC, useEffect, useState } from "react";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { FormikProps } from "formik";
import { Modal } from "@src/components/common/Modal";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import { Col, Row } from "reactstrap";
import { InputText } from "@src/components/common/form/common/InputText";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { useParams } from "react-router-dom";
import {
  useCreatePlatformCredential,
  useEditPlatformCredential,
  useGetPlatformCredential,
} from "@src/core/services/api/platform/platform.api";
import {
  TCreatePlatformCredential,
  TEditPlatformCredential,
} from "@src/core/services/api/platform/type";
import { addPlatformCredentialValidation } from "@src/core/validations/platform.validation";
import { ExtraDataList } from "../ExtraDataList/ExtraDataList";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { useDispatch } from "react-redux";
import { handleRefresh } from "@src/redux/refresh";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RadioBox } from "@src/components/common/form/common/RadioBox/RadioBox";

const listItems = [
  { value: 1, label: "IDX/RETS" },
  { value: 2, label: "IDX/RESO_WEB_API" },
  { value: 3, label: "IDX_PLUS/RETS" },
  { value: 4, label: "IDX_PLUS/RESO_WEB_API" },
  { value: 5, label: "VOW/RETS" },
  { value: 6, label: "VOW/RESO_WEB_API" },
  { value: 7, label: "IDX" },
  { value: 8, label: "IDX_PLUS" },
  { value: 9, label: "VOW" },
  { value: 10, label: "RETS" },
  { value: 11, label: "ALL/ALL" },
  { value: 12, label: "--/RESO_WEB_API" },
  { value: 13, label: "ALL Feed Type" },
  { value: 14, label: "ALL Connection Type" },
];

interface IAddCredentialModalProp {
  isOpen: boolean;
  onToggle: () => void;
  idDetail?: number;
}

const AddCredentialModal: FC<IAddCredentialModalProp> = ({
  isOpen,
  onToggle,
  idDetail,
}): JSX.Element => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    tokenUrl: "",
    feedConnectionType: "",
    requestUrl: "",
    clientId: "",
    clientPassword: "",
    accessToken: "",
    scop: "",
    extraData: [
      { description: "", order: "", type: { value: 1, label: "Text" } },
    ],
    generateToken: false,
    accessTokenFlag: true,
  });
  const [filterList, setFilterList] = useState<TGetEntities>({
    entity: "feed_types_connection_types",
    data: {
      list_filter: {
        limit: 100,
        offset: 0,
        order_by: "creation_date",
        filters: [
          // { field: "feed_type", operator: "in", value: "i" },
          // "or",
          // { field: "connection_type", operator: "in", value: "r" },
        ],
      },
    },
  });
  const [feedOptions, setFeedOptions] = useState([]);

  const addCredential = useCreatePlatformCredential();
  const getEntity = useGetListOfEntity();
  const getDetail = useGetPlatformCredential();
  const editDetail = useEditPlatformCredential();

  useEffect(() => {
    if (idDetail) {
      getDetail.mutate(
        {
          entity: "platform_credential",
          data: {
            id: idDetail,
          },
        },
        {
          onSuccess: (val) => {
            const result = val.data.result;
            let extraData: any = [];
            if (result && result.options) {
              Object.keys(result.options).forEach((item: string) => {
                extraData.push({
                  description: item,
                  type:
                    typeof result.options[item] === "number"
                      ? { value: 2, label: "Number" }
                      : { value: 1, label: "Text" },
                  order: result.options[item],
                });
              });
            }
            setInitialValues({
              name: result && result.name,
              tokenUrl: result ? result.token_url : "",
              feedConnectionType: result
                ? listItems.find(
                    (i) => i.value === result.feed_type_connection_type_id
                  )
                : null,
              requestUrl: result ? result.request_url : "",
              clientId: result ? result.client_id : "",
              clientPassword: result ? result.client_password : "",
              accessToken: result && result.access_token,
              scop: result ? result.scope : "",
              extraData: extraData,
              generateToken: result && result.generate_token,
              accessTokenFlag: result && !result.generate_token,
            });
          },
        }
      );
    }
  }, [idDetail]);

  useEffect(() => {
    getEntity.mutate(filterList);
  }, []);

  useEffect(() => {
    if (getEntity.isSuccess) {
      let result = getEntity.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      console.log(result);
      result &&
        setFeedOptions(
          result.map((i: any) => ({
            value: i.id,
            label:
              (!!i.feed_type ? i.feed_type : "--") +
              "/" +
              (!!i.connection_type ? i.connection_type : "--"),
          }))
        );
    }
  }, [getEntity.isSuccess]);

  const onSubmit = (values: any) => {
    let extraData: any = {};
    if (values.extraData) {
      values.extraData.forEach((ex: any) => {
        extraData[ex.description] =
          ex.type && ex.type.value === 2 ? +ex.order : ex.order;
      });
    }

    let obj: any = {
      entity: "platform_credential",
      data: {
        name: values.name,
        platform_id: id ? +id : 0,
        feed_type_connection_type_id: values.feedConnectionType.value, //values.feedConnectionType,
        // token_url: values.tokenUrl,
        request_url: values.requestUrl,
        // client_id: values.clientId,
        // client_password: values.clientPassword,
        // access_token: values.accessToken,
        // scope: values.scop,
        // generate_token: values.generateToken,
        options: extraData,
      },
    };

    if (values["accessTokenFlag"]) {
      obj.data["access_token"] = values.accessToken;
      obj.data["generate_token"] = values.generateToken;
    } else {
      obj.data["scope"] = values.scop;
      obj.data["client_id"] = values.clientId;
      obj.data["client_password"] = values.clientPassword;
      obj.data["token_url"] = values.tokenUrl;
      obj.data["generate_token"] = values.generateToken;
    }

    console.log(obj);

    // return;

    if (idDetail) {
      obj.data["id"] = idDetail;
    }

    if (idDetail)
      editDetail.mutate(obj, {
        onSuccess: (val) => {
          onToggle();
          dispatch(handleRefresh("platformCredential"));
        },
      });
    else
      addCredential.mutate(obj, {
        onSuccess: (val) => {
          const data = val.data;
          console.log(data);
          onToggle();
        },
      });
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={addPlatformCredentialValidation}
    >
      {({ values, submitForm, setFieldValue }: FormikProps<any>) => (
        <Modal
          isOpen={isOpen}
          onToggle={onToggle}
          modalTitle="Add Credential"
          size="lg"
        >
          {{
            main: (
              <>
                {getDetail.isLoading ? (
                  <LoadingData />
                ) : (
                  <>
                    <Row className="pb-1">
                      <Col sm={6}>
                        <InputText
                          name="name"
                          placeholder="Please enter Name"
                          label={"Name"}
                          id="name"
                          wrapperClassName="mb-1"
                        />
                        <InputText
                          name="requestUrl"
                          placeholder="Please enter ..."
                          label={"Request URL"}
                          id="requestUrl"
                          wrapperClassName="mb-1"
                        />
                      </Col>
                      <Col sm={6}>
                        <SelectOption
                          name={`feedConnectionType`}
                          placeholder="Type..."
                          options={feedOptions}
                          label={"Feed Connection Type "}
                          wrapperClassName="mb-1"
                          isLoading={getEntity.isLoading}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-1">
                      <Col sm={3}>
                        <RadioBox
                          label="Access Token"
                          name="accessTokenFlag"
                          id="accessTokenFlag"
                          radioName="token"
                          onChange={() => {
                            setFieldValue("accessTokenFlag", true);
                            setFieldValue("generateToken", false);
                          }}
                        />
                      </Col>
                      <Col sm={3}>
                        <RadioBox
                          label="Generate Token"
                          name="generateToken"
                          id="generateToken"
                          radioName="token"
                          onChange={() => {
                            setFieldValue("accessTokenFlag", false);
                            setFieldValue("generateToken", true);
                          }}
                        />
                      </Col>
                    </Row>

                    {values["accessTokenFlag"] ? (
                      <Row className="">
                        <Col sm={6}>
                          <InputText
                            name="accessToken"
                            placeholder="Please enter Access Token"
                            label={"Access Token"}
                            id="accessToken"
                            // wrapperClassName="mb-1"
                          />
                        </Col>
                      </Row>
                    ) : (
                      <Row>
                        <Col sm={6}>
                          <InputText
                            name="tokenUrl"
                            placeholder="Please enter Token URL"
                            label={"Token URL"}
                            id="tokenUrl"
                            wrapperClassName="mb-1"
                          />
                          <InputText
                            name="clientId"
                            placeholder="Please enter Client ID"
                            label={"Client ID"}
                            id="clientId"
                            // wrapperClassName="mb-1"
                          />
                        </Col>
                        <Col sm={6}>
                          <InputText
                            name="scop"
                            placeholder="Please enter Scop"
                            label={"Scop"}
                            id="scop"
                            wrapperClassName="mb-1"
                          />
                          <InputText
                            name="clientPassword"
                            placeholder="Please enter password"
                            label={"Client password"}
                            id="clientPassword"
                            // wrapperClassName="mb-1"
                            type="password"
                          />
                        </Col>
                      </Row>
                    )}

                    <ExtraDataList fullWidth title="Options" />
                  </>
                )}
              </>
            ),
            footer: (
              <div className="d-flex justify-content-end">
                <SubmitButton
                  type={getDetail.isLoading ? "button" : "submit"}
                  color="info"
                  disabled={getDetail.isLoading}
                  className="ps-5 pe-5"
                  onClick={submitForm}
                  isLoading={addCredential.isLoading || editDetail.isLoading}
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

export { AddCredentialModal };
