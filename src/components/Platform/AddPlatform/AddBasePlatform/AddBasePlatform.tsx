import { ChildForm } from "@src/components/common/ChildForm/ChildForm";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { LogoUploader } from "@src/components/common/form/Fields/LogoUploader/LogoUploader";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import {
  useCreatePlatform,
  useEditPlatform,
  useGetPlatformDetailMutation,
} from "@src/core/services/api/platform/platform.api";
import {
  TCreatePlatform,
  TEditPlatform,
} from "@src/core/services/api/platform/type";
import { addPlatformValidation } from "@src/core/validations/platform.validation";
import { FC, useEffect, useState } from "react";
import { AlertOctagon, Check } from "react-feather";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ExtraDataList } from "../ExtraDataList/ExtraDataList";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import toast from "react-hot-toast";

interface IAddBasePlatformProp {
  stepper: any;
}

const AddBasePlatform: FC<IAddBasePlatformProp> = ({
  stepper,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>({
    extraData: [
      { description: "", order: "", type: { value: 1, label: "Text" } },
    ],
    platformName: "",
    dashboardAccessUrl: "",
    username: "",
    image: null,
    password: "",
  });

  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");

  const detail = useGetPlatformDetailMutation();

  useEffect(() => {
    if (isEdit) {
      detail.mutate(
        {
          entity: "platform",
          data: { id: id ? +id : 0 },
        },
        {
          onSuccess: (res) => {
            console.log(res.data.result);
            if (res.data.is_success) {
              const result = res.data.result;
              const extraData =
                result && result.extra_data
                  ? Object.keys(result.extra_data).map((i: string) => {
                      return {
                        description: result.extra_data[i],
                        order: i,
                        type:
                          typeof result.extra_data[i] === "string"
                            ? { value: 1, label: "Text" }
                            : { value: 2, label: "Number" },
                      };
                    })
                  : [];
              setInitialValues({
                dashboardAccessUrl: result.dashboard_access_url,
                image: result.image,
                extraData: extraData,
                password: result.password,
                platformName: result.name,
                username: result.username,
              });
            }
          },
        }
      );
    }
  }, [location.pathname]);

  const createPlatform = useCreatePlatform();
  const editPlatform = useEditPlatform();

  const navigate = useNavigate();

  const onSubmit = (values: any, isSave?: boolean) => {
    let extraData: any = {};
    if (values.extraData) {
      values.extraData.forEach((ex: any) => {
        extraData[ex.order] =
          ex.type && ex.type.value === 2 ? +ex.description : ex.description;
      });
    }

    let obj: TCreatePlatform | TEditPlatform | any = {
      entity: "platform",
      data: {
        dashboard_access_url: values.dashboardAccessUrl,
        name: values.platformName,
        password: values.password,
        username: values.username,
        image: values.image,
        extra_data: extraData,
      },
    };

    if (!!id) obj.data.id = id ? +id : 0;

    if (!id)
      createPlatform.mutate(obj, {
        onSuccess: (val) => {
          console.log(val.data);
          if (val.data.is_success) {
            if (!isSave || typeof isSave !== "boolean") {
              navigate("/platforms/edit/" + val.data.result.id + "/2");
              stepper.next();
            } else toast.success("Successfully saved!");
          } else
            toast.error(
              val.data.error ||
                "Error occurred while saving! Please try again later"
            );
        },
        onError: () => {
          toast.error("Error occurred while saving! Please try again later");
        },
      });
    else
      editPlatform.mutate(obj, {
        onSuccess: (val) => {
          console.log(val.data);
          if (val.data.is_success) {
            if (!isSave || typeof isSave !== "boolean") {
              navigate("/platforms/edit/" + val.data.result.id + "/2");
              stepper.next();
            } else toast.success("Successfully saved!");
          } else
            toast.error(
              val.data.error ||
                "Error occurred while saving! Please try again later"
            );
        },
        onError: () => {
          toast.error("Error occurred while saving! Please try again later");
        },
      });
  };

  return (
    <FormStepsWrapper
      stepName={isEdit ? "Edit Platform" : "Add Platform"}
      stepNum={1}
      stepper={stepper}
      schema={addPlatformValidation}
      onSave={(values) => onSubmit(values, true)}
      isLoading={createPlatform.isLoading || editPlatform.isLoading}
    >
      {{
        Wrapper: (props: any) => (
          <FormWrapper
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={addPlatformValidation}
            enableReinitialize
          >
            {props.children}
          </FormWrapper>
        ),
        body: (
          <>
            {isEdit && detail.isLoading ? (
              <LoadingData wrapperStyle="py-5 my-5" />
            ) : (
              <>
                <LogoUploader
                  name="image"
                  label="Platform Logo"
                  id="image"
                  fileFormat="png, jpg"
                  fileSize="5 MB"
                />

                <ChildForm
                  headerIcon={<AlertOctagon size={14} color="white" />}
                  headerTitle="Account Information"
                  // customWrapper={Fragment}
                  className="list-unstyled pt-2 border-top"
                >
                  <RowWrappers sm={6} md={4}>
                    <InputText
                      name="platformName"
                      placeholder="Please enter Name"
                      label={"Platform Name"}
                      id="platformName"
                      wrapperClassName="mb-1"
                    />
                  </RowWrappers>
                  <RowWrappers sm={6} md={4}>
                    <InputText
                      name="dashboardAccessUrl"
                      placeholder="Please enter url"
                      label={"Dashboard Access Url"}
                      id="dashboardAccessUrl"
                      wrapperClassName="mb-1"
                    />
                  </RowWrappers>
                  <RowWrappers sm={6} md={4}>
                    <InputText
                      name="username"
                      placeholder="Please enter username"
                      label={"Username"}
                      id="username"
                      wrapperClassName="mb-1"
                    />
                    <InputText
                      name="password"
                      placeholder="Please enter password"
                      label={"Password"}
                      id="password"
                      wrapperClassName="mb-1"
                      type="password"
                    />
                  </RowWrappers>
                </ChildForm>

                <ChildForm
                  headerIcon={<Check size={14} color="white" />}
                  headerTitle="Extra data"
                  // customWrapper={Fragment}
                  className="list-unstyled pt-2 border-top"
                >
                  <ExtraDataList />
                </ChildForm>
              </>
            )}
          </>
        ),
      }}
    </FormStepsWrapper>
  );
};

export { AddBasePlatform };
