import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { packageMlsContractType } from "@src/core/data/package.data";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { TGetMlsList } from "@src/core/services/api/mls/type";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";

import { useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";

interface IUserProfessionProp {
  stepper: any;
  setIndexStep: any;
  isLoading?: boolean;
  indexStep?: number;
  schema: any;
  firstIsLoading?: any;
  onSubmit?: (val: any, isSave: boolean) => void;
}

const MLSInformation: FC<IUserProfessionProp> = ({
  stepper,
  setIndexStep,
  isLoading,
  indexStep,
  schema,
  firstIsLoading,
  onSubmit,
}): JSX.Element => {
  const [hasMLS, sethasMLS] = useState<boolean>(false);
  const [mlsOption, setmlsOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [feedOption, setfeedOption] = useState<
    { value: number; label: string }[]
  >([]);
  const [filterListMLS, setfilterListMLS] = useState<TGetMlsList>({
    entity: "mls_server",
    data: {
      list_filter: {
        limit: 1000,
        offset: 0,
        order_by: "creation_date",
        filters: [],
      },
    },
  });
  const [filterListFeedtype, setfilterListFeedtype] = useState<TGetEntities>({
    entity: "feed_types_connection_types",
    data: {
      list_filter: {
        limit: 1000,
        offset: 0,
        order_by: "creation_date",
        filters: [],
      },
    },
  });

  const getFeedType = useGetListOfEntity();
  const getMLSItems = useGetMlsServer();

  useEffect(() => {
    if (indexStep === 4) {
      getMLSItems.mutate(filterListMLS);
      getFeedType.mutate(filterListFeedtype);
    }
  }, [indexStep]);

  useEffect(() => {
    if (getMLSItems.isSuccess) {
      let result = getMLSItems.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      if (result)
        setmlsOption(result.map((i: any) => ({ value: i.id, label: i.name })));
    }
  }, [getMLSItems.isSuccess]);

  useEffect(() => {
    if (getFeedType.isSuccess) {
      const result = getFeedType.data.data.result;
      if (result)
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
  }, [getFeedType.isSuccess]);
  //.log("feed", feedOption);

  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <FormStepsWrapper
      stepper={stepper}
      stepNum={5}
      stepName="MLS informations"
      onSave={onSubmit}
      // setIndexStep={setIndexStep}
      hasPrev
      isLoading={isLoading}
      schema={schema}
      // btnNextText=''
    >
      {firstIsLoading ? (
        <LoadingData wrapperStyle="pt-5 pb-4 my-5" />
      ) : (
        <>
          <RowWrappers sm={6} md={4} rowClassName="pb-2">
            <div>
              <SwitchBox
                name="hasMls"
                wrapperClassName="mt-2 mb-1"
                color="success"
                // defaultChecked={hasMLS}
                disabled={
                  values["type"] &&
                  (values["type"].value === "data feed" ||
                    values["type"].value === "realtyfeed app")
                }
                labelClassName="text-black"
                onChange={(e) => {
                  setFieldValue("hasMls", e);
                  if (!e) {
                    setFieldValue("mlsId", null);
                    setFieldValue("mlsContractType", null);
                    setFieldValue("feedType", null);
                  }
                }}
                // onChange={(val) => sethasMLS(val)}
              >
                This package has MLS
              </SwitchBox>
              {values["hasMls"] ? (
                <div className="mb-5 pb-5">
                  <SelectOption
                    name="mlsId"
                    placeholder="Please select"
                    label={"MLS ID"}
                    id="mlsId"
                    isLoading={getMLSItems.isLoading}
                    options={mlsOption}
                    wrapperClassName="mb-1"
                  />
                  <SelectOption
                    name="mlsContractType"
                    placeholder="Please select"
                    label={"MLS Contract Type"}
                    id="mlsContractType"
                    isLoading={getMLSItems.isLoading}
                    options={packageMlsContractType}
                    wrapperClassName="mb-1"
                  />
                  <SelectOption
                    name="feedType"
                    placeholder="Please select"
                    label={"Feed Type"}
                    id="feedType"
                    isLoading={getFeedType.isLoading}
                    options={feedOption}
                    wrapperClassName="mb-5"
                  />
                </div>
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

export { MLSInformation };
