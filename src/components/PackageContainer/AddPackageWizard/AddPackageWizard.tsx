// ** React Imports
import { FC, useEffect, useRef, useState } from "react";

// ** Custom Components
import { Wizard } from "@src/components/common/wizard";
import Coins from "@src/assets/images/icons/Coins.png";

// ** Icons Imports
import { File, FileText, Lock, CreditCard, User, Shield } from "react-feather";
import { GeneralInformation } from "./GeneralInformation/GeneralInformation";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { FormikProps } from "formik";
import { UserProfession } from "./UserProfession/UserProfession";
import { UsagePlan } from "./UsagePlan/UsagePlan";
import { BTTInformation } from "./BTTInformation/BTTInformation";
import { MLSInformation } from "./MLSInformation/MLSInformation";
import {
  useCreatePackage,
  useCreatePackagePaymentInfo,
  useEditPackage,
  useEditPackagePaymentInfo,
} from "@src/core/services/api/package/package.api";
import {
  TAddPackage,
  TAddPaymentMethod,
  TEditPaymentMethod,
} from "@src/core/services/api/package/type";
import {
  addPackageValidation,
  addPackStep1Validation,
  addPackStep3Validation,
  addPackStep4Validation,
  addPackStep5Validation,
} from "@src/core/validations/package.validation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PaymentInfo } from "./PaymentInfo/PaymentInfo";
import { useDispatch } from "react-redux";
import { handlePaymentType, removePaymentType } from "@src/redux/package";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import toast from "react-hot-toast";
import {
  packageGetRelatedToData,
  packageGetTypeData,
  packageGetTypeDataForUpdate,
  packageGetRelatedToUpdateData,
  packageTypeData,
  packageRelatedToData,
} from "@src/core/data/package.data";
import { capitalizeFirstLetter } from "@src/core/utils/Utils";
import { TGetEntities } from "@src/core/services/api/entities/type";
import {
  handleAddRemoveOptions,
  handleAddRemoveOptionsForLanguageDescription,
} from "@src/core/utils/optionsAddRemovehandler.utils";
import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";

const AddPackageWizard: FC = (): JSX.Element => {
  // ** Ref
  const ref = useRef(null);
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { paymentType }: any = useSelector((state: RootState) => state.package);
  const typeSelected = paymentType.find((o: any) => o.id == id);

  const isEdit = location.pathname.includes("edit");
  const isDuplicate = location.pathname.includes("duplicate");
  const [packageDetails, setPackageDetails] = useState<any>(null);

  const [languagess, setLanguagess] = useState([]);
  const [bttItems, setBttItems] = useState<any>(null);
  const [preBttItems, setPreBttItems] = useState<any>(null);
  const [profession, setProfession] = useState<any>(null);
  const [locations, setLocations] = useState<any>(null);

  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const [feedOption, setfeedOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [loadFlag, setLoadFlag] = useState<boolean>(false);
  const [isLinear, setIsLinear] = useState<boolean>(true);
  const [paymenttypeOne, setPaymenttypeOne] = useState<boolean>(false);

  const [initialValues, setInitialValues] = useState({
    paymentMethod: null,
    publishedPackage: false,
    nickname: null,
    unitAmount: null,
    hasUserProfession: true,
    hasLocation: true,
    interval: null,
    intervalCount: null,
    usageType: null,
    recurring_aggregate_usage: null,
    billingSchema: null,
    tiresMods: null,
    taxBehavior: null,
    trialPeriodDays: null,
    oneTimeValidDays: null,
    hasBttItems: true,
    hasPreRegBtt: false,
    type: null,
    name: "",
    sourceRelatedTo: null,
    source: null,
    taxCode: "",
    multiple: null,
    bttItems: null,
    feedType: null,
    usagePlanId: null,
    hasMls: false,
    mlsId: null,
    mlsContractType: null,
    location: null,
    hasUsagePlan: true,
    preRegBttItems: null,
    userProfession: null,
    paymentType: null,
    language: [
      {
        value: 1,
        label: "EN",
        name: "English",
        description: [],
        longDescription: "",
        shortDescription: "",
        noticeDescription: "",
        conditionDescription: "",
      },
    ],
    mobile_icon: "",
    web_icon: "",
    banner_image: "",
  });

  const getDetail = useGetListOfEntity();
  const addPayment = useCreatePackagePaymentInfo();
  const editPayment = useEditPackagePaymentInfo();

  const packageDetail = useGetListOfEntity();
  const packageBtt = useGetListOfEntity();
  const packagePreBtt = useGetListOfEntity();
  const packageLanguage = useGetListOfEntity();
  const getFeedType = useGetListOfEntity();

  const getFeedTypes = () => {
    getFeedType.mutate(
      {
        entity: "feed_types_connection_types",
        data: {
          list_filter: {
            limit: 10000,
            offset: 0,
            order_by: "creation_date",
            filters: [],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            //if (result && !Array.isArray(result)) result = [result];
            setfeedOption(
              result.map((i: any) => ({
                value: i.id,
                label:
                  (!!i.feed_type ? i.feed_type : "--") +
                  "/" +
                  (!!i.connection_type ? i.connection_type : "--"),
              }))
            );
          }
        },
      }
    );
  };

  const getPackageBtt = () => {
    packageBtt.mutate(
      {
        entity: "packages_btt_items",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
            filters: [
              { field: "package_id", operator: "=", value: id ? +id : 0 },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            //setBttItems(result);
            setBttItems(
              result.map((item: any, index: number) => ({
                value: item?.btt_type_items_id,
                label: item?.packages_btt_item_name,
                count: item?.btt_type_items_count,
              }))
            );
          }
        },
        onError: (err) => {
          setBttItems([]);
        },
      }
    );
  };
  const getPreBttItems = () => {
    packagePreBtt.mutate(
      {
        entity: "packages_pre_req_btt_items",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
            filters: [
              { field: "package_id", operator: "=", value: id ? +id : 0 },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            //setPreBttItems(result);
            setPreBttItems(
              result.map((item: any, index: number) => ({
                value: item?.btt_type_items_id,
                label: item?.btt_type_item_name,
                count: 0,
              }))
            );
          }
        },
        onError: (er) => {
          setPreBttItems([]);
        },
      }
    );
  };

  const getPackageLanguage = () => {
    packageLanguage.mutate(
      {
        entity: "package_descriptions",
        data: {
          list_filter: {
            limit: 1000000,
            offset: 0,
            filters: [
              { field: "package_id", operator: "=", value: id ? +id : 0 },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            const lang = result?.map((item: any, index: number) => ({
              desPackageId: item.id,
              value:
                item.language_code === "EN"
                  ? 1
                  : item.language_code === "FR"
                  ? 2
                  : item.language_id,
              label: item.language_code,
              name:
                item.language_code === "EN"
                  ? "English"
                  : item.language_code === "FR"
                  ? "French"
                  : item.language_name,
              description: item.description
                ? item?.description
                    //?.filter((m: any) => m.value_type !== "text")
                    ?.filter((m: any) => m.key !== "longDesc")
                    .map((item: any, index: number) => ({
                      key: item?.key,
                      type: {
                        value: item?.type ? item?.type : item?.value_type,
                        label: capitalizeFirstLetter(
                          item?.type ? item?.type : item?.value_type
                        ),
                      },
                      value:
                        typeof item?.value === "boolean"
                          ? {
                              value: item?.value,
                              label: item?.value ? "True" : "False",
                            }
                          : item?.value,
                    }))
                : [],
              longDescription: item.description
                ? item?.description?.find(
                    (m: any) => m.value_type === "text" && m.key === "longDesc"
                  )?.value
                : "",
              shortDescription: item.short_description
                ? item?.short_description
                : "",
              noticeDescription: item.notice_description,
              conditionDescription: item.condition_description,
            }));
            setLanguagess(lang);
            setLoadFlag(true);
          }
        },
        onError: (er) => {
          setLanguagess([]);
        },
      }
    );
  };

  useEffect(() => {
    if (id && (isEdit || isDuplicate)) {
      getPackageLanguage();
      setTimeout(getFeedTypes, 900);
    }
  }, [reloadFlag]);

  useEffect(() => {
    if (loadFlag && id && (isEdit || isDuplicate)) {
      getPackageBtt();
      getPreBttItems();
    }
  }, [loadFlag]);

  useEffect(() => {
    if (id && (isEdit || isDuplicate)) {
      getDetail.mutate(
        { entity: "packages", data: { id: id ? +id : 0 } },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const result = res.data.result;
              setPackageDetails(result);
              setProfession(
                result.user_professions
                  ? result.user_professions.map((item: any, index: number) => ({
                      value: item?.id,
                      label: item?.name,
                    }))
                  : []
              );
              setLocations(
                result.locations
                  ? result.locations.map((item: any, index: number) => ({
                      value: item?.id,
                      label: item?.label,
                    }))
                  : []
              );
              setInitialValues((old: any) => ({
                ...old,
                publishedPackage: result && result.published,
                name: result.name ? result.name : "",
                multiple: result.multiple
                  ? { value: 1, label: "Yes" }
                  : { value: 2, label: "No" },
                type: result.type
                  ? {
                      value: packageGetTypeDataForUpdate.find(
                        (o) => o.value === result.type
                      )?.value,
                      label: packageGetTypeData.find(
                        (o) => o.value === result.type
                      )?.label,
                    }
                  : null,
                source: result.source
                  ? {
                      value: result.source,
                      label: capitalizeFirstLetter(result.source),
                    }
                  : null,
                sourceRelatedTo: result.related_to
                  ? {
                      value: packageGetRelatedToUpdateData.find(
                        (o) => o.value === result.related_to
                      )?.value,
                      label: packageGetRelatedToData.find(
                        (o) => o.value === result.related_to
                      )?.label,
                    }
                  : null,
                taxCode: result.tax_code ? result.tax_code : "",
                mobile_icon: result.mobile_icon ? result.mobile_icon : "",
                web_icon: result.web_icon ? result.web_icon : "",
                banner_image: result.banner ? result.banner : "",
                hasUserProfession:
                  result &&
                  result.user_professions &&
                  result.user_professions.length > 0 &&
                  result.user_professions[0] !== null
                    ? true
                    : false,
                hasLocation:
                  result &&
                  result.locations &&
                  result.locations.length > 0 &&
                  result.locations[0] !== null
                    ? true
                    : false,
                userProfession:
                  result && result.user_professions
                    ? result.user_professions.map(
                        (item: any, index: number) => ({
                          value: item?.id,
                          label: item?.name,
                          isServer: true,
                        })
                      )
                    : [],
                location:
                  result && result.locations
                    ? result.locations.map((item: any, index: number) => ({
                        value: item?.id,
                        label: item?.name,
                        isServer: true,
                      }))
                    : [],
                hasUsagePlan: result && result.usage_plan_id ? true : false,
                usagePlanId: result.usage_plan_id && {
                  value: result.usage_plan_id,
                  label: result.usage_plane_name,
                },
                mlsId: result.mls_id && {
                  value: result.mls_id,
                  label: result.mls_name,
                },
                mlsContractType: result.mls_contract_type && {
                  value: result.mls_contract_type.toLowerCase(),
                  label: result.mls_contract_type,
                },
                hasMls: result.mls_id ? true : false,
                paymentType: result?.payment_methods
                  ? result?.payment_methods[0] &&
                    result?.payment_methods[0]?.type &&
                    result?.payment_methods[0]?.type === 1
                    ? {
                        value: 1,
                        label: "One_time",
                      }
                    : { value: 2, label: "Recurring" }
                  : null,
                //paymentMethod: null,
                nickname:
                  result?.payment_methods &&
                  result?.payment_methods[0] &&
                  result?.payment_methods[0]?.type === 1 &&
                  result?.payment_methods[0]?.nickname &&
                  result?.payment_methods[0]?.nickname,
                unitAmount:
                  result?.payment_methods &&
                  result?.payment_methods[0] &&
                  result?.payment_methods[0]?.type === 1 &&
                  result?.payment_methods[0]?.unit_amount &&
                  result?.payment_methods[0]?.unit_amount,
                billingSchema:
                  result?.payment_methods &&
                  result?.payment_methods[0] &&
                  result?.payment_methods[0]?.type === 1 &&
                  result?.payment_methods[0]?.billing_schema
                    ? result?.payment_methods[0]?.billing_schema === "per_unit"
                      ? { value: "per_unit", label: "Per Unit" }
                      : { value: "tiered", label: "Tiered" }
                    : null,
                tiresMods:
                  result?.payment_methods &&
                  result?.payment_methods[0] &&
                  result?.payment_methods[0]?.type === 1 &&
                  result?.payment_methods[0]?.tires_mode
                    ? result?.payment_methods[0]?.tires_mode === "graduated"
                      ? { value: "graduated", label: "Graduated" }
                      : { value: "volume", label: "Volume" }
                    : null,
                taxBehavior:
                  result?.payment_methods &&
                  result?.payment_methods[0] &&
                  result?.payment_methods[0]?.type === 1 &&
                  result?.payment_methods[0]?.tax_behavior
                    ? {
                        value: result?.payment_methods[0]?.tax_behavior,
                        label: capitalizeFirstLetter(
                          result?.payment_methods[0]?.tax_behavior
                        ),
                      }
                    : null,
                trialPeriodDays:
                  result?.payment_methods &&
                  result?.payment_methods[0] &&
                  result?.payment_methods[0]?.type === 1 &&
                  result?.payment_methods[0]?.trial_period_days &&
                  result?.payment_methods[0]?.trial_period_days,
                oneTimeValidDays:
                  result?.payment_methods &&
                  result?.payment_methods[0] &&
                  result?.payment_methods[0]?.type === 1 &&
                  result?.payment_methods[0]?.one_time_valid_days &&
                  result?.payment_methods[0]?.one_time_valid_days,
              }));
            }
          },
        }
      );
    }
  }, [reloadFlag]);

  useEffect(() => {
    if (id && (isEdit || isDuplicate))
      setInitialValues((old: any) => ({
        ...old,
        language: languagess
          ? //@ts-ignore
            languagess?.map((item: any, index: number) => ({
              ...item,
              isServer: true,
            }))
          : [],
      }));
  }, [languagess, reloadFlag]);

  useEffect(() => {
    if (feedOption && packageDetails && id && (isEdit || isDuplicate)) {
      setInitialValues((old: any) => ({
        ...old,
        feedType: feedOption.find(
          (item: any) => item.label === packageDetails.feed_type
        ),
      }));
    }
  }, [feedOption, packageDetails]);

  useEffect(() => {
    setInitialValues((old: any) => ({
      ...old,
      hasBttItems: bttItems && bttItems[0] ? true : false,
      hasPreRegBtt: preBttItems && preBttItems[0] ? true : false,
      bttItems: bttItems
        ? //@ts-ignore
          bttItems?.map((item: any, index: number) => ({
            ...item,
            isServer: true,
          }))
        : [],
      preRegBttItems: preBttItems
        ? //@ts-ignore
          preBttItems?.map((item: any, index: number) => ({
            ...item,
            isServer: true,
          }))
        : [],
    }));
  }, [bttItems, preBttItems, reloadFlag]);

  const createPackage = useCreatePackage();
  const editPackage = useEditPackage();
  // ** State
  const [stepper, setStepper] = useState<any>(null);
  const [indexStep, setIndexStep] = useState<number>(0);

  useEffect(() => {
    if (indexStep === 1) {
      //console.log("yesssss");
      setIsLinear(false);
    }
  }, [indexStep]);

  //console.log(indexStep);

  const navigate = useNavigate();

  const onSubmit = (values: any, isSave?: boolean) => {
    //console.log("data", packageDetails?.banner);
    //console.log("data2", values.banner_image);
    if (
      indexStep < 5 &&
      indexStep !== 4 &&
      (!isSave || typeof isSave !== "boolean")
    ) {
      stepper.next();
      // setIndexStep((old) => old + 1);
    }
    if (
      indexStep === 4 ||
      (indexStep < 5 && isSave && typeof isSave === "boolean")
    ) {
      // console.log(values);

      // console.log("lang", values.language);
      const language = values.language;
      let obj: TAddPackage | any = {
        type: values.type && values.type.value,
        multiple: values.multiple.value === 1,
        name: values.name,
        tax_code: values.taxCode,
        related_to: values.sourceRelatedTo && values.sourceRelatedTo.value,
        source: values.source && values.source.value,
        mobile_icon: values.mobile_icon ? values.mobile_icon : "",
        web_icon: values.web_icon ? values.web_icon : "",
        banner: values.banner_image ? values.banner_image : "",
        // description: [],
        active: true,
        // language_code: "en",
        feed_type: "",
        usage_plan_id: null,
        mls_id: null,
        mls_contract_type: "",
        btt_items_id: [],
        pre_req_btt_items: [],
        user_professions_items: [],
      };

      if (values.hasUsagePlan) {
        obj["usage_plan_id"] = values.usagePlanId
          ? values.usagePlanId.value
          : null;
      }

      if (values.hasMls) {
        obj["feed_type"] = values.feedType ? values.feedType.label : null;
        obj["mls_id"] = values.mlsId ? values.mlsId.value : null;
        obj["mls_contract_type"] = values.mlsContractType
          ? values.mlsContractType.value
          : null;
      }

      const package_descriptions: any = [];
      if (language) {
        language.forEach((lang: any) => {
          let descriptionData: any[] = [];
          descriptionData =
            lang.description &&
            lang.description.map((o: any) => ({
              key: o.key,
              value:
                o.type.value === "boolean"
                  ? o.value
                    ? o.value?.value
                    : true
                  : o.type.value === "number"
                  ? o.value
                    ? o.value
                    : 1
                  : o.type.value === "text"
                  ? o.value
                    ? o.value
                    : "-"
                  : "",
              value_type: o.type.value,
            }));
          descriptionData.push({
            key: "longDesc",
            value: lang.longDescription ? lang.longDescription : "",
            value_type: "text",
          });
          package_descriptions.push({
            language_code: lang.label,
            short_description: lang.shortDescription,
            notice_description: lang.noticeDescription,
            condition_description: lang.conditionDescription,
            description: descriptionData,
          });
        });
      }
      if (package_descriptions && package_descriptions.length > 0)
        obj["package_descriptions"] = package_descriptions;

      if (isEdit && id) {
        let addItem: any[] = [];
        let removeItem: any[] = [];
        let updateItem: any[] = [];

        const preBttData = handleAddRemoveOptions(
          preBttItems,
          values.preRegBttItems,
          "pre_req_btt"
        );
        addItem.push(...preBttData.addedItem);
        removeItem.push(...preBttData.removedItem);

        const bttData = handleAddRemoveOptions(
          bttItems,
          values.bttItems,
          "btt_item"
        );
        addItem.push(...bttData.addedItem);
        removeItem.push(...bttData.removedItem);

        const professionData = handleAddRemoveOptions(
          profession,
          values.userProfession,
          "user_professions"
        );
        addItem.push(...professionData.addedItem);
        removeItem.push(...professionData.removedItem);

        const locationData = handleAddRemoveOptions(
          locations,
          values.location,
          "location"
        );
        addItem.push(...locationData.addedItem);
        removeItem.push(...locationData.removedItem);

        const languageDescriptionData =
          handleAddRemoveOptionsForLanguageDescription(
            languagess,
            values.language,
            "package_descriptions"
          );
        addItem.push(...languageDescriptionData.addedItem);
        removeItem.push(...languageDescriptionData.removedItem);
        updateItem.push(...languageDescriptionData.updatedItem);

        let updateObj: any = {
          id: id ? +id : 0,
          type:
            values.type &&
            packageTypeData.find(
              (item: any) => item.value === values.type.value
            )?.value,
          name: values.name,
          source: values.source && values.source.value,
          related_to:
            values.sourceRelatedTo &&
            packageRelatedToData.find(
              (item: any) => item.value === values.sourceRelatedTo.value
            )?.value,
          tax_code: values.taxCode,
          active: true,
          multiple: values.multiple.value === 1,
          usage_plan_id: values.usagePlanId ? values.usagePlanId.value : null,
          //published: true,
          published: values.publishedPackage,
          //banner: values.banner_image ? values.banner_image : "",
          //mobile_icon: values.mobile_icon ? values.mobile_icon : "",
          //web_icon: values.web_icon ? values.web_icon : "",
          banner: values.banner_image
            ? values.banner_image === packageDetails?.banner
              ? undefined
              : values.banner_image
            : null,
          mobile_icon: values.mobile_icon
            ? values.mobile_icon === packageDetails?.mobile_icon
              ? undefined
              : values.mobile_icon
            : null,
          web_icon: values.web_icon
            ? values.web_icon === packageDetails?.web_icon
              ? undefined
              : values.web_icon
            : null,
          mls_id: values.mlsId ? values.mlsId.value : null,
          feed_type: values.feedType ? values.feedType.label : null,
          mls_contract_type: values.mlsContractType
            ? values.mlsContractType.value
            : null,
          confirmation: true,
          relations: {
            add: addItem,
            remove: removeItem,
            update: updateItem,
          },
        };
        // console.log("update", updateObj);
        // return;

        editPackage.mutate(updateObj, {
          onSuccess: (res) => {
            const result = res.data.result;
            if (res.data.is_success) {
              //navigate("/packages/edit/" + result.package_id);
              setLoadFlag(false);
              setReloadFlag((old: any) => !old);
              if (!isSave || typeof isSave !== "boolean") stepper.next();
              else toast.success("Successfully saved!");
            } else toast.error("Error occured! Please try again");
          },
          onError: () => {
            toast.error("Error occured! Please try again");
          },
        });
      }
      //return;
      else {
        if (values.hasUserProfession)
          obj["user_professions_items"] = values.userProfession
            ? values.userProfession.map((o: any) => o.value)
            : [];
        if (values.hasLocation) {
          obj["country_id"] = values.location
            ? values.location?.map(
                (it: { value: number; label: string }) => it.value
              )
            : [];
        }
        if (values.hasBttItems) {
          obj["btt_items_id"] = values.bttItems
            ? values.bttItems.map((o: any) => ({
                id: o.value,
                count: +o.count,
              }))
            : null;
        }
        if (values.hasPreRegBtt) {
          obj["pre_req_btt_items"] = values.preRegBttItems
            ? values.preRegBttItems.map((o: any) => o.value)
            : null;
        }
        createPackage.mutate(obj, {
          onSuccess: (res) => {
            const result = res.data.result;
            // console.log(result);
            if (res.data.is_success) {
              navigate("/packages/add/" + result.package_id);
              if (!isSave || typeof isSave !== "boolean") stepper.next();
              else toast.success("Successfully saved!");
            } else toast.error("Error occured! Please try again");
          },
          onError: () => {
            toast.error("Error occured! Please try again");
          },
        });
      }
    }
    if (indexStep >= 5) {
      if (
        isEdit &&
        isDuplicate &&
        id &&
        packageDetails &&
        packageDetails?.payment_methods &&
        packageDetails?.payment_methods[0]?.type === 1
      ) {
        const updateObj: any = {
          id: packageDetails?.payment_methods[0]?.id,
          active: true,
          type: values.paymentType && values.paymentType.value,
          nickname: values.nickname,
          tax_behavior: values.taxBehavior && values.taxBehavior.value,
          tires_mode:
            values.billingSchema && values.billingSchema.value === "tiered"
              ? values.tiresMods && values.tiresMods.value
              : null,
          trial_period_days: null,
          unit_amount:
            values.unitAmount && values.unitAmount % 1 === 0
              ? values.unitAmount
              : null,
          billing_schema: values.billingSchema && values.billingSchema.value,
          item_id: [id ? +id : 0],
          item_type: "package",
          // one_time_valid_days: values.oneTimeValidDays
          //   ? values.oneTimeValidDays
          //   : 0,
          //currency: "usd",
          // recurring_aggregate_usage:
          //   values.recurring_aggregate_usage &&
          //   values.recurring_aggregate_usage.value,
          // recurring_interval: values.interval && values.interval.value,
          // recurring_interval_count: values.intervalCount,
          // recurring_usage_type: values.usageType && values.usageType.value,
          // unit_amount_decimal:
          //   values.unitAmount && values.unitAmount % 1 !== 0
          //     ? values.unitAmount
          //     : null,
          // zipcode_id: null,
        };

        //console.log("updateObjPayment", updateObj);
        editPayment.mutate(updateObj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              //navigate("/packages");
              navigate("/packages/" + id);
            }
          },
        });
      } else if (
        isEdit &&
        isDuplicate &&
        id &&
        packageDetails &&
        packageDetails?.payment_methods &&
        packageDetails?.payment_methods[0]?.type !== 1
      ) {
        //return navigate("/packages");
        return navigate("/packages/" + id);
      } else if (!values.paymentType) {
        //return navigate("/packages");
        return navigate("/packages/" + id);
      } else if (isEdit && isDuplicate && id && !values.paymentType) {
        //return navigate("/packages");
        return navigate("/packages/" + id);
      } else {
        if (values.paymentType && values.paymentType.value === 2)
          //return navigate("/packages");
          return navigate("/packages/" + id);
        //console.log(values, indexStep);
        const obj: TAddPaymentMethod = {
          active: true,
          billing_scheme: values.billingSchema
            ? values.billingSchema.value
            : "",
          currency: "usd",
          item_id: id ? +id : 0,
          item_type: "package",
          type: values.paymentType && values.paymentType.value,
          nickname: values.nickname,
          one_time_valid_days: values.oneTimeValidDays
            ? values.oneTimeValidDays
            : 0,
          recurring_aggregate_usage:
            values.recurring_aggregate_usage &&
            values.recurring_aggregate_usage.value,
          recurring_interval: values.interval && values.interval.value,
          recurring_interval_count: values.intervalCount,
          recurring_usage_type: values.usageType && values.usageType.value,
          tax_behavior: values.taxBehavior && values.taxBehavior.value,
          //tires_mode: values.tiresMods && values.tiresMods.value,
          tires_mode:
            values.billingSchema && values.billingSchema.value === "tiered"
              ? values.tiresMods && values.tiresMods.value
              : null,
          trial_period_days: null,
          unit_amount:
            values.unitAmount && values.unitAmount % 1 === 0
              ? values.unitAmount
              : null,
          unit_amount_decimal:
            values.unitAmount && values.unitAmount % 1 !== 0
              ? values.unitAmount
              : null,
          zipcode_id: null,
        };
        addPayment.mutate(obj, {
          onSuccess: (res) => {
            //console.log(res.data);
            if (res.data.is_success) {
              // dispatch(
              //   removePaymentType({
              //     id: id ? +id : 0,
              //     value: values.paymentType.value,
              //   })
              // );
              dispatch(
                handlePaymentType({
                  id: id ? +id : 0,
                  value: values.paymentType.value,
                })
              );
              //navigate("/packages");
              navigate("/packages/" + id);
            }
          },
          onError: (err) => {},
        });
      }
    }
  };

  const steps = [
    {
      id: "general-information",
      title: "General Information",
      icon: <FileText size={18} />,
      content: (
        <GeneralInformation
          editMode={id ? true : false}
          onSubmit={onSubmit}
          submitLoading={createPackage.isLoading || editPackage.isLoading}
          isLoading={
            packageBtt.isLoading ||
            packagePreBtt.isLoading ||
            packageLanguage.isLoading ||
            getDetail.isLoading
              ? true
              : false
          }
          stepper={stepper}
          setIndexStep={setIndexStep}
          indexStep={indexStep}
          schema={
            indexStep === 0
              ? addPackStep1Validation
              : indexStep === 1
              ? undefined
              : indexStep === 2
              ? addPackStep3Validation
              : indexStep === 3
              ? addPackStep4Validation
              : indexStep === 4
              ? addPackageValidation
              : undefined
          }
        />
      ),
    },
    {
      id: "user-profession",
      title: "User Profession",
      subtitle: " ",
      icon: <User size={18} />,
      content: (
        <UserProfession
          stepper={stepper}
          onSubmit={onSubmit}
          setIndexStep={setIndexStep}
          indexStep={indexStep}
          submitLoading={createPackage.isLoading || editPackage.isLoading}
          isLoading={
            packageBtt.isLoading ||
            packagePreBtt.isLoading ||
            packageLanguage.isLoading ||
            getDetail.isLoading
              ? true
              : false
          }
          schema={
            indexStep === 0
              ? addPackStep1Validation
              : indexStep === 1
              ? undefined
              : indexStep === 2
              ? addPackStep3Validation
              : indexStep === 3
              ? addPackStep4Validation
              : indexStep === 4
              ? addPackageValidation
              : undefined
          }
        />
      ), //<AddMlsDoc stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "usage-plan",
      title: "Usage Plan",
      icon: <File size={18} />,
      content: (
        <UsagePlan
          stepper={stepper}
          setIndexStep={setIndexStep}
          indexStep={indexStep}
          submitLoading={createPackage.isLoading || editPackage.isLoading}
          onSubmit={onSubmit}
          isLoading={
            packageBtt.isLoading ||
            packagePreBtt.isLoading ||
            packageLanguage.isLoading ||
            getDetail.isLoading ||
            createPackage.isLoading ||
            editPackage.isLoading
              ? true
              : false
          }
          schema={
            indexStep === 0
              ? addPackStep1Validation
              : indexStep === 1
              ? undefined
              : indexStep === 2
              ? addPackStep3Validation
              : indexStep === 3
              ? addPackStep4Validation
              : indexStep === 4
              ? addPackageValidation
              : undefined
          }
        />
      ), //<AddMlsConfig stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "btt-informations",
      title: "BTT informations",
      icon: <Shield size={18} />,
      content: (
        <BTTInformation
          stepper={stepper}
          setIndexStep={setIndexStep}
          indexStep={indexStep}
          onSubmit={onSubmit}
          submitLoading={createPackage.isLoading || editPackage.isLoading}
          isLoading={
            packageBtt.isLoading ||
            packagePreBtt.isLoading ||
            packageLanguage.isLoading ||
            getDetail.isLoading ||
            createPackage.isLoading ||
            editPackage.isLoading
              ? true
              : false
          }
          schema={
            indexStep === 0
              ? addPackStep1Validation
              : indexStep === 1
              ? undefined
              : indexStep === 2
              ? addPackStep3Validation
              : indexStep === 3
              ? addPackStep4Validation
              : indexStep === 4
              ? addPackageValidation
              : undefined
          }
        />
      ), //<AddMlsAccess stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "mls-informations",
      title: "MLS informations",
      icon: <img src={Coins} style={{ width: 16 }} />,
      content: (
        <MLSInformation
          stepper={stepper}
          setIndexStep={setIndexStep}
          onSubmit={onSubmit}
          isLoading={
            isEdit && id
              ? editPackage.isLoading || addPayment.isLoading
                ? true
                : false
              : createPackage.isLoading || addPayment.isLoading
              ? true
              : false
          }
          firstIsLoading={
            packageBtt.isLoading ||
            packagePreBtt.isLoading ||
            packageLanguage.isLoading ||
            getDetail.isLoading
              ? true
              : false
          }
          indexStep={indexStep}
          schema={
            indexStep === 0
              ? addPackStep1Validation
              : indexStep === 1
              ? undefined
              : indexStep === 2
              ? addPackStep3Validation
              : indexStep === 3
              ? addPackStep4Validation
              : indexStep === 4
              ? addPackageValidation
              : undefined
          }
        />
      ), //<AddMlsAccess stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "payment-info",
      title: "Payment Info",
      icon: <CreditCard size={18} />,
      content: (
        <PaymentInfo
          paymentData={packageDetails ? packageDetails.payment_methods : []}
          editMode={isEdit && id ? true : false}
          setPaymenttypeOne={setPaymenttypeOne}
          reloader={() => {
            setLoadFlag(false);
            setReloadFlag((old) => !old);
          }}
          stepper={stepper}
          setIndexStep={setIndexStep}
          setInitialValues={setInitialValues}
          indexStep={indexStep}
          isLoading={
            id && isEdit
              ? editPayment.isLoading || addPayment.isLoading
              : addPayment.isLoading
          }
          isLoadingData={
            packageBtt.isLoading ||
            packagePreBtt.isLoading ||
            packageLanguage.isLoading ||
            getDetail.isLoading
              ? true
              : false
          }
          //isLoading={true}
          schema={
            indexStep === 0
              ? addPackStep1Validation
              : indexStep === 1
              ? undefined
              : indexStep === 2
              ? addPackStep3Validation
              : indexStep === 3
              ? addPackStep4Validation
              : indexStep === 4
              ? addPackageValidation
              : undefined
          }
        />
      ), //<AddMlsAccess stepper={stepper} type="wizard-modern" />,
    },
  ];

  return (
    <div className="modern-horizontal-wizard">
      <FormWrapper
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={
          indexStep === 0
            ? addPackStep1Validation
            : indexStep === 1
            ? undefined
            : indexStep === 2
            ? addPackStep3Validation
            : indexStep === 3
            ? addPackStep4Validation
            : indexStep === 4
            ? addPackageValidation
            : indexStep === 5 || indexStep === 6
            ? packageDetails?.payment_methods &&
              packageDetails?.payment_methods[0]?.type === 1
              ? addPackStep5Validation
              : typeSelected && typeSelected?.value === 1
              ? addPackStep5Validation
              : !packageDetails?.payment_methods &&
                !typeSelected &&
                paymenttypeOne
              ? addPackStep5Validation
              : undefined
            : undefined
        }
      >
        <Wizard
          setActiveStep={setIndexStep}
          type="modern-horizontal"
          ref={ref}
          steps={steps}
          options={{
            linear: isEdit || isDuplicate ? false : true,
          }}
          instance={(el: any) => {
            if (id && !isEdit && !isDuplicate) {
              el.to(6);
              setIndexStep(6);
            }
            setStepper(el);
          }}
        />
      </FormWrapper>
    </div>
  );
};

export { AddPackageWizard };
