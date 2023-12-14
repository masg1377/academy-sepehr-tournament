import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";

interface IUserProfessionProp {
  stepper: any;
  setIndexStep: any;
  indexStep?: number;
  schema: any;
  isLoading?: any;
  onSubmit?: (values: any, isSave?: boolean) => void;
  submitLoading?: boolean;
}

const UsagePlan: FC<IUserProfessionProp> = ({
  stepper,
  setIndexStep,
  indexStep,
  schema,
  isLoading,
  onSubmit,
  submitLoading,
}): JSX.Element => {
  const [hasUserProfession, setHasUserProfession] = useState<boolean>(false);
  const [hasLocation, setHasLocation] = useState<boolean>(false);
  const [professionOption, setProfessionOption] = useState<
    { value: number; label: string }[]
  >([]);
  //console.log("uss", professionOption);
  const [filterListProfession, setFilterListProfession] =
    useState<TGetEntities>({
      entity: "usage_plans",
      data: {
        list_filter: {
          limit: 100,
          offset: 0,
          order_by: "creation_date",
          filters: [],
        },
      },
    });

  const getPlan = useGetListOfEntity();

  useEffect(() => {
    if (indexStep === 2) getPlan.mutate(filterListProfession);
  }, [indexStep]);

  useEffect(() => {
    if (getPlan.isSuccess) {
      let result = getPlan.data.data.result;
      // console.log(result);
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setProfessionOption(
          result.map((i: any) => ({ value: i.id, label: i.name }))
        );
    }
  }, [getPlan.isSuccess]);

  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <FormStepsWrapper
      stepper={stepper}
      stepNum={3}
      stepName="Usage Plan"
      // setIndexStep={setIndexStep}
      hasPrev
      onSave={onSubmit}
      values={values}
      schema={schema}
      isLoading={submitLoading}
    >
      {isLoading ? (
        <LoadingData wrapperStyle="pt-5 pb-4 my-5" />
      ) : (
        <>
          <RowWrappers sm={6} md={4} rowClassName="pb-5">
            <div>
              <SwitchBox
                name="hasUsagePlan"
                wrapperClassName="mt-2 mb-1"
                color="success"
                // defaultChecked={hasUserProfession}
                labelClassName="text-black"
                // onChange={(val) => setHasUserProfession(val)}
                onChange={(e) => {
                  setFieldValue("hasUsagePlan", e);
                  if (!e) {
                    setFieldValue("usagePlanId", null);
                  }
                }}
              >
                This package has usage plan
              </SwitchBox>
              {values["hasUsagePlan"] ? (
                <SelectOption
                  name="usagePlanId"
                  placeholder="Please select"
                  label={"Usage Plan"}
                  id="usagePlanId"
                  options={professionOption}
                  // isMulti
                  isLoading={getPlan.isLoading}
                  wrapperClassName="mb-5 "
                />
              ) : (
                <></>
              )}
            </div>
          </RowWrappers>
        </>
      )}
    </FormStepsWrapper>
  );
};

export { UsagePlan };
