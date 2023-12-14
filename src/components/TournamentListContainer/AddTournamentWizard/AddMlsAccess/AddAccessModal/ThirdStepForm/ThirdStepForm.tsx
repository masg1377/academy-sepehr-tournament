import React, { FC, useEffect, useRef, useState } from "react";
import { SelectOption } from "@src/components/common/form/common/SelectOption";
import { useGetPlatform } from "@src/core/services/api/platform/platform.api";
import { TGetPlatformList } from "@src/core/services/api/platform/type";
import { useFormikContext } from "formik";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { CheckBox } from "@src/components/common/form/common/CheckBox/CheckBox";
import { mlsAuthType, mlsRequestMethodType } from "@src/core/data/mls.data";
import { useGetMlsList } from "@src/core/services/api/mls/mls.api";
import { TGetMlsList } from "@src/core/services/api/mls/type";
import { useParams } from "react-router-dom";
import { RippleButton } from "@src/components/common/ripple-button";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";

interface IThirdStepFormProp {
  newMlsConfig: boolean;
  setNewMlsConfig: (val: boolean) => void;
}

const ThirdStepForm: FC<IThirdStepFormProp> = ({
  newMlsConfig,
  setNewMlsConfig,
}): JSX.Element => {
  const { id } = useParams();
  const { values, setFieldValue } = useFormikContext<any>();
  const [mlsConfigFilter, setmlsConfigFilter] = useState<TGetMlsList>({
    entity: "mls_config",
    data: {
      list_filter: {
        limit: 20,
        offset: 0,
        filters: [{ field: "mls_id", operator: "=", value: id ? +id : 0 }],
      },
    },
  });
  const [mlsConfigOptions, setmlsConfigOptions] = useState([]);

  const { mlsConfig } = values;

  const getMlsConfig = useGetMlsList();

  const refMlsConfig = useRef<any>();

  useEffect(() => {
    getMlsConfig.mutate(mlsConfigFilter);
  }, []);

  useEffect(() => {
    if (getMlsConfig.isSuccess) {
      let result = getMlsConfig.data.data.result;
      if (result && !Array.isArray(result)) result = [result];
      if (result) {
        setmlsConfigOptions(
          result.map((o: any) => ({ value: o.id, label: o.name }))
        );
      } else setmlsConfigOptions([]);
    }
  }, [getMlsConfig.isSuccess]);

  const onMlsConfigChange = (val: any) => {
    clearTimeout(refMlsConfig.current);
    const timeOut = setTimeout(() => {
      let newFilter = { ...mlsConfigFilter };
      //@ts-ignore
      newFilter.data["list_filter"].filters = [
        { field: "mls_id", operator: "=", value: id ? +id : 0 },
        "and",
        { field: "name", operator: "like", value: val ? val : "" },
      ];
      setmlsConfigFilter(newFilter);
      getMlsConfig.mutate(newFilter);
    }, 500);
    refMlsConfig.current = timeOut;
  };
  return (
    <div>
      {!newMlsConfig ? (
        <>
          <SelectOption
            name="mlsConfig"
            placeholder="Please select..."
            label={"Select MLS Config"}
            id="mlsConfig"
            options={mlsConfigOptions}
            isLoading={getMlsConfig.isLoading}
            onInputChange={(val: any) => onMlsConfigChange(val)}
            wrapperClassName="mb-1"
            noFilter
          />
          <RippleButton
            type="button"
            color="link"
            onClick={() => setNewMlsConfig(true)}
            className="text-primary fw-bold text-right pe-0 me-0 ms-auto d-block"
          >
            + Add New
          </RippleButton>
        </>
      ) : (
        <>
          <InputText
            name="configName"
            placeholder="Please enter ..."
            label={"Name"}
            id="configName"
            wrapperClassName="mb-1"
          />
          <InputText
            name="configResource"
            placeholder="Please enter ..."
            label={"Resource"}
            id="configResource"
            wrapperClassName="mb-1"
          />
          <InputText
            name="configQuery"
            placeholder="Please enter ..."
            label={"Query"}
            id="configQuery"
            wrapperClassName="mb-1 pb-1 border-bottom"
          />
          <InputText
            name="configLimit"
            placeholder="Please enter ..."
            label={"Limit"}
            id="configLimit"
            wrapperClassName="mb-1 "
          />
          <InputText
            name="uniqField"
            placeholder="Please enter ..."
            label={"Uniq Field"}
            id="uniqField"
            wrapperClassName="mb-1 pb-1 border-bottom"
          />

          <InputText
            name="updateInterval"
            placeholder="Please enter ..."
            label={"Update Interval"}
            id="updateInterval"
            wrapperClassName="mb-1 "
          />
          <InputText
            name="photoTimeStamp"
            placeholder="Please enter ..."
            label={"Photo Time Stamp"}
            id="photoTimeStamp"
            wrapperClassName="mb-1 pb-1 border-bottom"
          />

          <SwitchBox
            name="configStatus"
            color="success"
            defaultChecked={false}
            labelClassName="text-black"
          >
            Status
          </SwitchBox>
        </>
      )}
    </div>
  );
};
export { ThirdStepForm };
