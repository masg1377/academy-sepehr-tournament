// ** React Imports
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { CardTitle, Col, Row } from "reactstrap";

// ** Custom Components
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

// ** Images
import profileSetupRealtyLogo from "@assets/images/pages/profileSetupRealtyLogo.png";
import {
  useGetCurrentAuthenticatedUser,
  useGetCurrentUserSession,
} from "@src/core/services/api/auth/auth.api";
import { useUpdateProfile } from "@src/core/services/api/profile/profile.api";
import { useGetProfileDetails } from "@src/core/services/api/profileSetup/profile-setup.api";
import { useSuggestionHashtag } from "@src/core/services/api/suggestion/suggestion.api";
import { FormikProps } from "formik";
import { Divider } from "../common/divider/Divider";
import { MaskInput } from "../common/form/common/MaskInput/MaskInput";
import { SelectOption } from "../common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "../common/form/common/SubmitButton/SubmitButton";
import { LogoUploader } from "../common/form/Fields/LogoUploader/LogoUploader";
import { LoadingData } from "../common/LoadingData/LoadingData";
import { handleRefresh } from "@src/redux/refresh";
import { useDispatch } from "react-redux";
import { handleLogout } from "@src/redux/user";

const ProfileSetupp: FC = (): JSX.Element => {
  const source = require("@src/assets/images/pages/create-account.svg").default;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [hashtagsOptions, setHashtagsOptions] = useState<any>([]);
  const [initialValue, setInitialValue] = useState({
    phone: "",
    skypeId: "",
    personalEmail: "",
    aboutMe: "",
    myExperties: "",
    image: "",
  });
  const [hashtagInput, setHashtagInput] = useState<string>("");

  const navigate = useNavigate();

  const updateProfile = useUpdateProfile();
  const getDetail = useGetProfileDetails();
  const getCurrentUser = useGetCurrentAuthenticatedUser();
  const getCurrentSesion = useGetCurrentUserSession();
  const getHashtags = useSuggestionHashtag();

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

  useEffect(() => {
    getDetail.mutate(
      [
        "expertise",
        " profile_picture",
        " bio",
        " professional_email",
        " skype_id",
        " personal_phone",
      ],
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const result = res.data.result;
            console.log(result);
            setInitialValue((old) => ({
              ...old,
              aboutMe:
                result.bio && result.bio.length > 0 ? result.bio[0].value : "",
              myExperties: result.expertise
                ? result.expertise.map((o: any) => ({
                    value: o.id,
                    label: o.name,
                    isServer: true,
                  }))
                : [],
              skypeId:
                result.skype_id && result.skype_id.length > 0
                  ? result.skype_id[0].value
                  : "",
              phone: result.personal_phone ? result.personal_phone.value : "",
              personalEmail: result.professional_email
                ? result.professional_email.value
                : "",
              image:
                result.profile_picture && result.profile_picture.length > 0
                  ? result.profile_picture[0]?.value
                  : "",
            }));
          }

          // setTotalValue(result);
        },
      }
    );
  }, []);

  const dispatch = useDispatch();

  const onSubmit = (values: any) => {
    const meta_data: any = [];
    setIsLoading(true);
    if (values.image && values.image.includes("tmp/"))
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
        name: values.phone?.includes("+")
          ? values.phone.replaceAll(" ", "")
          : "+1" + values.phone.replaceAll(" ", ""),
        value: values.phone?.includes("+")
          ? values.phone.replaceAll(" ", "")
          : "+1" + values.phone.replaceAll(" ", ""),
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
        } else if (!ex.isServer) user_tags.expertise.add.push(ex.value);
      });
    }

    console.log(user_tags);
    // return;

    let obj: any = {
      finished: true,
    };

    if (
      user_tags.expertise.add.length > 0 ||
      user_tags.expertise.delete.length > 0
    )
      obj["user_tags"] = user_tags;
    if (meta_data.length > 0) obj["meta_data"] = meta_data;

    console.log(obj);
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
                      // removeUnusedDatas();
                      // setTimeout(() => {
                      dispatch(handleRefresh("profile"));
                      navigate("/");
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
  };

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

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col
          lg="9"
          className="d-flex justify-content-center align-items-center overflow-hidden bg-white"
        >
          <FormWrapper
            initialValues={initialValue}
            //validationSchema={}
            onSubmit={onSubmit}
            enableReinitialize
            className="col-10 col-lg-8 mt-5 mt-lg-0"
          >
            {({ values, setFieldValue }: FormikProps<any>) => (
              <>
                <CardTitle tag="h4" className="mb-1 text-start">
                  Personal Information
                </CardTitle>
                <span className="fs-8">
                  Please complete your account information
                </span>

                <Divider wrapperClassName="mt-2 mb-2" />
                {getDetail.isLoading ? (
                  <LoadingData wrapperStyle="py-5 my-5" />
                ) : (
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
                    <RowWrappers sm={12} md={6}>
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
                    <RowWrappers sm={12} md={6}>
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
                            } else
                              curVal = curVal.filter((f) => f.value !== opt);
                            // console.log(vals, opt);
                            // console.log("curVal", curVal);
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
                    <Col xs={12} className="d-flex justify-content-end">
                      <SubmitButton
                        className="me-0 mt-2 mb-2 d-block"
                        color="link"
                        type="button"
                        onClick={() => {
                          dispatch(handleLogout());
                          navigate("/emailCheck");
                        }}
                        // isLoading={isLoading}
                        disabled={isLoading}
                        // block
                      >
                        Cancel and Logout
                      </SubmitButton>
                      <SubmitButton
                        className="me-0 mt-2 mb-2 d-block"
                        color="primary"
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading}
                        // block
                      >
                        Save
                      </SubmitButton>
                    </Col>
                  </>
                )}
              </>
            )}
          </FormWrapper>
        </Col>
        <Col
          md="3"
          className="d-none d-lg-block p-0 position-relative overflow-hidden"
        >
          <img
            className="img-fluid w-100 rotateY-180"
            src={source}
            alt="Login Cover"
          />
          <div className="w-100 h-100 d-flex flex-column maxWidth-750 my-0 mx-auto">
            <div className="w-100 p-2 position-absolute top-0">
              <img
                className="registerRealtyLogo"
                src={profileSetupRealtyLogo}
                alt="Register BackLogo"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export { ProfileSetupp };
