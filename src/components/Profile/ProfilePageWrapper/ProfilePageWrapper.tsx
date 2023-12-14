import React, { FC, useEffect, useRef, useState } from "react";
import { CardWrapper } from "@src/components/common/CardWrapper";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Lock, User } from "react-feather";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { LogoUploader } from "@src/components/common/form/Fields/LogoUploader/LogoUploader";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { MaskInput } from "@src/components/common/form/common/MaskInput/MaskInput";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { FormikProps } from "formik";
import { useSuggestionHashtag } from "@src/core/services/api/suggestion/suggestion.api";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { useUpdateProfile } from "@src/core/services/api/profile/profile.api";
import {
  useChangePassword,
  useGetCurrentAuthenticatedUser,
  useGetCurrentUserSession,
} from "@src/core/services/api/auth/auth.api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleRefresh } from "@src/redux/refresh";
import { changePassValidation } from "@src/core/validations/auth.validation";
import toast from "react-hot-toast";

const ProfilePageWrapper: FC = (): JSX.Element => {
  const { tab: tabParam }: any = useParams();
  const [tab, setTab] = useState<number>(
    tabParam && !isNaN(tabParam) ? +tabParam : 1
  );
  const [hashtagsOptions, setHashtagsOptions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [initialValue, setInitialValue] = useState({
    phone: "",
    skypeId: "",
    personalEmail: "",
    aboutMe: "",
    myExperties: "",
    image: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { profile }: any = useSelector((state: RootState) => state.profile);

  const getHashtags = useSuggestionHashtag();
  const updateProfile = useUpdateProfile();
  const getCurrentUser = useGetCurrentAuthenticatedUser();
  const getCurrentSesion = useGetCurrentUserSession();
  const changePass = useChangePassword();

  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setInitialValue((old) => ({
        ...old,
        aboutMe:
          profile.bio && profile.bio.length > 0 ? profile.bio[0].value : "",
        myExperties: profile.expertise
          ? profile.expertise.map((o: any) => ({
              value: o.id,
              label: o.name,
              isServer: true,
            }))
          : [],
        skypeId:
          profile.skype_id && profile.skype_id.length > 0
            ? profile.skype_id[0].value
            : "",
        phone: profile.personal_phone ? profile.personal_phone.value : "",
        personalEmail: profile.professional_email
          ? profile.professional_email.value
          : "",
        image:
          profile.profile_picture && profile.profile_picture.length > 0
            ? profile.profile_picture[0]?.value
            : "",
      }));
    }
  }, [profile]);

  useEffect(() => {
    getHashtags.mutate(
      { hashtag_name: "", hashtag_category_type: "user_expertise" },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            console.log(res.data.result);
            setHashtagsOptions(
              res.data.result
                ? res.data.result.map((o: any) => ({
                    value: o.id,
                    label: o.name,
                  }))
                : []
            );
          }
        },
      }
    );
  }, []);

  const hashtagRef = useRef<any>();

  const onHashtagsChange = (value: string) => {
    clearTimeout(hashtagRef.current);
    setHashtagInput(value);
    const timeOut = setTimeout(() => {
      if (value !== hashtagInput || !value) {
        getHashtags.mutate(
          { hashtag_name: value, hashtag_category_type: "user_expertise" },
          {
            onSuccess: (res) => {
              if (res.data.is_success) {
                setHashtagsOptions(
                  res.data.result
                    ? res.data.result.map((o: any) => ({
                        value: o.id,
                        label: o.name,
                      }))
                    : []
                );
              }
            },
          }
        );
      }
    }, 500);
    hashtagRef.current = timeOut;
  };

  const onSubmit = (values: any, { resetForm }: any) => {
    if (tab === 1) {
      const meta_data: any = [];
      setIsLoading(true);
      if (values.image)
        meta_data.push({
          section: "profile_picture",
          name: values.image.split("/").pop(),
          value: values.image,
          verification_status: 2,
          action: "add",
        });
      if (values.aboutMe)
        meta_data.push({
          section: "bio",
          name: values.aboutMe,
          value: values.aboutMe,
          visibility_permission: 3,
          action: "add",
        });
      if (values.phone)
        meta_data.push({
          section: "account_personal_phone",
          name: values.phone,
          value: values.phone,
          verification_status: 2,
          visibility_permission: 3,
          action: "add",
        });
      if (values.personalEmail)
        meta_data.push({
          section: "profile_professional_email",
          name: values.personalEmail,
          value: values.personalEmail,
          verification_status: 2,
          visibility_permission: 3,
          action: "add",
        });

      if (values.skypeId)
        meta_data.push({
          section: "skype_id",
          name: values.skypeId,
          value: values.skypeId,
          verification_status: 2,
          visibility_permission: 3,
          action: "add",
        });

      const user_tags: any = { expertise: { add: [], delete: [] } };

      if (values.myExperties && values.myExperties.length > 0) {
        values.myExperties.forEach((ex: any) => {
          if (ex.isRemove) {
            user_tags.expertise.delete.push(ex.value);
          } else user_tags.expertise.add.push(ex.value);
        });
      }

      let obj: any = {
        finished: true,
      };

      if (user_tags.expertise.add.length > 0) obj["user_tags"] = user_tags;
      if (meta_data.length > 0) obj["meta_data"] = meta_data;

      // console.log(obj);
      // return;
      updateProfile.mutate(obj, {
        onSuccess: (res) => {
          console.log(res.data);
          if (res.data.is_success)
            getCurrentUser.mutate(undefined, {
              onSuccess: (cognitoUser) => {
                getCurrentSesion.mutate(undefined, {
                  onSuccess: (currentSession) => {
                    cognitoUser.refreshSession(
                      currentSession.refreshToken,
                      (err: any, session: any) => {
                        setIsLoading(false);
                        dispatch(handleRefresh("profile"));
                        // removeUnusedDatas();
                        // setTimeout(() => {
                        // navigate("/");
                        // }, 500);
                      }
                    );
                  },
                  onError: (err) => {
                    setIsLoading(false);
                  },
                });
              },
              onError: () => {
                setIsLoading(false);
              },
            });
          else setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      });
    } else {
      setIsLoading(true);
      getCurrentUser.mutate(undefined, {
        onSuccess: (user) => {
          changePass.mutate(
            {
              user,
              currentPass: values.currentPassword,
              newPass: values.newPassword,
            },
            {
              onSuccess: (res) => {
                toast.success("Password changed successfully");
                setIsLoading(false);
                resetForm();
              },
              onError: (err: any) => {
                setIsLoading(false);
                toast.error(err.message);
              },
            }
          );
        },
        onError: (err) => {
          setIsLoading(false);
        },
      });
    }
  };

  return (
    <CardWrapper title="Profile" headerChild={<></>} borderBottom>
      <Nav pills className="mt-2 p-1">
        <NavItem className="me-2">
          <NavLink
            active={tab === 1}
            onClick={() => {
              setTab(1);
            }}
          >
            <User size={17} className="me-75" />
            Profile
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={tab === 2}
            onClick={() => {
              setTab(2);
            }}
          >
            <Lock size={17} className="me-75" />
            Account
          </NavLink>
        </NavItem>
      </Nav>

      <FormWrapper
        initialValues={initialValue}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={tab === 2 ? changePassValidation : undefined}
      >
        {({ values, setFieldValue }: FormikProps<any>) => (
          <>
            <TabContent className="py-50 p-1 mb-5 pb-5" activeTab={tab}>
              <TabPane tabId={1}>
                <>
                  <span className="fs-8">Profile Picture</span>
                  <LogoUploader
                    name="image"
                    //label=""
                    id="image"
                    mode="two"
                    fileFormat="png, jpg"
                    fileSize="5 MB"
                  />
                  <RowWrappers sm={6} md={4}>
                    <MaskInput
                      name="phone"
                      placeholder="Please enter your phone"
                      label={"Phone"}
                      id="phone"
                      options={{ phone: true, phoneRegionCode: "US" }}
                      //wrapperClassName="mb-1"
                    />
                    <InputText
                      name="skypeId"
                      placeholder="Please enter your skypeId"
                      label={"Skype Id"}
                      id="skypeId"
                      //icon={<Mail size="15" />}
                      wrapperClassName="mt-1 mt-md-0"
                    />
                  </RowWrappers>
                  <RowWrappers sm={6} md={4}>
                    <div>
                      <InputText
                        name="personalEmail"
                        placeholder="Please enter..."
                        label={"Personal Email"}
                        id="personalEmail"
                        //wrapperClassName="mb-1"
                      />
                      <SelectOption
                        name="myExperties"
                        placeholder="Please enter experties"
                        label={"My Experties"}
                        id="myExperties"
                        options={hashtagsOptions}
                        isLoading={getHashtags.isLoading}
                        onInputChange={onHashtagsChange}
                        noFilter
                        isMulti
                        creative
                        isClearable
                        value={
                          values["myExperties"]
                            ? values["myExperties"].filter(
                                (s: any) => !s.isRemove
                              )
                            : []
                        }
                        isOutline={true}
                        wrapperClassName="mt-1 mb-0"
                        onChange={(opt) => {
                          console.log(opt);
                          const filtered = values["myExperties"]
                            ? values["myExperties"].filter(
                                (f: any) =>
                                  !opt.some((s: any) => s.value === f.value)
                              )
                            : [];
                          setFieldValue(
                            "myExperties",
                            filtered ? [...filtered, ...opt] : opt
                          );
                        }}
                        onRemoveItem={(opt, vals) => {
                          // const curVal = values["myExperties"]
                          //   ? values["myExperties"]
                          //   : [];
                          let curVal = [...vals];
                          const curSel = curVal.find((v) => v.value === opt);
                          if (curSel.isServer) {
                            curVal = curVal.map((f) =>
                              f.value === curSel.value
                                ? {
                                    ...f,
                                    isRemove: true,
                                  }
                                : f
                            );
                          } else curVal = curVal.filter((f) => f.value !== opt);
                          // console.log(vals, opt);
                          setFieldValue("myExperties", curVal);
                        }}
                      />
                    </div>
                    <div>
                      <InputText
                        name="aboutMe"
                        placeholder="Please enter your bio"
                        label={"About Me"}
                        id="aboutMe"
                        type="textarea"
                        inputClassName="minHeight-115"
                        //wrapperClassName="mt-1 mt-md-0"
                      />
                    </div>
                  </RowWrappers>
                </>
              </TabPane>

              <TabPane tabId={2}>
                <RowWrappers sm={6} md={4}>
                  <InputText
                    name="currentPassword"
                    placeholder="Please enter..."
                    label={"Current Password"}
                    type="password"
                    id="currentPassword"
                    //icon={<Mail size="15" />}
                    wrapperClassName="mt-1 mt-md-0"
                    noColor
                  />
                </RowWrappers>
                <RowWrappers sm={6} md={4}>
                  <InputText
                    name="newPassword"
                    placeholder="Please enter..."
                    label={"New Password"}
                    type="password"
                    id="newPassword"
                    //icon={<Mail size="15" />}
                    wrapperClassName="mt-1 mt-md-0"
                    noColor
                  />

                  <InputText
                    name="confirmNewPassword"
                    placeholder="Please enter..."
                    label={"Retype New Password"}
                    id="confirmNewPassword"
                    type="password"
                    //icon={<Mail size="15" />}
                    wrapperClassName="mt-1 mt-md-0"
                    noColor
                  />
                </RowWrappers>

                <span className="d-block fs-6 mt-2 fw-bolder text-black">
                  Password requirements:
                </span>
                <ul className="ps-1">
                  <li className="mt-1 text-black">
                    Minimum 8 characters long - the more, the better
                  </li>
                  <li className="mt-1 text-black">
                    At least one lowercase character
                  </li>
                  <li className="mt-1 text-black">
                    At least one number, symbol, or whitespace character
                  </li>
                </ul>
              </TabPane>
            </TabContent>
            <SubmitButton
              color="info"
              isLoading={isLoading}
              schema={tab === 2 ? changePassValidation : undefined}
              type="submit"
            >
              Save
            </SubmitButton>
          </>
        )}
      </FormWrapper>
    </CardWrapper>
  );
};

export { ProfilePageWrapper };
