import React, { FC, useEffect, useRef, useState } from "react";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { FormikProps } from "formik";
import { LanguageForm } from "./LanguageForm/LanguageForm";
import { useSuggestionHashtag } from "@src/core/services/api/suggestion/suggestion.api";
import { useEditBtt } from "@src/core/services/api/btt/btt.api";
import { TEditBtt } from "@src/core/services/api/btt/type";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { handleAddRemoveOptionsForLanguageDescription } from "@src/core/utils/optionsAddRemovehandler.utils";
import toast from "react-hot-toast";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";

interface ILanguageHashtagProp {
  stepper: any;
  bttDetail: any;
  activeStep?: number;
  isLoading?: boolean;
  refetch: () => void;
  // schema: any;
}

const LanguageHashtag: FC<ILanguageHashtagProp> = ({
  stepper,
  bttDetail,
  activeStep,
  isLoading,
  refetch,
  // schema,
}): JSX.Element => {
  const { id } = useParams();
  const [hashtagOptions, setHashtagOptions] = useState([]);
  const [hashtagFilterOptions, setHashtagFilterOptions] = useState([]);
  const [langOption, setLangOption] = useState([]);
  const [initialValues, setInitialValues] = useState<any>({
    mainHashtag: null,
    language: null,
  });

  const getHashtag = useSuggestionHashtag();
  const getLanguages = useGetListOfEntity();

  useEffect(() => {
    if (id && activeStep === 3) {
      getLanguages.mutate(
        {
          entity: "languages",
          data: { list_filter: { limit: 100, offset: 0 } },
        },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              let result = res.data.result;
              if (result && !Array.isArray(result)) result = [result];
              setLangOption(
                result.map((lang: any) => ({
                  value: lang.id,
                  label: lang.abbr,
                  name: lang.name,
                  description: "",
                  shortDescription: [
                    {
                      key: "",
                      type: { value: "text", label: "Text" },
                      value: "",
                    },
                  ],
                  noticeDescription: "",
                  conditionDescription: "",
                  icon: "",
                }))
              );
            }
          },
        }
      );
    }
  }, [activeStep]);

  useEffect(() => {
    if (activeStep === 3)
      getHashtag.mutate(
        { hashtag_name: "" },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const result = res.data.result;
              console.log(result);
              setHashtagOptions(
                result.map((o: any) => ({ value: o.id, label: o.name }))
              );
            }
          },
        }
      );
  }, []);

  useEffect(() => {
    if (bttDetail && langOption && langOption.length > 0) {
      const hashtags = bttDetail.hashtags
        ? bttDetail.hashtags.map((o: any) => ({
            value: o.id,
            label: o.name,
          }))
        : null;
      const languages = bttDetail.descriptions
        ? bttDetail.descriptions.map((o: any) => {
            const langObj: any = langOption.find(
              (f: any) => f.label === o.language_code
            );
            return {
              id: o.id,
              value: langObj ? langObj.id : 1,
              label: langObj ? langObj.label : "EN",
              name: langObj ? langObj.name : "English",
              description: o.short_description,
              shortDescription: o.description
                ? Object.keys(o.description).map((i: any) => ({
                    key: i,
                    type: { value: "text", label: "Text" },
                    value: o.description[i],
                  }))
                : [],
              noticeDescription: o.notice_description,
              conditionDescription: o.condition_description,
              icon: o.icon,
              isServer: true,
            };
          })
        : null;

      setInitialValues({ mainHashtag: hashtags, language: languages });
    }
  }, [bttDetail, langOption]);

  const hashtagRef = useRef<any>();

  const onHashtagFilter = (val: string) => {
    if (!val) {
      clearTimeout(hashtagRef.current);
      setHashtagFilterOptions([]);
    } else {
      clearTimeout(hashtagRef.current);
      const timeOut = setTimeout(() => {
        getHashtag.mutate(
          { hashtag_name: val },
          {
            onSuccess: (res) => {
              if (res.data.is_success) {
                const result = res.data.result;
                setHashtagFilterOptions(
                  result.map((o: any) => ({ value: o.id, label: o.name }))
                );
              }
            },
          }
        );
      }, 500);
      hashtagRef.current = timeOut;
    }
  };

  const editBtt = useEditBtt();

  const navigate = useNavigate();

  const onSubmit = (values: any, isSave?: boolean) => {
    // console.log(values);
    // if (
    //   (!values.mainHashtag ||
    //     (values.mainHashtag && values.mainHashtag.length === 0)) &&
    //   (!values.language || (values.language && values.language.length === 0)) &&
    //   bttDetail &&
    //   !bttDetail.hashtags
    // ) {
    //   return navigate("/btt-list/" + id);
    // }

    const oldHashtags =
      values.mainHashtag && initialValues.mainHashtag
        ? initialValues.mainHashtag
            .filter(
              (f: any) =>
                !values.mainHashtag.some((s: any) => s.value === f.value)
            )
            .map((o: any) => o.value)
        : undefined;

    const newHashtags = values.mainHashtag
      ? values.mainHashtag
          .filter((f: any) =>
            initialValues.mainHashtag
              ? !initialValues.mainHashtag.some((s: any) => s.value === f.value)
              : true
          )
          .map((o: any) => o.value)
      : undefined;

    const hashtags =
      (!oldHashtags || oldHashtags.length === 0) &&
      (!newHashtags || newHashtags.length === 0)
        ? undefined
        : {
            add:
              newHashtags && newHashtags.length > 0
                ? newHashtags.map((o: any) =>
                    typeof o === "number"
                      ? o
                      : {
                          name: o,
                          language_id:
                            (langOption &&
                              langOption.length &&
                              ///@ts-ignore
                              langOption[0]?.value) ||
                            1,
                        }
                  )
                : undefined,
            remove:
              oldHashtags && oldHashtags.length > 0 ? oldHashtags : undefined,
          };

    console.log(hashtags);
    // return;

    let descs: any = {
      add: [],
      edit: [],
      remove: [],
    };

    const updateLangNow =
      values.language && values.language.length > 0
        ? values.language.filter((f: any) =>
            initialValues.language
              ? initialValues.language.some((s: any) => s.value === f.value)
              : true
          )
        : [];
    const updateLangOld =
      initialValues.language && initialValues.language.length > 0
        ? initialValues.language.filter((f: any) =>
            values.language
              ? values.language.some((s: any) => s.value === f.value)
              : true
          )
        : [];

    updateLangNow.forEach((it: any) => {
      const old = updateLangOld.find((o: any) => o.value === it.value);
      if (old && JSON.stringify(it) !== JSON.stringify(old))
        descs["edit"].push({
          icon: it.icon,
          language_code: it.label,
          short_description: it.description,
          description: it.shortDescription
            ? it.shortDescription.reduce((accumulator: any, value: any) => {
                return { ...accumulator, [value.key]: value.value };
              }, {})
            : null,
          notice_description: it.noticeDescription,
          condition_description: it.conditionDescription,
          id: old.id,
        });
    });

    const oldDesc = initialValues.language
      ? initialValues.language.filter((f: any) =>
          values.language
            ? !values.language.some((s: any) => s.value === f.value)
            : true
        )
      : [];

    descs["remove"] = [...oldDesc.map((o: any) => o.id)];

    const newDesc = values.language
      ? values.language.filter((f: any) =>
          initialValues.language
            ? !initialValues.language.some((s: any) => s.value === f.value)
            : true
        )
      : [];
    descs["add"] = [
      ...newDesc.map((o: any) => ({
        icon: o.icon,
        language_code: o.label,
        short_description: o.description,
        description: o.shortDescription
          ? o.shortDescription.reduce((accumulator: any, value: any) => {
              return { ...accumulator, [value.key]: value.value };
            }, {})
          : null,
        notice_description: o.noticeDescription,
        condition_description: o.conditionDescription,
      })),
    ];
    if (descs["add"] && descs["add"].length === 0) descs["add"] = undefined;
    if (descs["remove"] && descs["remove"].length === 0)
      descs["remove"] = undefined;
    if (descs["edit"] && descs["edit"].length === 0) descs["edit"] = undefined;

    // return;
    const obj: TEditBtt = {
      id: id ? +id : 0,
      hashtags: hashtags,
      descriptions: descs.add || descs.edit || descs.remove ? descs : undefined,
    };

    editBtt.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          console.log(res.data.result);
          if (!isSave || typeof isSave !== "boolean")
            navigate("/btt-list/" + id);
          else {
            refetch();
            toast.success("Successfully saved!");
          }
        } else toast.error(res.data.error || "Failed to save!");
      },
      onError: () => {
        toast.error("Occurred while saving! Please try again later");
      },
    });
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values }: FormikProps<any>) => (
        <FormStepsWrapper
          stepName="Language & Hashtag"
          stepNum={4}
          stepper={stepper}
          onSave={() => onSubmit(values, true)}
          nextLabel="Finish"
          hasPrev
          isLoading={editBtt.isLoading}
          // schema={schema}
        >
          {{
            body: isLoading ? (
              <LoadingData />
            ) : (
              <>
                <RowWrappers sm={6} md={4}>
                  <SelectOption
                    name="mainHashtag"
                    placeholder="Please select"
                    label={"Main Hashtag"}
                    id="mainHashtag"
                    isOutline
                    isMulti
                    noFilter
                    creative
                    onInputChange={onHashtagFilter}
                    isLoading={getHashtag.isLoading}
                    options={
                      hashtagFilterOptions && hashtagFilterOptions.length > 0
                        ? hashtagFilterOptions
                        : hashtagOptions
                    }
                    // wrapperClassName="mb-1"
                  />
                </RowWrappers>

                <RowWrappers
                  sm={6}
                  md={4}
                  rowClassName={values["language"] ? "" : "mb-5"}
                >
                  <SelectOption
                    name="language"
                    placeholder="Please select"
                    label={"Language"}
                    id="language"
                    noErrorMessage
                    isLoading={getLanguages.isLoading}
                    options={langOption}
                    isMulti
                    wrapperClassName="mb-1"
                  />
                </RowWrappers>

                {values["language"] &&
                  values["language"].map((language: any, index: number) => (
                    <LanguageForm
                      key={index}
                      language={language}
                      index={index}
                    />
                  ))}
              </>
            ),
          }}
        </FormStepsWrapper>
      )}
    </FormWrapper>
  );
};

export default LanguageHashtag;
