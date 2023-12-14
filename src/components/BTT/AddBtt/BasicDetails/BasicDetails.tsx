import React, { FC, useEffect, useState } from "react";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { LogoUploader } from "@src/components/common/form/Fields/LogoUploader/LogoUploader";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { FormWrapper as Wrapper } from "../FormWrapper";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { DatePicker } from "@src/components/common/form/common/DatePicker/DatePicker";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import { FormikProps, useFormikContext } from "formik";
import { TBttBoostTypes, TBttTypes } from "@src/core/data/btt.data";
import { addBttValidation } from "@src/core/validations/btt.validation";
import { useCreateBtt, useEditBtt } from "@src/core/services/api/btt/btt.api";
import { TAddBtt, TEditBtt } from "@src/core/services/api/btt/type";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import toast from "react-hot-toast";

interface IBasicDetailsProp {
  stepper: any;
  // setActiveStep: (val: number) => void;
  bttDetail: any;
  isLoading: boolean;
  // schema: any;
  // isLoading: boolean;
  setRefetch: (val: any) => void;
}

const BasicDetails: FC<IBasicDetailsProp> = ({
  stepper,
  // setActiveStep,
  bttDetail,
  isLoading,
  setRefetch,
  // schema,
  // isLoading,
}): JSX.Element => {
  const { id } = useParams();
  const [initialValue, setInitialValue] = useState<any>({
    name: "",
    types: null,
    boostType: null,
    icon: "",
    availablePeriod: 0,
    bttConditions: "",
    isAsset: false,
    graphRelation: false,
    isGlobal: false,
    permanent: false,
    location: null,
    expiryDate: "",
  });

  // const getBtt = useGetListOfEntity();
  const addBtt = useCreateBtt();
  const editBtt = useEditBtt();

  useEffect(() => {
    if (id && bttDetail) {
      const result = bttDetail;
      try {
        setInitialValue((old: any) => ({
          ...old,
          availablePeriod: result.available_period,
          boostType: result.boost_type
            ? TBttBoostTypes.find((d) => d.id === result.boost_type)
            : null,
          bttConditions: result.btt_conditions,
          expiryDate: result.expiry_date,
          graphRelation: result.graph_relation,
          icon: result.main_icon,
          isAsset: result.is_asset,
          isGlobal: result.is_global,
          name: result.name,
          permanent: result.expiry_date ? false : true,
          types: result.type
            ? TBttTypes.find((f) => f.id === result.type)
            : null,
          location:
            result.locations &&
            !result.is_global &&
            Array.isArray(result.locations)
              ? result.locations.map((i: any) => ({
                  value: i.id,
                  label: i.name,
                }))
              : null,
        }));
      } catch (error) {}
    }
  }, [bttDetail]);

  const navigate = useNavigate();

  const onSubmit = (values: any, isSave: boolean) => {
    if (id) {
      const bttObj: TEditBtt = {
        id: +id,
        basic_info: {
          name: values.name ? values.name : undefined,
          available_period: values.availablePeriod
            ? values.availablePeriod
            : undefined,
          boost_type: values.boostType ? values.boostType.value : undefined,
          btt_conditions: values.bttConditions
            ? values.bttConditions
            : undefined,
          expiry_date: values.expiryDate
            ? getCustomDate(values.expiryDate) + "T00:00:00Z"
            : undefined,
          graph_relation: values.graphRelation ? true : false,
          is_asset: values.isAsset ? true : false,
          is_global: values.isGlobal ? true : false,
          main_icon:
            values.icon && values.icon !== initialValue?.icon
              ? values.icon
              : undefined,
          type: values.types ? values.types.value : undefined,
        },
      };

      let loc = values.location ? [...values.location] : [];

      // if(initialValue.location){
      //   loc.filter(f => !initialValue.location.some(s => ))
      // }

      const oldLocs = initialValue?.location?.filter(
        (f: any) => !values?.location?.some((s: any) => s.value === f.value)
      );
      const newLocs = loc.filter(
        (f: any) =>
          !initialValue?.location?.some((s: any) => s.value === f.value)
      );

      console.log(oldLocs);

      if (!values.isGlobal && (oldLocs.length > 0 || newLocs.length > 0))
        bttObj["locations"] = {
          add: newLocs,
          remove: oldLocs.map((l: any) => l?.value),
        };

      editBtt.mutate(bttObj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            // console.log(res.data.result);
            // navigate("/btt-list/edit/" + id);
            // setActiveStep(1);
            if (!isSave || typeof isSave !== "boolean") stepper.next();
            else toast.success("Successfully saved!");
            setRefetch((old: boolean) => !old);
          } else toast.error(res.data.error || "Failed to save!");
        },
        onError: () => {
          toast.error("Occurred while saving! Please try again later");
        },
      });
    } else {
      // console.log(values);
      // return;
      const bttObj: TAddBtt = {
        basic_info: {
          boost_type: values.boostType ? values.boostType.value : undefined,
          available_period: values.availablePeriod
            ? values.availablePeriod
            : undefined,
          btt_conditions: values.bttConditions
            ? values.bttConditions
            : undefined,
          graph_relation: values.graphRelation ? true : false,
          main_icon: values.icon ? values.icon : undefined,
          name: values.name,
          type: values.types.value,
          is_asset: values.isAsset ? true : false,
          expiry_date: values.expiryDate
            ? values.expiryDate + "T00:00:00Z"
            : undefined,
          is_global: values.isGlobal,
        },
      };

      if (!values.isGlobal && values.location?.length > 0)
        bttObj["locations"] = {
          add: values.location,
        };

      addBtt.mutate(bttObj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const result = res.data.result;
            // console.log(res.data.result);
            navigate("/btt-list/add/" + result.id);
            // setActiveStep(1);
          }
        },
      });
    }
  };

  return (
    <FormWrapper
      initialValues={initialValue}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={addBttValidation}
    >
      {(form: FormikProps<any>) => (
        <FormStepsWrapper
          stepName="BTT form"
          stepNum={1}
          stepper={stepper}
          hasPrev={false}
          onSave={() => onSubmit(form.values, true)}
          // onPrev={() => setActiveStep(0)}
          // onNextStep={() => setActiveStep(1)}
          schema={addBttValidation}
          values={form.values}
          isLoading={addBtt.isLoading || editBtt.isLoading}
        >
          {{
            body:
              id && isLoading ? (
                <LoadingData wrapperStyle="py-5 my-4" />
              ) : (
                <>
                  <RowWrappers sm={6} md={4}>
                    <InputText
                      name="name"
                      placeholder="Please enter ..."
                      label={"Name"}
                      id="name"
                      wrapperClassName="mb-1"
                    />

                    <SelectOption
                      name="types"
                      placeholder="Please select"
                      label={"Types"}
                      id="types"
                      options={TBttTypes}
                    />
                  </RowWrappers>
                  <RowWrappers sm={6} md={4}>
                    <SelectOption
                      name="boostType"
                      placeholder="Please select"
                      label={"Boost Type"}
                      id="boostType"
                      options={TBttBoostTypes}
                    />

                    <LogoUploader
                      name="icon"
                      label="Icon"
                      id="icon"
                      wrapperClassName="pt-0"
                      square
                      fileFormat="png, jpg"
                      fileSize="5 MB"
                    />
                  </RowWrappers>
                  <RowWrappers sm={6} md={4}>
                    <InputText
                      name="availablePeriod"
                      placeholder="Please enter ..."
                      label={"Available Period"}
                      id="availablePeriod"
                      wrapperClassName="mb-1"
                      type="number"
                    />
                    <InputText
                      name="bttConditions"
                      placeholder="Please enter ..."
                      label={"BTT Conditions"}
                      id="bttConditions"
                      wrapperClassName="mb-1"
                    />
                  </RowWrappers>
                  <RowWrappers sm={6} md={4}>
                    <SwitchBox
                      name="isAsset"
                      color="success"
                      defaultChecked={false}
                      wrapperClassName="mt-1"
                      labelClassName="text-black"
                    >
                      Is asset
                    </SwitchBox>
                    <SwitchBox
                      name="graphRelation"
                      color="success"
                      defaultChecked={false}
                      wrapperClassName="mt-1"
                      labelClassName="text-black"
                    >
                      Graph Relation
                    </SwitchBox>
                  </RowWrappers>
                  <RowWrappers sm={6} md={4}>
                    <SwitchBox
                      name="isGlobal"
                      color="success"
                      defaultChecked={false}
                      // wrapperClassName="mt-1"
                      labelClassName="text-black"
                    >
                      Is Global
                    </SwitchBox>
                    <SwitchBox
                      name="permanent"
                      color="success"
                      defaultChecked={false}
                      // wrapperClassName="mt-1"
                      labelClassName="text-black"
                    >
                      Permanent
                    </SwitchBox>
                  </RowWrappers>
                  <RowWrappers sm={6} md={4} rowClassName="mb-5 pb-2">
                    {!form.values["isGlobal"] && (
                      <LocationField
                        name="location"
                        placeholder="Please select"
                        label={"Location"}
                        isMulti
                        wrapperClassName="mb-1"
                        isOutline
                        // disabled={values["isGlobal"]}
                      />
                    )}

                    {!form.values["permanent"] && (
                      <DatePicker
                        name="expiryDate"
                        label="Expiry date"
                        id="expiryDate"
                        placeholder="Please select a date"
                        // disabled={values["permanent"]}
                        options={{ minDate: new Date() }}
                      />
                    )}
                  </RowWrappers>
                </>
              ),
          }}
        </FormStepsWrapper>
      )}
    </FormWrapper>
  );
};

export { BasicDetails };
