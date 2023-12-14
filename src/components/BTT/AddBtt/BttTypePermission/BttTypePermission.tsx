import { Divider } from "@src/components/common/divider/Divider";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { ListTableSelectField } from "@src/components/common/form/Fields/ListTableSelectField/ListTableSelectField";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RippleButton } from "@src/components/common/ripple-button";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import {
  useAssignPermission,
  useEditBtt,
} from "@src/core/services/api/btt/btt.api";
import {
  useCreateDiscount,
  useEditDiscount,
} from "@src/core/services/api/discount/discount.api";
import {
  TCreateDiscount,
  TEditDiscount,
} from "@src/core/services/api/discount/type";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { addDiscountOnBttValidation } from "@src/core/validations/discount.validation";
import { FormikProps } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Search } from "react-feather";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { AddDiscount } from "./AddDiscount/AddDiscount";
import { AddPermission } from "./AddPermission/AddPermission";
import { columns } from "./column";

interface IBttTypePermissionProp {
  stepper: any;
  bttDetail: any;
  isLoading: boolean;
  activeStep: number;
  // schema: any;
}

const BttTypePermission: FC<IBttTypePermissionProp> = ({
  stepper,
  bttDetail,
  isLoading,
  activeStep,
  // schema,
}): JSX.Element => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    discountName: "",
    isValid: true,
    percentOff: "",
    maxRedemptions: "",
    coveredPackages: null,
    description: "",
    expiryDate: null,
    permissions: [],
    targetType: { value: 1, label: "User" },
  });
  const [type, setType] = useState<number>(1);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  // const getBtt = useGetListOfEntity();

  useEffect(() => {
    if (bttDetail) setIsFirstLoad(true);
  }, [bttDetail]);

  useEffect(() => {
    // console.log(
    //   "isFirstLoad",
    //   id && bttDetail && activeStep === 1 && isFirstLoad
    // );
    if (id && bttDetail && activeStep === 1 && isFirstLoad) {
      setIsFirstLoad(false);
      setType(bttDetail.type);
      // console.log("bttDetail.type", bttDetail.type);
      if (bttDetail.type === 2) {
        const discount = bttDetail.discount
          ? bttDetail.discount.find((b: any) =>
              b ? b.id === bttDetail.discount_id : null
            )
          : null;
        discount &&
          setInitialValues((old: any) => ({
            ...old,
            description: discount.description,
            discountName: discount.name,
            isValid: discount.valid,
            expiryDate: discount.expiry_date
              ? getCustomDate(discount.expiry_date)
              : "",
            maxRedemptions: discount.max_redemptions,
            percentOff: discount.percent_off,
          }));
      } else {
        const permissions = bttDetail.btt_permissions;
        console.log(permissions);
        permissions &&
          setInitialValues((old) => ({
            ...old,
            permissions: permissions.map((o: any, ind: number) => ({
              id: o.id,
              name: o.key,
              row_id: ind + 1,
              description: o.key,
              data: o.is_boolean
                ? { value: o.value === "false" ? 2 : 1, label: o.value }
                : o.value,
              isBoolean: o.is_boolean ? true : false, //i.is_boolean,
              toggleSelected: true,
              btt_permission_advantages_bridge_id:
                o.btt_permission_advantages_bridge_id,
              isServer: true,
              isRemove: false,
            })),
          }));
      }

      //   { entity: "btt_type_items", data: { id: id ? +id : 0 } },
      //   {
      //     onSuccess: (res) => {
      //       if (res.data.is_success) {
      //         // console.log(res.data.result);
      //         setType(res.data.result.type);
      //       }
      //     },
      //   }
      // );
    }
  }, [id, bttDetail, activeStep, isFirstLoad]);

  const addDiscount = useCreateDiscount();
  const editDiscount = useEditDiscount();
  const assignPermission = useAssignPermission();
  const editBtt = useEditBtt();

  const onSubmit = (values: any, isSave?: boolean) => {
    // console.log(values);

    if (type === 2) {
      if (bttDetail && bttDetail.discount_id) {
        const oldPackages = initialValues.coveredPackages
          ? initialValues.coveredPackages
          : [];

        const newPackages = values.coveredPackages
          ? values.coveredPackages
          : [];

        const removePackages = oldPackages.filter(
          (o: any) => !newPackages.some((i: any) => i.value === o.value)
        );
        const addPackages = newPackages.filter(
          (o: any) => !oldPackages.some((i: any) => i.value === o.value)
        );

        let obj: TEditDiscount = {
          id: bttDetail.discount_id,
          description: values.description ? values.description : undefined,
          expiry_date: values.expiryDate ? values.expiryDate : undefined,
          max_redemptions: values.maxRedemptions
            ? values.maxRedemptions
            : undefined,
          name: values.discountName ? values.discountName : undefined,
          percent_off: values.percentOff ? values.percentOff : undefined,
          valid: values.isValid ? true : false,
          relations: {
            add: [
              ...addPackages.map((p: any) => ({
                object_type: "package",
                object_id: p.value,
              })),
            ],
            remove: [
              ...removePackages.map((p: any) => ({
                object_type: "package",
                object_id: p.value,
              })),
            ],
          },
        };
        editDiscount.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              if (!isSave || typeof isSave !== "boolean") stepper.next();
              else toast.success("Successfully saved!");
            } else toast.error(res.data.error);
          },
          onError: () => {
            toast.error("Occurred while saving! Please try again later");
          },
        });
      }
      // const percent: any = +values.percentOff;
      // const amount: any = +values.amount_off;
      else {
        let obj: TCreateDiscount = {
          // currency: values.currency && values.currency.value,
          description: values.description ? values.description : undefined,
          // duration: values.duration && values.duration.value,
          expiry_date: values.expiryDate ? values.expiryDate : undefined,
          max_redemptions: values.maxRedemptions
            ? values.maxRedemptions
            : undefined,
          name: values.discountName,
          percent_off: values.percentOff ? values.percentOff : 0,
          valid: values.isValid ? true : false,
          is_global: bttDetail?.is_global,
        };

        const newPackages = values.coveredPackages
          ? values.coveredPackages
          : [];

        if (newPackages && newPackages.length > 0)
          obj["covered_packages_id"] = newPackages.map((i: any) => i.value);

        addDiscount.mutate(obj, {
          onSuccess: (res) => {
            if (res.data.is_success) {
              // console.log(res.data.result);
              editBtt.mutate(
                {
                  id: id ? +id : 0,
                  basic_info: { discount_id: res.data.result.discount_id },
                },
                {
                  onSuccess: (response) => {
                    if (response.data.is_success) {
                      // console.log(response.data.result);
                      if (!isSave || typeof isSave !== "boolean")
                        stepper.next();
                      else toast.success("Successfully saved!");
                    } else toast.error(res.data.error);
                  },
                  onError: () => {
                    toast.error(
                      "Occurred while saving! Please try again later"
                    );
                  },
                }
              );
            }
          },
        });
      }
    } else {
      if (id) {
        const newPermission = values.permissions
          ? values.permissions
              .filter((o: any) => !o.isRemove && !o.isServer)
              .map((p: any) => ({
                id: p.id,
                value: typeof p.data === "object" ? p.data.label : +p.data,
              }))
          : [];
        const removePer = values.permissions
          ? values.permissions.filter((o: any) => o.isRemove)
          : [];

        const updatePer = values.permissions
          ? values.permissions
              .filter((o: any) => o.isUpdate && o.isRemove)
              .map((p: any) => ({
                id: p.id,
                value: typeof p.data === "object" ? p.data.label : +p.data,
              }))
          : [];

        let assignPer: any = {};

        if (
          (newPermission && newPermission.length > 0) ||
          (updatePer && updatePer.length > 0)
        )
          assignPer["assign_data"] = {
            btt_id: id ? +id : 0,
            data: [...newPermission, ...updatePer],
          };

        if (removePer && removePer.length > 0)
          assignPer["discharge_data"] = removePer.map(
            (o: any) => o.btt_permission_advantages_bridge_id
          );

        // return;

        if (Object.keys(assignPer).length === 0) return stepper.next();

        assignPermission.mutate(assignPer, {
          onSuccess: (result: any) => {
            if (result.data.is_success || result.data.success) {
              if (!isSave || typeof isSave !== "boolean") stepper.next();
              else toast.success("Successfully saved!");
            } else toast.error(result.data.error);
          },
          onError: () => {
            toast.error("Failed to save!");
          },
        });
      } else {
        const permissions = values["permissions"];
        if (!permissions || permissions.length === 0) stepper.next();
        assignPermission.mutate(
          {
            assign_data: {
              btt_id: id ? +id : 0,
              data: permissions.map((p: any) => ({
                id: p.id,
                value: typeof p.data === "object" ? p.data.label : +p.data,
              })),
            },
          },
          {
            onSuccess: (response: any) => {
              if (response.data.is_success || response.data.success) {
                if (!isSave || typeof isSave !== "boolean") stepper.next();
                else toast.success("Successfully saved!");
              } else toast.error(response.data.error || "Failed to save!");
            },
            onError: () => {
              toast.error("Occurred while saving! Please try again later");
            },
          }
        );
      }
    }
  };

  return (
    <FormWrapper
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={type === 2 ? addDiscountOnBttValidation : undefined}
    >
      {({ values }: FormikProps<any>) => (
        <FormStepsWrapper
          stepName="BTT type & permissions"
          stepNum={2}
          stepper={stepper}
          hasPrev
          onSave={() => onSubmit(values, true)}
          schema={type === 2 ? addDiscountOnBttValidation : undefined}
          isLoading={
            addDiscount.isLoading ||
            editBtt.isLoading ||
            assignPermission.isLoading ||
            editDiscount.isLoading
          }
        >
          {{
            body: (
              <>
                {isLoading ? (
                  <LoadingData wrapperStyle="py-5 my-3" />
                ) : type === 2 ? (
                  <AddDiscount />
                ) : (
                  <AddPermission activeStep={activeStep} />
                )}
              </>
            ),
          }}
        </FormStepsWrapper>
      )}
    </FormWrapper>
  );
};

export { BttTypePermission };
