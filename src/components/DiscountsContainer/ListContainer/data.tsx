import React from "react";
import { Avatar } from "@src/components/common/avatar";
import {
  Activity,
  Archive,
  ArrowUp,
  ChevronUp,
  Delete,
  Edit,
  Edit2,
  FileText,
  MoreVertical,
  Trash,
  Triangle,
} from "react-feather";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { useRemoveDiscount } from "@src/core/services/api/discount/discount.api";
import { useDispatch } from "react-redux";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import { CustomTooltip } from "@src/components/common/tooltip";
import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";

// ** Vars

const status: any = [
  { title: "Active", color: "light-success" },
  { title: "Expired", color: "light-danger" },
];

const states: any = [
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "primary",
  "secondary",
];
export const data = [
  {
    name: "Treb",
    covered_packages: [
      { label: "IDX", id: 1 },
      { id: 2, label: "RETS" },
    ],
    covered_BTT: [
      { label: "IDX", id: 1 },
      { id: 2, label: "RETS" },
    ],
    percent_off: "12%",
    duration: "forever",
    max_redemptions: "50",
    expiry_date: "11/20/2021",
    id: 1,
    status: 2,
  },
  {
    name: "Trebb",
    covered_packages: [
      { label: "IDX", id: 1 },
      { id: 2, label: "RETS" },
    ],
    covered_BTT: [
      { label: "IDX", id: 1 },
      { id: 2, label: "RETS" },
    ],
    percent_off: "12%",
    duration: "forever",
    max_redemptions: "50",
    expiry_date: "11/20/2021",
    id: 2,
    status: 1,
  },
];
export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Name",
    minWidth: "170px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name,
    cell: (row: any) => (
      <>
        <CustomTooltip placement="bottom" target={"discountName" + row.id}>
          {row.name}
        </CustomTooltip>
        <span
          id={"discountName" + row.id}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.name}
        </span>
      </>
    ),
  },
  {
    name: "Discount id",
    sortable: true,
    minWidth: "150px",
    selector: (row: any) => row.id,
  },
  {
    name: "Covered packages",
    minWidth: "210px",
    selector: (row: any) => row.coverage_packages,
    // sortable: (row: any) => row.covered_packages,
    cell: (row: any) => {
      const covered_package = row.coverage_packages;
      return (
        <div className="d-flex justify-content-center  align-items-center">
          {covered_package && covered_package.length > 0 ? (
            <React.Fragment>
              <Badge
                color="light"
                className="text-secondary text-truncate"
                style={{ marginRight: 5, marginBottom: 5, maxWidth: 125 }}
              >
                {covered_package[0].name}
              </Badge>
              {covered_package.length > 1 && (
                <Badge pill color="primary">
                  {`${"+"}${covered_package.length - 1}`}
                </Badge>
              )}
            </React.Fragment>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    name: "Covered BTT",
    minWidth: "210px",
    selector: (row: any) => row.coverage_btts,
    cell: (row: any) => {
      const coverage_btts = row.coverage_btts;
      return (
        <div className="d-flex justify-content-center  align-items-center">
          {coverage_btts && coverage_btts.length > 0 ? (
            <React.Fragment>
              <Badge
                color="light"
                className="text-secondary text-truncate"
                style={{ marginRight: 5, marginBottom: 5, maxWidth: 125 }}
              >
                {coverage_btts[0].name}
              </Badge>
              {coverage_btts.length > 1 && (
                <Badge pill color="primary">
                  {`${"+"}${coverage_btts.length - 1}`}
                </Badge>
              )}
            </React.Fragment>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    name: "Percent off",
    // sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.percent_off,
    cell: (row: any) => <>{row.percent_off}%</>,
  },
  // {
  //   name: "Duration",
  //   // sortable: true,
  //   width: "145px",
  //   selector: (row: any) => row.duration,
  //   cell: (row: any) => (
  //     <>
  //       {row.duration === 1
  //         ? "Forever"
  //         : row.duration === 2
  //         ? "Once"
  //         : "Repeating"}
  //     </>
  //   ),
  // },
  {
    name: "Max Redemptions",
    minWidth: "200px",
    // sortable: (row: any) => row.max_redemptions,
    selector: (row: any) => row.max_redemptions,
    // cell: (row: any) => {
    //   return (
    //     <Badge color={status[row.status].color} pill>
    //       {status[row.status].title}
    //     </Badge>
    //   );
    // },
  },
  {
    name: "Expiry Date",
    minWidth: "170px",
    sortable: (row: any) => row.expiry_date,
    selector: (row: any) => row.expiry_date,
    cell: (row: any) => {
      return <span>{getCustomDate(row.expiry_date)}</span>;
    },
  },
  {
    name: "Status",
    width: "115px",
    sortable: (row: any) => row.valid,
    selector: (row: any) => row.valid,
    cell: (row: any) => {
      return (
        <Badge color={row.valid ? status[0].color : status[1].color} pill>
          {row.valid ? status[0].title : status[1].title}
        </Badge>
      );
    },
  },
  {
    name: "Actions",
    width: "110px",
    allowOverflow: true,
    cell: (row: any) => {
      const navigate = useNavigate();

      const remove = useRemoveDiscount();

      const dispatch = useDispatch();

      const onRemove = () => {
        showQuestionAlert(
          "Are you sure?",
          "Delete the discount?",
          (val) => {},
          "Yes",
          true,
          true,
          async (val) => {
            try {
              const result = await remove.mutateAsync({
                id: row.id,
                confirm_delete_covered_items: true,
              });
              if (result.data.is_success) {
                showSuccessAlert(
                  "Success!",
                  "Discount removed!",
                  () => {
                    dispatch(handleRefresh("discount"));
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
            } catch (error) {
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
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenuPortal>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/discounts-list/detail/" + row.id);
                }}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove();
                }}
              >
                <Delete size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenuPortal>
            <Edit
              size={15}
              onClick={(e) => {
                e.preventDefault();
                navigate("/discounts-list/edit/" + row.id);
              }}
            />
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
