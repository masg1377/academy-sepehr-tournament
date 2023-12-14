import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { Copy, Edit, Grid, MoreVertical, Trash2 } from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Typography } from "../common/Typography";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { useDeleteUsagePlan } from "@src/core/services/api/usage-plan/usage-plan.api";

export const usagePlanColumns: any = [
  {
    name: "#",
    width: "50px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Usage ID",
    minWidth: "120px",
    // sortable: (row: any) => row.usageId,
    selector: (row: any) => row.id,
  },
  {
    name: "Name",
    minWidth: "120px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name || "-",
  },
  {
    name: "Package Name",
    sortable: true,
    minWidth: "120px",
    selector: (row: any) => (row.package_name ? row.package_name : "-"),
  },
  {
    name: "API Gateway ID",
    minWidth: "120px",
    selector: (row: any) => row.api_gateway_id,
  },
  {
    name: "Gateway usage plan ID",
    minWidth: "120px",
    selector: (row: any) => row.gateway_usage_plan_id || "-",
  },
  {
    name: "Quota Limit",
    sortable: true,
    minWidth: "120px",
    selector: (row: any) => row.quota_limit || "-",
  },
  {
    name: "Base fee",
    sortable: true,
    minWidth: "120px",
    selector: (row: any) =>
      row.base_fee ? +(+row.base_fee / 100).toFixed(2) : "-",
  },
  {
    name: "Extra Call fee",
    sortable: true,
    minWidth: "120px",
    selector: (row: any) => row.extra_call_fee || "-",
  },
  {
    name: "Modification Date",
    sortable: true,
    minWidth: "120px",
    selector: (row: any) =>
      row.modification_date ? getCustomDate(row.modification_date) : "-",
  },
  {
    name: <Grid size={15} />,
    sortable: true,
    minWidth: "50px",
    // selector: (row: any) => row.modificationDate
    cell: (row: any) => {
      const navigate = useNavigate();
      const deletePlan = useDeleteUsagePlan();
      const onRemove = () => {
        showQuestionAlert(
          "Are you sure?",
          "Delete the plan?",
          (val: any) => {},
          "Yes",
          true,
          true,
          async (val) => {
            const result = await deletePlan.mutateAsync({
              data: { usage_plans: [{ id: row.id }] },
            });
            if (result.data.is_success) {
              showSuccessAlert(
                "Success!",
                "Usage plan removed!",
                () => {
                  row.setRefetch((old: boolean) => !old);
                },
                "Ok"
              );
              return result.data.is_success;
            } else {
              showErrorAlert(
                "Error!",
                "Something went wrong!",
                undefined,
                "Ok"
              );
            }
          }
        );
      };
      return (
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu className="w-100">
            <DropdownItem
              tag="a"
              href={"/"}
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                navigate("/edit-usage-plan/:" + row.id);
              }}
            >
              <Edit size={15} color="#a4a6a6" />
              <span
                className="align-middle ms-50"
                style={{ color: "#7d7f80b3" }}
              >
                Edit
              </span>
            </DropdownItem>
            <DropdownItem tag="a" href={"/"} className="w-100">
              <Copy size={15} color="#a4a6a6" />
              <span
                className="align-middle ms-50"
                style={{ color: "#7d7f80b3" }}
              >
                Duplicate
              </span>
            </DropdownItem>
            <DropdownItem tag="a" href={"/"} className="w-100">
              <Trash2 size={15} color="#a4a6a6" />
              <span
                className="align-middle ms-50"
                style={{ color: "#7d7f80b3" }}
                onClick={(e) => {
                  e.preventDefault();
                  onRemove();
                }}
              >
                Delete
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    },
  },
];
