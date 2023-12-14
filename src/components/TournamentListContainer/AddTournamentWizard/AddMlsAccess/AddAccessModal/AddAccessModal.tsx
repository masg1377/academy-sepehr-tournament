import React, { FC, useEffect, useRef, useState } from "react";
import { Modal } from "@src/components/common/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { ArrowLeft, ArrowRight } from "react-feather";
import { FormikProps } from "formik";
import Slider from "react-slick";
import { FirstStepForm } from "./FirstStepForm";
import {
  useAddMlsAccess,
  useAddMlsAccessCredential,
  useAddMlsAccessPaymentFlatRateItem,
  useAddMlsAccessPaymentMethod,
  useAddMlsAccessPaymentRangeRateItem,
  useAddMlsConfig,
  useEditMlsAccess,
  useEditMlsAccessCredential,
  useEditMlsAccessPaymentMethod,
} from "@src/core/services/api/mls/mls.api";
import {
  addMlsAccessCredentialValidation,
  addMlsAccessValidation,
  addMlsConfigAccessValidation,
  addMlsPaymentMethodValidation,
} from "@src/core/validations/mls.validation";
import { useParams } from "react-router-dom";
import { SecondStepForm } from "./SecondStepForm/SecondStepForm";
import { ThirdStepForm } from "./ThirdStepForm/ThirdStepForm";
import {
  TAddMlsAccessPaymentMethod,
  TAddMlsConfig,
  TEditMlsAccessCredential,
  TEditMlsAccessPaymentMethod,
  TEditMlsAcess,
} from "@src/core/services/api/mls/type";
import {
  addCurrentPlatformCredentialModalValidation,
  addPlatformCredentialModalValidation,
} from "@src/core/validations/platform.validation";
import { useCreatePlatformCredential } from "@src/core/services/api/platform/platform.api";
import { FourthStepForm } from "./FourthStepForm/FourthStepForm";
import { FivethStepForm } from "./FivethStepForm/FivethStepForm";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import useWindowDimensions from "@src/core/utils/Utils";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  fade: true,
  className: "",
};

interface IAddAccessModalProp {
  isOpen: boolean;
  onToggle: () => void;
  editCellData?: any;
}
const AddAccessModal: FC<IAddAccessModalProp> = ({
  isOpen,
  onToggle,
  editCellData,
}): JSX.Element => {
  const [mlsAccessId, setMlsAccessId] = useState<number>(0);
  const [newPlatformConfig, setNewPlatformConfig] = useState<boolean>(false);
  const [mlsAccessCredentialId, setMlsAccessCredentialId] = useState<number>(0);
  const [mlsAccessPaymentMethodId, setMlsAccessPaymentMethodId] =
    useState<number>(0);
  const [newMlsConfig, setNewMlsConfig] = useState<boolean>(false);
  const [hasPlatform, setHasPlatform] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [initialValues, setInitialValues] = useState<any>({
    platform: null,
    feedConnectionType: null,
    className: "",
    version: "",
    isMedia: true,
    mediaSource: "",
    mediaObjectType: "",
    loginURL: "",
    authType: null,
    retsUserName: "",
    retsPassword: "",
    agentUsername: "",
    agentPassword: "",
    requestMethod: null,
    options: "",
    configResource: "",
    configName: "",
    configQuery: "",
    configLimit: "",
    uniqField: "",
    updateInterval: "",
    photoTimeStamp: "",
    configStatus: false,
    mlsConfig: null,
    accountingStatus: false,
    connectionStatus: false,
    platformName: "",
    tokenURL: "",
    requestURL: "",
    clientId: "",
    clientPassword: "",
    platformAccessToken: "",
    generateToken: true,
    scop: "",
    platformCredential: null,
    dataUrl: "",
    setupFee: "",
    reactivationFee: "",
    lambdaArn: "",
    paymentURL: "",
    paymentPassword: "",
    paymentUserName: "",
    isAutoBilling: false,
    paymentDetails: "",
    contract_type: null,
    platformOptions: null,
    accessTokenFlag: false,
    rangeRates: [
      {
        contractType: null,
        interval: null,
        startDate: "",
        to: "",
        target: "",
        description: "",
        from: "",
        fee: "",
        perType: null,
        paymentDay: "",
      },
    ],
    flatRates: [
      {
        fee: "",
        interval: null,
        startDate: "",
        paymentDayInMth: "",
        target: "",
        description: "",
      },
    ],
  });
  const ref = useRef<any>();
  const { id } = useParams();

  const addAccess = useAddMlsAccess();
  const addAccessCredential = useAddMlsAccessCredential();
  const editAccessCredential = useEditMlsAccessCredential();
  const addConfig = useAddMlsConfig();
  const editAccess = useEditMlsAccess();
  const addCredential = useCreatePlatformCredential();
  const addPaymentMethod = useAddMlsAccessPaymentMethod();
  const editPaymentMethod = useEditMlsAccessPaymentMethod();
  const addPaymentFlatRate = useAddMlsAccessPaymentFlatRateItem();
  const addPaymentRangeRate = useAddMlsAccessPaymentRangeRateItem();

  useEffect(() => {
    if (editCellData) {
      editCellData && editCellData.id && setMlsAccessId(editCellData.id);
      setInitialValues((old: any) => ({
        ...old,
        accountingStatus: editCellData.accounting_status,
        connectionStatus: editCellData.connection_status,
        feedConnectionType: editCellData.feed_type_connection_type_id
          ? {
              value: editCellData.feed_type_connection_type_id,
              label: "",
            }
          : null,
        mlsConfig: editCellData.mls_config_id
          ? { value: editCellData.mls_config_id, label: "" }
          : null,
        platform: editCellData.platform_id
          ? { value: editCellData.platform_id, label: "" }
          : null,
        platformCredential: editCellData.platform_credential_id
          ? { value: editCellData.platform_credential_id, label: "" }
          : null,
        contract_type: editCellData.contract_type
          ? {
              value: editCellData.contract_type,
              label: editCellData.contract_type,
            }
          : null,
      }));
    }
  }, [editCellData]);

  const onSubmit = (values: any) => {
    const {
      platform,
      feedConnectionType,
      className,
      version,
      isMedia,
      mediaSource,
      mediaObjectType,
      loginURL,
      authType,
      retsUserName,
      retsPassword,
      agentUsername,
      agentPassword,
      requestMethod,
      options,
      mlsConfig,
      accountingStatus,
      connectionStatus,
      platformCredential,
      platformName,
      tokenURL,
      requestURL,
      clientId,
      clientPassword,
      platformAccessToken,
      generateToken,
      scop,
      dataUrl,
      setupFee,
      reactivationFee,
      lambdaArn,
      paymentURL,
      paymentPassword,
      paymentUserName,
      isAutoBilling,
      paymentDetails,
      rangeRates,
      flatRates,
      contract_type,
      platformOptions,
      extraData,
      accessTokenFlag,
    } = values;

    if (currentPage === 0) {
      if (platform) {
        if (mlsAccessId || (editCellData && editCellData.id)) {
          let editObj: TEditMlsAcess = {
            entity: "mls_access",
            data: {
              accounting_status: accountingStatus,
              connection_status: connectionStatus,
              id: mlsAccessId || editCellData.id,
              // platform_id: platform.value,
            },
          };
          if (feedConnectionType)
            editObj.data.feed_type_connection_type_id =
              feedConnectionType.value;
          if (contract_type) editObj.data.contract_type = contract_type.value;
          editAccess.mutate(editObj, {
            onSuccess: (res) => {
              if (res.data.is_success) {
                ref.current.slickGoTo(1);
                setCurrentPage(1);
                setHasPlatform(true);
              }
            },
          });
        } else
          addAccess.mutate(
            {
              entity: "mls_access",
              data: {
                accounting_status: accountingStatus,
                connection_status: connectionStatus,
                feed_type_connection_type_id: feedConnectionType.value,
                contract_type: contract_type ? contract_type.value : "",
                mls_id: id ? +id : 0,
                // platform_id: platform.value,
              },
            },
            {
              onSuccess: (res) => {
                if (res.data.is_success) {
                  const result = res.data.result;
                  setMlsAccessId(result.id);
                  ref.current.slickGoTo(1);
                  setCurrentPage(1);
                  setHasPlatform(true);
                }
              },
            }
          );
      } else {
        if (mlsAccessId || (editCellData && editCellData.id)) {
          let editObj: TEditMlsAcess = {
            entity: "mls_access",
            data: {
              accounting_status: accountingStatus,
              connection_status: connectionStatus,
              id: mlsAccessId || editCellData.id,
            },
          };
          if (feedConnectionType)
            editObj.data.feed_type_connection_type_id =
              feedConnectionType.value;
          if (contract_type) editObj.data.contract_type = contract_type.value;
          editAccess.mutate(editObj, {
            onSuccess: (res) => {
              if (res.data.is_success) {
                ref.current.slickGoTo(1);
                setCurrentPage(1);
              }
            },
          });
        } else
          addAccess.mutate(
            {
              entity: "mls_access",
              data: {
                accounting_status: accountingStatus,
                connection_status: connectionStatus,
                feed_type_connection_type_id: feedConnectionType.value,
                contract_type: contract_type ? contract_type.value : "",
                mls_id: id ? +id : 0,
              },
            },
            {
              onSuccess: (res) => {
                if (res.data.is_success) {
                  const result = res.data.result;
                  setMlsAccessId(result.id);
                  ref.current.slickGoTo(1);
                  setCurrentPage(1);
                }
              },
            }
          );
      }
    }

    if (currentPage === 1) {
      if (platform) {
        if (!newPlatformConfig) {
          if (editCellData || mlsAccessId) {
            editAccess.mutate(
              {
                entity: "mls_access",
                data: {
                  id: mlsAccessId || (editCellData && editCellData.id),
                  platform_credential_id: platformCredential.value,
                  platform_id: platform.value,
                },
              },
              {
                onSuccess: (ress) => {
                  if (ress.data.is_success) {
                    ref.current.slickGoTo(2);
                    setCurrentPage(2);
                  }
                },
              }
            );
          } else {
            addAccess.mutate(
              {
                entity: "mls_access",
                data: {
                  accounting_status: accountingStatus,
                  connection_status: connectionStatus,
                  feed_type_connection_type_id: feedConnectionType.value,
                  mls_id: id ? +id : 0,
                  platform_id: platform.value,
                  platform_credential_id: platformCredential.value,
                },
              },
              {
                onSuccess: (res) => {
                  if (res.data.is_success) {
                    const result = res.data.result;
                    setMlsAccessId(result.id);
                    ref.current.slickGoTo(2);
                    setCurrentPage(2);
                  }
                },
              }
            );
          }
        } else {
          let options: any = {};
          if (extraData) {
            extraData.forEach((ex: any) => {
              options[ex.description] =
                ex.type && ex.type.value === 2 ? +ex.order : ex.order;
            });
          }
          let obj: any = {
            entity: "platform_credential",
            data: {
              name: platformName,
              platform_id: platform.value,
              feed_type_connection_type_id: feedConnectionType.value, //values.feedConnectionType,
              // token_url: tokenURL,
              request_url: requestURL,
              // client_id: clientId,
              // client_password: clientPassword,
              // access_token: platformAccessToken,
              // scope: scop,
              // generate_token: generateToken,
              options: options,
            },
          };
          if (accessTokenFlag) {
            obj.data["access_token"] = platformAccessToken;
            obj.data["generate_token"] = generateToken;
          } else {
            obj.data["scope"] = scop;
            obj.data["client_id"] = clientId;
            obj.data["client_password"] = clientPassword;
            obj.data["token_url"] = tokenURL;
            obj.data["generate_token"] = generateToken;
          }
          // if (options) obj.data.options = options;
          addCredential.mutate(obj, {
            onSuccess: (val) => {
              const data = val.data;
              if (data.is_success) {
                console.log("first", mlsAccessId, editCellData);
                if (editCellData || mlsAccessId) {
                  editAccess.mutate(
                    {
                      entity: "mls_access",
                      data: {
                        id: mlsAccessId || (editCellData && editCellData.id),
                        platform_credential_id: data.result.id,
                        platform_id: platform.value,
                        contract_type: contract_type ? contract_type.value : "",
                      },
                    },
                    {
                      onSuccess: (ress) => {
                        if (ress.data.is_success) {
                          setNewPlatformConfig(false);
                          ref.current.slickGoTo(2);
                          setCurrentPage(2);
                        }
                      },
                    }
                  );
                } else
                  addAccess.mutate(
                    {
                      entity: "mls_access",
                      data: {
                        accounting_status: accountingStatus,
                        connection_status: connectionStatus,
                        feed_type_connection_type_id: feedConnectionType.value,
                        mls_id: id ? +id : 0,
                        platform_id: platform.value,
                        platform_credential_id: data.result.id,
                        contract_type: contract_type ? contract_type.value : "",
                      },
                    },
                    {
                      onSuccess: (res) => {
                        if (res.data.is_success) {
                          const result = res.data.result;
                          setMlsAccessId(result.id);
                          ref.current.slickGoTo(2);
                          setCurrentPage(2);
                        }
                      },
                    }
                  );
              }
            },
          });
        }
      } else {
        if (mlsAccessCredentialId) {
          let editObjCredential: TEditMlsAccessCredential = {
            entity: "mls_access_credential",
            data: {
              id: mlsAccessCredentialId,
              agent_password: agentPassword ? agentPassword : null,
              agent_user_name: agentUsername ? agentUsername : null,
              auth_type: authType ? authType.value : null,
              class_name: className ? className : null,
              is_media: isMedia ? isMedia : false,
              login_url: loginURL ? loginURL : null,
              media_object_type: mediaObjectType ? mediaObjectType : null,
              media_resource: mediaSource ? mediaSource : null,
              request_method: requestMethod ? requestMethod.value : null,
              version: version ? version : null,
              rets_password: retsPassword ? retsPassword : null,
              rets_user_name: retsUserName ? retsUserName : null,
            },
          };

          editAccessCredential.mutate(editObjCredential, {
            onSuccess: (res) => {
              if (res.data.is_success) {
                ref.current.slickGoTo(2);
                setCurrentPage(2);
              }
            },
          });
        } else
          addAccessCredential.mutate(
            {
              entity: "mls_access_credential",
              data: {
                auth_type: authType.value,
                class_name: className ? className : null,
                is_media: isMedia ? isMedia : false,
                login_url: loginURL ? loginURL : null,
                media_object_type: mediaObjectType ? mediaObjectType : null,
                media_resource: mediaSource ? mediaSource : null,
                mls_access_id: mlsAccessId,
                request_method: requestMethod.value,
                rets_password: retsPassword ? retsPassword : null,
                rets_user_name: retsUserName ? retsUserName : null,
                version: version ? version : null,
                agent_password: agentPassword ? agentPassword : null,
                agent_user_name: agentUsername ? agentUsername : null,
                // options: null,
              },
            },
            {
              onSuccess: (res) => {
                // console.log(res.data);
                if (res.data.is_success) {
                  ref.current.slickGoTo(2);
                  setCurrentPage(2);
                }
              },
            }
          );
      }
    }

    if (currentPage === 2) {
      if (newMlsConfig) {
        let obj: TAddMlsConfig = {
          entity: "mls_config",
          data: {
            limit: +values.configLimit,
            unique_field: values.uniqField,
            mls_id: id ? +id : 0,
            name: values.configName,
            photo_time_stamp_field: values.photoTimeStamp,
            query: values.configQuery,
            resource: values.configResource,
            update_interval: +values.updateInterval,
            status: values.configStatus,
          },
        };

        addConfig.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              editAccess.mutate(
                {
                  entity: "mls_access",
                  data: {
                    id: mlsAccessId || (editCellData && editCellData.id),
                    mls_config_id: res.data.result.id,
                  },
                },
                {
                  onSuccess: (ress) => {
                    if (ress.data.is_success) {
                      ref.current.slickGoTo(3);
                      setCurrentPage(3);
                    }
                  },
                }
              );
            }
          },
        });
      } else {
        if (mlsConfig) {
          editAccess.mutate(
            {
              entity: "mls_access",
              data: {
                id: mlsAccessId || (editCellData && editCellData.id),
                mls_config_id: mlsConfig.value,
              },
            },
            {
              onSuccess: (res) => {
                if (res.data.is_success) {
                  ref.current.slickGoTo(3);
                  setCurrentPage(3);
                }
              },
            }
          );
        } else {
          ref.current.slickGoTo(3);
          setCurrentPage(3);
        }
      }
    }

    if (currentPage === 3) {
      if (mlsAccessPaymentMethodId) {
        let obj: TEditMlsAccessPaymentMethod = {
          entity: "mls_access_payment_method",
          data: {
            id: mlsAccessPaymentMethodId,
            is_auto_billing: isAutoBilling ? isAutoBilling : false,
            data_url: dataUrl,
            lambda_arn: lambdaArn,
            // payment_details: paymentDetails,
            payment_password: paymentPassword,
            payment_url: paymentURL,
            payment_username: paymentUserName,
            reactivation_fee: reactivationFee ? +reactivationFee : 0,
            setup_fee: setupFee ? +setupFee : 0,
          },
        };
        editPaymentMethod.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              ref.current.slickGoTo(4);
              setCurrentPage(4);
            }
          },
        });
      } else {
        const obj: TAddMlsAccessPaymentMethod = {
          entity: "mls_access_payment_method",
          data: {
            data_url: dataUrl,
            is_auto_billing: isAutoBilling ? isAutoBilling : false,
            mls_access_id: mlsAccessId,
            lambda_arn: lambdaArn,
            // payment_details: paymentDetails,
            setup_fee: setupFee ? +setupFee : 0,
            payment_password: paymentPassword,
            payment_url: paymentURL,
            payment_username: paymentUserName,
            reactivation_fee: reactivationFee ? +reactivationFee : 0,
          },
        };

        addPaymentMethod.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              setMlsAccessPaymentMethodId(res.data.result.id);
              ref.current.slickGoTo(4);
              setCurrentPage(4);
            }
          },
        });
      }
    }

    if (currentPage === 4) {
      onToggle();
    }

    // if (currentPage === 4) {
    //   const range = rangeRates.map((o: any) => ({
    //     fee: +o.fee,
    //     interval: o.interval ? o.interval.value : "",
    //     start_date: o.startDate ? getCustomDate(o.startDate) : null,
    //     payment_day_of_month: +o.paymentDay,
    //     target: o.target && o.target.value,
    //     description: o.description,
    //     contract_type: o.contractType.value,
    //     from_number: o.from,
    //     to_number: o.to,
    //     per_type: o.perType && o.perType.value,
    //     mls_access_payment_method_id: mlsAccessPaymentMethodId,
    //   }));
    //   const flat = flatRates.map((o: any) => ({
    //     fee: +o.fee,
    //     interval: o.interval && o.interval.value,
    //     start_date: o.startDate ? getCustomDate(o.startDate) : null,
    //     payment_day_of_month: +o.paymentDayInMth,
    //     target: o.target && o.target.value,
    //     description: o.description,
    //     mls_access_payment_method_id: mlsAccessPaymentMethodId,
    //   }));

    //   addPaymentFlatRate.mutate(
    //     {
    //       entity: "mls_access_payment_method_flat_rate_item",
    //       data: flat[0],
    //     },
    //     {
    //       onSuccess: (res) => {
    //         if (res.data.is_success) {
    //           addPaymentRangeRate.mutate(
    //             {
    //               entity: "mls_access_payment_method_range_rate_item",
    //               data: range[0],
    //             },
    //             {
    //               onSuccess: (res) => {
    //                 onToggle();
    //               },
    //               onError: (err) => {
    //                 onToggle();
    //               },
    //             }
    //           );
    //         }
    //       },
    //     }
    //   );
    // }
  };

  const { width } = useWindowDimensions();

  return (
    <FormWrapper
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={
        currentPage === 0
          ? addMlsAccessValidation
          : currentPage === 1
          ? hasPlatform
            ? newPlatformConfig
              ? addPlatformCredentialModalValidation
              : addCurrentPlatformCredentialModalValidation
            : addMlsAccessCredentialValidation
          : currentPage === 2
          ? newMlsConfig
            ? addMlsConfigAccessValidation
            : undefined
          : currentPage === 3
          ? addMlsPaymentMethodValidation
          : undefined
      }
    >
      {({ values, handleSubmit }: FormikProps<any>) => (
        <Modal
          size={
            currentPage === 4
              ? "xl"
              : newPlatformConfig
              ? width < 990
                ? "xl"
                : "lg"
              : "sm"
          }
          isOpen={isOpen}
          onToggle={onToggle}
          style={
            currentPage === 4
              ? width < 1200
                ? { width: "96%", maxWidth: "100%" }
                : {}
              : newPlatformConfig && width < 990
              ? { width: "96%", maxWidth: "100%" }
              : {}
          }
          modalTitle={newMlsConfig ? "MLS Config" : "Add Access"}
          bodyClassName="overflow-visible pb-3"
        >
          {{
            main: (
              <Slider
                {...settings}
                ref={(r) => (ref.current = r)}
                swipeToSlide={false}
                draggable={false}
                arrows={false}
                lazyLoad="ondemand"
                // {...(editCellData ? {customPaging:<a>{i}</a>;})}
              >
                <div>
                  <FirstStepForm />
                </div>
                <div>
                  <SecondStepForm
                    setInitialValues={setInitialValues}
                    accessId={mlsAccessId || (editCellData && editCellData.id)}
                    setMlsAccessCredentialId={setMlsAccessCredentialId}
                    setNewPlatformConfig={setNewPlatformConfig}
                    newPlatformConfig={newPlatformConfig}
                  />
                </div>
                <div>
                  <ThirdStepForm
                    setNewMlsConfig={setNewMlsConfig}
                    newMlsConfig={newMlsConfig}
                  />
                </div>
                <div>
                  <FourthStepForm
                    mlsAccessId={mlsAccessId}
                    setInitialValues={setInitialValues}
                    setMlsAccessPaymentMethodId={setMlsAccessPaymentMethodId}
                  />
                </div>
                <div>
                  <FivethStepForm
                    mlsAccessId={mlsAccessId}
                    setInitialValues={setInitialValues}
                    mlsAccessPaymentMethodId={mlsAccessPaymentMethodId}
                  />
                </div>
              </Slider>
            ),
            footer:
              currentPage === 0 ? (
                <SubmitButton
                  type="submit"
                  color="primary"
                  outline
                  className="btn-next"
                  block={currentPage === 0}
                  isLoading={addAccess.isLoading || editAccess.isLoading}
                  onClick={handleSubmit}
                  schema={
                    currentPage === 0
                      ? addMlsAccessValidation
                      : currentPage === 1
                      ? hasPlatform
                        ? newPlatformConfig
                          ? addPlatformCredentialModalValidation
                          : addCurrentPlatformCredentialModalValidation
                        : addMlsAccessCredentialValidation
                      : currentPage === 2
                      ? newMlsConfig
                        ? addMlsConfigAccessValidation
                        : undefined
                      : currentPage === 3
                      ? addMlsPaymentMethodValidation
                      : undefined
                  }
                >
                  <span className={"align-middle d-sm-inline-block"}>Next</span>
                  <ArrowRight
                    size={14}
                    className="align-middle ms-sm-25 ms-0"
                  ></ArrowRight>
                </SubmitButton>
              ) : (
                <div className="d-flex justify-content-between w-100">
                  <SubmitButton
                    type="button"
                    color="link"
                    outline
                    className="btn-next border-0 text-primary"
                    onClick={() => {
                      if (currentPage === 1 && newPlatformConfig)
                        setNewPlatformConfig(false);
                      else if (currentPage === 2 && newMlsConfig)
                        setNewMlsConfig(false);
                      else {
                        ref.current.slickGoTo(currentPage - 1);
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                  >
                    <ArrowLeft
                      size={14}
                      className="align-middle ms-sm-25 me-0"
                    ></ArrowLeft>
                    <span className={"align-middle d-sm-inline-block"}>
                      Back
                    </span>
                  </SubmitButton>

                  <div className="d-flex">
                    {currentPage < 4 && (
                      <SubmitButton
                        type="button"
                        color="link"
                        outline
                        className="btn-next  border-0 text-primary"
                        onClick={() => {
                          if (currentPage === 3 && !mlsAccessPaymentMethodId) {
                            return onToggle();
                          }
                          const cur = currentPage;
                          ref.current.slickGoTo(cur + 1);
                          setCurrentPage((old) => old + 1);
                        }}
                      >
                        <span className={"align-middle d-sm-inline-block"}>
                          Skip
                        </span>
                      </SubmitButton>
                    )}
                    <SubmitButton
                      type="submit"
                      color="primary"
                      outline
                      className="btn-next"
                      isLoading={
                        addAccessCredential.isLoading ||
                        addConfig.isLoading ||
                        editAccess.isLoading ||
                        editAccessCredential.isLoading ||
                        addPaymentMethod.isLoading ||
                        addCredential.isLoading ||
                        addPaymentMethod.isLoading ||
                        editPaymentMethod.isLoading ||
                        addPaymentFlatRate.isLoading ||
                        addPaymentRangeRate.isLoading ||
                        addAccess.isLoading
                      }
                      onClick={handleSubmit}
                      schema={
                        currentPage === 0
                          ? addMlsAccessValidation
                          : currentPage === 1
                          ? hasPlatform
                            ? newPlatformConfig
                              ? addPlatformCredentialModalValidation
                              : addCurrentPlatformCredentialModalValidation
                            : addMlsAccessCredentialValidation
                          : currentPage === 2
                          ? newMlsConfig
                            ? addMlsConfigAccessValidation
                            : undefined
                          : currentPage === 3
                          ? addMlsPaymentMethodValidation
                          : undefined
                      }
                    >
                      <span className={"align-middle d-sm-inline-block"}>
                        {currentPage === 4 ? "Finish" : "Next"}
                      </span>
                      <ArrowRight
                        size={14}
                        className="align-middle ms-sm-25 ms-0"
                      ></ArrowRight>
                    </SubmitButton>
                  </div>
                </div>
              ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { AddAccessModal };
