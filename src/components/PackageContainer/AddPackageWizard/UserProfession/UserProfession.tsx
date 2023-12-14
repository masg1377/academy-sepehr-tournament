import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { LocationField } from "@src/components/common/form/Fields/LocationField/LocationField";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import {
  useGetCountrySuggest,
  useGetLocationDetail,
} from "@src/core/services/api/suggestion/suggestion.api";
import { compareTwoArray } from "@src/core/utils/Utils";
import { useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";

interface IUserProfessionProp {
  stepper: any;
  setIndexStep: any;
  indexStep: number;
  schema: any;
  isLoading?: any;
  onSubmit?: (val: any, isSave?: boolean) => void;
  submitLoading?: boolean;
}

const UserProfession: FC<IUserProfessionProp> = ({
  stepper,
  setIndexStep,
  indexStep,
  schema,
  isLoading,
  onSubmit,
  submitLoading,
}): JSX.Element => {
  const [locationOption, setLocationOption] = useState<any>([]);
  const [professionOption, setProfessionOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [filterListProfession, setFilterListProfession] =
    useState<TGetEntities>({
      entity: "user_professions",
      data: {
        list_filter: {
          limit: 10000,
          offset: 0,
          order_by: "creation_date",
          filters: [],
        },
      },
    });

  const getProfession = useGetListOfEntity();
  // const getLocation = useGetLocationDetail();
  const getCountry = useGetCountrySuggest();

  useEffect(() => {
    getCountry.mutate(
      { q: "" },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const result = res.data.result;
            if (result && Array.isArray(result))
              setLocationOption(
                result.map((it) => ({ value: it.id, label: it.name }))
              );
            else setLocationOption([]);
          }
        },
      }
    );
  }, []);

  useEffect(() => {
    if (indexStep === 1) getProfession.mutate(filterListProfession);
  }, [indexStep]);

  useEffect(() => {
    if (getProfession.isSuccess) {
      let result = getProfession.data.data.result;
      // console.log(result);
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setProfessionOption(
          result.map((i: any) => ({ value: i.id, label: i.name }))
        );
    }
  }, [getProfession.isSuccess]);

  const { values, setFieldValue } = useFormikContext<any>();

  // useEffect(() => {
  //   const countries = ;
  //   const countryList: any = [];
  //   countries.map(async (country) => {
  //     const result = await getLocation.mutateAsync({ q: country.value });
  //     countryList.push({ ...country, place: result.data.result[0].place });
  //   });
  //   setLocationOption(countryList);
  // }, []);

  // const onChangeLocation = (val: any) => {
  //   if (val) {
  //     //   const value = val.value;
  //     const state = values["location"];

  //     const result = compareTwoArray(state, val);
  //     setFieldValue("location", val);

  //     //console.log(result);
  //     getLocation.mutate(
  //       { q: "usa,canada" },
  //       {
  //         onSuccess: (res) => {
  //           const place =
  //             res.data.result && res.data.result.length > 0
  //               ? res.data.result[0]
  //               : null;
  //           if (place) {
  //             let filteredData = [...values["location"]];
  //             filteredData = filteredData.filter((o) => o.value !== val.value);
  //             setFieldValue("location", [
  //               ...filteredData,
  //               { value: val.value, place: place },
  //             ]);
  //           }
  //         },
  //       }
  //     );
  //   }
  // };

  return (
    <FormStepsWrapper
      stepper={stepper}
      stepNum={2}
      stepName="User Profession"
      // setIndexStep={setIndexStep}
      onSave={onSubmit}
      hasPrev
      schema={schema}
      isLoading={submitLoading}
    >
      {isLoading ? (
        <LoadingData wrapperStyle="pt-5 pb-4 my-5" />
      ) : (
        <>
          <RowWrappers sm={6} md={4} rowClassName="pb-2 border-bottom">
            <div>
              <SwitchBox
                name="hasUserProfession"
                wrapperClassName="mt-2 mb-1"
                color="success"
                //   defaultChecked={hasUserProfession}
                labelClassName="text-black"
                //   onChange={(val) => setHasUserProfession(val)}
                onChange={(e) => {
                  setFieldValue("hasUserProfession", e);
                  if (!e) {
                    setFieldValue("userProfession", []);
                  }
                }}
              >
                This package has user profession
              </SwitchBox>
              {values["hasUserProfession"] ? (
                <SelectOption
                  name="userProfession"
                  placeholder="Please select"
                  label={"User Profession"}
                  id="User Profession"
                  isLoading={getProfession.isLoading}
                  options={professionOption}
                  isMulti
                  wrapperClassName="mb-1"
                />
              ) : (
                <></>
              )}
            </div>
          </RowWrappers>

          <RowWrappers sm={6} md={4} rowClassName="pb-2 pb-5">
            <div>
              <SwitchBox
                name="hasLocation"
                wrapperClassName="mt-2 mb-1"
                color="success"
                //   defaultChecked={hasLocation}
                labelClassName="text-black"
                //   onChange={(val) => setHasLocation(val)}
                onChange={(e) => {
                  setFieldValue("hasLocation", e);
                  if (!e) {
                    setFieldValue("location", []);
                  }
                }}
              >
                This package has Location
              </SwitchBox>
              {values["hasLocation"] ? (
                // <SelectOption
                //   name="location"
                //   placeholder="Please select"
                //   label={"Location (Just country level)"}
                //   id="location"
                //   options={locationOption}
                //   isMulti
                //   wrapperClassName="mb-1"
                //   isLoading={getLocation.isLoading}
                //   // onChange={onChangeLocation}
                // />
                <SelectOption
                  name="location"
                  placeholder="Please select"
                  label={"Location (Just country level)"}
                  isMulti
                  wrapperClassName="mb-1"
                  options={locationOption}
                  customStyle={{
                    menuList: (base) => ({
                      ...base,
                      maxHeight: 220,
                    }),
                  }}
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

export { UserProfession };
