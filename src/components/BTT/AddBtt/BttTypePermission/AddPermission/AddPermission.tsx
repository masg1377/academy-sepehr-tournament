import { Divider } from "@src/components/common/divider/Divider";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { ListTableSelectField } from "@src/components/common/form/Fields/ListTableSelectField/ListTableSelectField";
import { RippleButton } from "@src/components/common/ripple-button";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import {
  PermissionNumTargetTypes,
  PermissionTargetTypes,
} from "@src/core/data/btt.data";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Search } from "react-feather";
import { columns } from "../column";
import { PermissionDetails } from "./PermissionDetails/PermissionDetails";

interface IAddPermissionProp {
  activeStep: number;
}

const AddPermission: FC<IAddPermissionProp> = ({ activeStep }): JSX.Element => {
  const [data, setData] = useState([]);

  const { values, setFieldValue } = useFormikContext<any>();

  const getPermissions = useGetListOfEntity();

  useEffect(() => {
    if (activeStep === 1 && data && data.length === 0)
      getPermissions.mutate(
        {
          entity: "btt_permission_advantages",
          data: {
            list_filter: {
              limit: 10000,
              offset: 0,
              filters: [{ field: "target_type", operator: "=", value: 1 }],
            },
          },
        },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              let result = res.data.result;
              if (result && !Array.isArray(result)) result = [result];
              if (result)
                setData(
                  result.map((i: any, ind: number) => ({
                    id: i.id,
                    name: i.key,
                    row_id: ind + 1,
                    description: i.key,
                    data: !i.is_boolean ? 1 : { value: 1, label: "true" },
                    isBoolean: i.is_boolean,
                  }))
                );
            }
          },
        }
      );
  }, [activeStep]);

  const onPermissionFilter = (opt: any) => {
    setFieldValue("targetType", opt);
    const val = values["listOfPermission"];
    if (opt)
      getPermissions.mutate(
        {
          entity: "btt_permission_advantages",
          data: {
            list_filter: {
              limit: 10000,
              offset: 0,
              filters: [
                { field: "target_type", operator: "=", value: opt.value },
                "and",
                { field: "key", operator: "like", value: val ? val : "" },
              ],
            },
          },
        },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              let result = res.data.result;
              if (result && !Array.isArray(result)) result = [result];
              if (result)
                setData(
                  result.map((i: any, ind: number) => ({
                    id: i.id,
                    name: i.key,
                    row_id: ind + 1,
                    description: i.key,
                    data: !i.is_boolean ? 1 : { value: 1, label: "true" },
                    isBoolean: i.is_boolean,
                  }))
                );
            }
          },
        }
      );
  };

  const onSearchFilter = () => {
    const val = values["listOfPermission"];
    const target = values["targetType"];
    console.log(val);
    getPermissions.mutate(
      {
        entity: "btt_permission_advantages",
        data: {
          list_filter: {
            limit: 10000,
            offset: 0,
            filters: [
              { field: "key", operator: "like", value: val },
              "and",
              { field: "target_type", operator: "=", value: target.value },
            ],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            if (result)
              setData(
                result.map((i: any, ind: number) => ({
                  id: i.id,
                  name: i.key,
                  row_id: ind + 1,
                  description: i.key,
                  data: !i.is_boolean ? 1 : { value: 1, label: "true" },
                  isBoolean: i.is_boolean,
                }))
              );
          }
        },
      }
    );
  };

  return (
    <>
      <span className="fs-6 fw-bold text-primary d-block mt-2 mb-1">
        Add Permission
      </span>

      {/* <Divider /> */}
      <RowWrappers md={6} xl={4}>
        <SelectOption
          name="targetType"
          placeholder="Please select"
          id="targetType"
          label="Target Type"
          options={PermissionNumTargetTypes.filter((f) => f.value !== 3)}
          onChange={onPermissionFilter}
          wrapperClassName="mb-1"
        />
      </RowWrappers>

      <RowWrappers md={12} xl={12}>
        <PermissionDetails />
      </RowWrappers>

      <RowWrappers md={12} xl={8}>
        <ListTableSelectField
          name="permissions"
          rows={data}
          columns={columns}
          isLoading={getPermissions.isLoading}
          headerChild={
            <div className="d-flex align-items-end justify-content-between mb-1">
              <InputText
                name="listOfPermission"
                placeholder="Name ..."
                label={"List of Permission"}
                id="listOfPermission"
                noColor
                wrapperClassName="w-100"
                // wrapperClassName="mb-1"
              />

              <RippleButton
                style={{ minWidth: 130 }}
                className="ms-1"
                color="primary"
                type="button"
                onClick={onSearchFilter}
              >
                <Search size={16} /> Search
              </RippleButton>
            </div>
          }
        />
      </RowWrappers>
    </>
  );
};

export { AddPermission };
