import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { RippleButton } from "@src/components/common/ripple-button";
import { mlsAuthType, mlsRequestMethodType } from "@src/core/data/mls.data";
import { useGetMlsList } from "@src/core/services/api/mls/mls.api";
import { useGetPlatformCredential } from "@src/core/services/api/platform/platform.api";
import { TGetPlatformList } from "@src/core/services/api/platform/type";
import { useFormikContext } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { PlatformOptions } from "./PlatformOptions/PlatformOptions";
import { Col, Row } from "reactstrap";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { RadioBox } from "@src/components/common/form/common/RadioBox/RadioBox";
import { ExtraDataList } from "@src/components/Platform/AddPlatform/ExtraDataList/ExtraDataList";

interface ISecondStepFormProp {
  accessId: number;
  setInitialValues: (val: any) => void;
  setMlsAccessCredentialId: (val: number) => void;
  setNewPlatformConfig: (val: boolean) => void;
  newPlatformConfig: boolean;
}

const SecondStepForm: FC<ISecondStepFormProp> = ({
  accessId,
  setInitialValues,
  setMlsAccessCredentialId,
  newPlatformConfig,
  setNewPlatformConfig,
}): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<any>();
  const [platformConfigOptions, setplatformConfigOptions] = useState([]);
  const [platformCredentialInput, setPlatformCredentialInput] =
    useState<string>("");
  const [accessCredentialData, setAccessCredentialData] = useState<any>(null);
  const { platform, isMedia } = values;
  const [platformConfigFilter, setPlatformConfigFilter] =
    useState<TGetPlatformList>({
      entity: "platform_credential",
      data: {
        list_filter: {
          limit: 20,
          offset: 0,
          filters: [
            {
              field: "platform_id",
              operator: "=",
              value: platform ? +platform.value : 0,
            },
          ],
        },
      },
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

  const getMlsList = useGetMlsList();
  const getPlatform = useGetPlatformCredential();
  const getEntity = useGetListOfEntity();

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

  useEffect(() => {
    if (platform) getPlatform.mutate(platformConfigFilter);
  }, [platform]);

  useEffect(() => {
    if (getPlatform.isSuccess) {
      let result = getPlatform.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      if (result) {
        setplatformConfigOptions(
          result.map((o: any) => ({ value: o.id, label: o.name }))
        );
      } else setplatformConfigOptions([]);
    }
  }, [getPlatform.isSuccess]);

  useEffect(() => {
    console.log(accessId);
    if (platform) {
    } else
      getMlsList.mutate(
        {
          entity: "mls_access_credential",
          data: {
            list_filter: {
              limit: 10,
              offset: 0,
              filters: [
                { field: "mls_access_id", operator: "=", value: accessId },
              ],
            },
          },
        },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const result = res.data.result;
              setAccessCredentialData(result);
              setInitialValues((old: any) => ({
                ...old,
                className: result.class_name,
                isMedia: result.is_media,
                loginURL: result.login_url,
                mediaObjectType: result.media_object_type,
                agentUsername: result.agent_user_name,
                agentPassword: result.agent_password,
                authType: { value: result.auth_type, label: "" },
                mediaSource: result.media_resource,
                requestMethod: {
                  value: result.request_method,
                  label: result.request_method,
                },
                retsUserName: result.rets_password,
                retsPassword: result.rets_password,
                version: result.version,
                platform: null,
              }));
              setMlsAccessCredentialId(result.id);
            } else setAccessCredentialData(null);
          },
        }
      );
  }, []);

  const refPlatformConfig = useRef<any>();

  const onPlatformConfigChange = (val: any) => {
    setPlatformCredentialInput(val);
    if (platformCredentialInput !== val) {
      clearTimeout(refPlatformConfig.current);
      const timeOut = setTimeout(() => {
        let newFilter = { ...platformConfigFilter };
        //@ts-ignore
        newFilter.data["list_filter"].filters = [
          {
            field: "platform_id",
            operator: "=",
            value: platform ? +platform.value : 0,
          },
          "and",
          { field: "name", operator: "like", value: val ? val : "" },
        ];
        setPlatformConfigFilter(newFilter);
        getPlatform.mutate(newFilter);
      }, 500);
      refPlatformConfig.current = timeOut;
    }
  };

  return (
    <div>
      {!platform ? (
        <div>
          <span className="fs-8 text-black mb-1 d-block">
            MLS Accesses Credential
          </span>

          <InputText
            name="className"
            placeholder="Please enter ..."
            label={"Class Name"}
            id="className"
            wrapperClassName="mb-1"
          />
          <div className="pb-1 border-bottom mb-1">
            <InputText
              name="version"
              placeholder="Please enter ..."
              label={"Version"}
              id="version"
              wrapperClassName="mb-1"
            />
          </div>

          <CheckBox
            label="Is Media"
            name="isMedia"
            id="isMedia"
            wrapperClass="mb-1"
            defaultChecked={isMedia}
          />

          <InputText
            name="mediaSource"
            placeholder="Please enter ..."
            label={"Media Source"}
            id="mediaSource"
            wrapperClassName="mb-1"
          />
          <div className="pb-1 border-bottom mb-1">
            <InputText
              name="mediaObjectType"
              placeholder="Please enter ..."
              label={"Media Object Type"}
              id="mediaObjectType"
              wrapperClassName="mb-1"
            />
          </div>

          <InputText
            name="loginURL"
            placeholder="Please enter ..."
            label={"Login URL"}
            id="loginURL"
            wrapperClassName="mb-1"
          />

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

          <InputText
            name="retsUserName"
            placeholder="Please enter ..."
            label={"Rets User Name"}
            id="retsUserName"
            wrapperClassName="mb-1"
          />
          <div className="pb-1 border-bottom mb-1">
            <InputText
              name="retsPassword"
              placeholder="Please enter ..."
              label={"Rets Password"}
              id="retsPassword"
              type="password"
              wrapperClassName="mb-1"
            />
          </div>

          <InputText
            name="agentUsername"
            placeholder="Please enter ..."
            label={"Agent Username"}
            id="agentUsername"
            wrapperClassName="mb-1"
          />

          <InputText
            name="agentPassword"
            placeholder="Please enter ..."
            label={"Agent Password"}
            id="agentPassword"
            type="password"
            wrapperClassName="mb-1"
          />
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
      ) : (
        <>
          {!newPlatformConfig ? (
            <>
              <SelectOption
                name="platformCredential"
                placeholder="Please select..."
                label={"Platform Credential"}
                id="platformCredential"
                options={platformConfigOptions}
                isLoading={getPlatform.isLoading}
                onInputChange={(val: any) => onPlatformConfigChange(val)}
                wrapperClassName="mb-1"
                noFilter
              />
              <RippleButton
                type="button"
                color="link"
                onClick={() => setNewPlatformConfig(true)}
                className="text-primary fw-bold text-right pe-0 me-0 ms-auto d-block"
              >
                + Add New
              </RippleButton>
            </>
          ) : (
            <>
              {/* NEW */}
              <span className="fs-8 text-black mb-1 d-block">
                Platform Credential
              </span>
              <Row className="pb-1">
                <Col sm={6}>
                  <InputText
                    name="platformName"
                    placeholder="Please enter ..."
                    label={"Name"}
                    id="platformName"
                    wrapperClassName="mb-1"
                  />
                  <InputText
                    name="requestURL"
                    placeholder="Please enter ..."
                    label={"Request URL"}
                    id="requestURL"
                    wrapperClassName="mb-1"
                  />
                </Col>
                <Col sm={6}>
                  <SelectOption
                    name={`platformFeedConnectionType`}
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
                      name="platformAccessToken"
                      placeholder="Please enter ..."
                      label={"Access Token"}
                      id="platformAccessToken"
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
      )}
    </div>
  );
};
export { SecondStepForm };
