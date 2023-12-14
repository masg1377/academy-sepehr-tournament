import group from "@assets/images/pages/group/group.png";
import setting from "@assets/images/pages/group/setting.png";
import { CustomIcon } from "@src/components/common/CustomIcon";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { Wizard } from "@src/components/common/wizard";
import { TPath } from "@src/core/model/common.model";
import {
  usEeditGroupBasicInfo,
  useCreateGroup,
  useEditGroupBttList,
  useEditGroupExpertiseAreaActivity,
  useEditGroupType,
  useGetGroupItem,
  useGetListOfGroupsBttsAssigned,
} from "@src/core/services/api/group/group.api";
import {
  TCreateGroup,
  TEditGroupBasicInfo,
  TEditGroupExpertiseActivity,
  TEditGroupType,
} from "@src/core/services/api/group/type";
import { IsIncludes } from "@src/core/utils/Utils";
import {
  createGroupBasicInfoValidation,
  createGroupExpertiseValidation,
  createGroupTypeValidation,
} from "@src/core/validations/group.validation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AssignBTTs from "./AssignBTTs";
import GroupExperties from "./GroupExperties";
import { GroupGeneralInformation } from "./GroupGeneralInformation";
import GroupType from "./GroupType";
import { groupTypeItemsData } from "./GroupType/groupTypeItemsData";

const CreateGroupComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [finalSetBtts, setfinalSetBtts] = useState<any>([]);
  const [currentBttList, setCurrentBttList] = useState<any>([]);
  const [areaPath, setAreaPath] = useState<{ id: number; paths: TPath }[]>([]);
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [initialValues, setInitialValues] = useState({
    groupDesc: [{ language: { value: 1, label: "EN" }, text: "" }],
    termCondition: [{ language: { value: 1, label: "EN" }, text: "" }],
    userRole: null,
    groupLogo: "",
    groupName: "",
    groupShortName: "",
    groupUsername: "",
    contactNumber: "",
    contactEmail: "",
    groupType: { mlsGroup: true },
    address: null,
    mls: null,
    activity_area: [],
    activity_area_map: [],
  });

  const isEdit = IsIncludes(location.pathname, "edit-group");

  //* States
  const [indexStep, setIndexStep] = useState<number>(0);
  const [stepper, setStepper] = useState<any>(null);
  const [serverDetails, setServerDetails] = useState<any>();
  // const [details, setDetails] = useState<any>(null);

  //* Ref
  const ref = useRef(null);

  const getDetail = useGetGroupItem();
  const createGroup = useCreateGroup();
  const editBasicInfo = usEeditGroupBasicInfo();
  const editGroupType = useEditGroupType();
  const editGroupExpertise = useEditGroupExpertiseAreaActivity();
  const updateBtts = useEditGroupBttList();

  //* useEffect
  useEffect(() => {
    if (isEdit && id) {
      getDetail.mutate(
        { group_id: +id },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const details = res.data.result;
              // console.log(result);
              setServerDetails(details);

              const terms = details?.terms;
              const termsList: any = [];

              const description = details?.description;
              const descriptionList: any = [];

              Object.keys(terms)?.forEach((country) => {
                const desc = terms[country];
                termsList.push({
                  text: desc,
                  language: { value: country, label: country },
                });
              });

              Object.keys(description)?.forEach((country) => {
                const desc = description[country];
                descriptionList.push({
                  text: desc,
                  language: { value: country, label: country },
                });
              });

              setInitialValues((old: any) => ({
                ...old,
                userRole: details?.user_id
                  ? { value: details?.user_id, label: "" }
                  : null,
                groupLogo: details?.logo_url,
                groupName: details?.name,
                groupShortName: details?.short_name,
                groupUsername: details?.mention_name,
                contactNumber: details?.contact_number,
                contactEmail: details?.contact_email,
                groupDesc: descriptionList,
                termCondition: termsList,
                groupType:
                  details?.group_type_id === 2
                    ? { brokerageGroup: true }
                    : { mlsGroup: true },
                address: details?.full_address,
                expertise_list_field: details?.hashtags
                  ?.filter((f: any) => f.hashtag_id)
                  ?.map((m: any) => ({
                    id: m.hashtag_id,
                    label: m.hashtag_name,
                  })),
                mls: details?.mls_id
                  ? { value: details?.mls_id, label: details?.mls_name }
                  : null,
              }));
            }
          },
        }
      );
    }
  }, [id]);

  const getCurBtts = useGetListOfGroupsBttsAssigned();

  const getCurrentBtts = () => {
    if (id) {
      getCurBtts.mutate(
        { group_id: id ? +id : 0, limit: 100000, skip: 0 },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const result = res.data.result;
              const selected = result?.map((i: any) => ({
                value: i.btt_type_item_id,
                label: i.btt_name,
                btt_group_relation_id: i.btt_group_relation_id,
              }));
              setCurrentBttList(selected);
              setfinalSetBtts(selected);
            }
          },
        }
      );
    }
  };

  //* Steps
  const steps = [
    {
      id: "group-general-information",
      title: "Group General Settings",
      icon: <CustomIcon src={setting} />,
      content: (
        <GroupGeneralInformation
          stepper={stepper}
          setStepper={setStepper}
          stepNumber={1}
          setInitialValues={setInitialValues}
          isSubmiting={createGroup.isLoading || editBasicInfo.isLoading}
          details={initialValues}
          setUsernameError={setUsernameError}
          usernameError={usernameError}
          setEmailError={setEmailError}
          emailError={emailError}
          isLoading={getDetail.isLoading}
        />
      ),
    },
    {
      id: "group-type",
      title: "Group Type",
      icon: <CustomIcon src={group} />,
      content: (
        <GroupType
          groupType="public"
          stepper={stepper}
          setStepper={setStepper}
          stepNumber={2}
          indexStep={indexStep}
          isLoading={getDetail.isLoading}
          isSubmiting={createGroup.isLoading || editGroupType.isLoading}
        />
      ),
    },
    {
      id: "group-experties",
      title: "Group Experties",
      icon: <CustomIcon src={group} />,
      content: (
        <GroupExperties
          stepper={stepper}
          setStepper={setStepper}
          stepNumber={3}
          setPath={setAreaPath}
          path={areaPath}
          isLoading={getDetail.isLoading}
          details={serverDetails}
          isSubmiting={createGroup.isLoading || editGroupExpertise.isLoading}
        />
      ),
    },
    {
      id: "assign-btts",
      title: "Assign BTTs",
      icon: <CustomIcon src={group} />,
      content: (
        <AssignBTTs
          stepper={stepper}
          setStepper={setStepper}
          stepNumber={4}
          setCurrentBttList={setCurrentBttList}
          finalSetBtts={finalSetBtts}
          setfinalSetBtts={setfinalSetBtts}
          getCurrentBtts={getCurrentBtts}
          isSubmiting={updateBtts.isLoading}
          isLoading={getDetail.isLoading}
        />
      ),
    },
  ];

  // const onSubmit = (values) => {
  //   if (indexStep === 1) {
  //     const obj = {};
  //   }
  // };

  const onSubmit = (values: any) => {
    if (!id) {
      if (indexStep === 0) {
        if (usernameError) return toast.error(usernameError);
        if (emailError) return toast.error(emailError);
        stepper.next();
        console.log("step 1: ", values);
      } else if (indexStep === 1) {
        stepper.next();
        console.log("step 2: ", values);
      } else if (indexStep === 2) {
        if (usernameError) return toast.error(usernameError);
        if (emailError) return toast.error(emailError);
        // stepper.next();
        console.log("step 3: ", values, areaPath);

        const groupType = values?.groupType;
        const groupKey = Object.keys(groupType).length
          ? Object.keys(groupType)[0]
          : "mlsGroup";

        const groupTypeId = groupTypeItemsData.find(
          (item) => item.actualName === groupKey
        )?.id;

        const selectedExpertises = values?.expertise_list_field?.map(
          (it: any) =>
            it?.isExternal ? { language_id: 1, name: it?.name } : it?.id
        );

        const points = values?.activity_area?.map((it: any) => ({
          lat: it?.Geometry?.Point[0],
          long: it?.Geometry?.Point[1],
        }));

        const mapPoints = values?.activity_area_map?.map((it: any) => [
          ...it?.paths?.map((pol: any) => ({
            lat: pol?.lat,
            long: pol?.lng,
          })),
          { lat: it?.paths[0]?.lat, long: it?.paths[0]?.lng },
        ]);
        // console.log("values?.activity_area", values?.activity_area_map);

        // return;

        let area_activity = [];

        if (points?.length > 2) area_activity.push([...points, points[0]]);
        if (mapPoints?.some((s: any) => s?.length > 2))
          area_activity = [...area_activity, ...mapPoints];

        let terms: any = {};

        values?.termCondition?.forEach((term: any) => {
          terms[term.language.label] = term.text;
        });

        let description: any = {};

        values?.groupDesc?.forEach((desc: any) => {
          description[desc.language?.label] = desc.text;
        });

        const obj: TCreateGroup = {
          basic_info: {
            user_id: values?.userRole?.value,
            name: values?.groupName,
            logo_url: values?.groupLogo,
            mention_name: values?.groupUsername,
            short_name: values?.groupShortName,
            contact_number: values?.contactNumber,
            contact_email: values?.contactEmail,
            terms: terms,
            description: description,
          },
          address: { location: values?.address } || undefined,
          group_type: {
            group_type_id: groupTypeId ? +groupTypeId : 0,
            mls_id: groupTypeId === 1 ? values?.mls?.value : undefined,
          },
          expertise: selectedExpertises || [],
          area_activity: area_activity,
        };
        createGroup.mutate(obj, {
          onSuccess: (val) => {
            if (val.data.is_success) {
              console.log("val", val.data);
              navigate(`/groups-list/add-group/` + val.data.result?.group_id);
              stepper.next();
            }
            // else toast.error("Error occurred! Please try again");
          },
          onError: (err) => {
            // console.log.is_success;
          },
        });
      }
      // if(indexStep === )
    } else {
      console.log("first", indexStep);
      if (indexStep === 0) {
        if (usernameError) return toast.error(usernameError);
        if (emailError) return toast.error(emailError);
        let terms: any = {};

        values?.termCondition?.forEach((term: any) => {
          terms[term.language.label] = term.text;
        });

        let description: any = {};

        values?.groupDesc?.forEach((desc: any) => {
          description[desc.language?.label] = desc.text;
        });

        const obj: { group_id: number; body: TEditGroupBasicInfo } = {
          group_id: +id,
          body: {
            basic_info: {
              user_id: values?.userRole?.value,
              name: values?.groupName,
              logo_url: values?.groupLogo?.includes("http")
                ? undefined
                : values?.groupLogo,
              mention_name: values?.groupUsername,
              short_name: values?.groupShortName,
              contact_number: values?.contactNumber,
              contact_email: values?.contactEmail,
              terms: terms,
              description: description,
            },
            address: { location: values?.address } || undefined,
          },
        };

        editBasicInfo.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              console.log(res.data);
              toast.success("Group general settings updated successfully");
              stepper.next();
            }
          },
        });
      } else if (indexStep === 1) {
        const groupType = values?.groupType;
        const groupKey = Object.keys(groupType).length
          ? Object.keys(groupType)[0]
          : "mlsGroup";

        if (
          groupType?.mlsGroup &&
          initialValues?.groupType?.mlsGroup &&
          //@ts-ignore
          initialValues?.mls?.value === values?.mls?.value
        )
          return stepper.next();
        // ^[a-zA-Z\\s'-]+$'
        const groupTypeId = groupTypeItemsData.find(
          (item) => item.actualName === groupKey
        )?.id;
        const obj: {
          group_id: number;
          body: TEditGroupType;
        } = {
          group_id: id ? +id : 0,
          body: {
            group_type_id: groupTypeId || 1,
            mls_id: groupTypeId === 1 ? values?.mls?.value : undefined,
          },
        };

        editGroupType.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              console.log(res.data);
              stepper.next();
            }
          },
          onError: (err) => {
            console.log("Error: ", err);
          },
        });
      } else if (indexStep === 2) {
        const selectedExpertises = values?.expertise_list_field?.map(
          (it: any) =>
            it?.isExternal ? { language_id: 1, name: it?.name } : it?.id
        );

        const points = values?.activity_area?.map((it: any) => ({
          lat: it?.Geometry?.Point[0],
          long: it?.Geometry?.Point[1],
        }));

        const mapPoints = values?.activity_area_map?.map((it: any) => [
          ...it?.paths?.map((pol: any) => ({
            lat: pol?.lat,
            long: pol?.lng,
          })),
          { lat: it?.paths[0]?.lat, long: it?.paths[0]?.lng },
        ]);

        console.log("mapPoints", mapPoints);

        let area_of_activity = [];
        if (points?.length > 2) area_of_activity.push([...points, points[0]]);
        if (mapPoints?.some((s: any) => s?.length > 2))
          area_of_activity = [...area_of_activity, ...mapPoints];

        const postObj: {
          group_id: number;
          body: TEditGroupExpertiseActivity;
        } = {
          group_id: id ? +id : 0,
          body: {
            expertise: selectedExpertises || [],
            area_of_activity: area_of_activity || [],
          },
        };

        console.log("postObj", postObj);

        editGroupExpertise.mutate(postObj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              console.log(res.data);
              stepper.next();
            }
          },
        });
      } else if (indexStep >= 3) {
        const removedBtts = currentBttList?.filter(
          (btt: any) => !finalSetBtts.some((s: any) => s?.value === btt?.value)
        );

        const dismissBtt = removedBtts?.map((m: any) => ({
          btt_group_relation_id: m.btt_group_relation_id,
        }));

        const assignBtt = finalSetBtts?.filter(
          (f: any) => !f.btt_group_relation_id
        );

        updateBtts.mutate(
          {
            group_id: id ? +id : 0,
            body: {
              assign_btt:
                assignBtt?.length > 0
                  ? assignBtt?.map((btt: any) => ({ btt_id: btt?.value }))
                  : undefined,
              dismiss_btt: dismissBtt?.length > 0 ? dismissBtt : undefined,
            },
          },
          {
            onSuccess: (res) => {
              if (res.data.is_success) {
                // console.log(res.data);
                toast.success("Successfully updated!");
                setTimeout(() => {
                  getCurrentBtts();
                }, 3000);
              }
            },
          }
        );
      }
      // const obj: { group_id: number; body: TEditGroupBasicInfo } = {
      //   group_id: +id,
      //   body: {
      //     basic_info: {
      //       user_id: values?.userRole?.value,
      //       name: values?.groupName,
      //       logo_url: values?.groupLogo,
      //       username: values?.groupUsername,
      //       short_name: values?.groupShortName,
      //       contact_number: values?.contactNumber,
      //       contact_email: values?.contactEmail,
      //       terms: {
      //         [values?.termCondition[0].language.label]:
      //           values?.termCondition[0].text,
      //       },
      //       description: {
      //         [values?.groupDesc[0].language.label]: values?.groupDesc[0].text,
      //       },
      //     },
      //     address: values?.address || undefined,
      //   },
      // };
      // editGroup.mutate(obj, {
      //   onSuccess: (res) => {
      //     if (res.data.is_success) {
      //       console.log(res.data);
      //       toast.success("Group general settings updated successfully");
      //       stepper.next();
      //     }
      //   },
      // });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between align-items-start rounded-1 pb-1">
      <div className="d-flex w-100">
        <FormWrapper
          className="w-100"
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={
            indexStep === 0
              ? createGroupBasicInfoValidation
              : indexStep === 1
              ? createGroupTypeValidation
              : indexStep === 2
              ? createGroupExpertiseValidation
              : undefined
          }
        >
          <Wizard
            setActiveStep={setIndexStep}
            classes="w-100"
            type="modern-horizontal"
            ref={ref}
            steps={steps}
            options={{
              linear: id ? false : true,
            }}
            instance={(el: any) => {
              if (id && !isEdit) {
                el.to(4);
                setIndexStep(4);
              }
              setStepper(el);
            }}
          />
        </FormWrapper>
      </div>
      {/* <div className="bg-white d-flex flex-column justify-content-between align-items-start rounded-1 px-2 pb-1"></div> */}
    </div>
  );
};

export { CreateGroupComponent };
