import React, { useEffect, useRef, useState } from "react";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { useGetPlatform } from "@src/core/services/api/platform/platform.api";
import { TGetPlatformList } from "@src/core/services/api/platform/type";
import { useFormikContext } from "formik";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { mlsContractTpe } from "@src/core/data/mls.data";
import { packageMlsContractType } from "@src/core/data/package.data";

const FirstStepForm = () => {
  const [plaftormFilter, setPlaftormFilter] = useState<TGetPlatformList>({
    entity: "platform",
    data: { list_filter: { limit: 20, offset: 0, filters: [] } },
  });
  const [feedTypeFilter, setFeedTypeFilter] = useState<TGetEntities>({
    entity: "feed_types_connection_types",
    data: { list_filter: { limit: 20, offset: 0, filters: [] } },
  });
  const [platformOptions, setPlatformOptions] = useState([]);
  const [feedTypeOptions, setfeedTypeOptions] = useState([]);
  const [platformInput, setPlatformInput] = useState<string>("");
  const [feedTypeInput, setFeedTypeInput] = useState<string>("");

  const getPlatforms = useGetPlatform();
  const getFeedType = useGetListOfEntity();

  useEffect(() => {
    getPlatforms.mutate(plaftormFilter);
    getFeedType.mutate(feedTypeFilter);
  }, []);

  useEffect(() => {
    if (getPlatforms.isSuccess) {
      let result = getPlatforms.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      if (result) {
        setPlatformOptions(
          result.map((o: any) => ({ value: o.id, label: o.name }))
        );
      } else setPlatformOptions([]);
    }
  }, [getPlatforms.isSuccess]);

  useEffect(() => {
    if (getFeedType.isSuccess) {
      let result = getFeedType.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      console.log(result);
      if (result) {
        setfeedTypeOptions(
          result.map((i: any) => ({
            value: i.id,
            label:
              (!!i.feed_type ? i.feed_type : "--") +
              "/" +
              (!!i.connection_type ? i.connection_type : "--"),
          }))
        );
      } else setfeedTypeOptions([]);
    }
  }, [getFeedType.isSuccess]);

  const { setFieldValue } = useFormikContext<any>();

  const refPlatform = useRef<any>();

  const onPlatformChange = (val: any) => {
    setPlatformInput(val);
    if (platformInput !== val) {
      clearTimeout(refPlatform.current);
      const timeOut = setTimeout(() => {
        let newFilter = { ...plaftormFilter };
        //@ts-ignore
        newFilter.data["list_filter"].filters = [
          { field: "name", operator: "like", value: val ? val : "" },
        ];
        setPlaftormFilter(newFilter);
        getPlatforms.mutate(newFilter);
      }, 500);
      refPlatform.current = timeOut;
    }
  };

  const refFeedType = useRef<any>();

  const onFeedTypeChange = (val: any) => {
    setFeedTypeInput(val);
    if (feedTypeInput !== val) {
      clearTimeout(refFeedType.current);
      const timeOut = setTimeout(() => {
        let newFilter = { ...feedTypeFilter };
        //@ts-ignore
        newFilter.data["list_filter"].filters = [
          { field: "feed_type", operator: "like", value: val ? val : "" },
          "or",
          { field: "connection_type", operator: "like", value: val ? val : "" },
        ];
        setFeedTypeFilter(newFilter);
        getFeedType.mutate(newFilter);
      }, 500);
      refFeedType.current = timeOut;
    }
  };

  return (
    <div>
      <SelectOption
        name="platform"
        placeholder="Please select..."
        label={"Platform"}
        id="platform"
        options={platformOptions}
        isLoading={getPlatforms.isLoading}
        onInputChange={(val: any) => onPlatformChange(val)}
        wrapperClassName="mb-1"
        isClearable
        noFilter
      />
      <SelectOption
        name="feedConnectionType"
        placeholder="Please select..."
        label={"Feed Connection Type"}
        id="feedConnectionType"
        options={feedTypeOptions}
        isLoading={getFeedType.isLoading}
        onInputChange={(val: any) => onFeedTypeChange(val)}
        wrapperClassName="mb-1"
        noFilter
      />
      <SelectOption
        name="contract_type"
        placeholder="Please select..."
        label={"Contract Type"}
        id="contract_type"
        options={packageMlsContractType}
        wrapperClassName="mb-1"
      />
      <SwitchBox
        name="accountingStatus"
        color="success"
        defaultChecked={false}
        labelClassName="text-black mb-1"
      >
        Accounting status
      </SwitchBox>
      <SwitchBox
        name="connectionStatus"
        color="success"
        defaultChecked={false}
        labelClassName="text-black"
      >
        Connection status
      </SwitchBox>
    </div>
  );
};
export { FirstStepForm };
