// ** React Imports
import { FC, useEffect, useRef, useState } from "react";

import { Wizard } from "@src/components/common/wizard";
import { FileText, Search } from "react-feather";

import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import { CardHeader } from "reactstrap";
import { CardTitle } from "reactstrap";
import { CardBody } from "reactstrap";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { FormikProps } from "formik";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { ListTableSelectField } from "@src/components/common/form/Fields/ListTableSelectField/ListTableSelectField";
import { RippleButton } from "@src/components/common/ripple-button";
import { columns } from "./column";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import {
  useAssignPermission,
  useCreateBtt,
  useEditBtt,
} from "@src/core/services/api/btt/btt.api";
import { TAddBtt, TEditBtt } from "@src/core/services/api/btt/type";
import toast from "react-hot-toast";
import { addRoleValidation } from "@src/core/validations/btt.validation";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";

const AddRole: FC = (): JSX.Element => {
  const ref = useRef(null);
  const [permissions, setPermissions] = useState([]);
  const [initialValues, setInitialValues] = useState<any>({
    roleName: "",
    permissions: null,
  });

  const { id } = useParams();

  const getPermissions = useGetListOfEntity();
  const getRole = useGetListOfEntity();
  const addBtt = useCreateBtt();
  const editBtt = useEditBtt();
  const assignPermission = useAssignPermission();

  useEffect(() => {
    if (id) {
      getRole.mutate(
        { entity: "btt_type_items", data: { id: id ? +id : 0 } },
        {
          onSuccess: (res) => {
            if (res.data.is_success) {
              const result = res.data.result;
              const permissions = result.btt_permissions;
              const permissionsList: any = [];
              if (permissions)
                permissions.forEach((i: any, ind: number) => {
                  permissionsList.push({
                    id: i.id,
                    row_id: ind + 1,
                    name: i.key,
                    value: i.id,
                    label: i.key,
                    toggleSelected: true,
                    isServer: true,
                    isRemove: false,
                    btt_permission_advantages_bridge_id:
                      i.btt_permission_advantages_bridge_id,
                  });
                });

              setInitialValues((old: any) => ({
                ...old,
                roleName: result.name,
                permissions:
                  permissionsList && permissionsList.length > 0
                    ? permissionsList
                    : null,
              }));
            }
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    getPermissions.mutate(
      {
        entity: "btt_permission_advantages",
        data: {
          list_filter: {
            limit: 10000,
            offset: 0,
            filters: [{ field: "target_type", operator: "=", value: 3 }],
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            //console.log(result);
            if (result)
              setPermissions(
                result.map((i: any, ind: number) => ({
                  id: i.id,
                  row_id: ind + 1,
                  name: i.key,
                  value: i.id,
                  label: i.key,
                }))
              );
            // if (result)
            // setData(
            //   result.map((i: any, ind: number) => ({
            //     id: i.id,
            //     name: i.key,
            //     row_id: ind + 1,
            //     description: i.key,
            //     data: { value: 1, label: "true" },
            //   }))
            // );
          }
        },
      }
    );
  }, []);

  const onSearchFilter = (values: any) => {
    const val = values["listOfPermission"];
    // console.log(val);

    const filter: any = {
      entity: "btt_permission_advantages",
      data: {
        list_filter: {
          limit: 10000,
          offset: 0,
          filters: [
            { field: "target_type", operator: "=", value: 3 },
            "and",
            { field: "key", operator: "like", value: val ? val : "" },
          ],
        },
      },
    };

    getPermissions.mutate(filter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          if (result)
            setPermissions(
              result.map((i: any, ind: number) => ({
                id: i.id,
                row_id: ind + 1,
                name: i.key,
                value: i.id,
                label: i.key,
              }))
            );
        }
      },
    });
  };

  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    if (id) {
      // if (
      //   !values.permissions ||
      //   values.permissions.filter((o: any) => !o.isRemove).length === 0
      // )
      //   return toast.error("Select at least one permission from the list!");
      const obj: TEditBtt = {
        id: +id,
        basic_info: {
          name: values.roleName,
        },
      };

      editBtt.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const newPermission = values.permissions
              ? values.permissions
                  .filter((o: any) => !o.isRemove && !o.isServer)
                  .map((p: any) => ({
                    id: p.id,
                    value: "true",
                  }))
              : [];
            const removePer = values.permissions
              ? values.permissions.filter((o: any) => o.isRemove)
              : [];

            let assignPer: any = {};

            if (newPermission && newPermission.length > 0)
              assignPer["assign_data"] = {
                btt_id: res.data.result.id,
                data: newPermission,
              };

            if (removePer && removePer.length > 0)
              assignPer["discharge_data"] = removePer.map(
                (o: any) => o.btt_permission_advantages_bridge_id
              );

            assignPermission.mutate(assignPer, {
              onSuccess: (result: any) => {
                if (result.data.is_success || result.data.success) {
                  navigate("/roles");
                }
              },
            });
          }
        },
      });
    } else {
      if (!values.permissions || values.permissions.length === 0)
        return toast.error("Select at least one permission from the list!");
      const obj: TAddBtt = {
        basic_info: {
          name: values.roleName,
          type: "backend_roles",
          is_global: true,
          boost_type: "staff",
          is_asset: false,
          graph_relation: false,
        },
      };
      addBtt.mutate(obj, {
        onSuccess: (res) => {
          if (res.data.is_success) {
            const permission = values.permissions
              ? values.permissions.map((p: any) => ({
                  id: p.id,
                  value: "true",
                }))
              : [];
            assignPermission.mutate(
              {
                assign_data: { btt_id: res.data.result.id, data: permission },
              },
              {
                onSuccess: (result: any) => {
                  if (result.data.is_success || result.data.success) {
                    navigate("/roles");
                  }
                },
              }
            );
          }
        },
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom pt-2 pb-2">
        <CardTitle tag="h4" className="d-flex">
          {id ? "Edit Role" : "Add Role"}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <FormWrapper
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={addRoleValidation}
          enableReinitialize
        >
          {({ values, setFieldValue }: FormikProps<any>) =>
            getRole.isLoading ? (
              <LoadingData wrapperStyle="my-5 py-3" />
            ) : (
              <>
                <RowWrappers sm={6} md={4}>
                  <InputText
                    name="roleName"
                    placeholder="Name ..."
                    label={"Role Name"}
                    id="roleName"
                    noColor
                    // wrapperClassName="mb-1"
                  />
                </RowWrappers>

                <RowWrappers sm={12} md={8}>
                  <SelectOption
                    name="permissions"
                    placeholder="Please choose from list ..."
                    label={"Permissions"}
                    id="permissions"
                    options={[]}
                    // value=]}
                    isMulti
                    onChange={(opt: any, action) => {
                      // console.log(action.action);
                      if (action.action === "remove-value") {
                        const removeVal = action.removedValue;
                        //console.log("action", removeVal);
                        let cur = [...values["permissions"]];
                        cur = cur.filter((f) => f.id !== removeVal.id);
                        if (removeVal && removeVal.isServer) {
                          setFieldValue("permissions", [
                            ...cur,
                            { ...removeVal, isRemove: true },
                          ]);
                        } else setFieldValue("permissions", [...opt]);
                      } else setFieldValue("permissions", [...opt]);
                    }}
                    isOutline2
                    value={
                      values["permissions"]
                        ? values["permissions"].filter((f: any) =>
                            f.isServer ? !f.isRemove : true
                          )
                        : null
                    }
                    wrapperClassName="mb-1"
                    myComponents={{
                      DropdownIndicator: () => <></>,
                      MenuList: () => <></>,
                      Menu: () => <></>,
                      ClearIndicator: () => <></>,
                    }}
                  />
                </RowWrappers>

                <RowWrappers sm={12} md={8}>
                  <ListTableSelectField
                    name="permissions"
                    rows={permissions}
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
                          onClick={() => onSearchFilter(values)}
                        >
                          <Search size={16} /> Search
                        </RippleButton>
                      </div>
                    }
                  />
                </RowWrappers>

                <SubmitButton
                  color="info"
                  type="submit"
                  className="ms-auto me-0 d-block"
                  isLoading={
                    assignPermission.isLoading ||
                    addBtt.isLoading ||
                    editBtt.isLoading
                  }
                  schema={addRoleValidation}
                >
                  Save
                </SubmitButton>
              </>
            )
          }
        </FormWrapper>
      </CardBody>
    </Card>
  );
};

export { AddRole };
