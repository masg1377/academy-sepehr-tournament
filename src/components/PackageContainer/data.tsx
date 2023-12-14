import React from "react";
import { Avatar } from "@src/components/common/avatar";
import { useDeletePackage } from "@src/core/services/api/package/package.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import {
  Activity,
  Archive,
  ArrowUp,
  ChevronUp,
  Edit,
  FileText,
  MoreVertical,
  Trash,
  Triangle,
} from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  packagePaymentTypeNumber,
  packageGetTypeData,
  packageGetRelatedToData,
} from "@src/core/data/package.data";
import DropdownMenuPortal from "../common/DropdownMenuPortal";

// ** Vars

const status: any = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Active", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

export const data = [
  {
    abbreviated: "Treb",
    feedtype: "IDX, RETS",
    clients: "125",
    payments: "$8,400",
    benefit: "50%",
    last_payments: "13 Jun 2021",
    id: 1,
    handler: "Natan",
    last_log_date: "Today",
    salary: "$23896.35",
    start_date: "09/23/2016",
    status: 2,
  },
  {
    abbreviated: "Treb",
    feedtype: "IDX, RETS",
    clients: "125",
    payments: "$8,400",
    benefit: "50%",
    last_payments: "13 Jun 2021",
    id: 2,
    handler: "Natan",
    last_log_date: "Today",
    salary: "$23896.35",
    start_date: "09/23/2016",
    status: 2,
  },
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

export const columns: any = [
  {
    name: "#",
    width: "70px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Name",
    minWidth: "190px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name,
  },
  {
    name: "Package id",
    sortable: true,
    minWidth: "150px",
    selector: (row: any) => row.id,
  },
  {
    name: "Price",
    sortable: true,
    minWidth: "150px",
    selector: (row: any) => row.price,
    cell: (row: any) => {
      let allPayment = row.payment_methods;
      return (
        <div className="text-truncate">
          {allPayment && allPayment.length === 1
            ? allPayment[0]?.type === 1
              ? `$${allPayment[0]?.unit_amount / 100}`
              : `$${allPayment[0]?.unit_amount / 100}${" / "}${
                  allPayment[0]?.recurring_interval
                    ? allPayment[0]?.recurring_interval
                        .slice(0, 1)
                        .toUpperCase()
                    : "-"
                }`
            : allPayment && allPayment.length > 1
            ? allPayment.some(
                (item: any) => item?.recurring_interval === "month"
              )
              ? "$" +
                allPayment.find((it: any) => it.recurring_interval === "month")
                  ?.unit_amount /
                  100 +
                " / M"
              : `$${allPayment[0]?.unit_amount / 100}${" / "}${
                  allPayment[0]?.recurring_interval
                    ? allPayment[0]?.recurring_interval
                        .slice(0, 1)
                        .toUpperCase()
                    : "-"
                }`
            : "-"}
          {/* ${row.price ? row.price / 100 : "-"} */}
        </div>
      );
    },
  },
  {
    name: "Payment",
    //sortable: true,
    minWidth: "130px",
    selector: (row: any) => row.payment_type,
    cell: (row: any) => {
      let allPayment = row.payment_methods;
      const types = packagePaymentTypeNumber;
      let currentType = types.filter((i) => i.value === row.payment_type);
      return (
        <div className="text-truncate">
          {allPayment && allPayment[0]
            ? allPayment[0].type === 1
              ? "One Time"
              : "Recurring"
            : "-"}
          {/* {row.payment_type && currentType[0] ? currentType[0].label : "-"} */}
        </div>
      );
    },
  },
  {
    name: "Type",
    sortable: true,
    minWidth: "180px",
    selector: (row: any) => row.type,
    cell: (row: any) => {
      const types = packageGetTypeData;
      let currentType = types.filter((i) => i.value === row.type);
      return (
        <div className="text-truncate">
          {row.type && currentType[0] ? currentType[0].label : "-"}
        </div>
      );
    },
  },
  {
    name: "Related To",
    sortable: true,
    minWidth: "180px",
    selector: (row: any) => row.related_to,
    cell: (row: any) => {
      const types = packageGetRelatedToData;
      let currentType = types.filter((i) => i.value === row.related_to);
      return (
        <div className="text-truncate">
          {row.related_to && currentType[0] ? currentType[0].label : "-"}
        </div>
      );
    },
  },
  // {
  //   name: "Feedtype",
  //   sortable: true,
  //   minWidth: "140px",
  //   selector: (row: any) => row.feed_type,
  //   cell: (row: any) => {
  //     return (
  //       <div className="d-flex">{row.feed_type ? row.feed_type : "-"}</div>
  //     );
  //   },
  // },
  // {
  //   name: "Clients",
  //   sortable: true,
  //   width: "125px",
  //   selector: (row: any) => row.clients,
  // },
  // {
  //   name: "Payments",
  //   sortable: true,
  //   minWidth: "140px",
  //   selector: (row: any) => row.payments,
  // },
  // {
  //   name: "Benefit",
  //   sortable: true,
  //   width: "125px",
  //   selector: (row: any) => row.benefit,
  //   cell: (row: any) => {
  //     return (
  //       <div className="d-flex justify-content-center  align-items-center">
  //         <div className="user-info text-truncate ">
  //           <small>{row.benefit}</small>
  //         </div>
  //         <ChevronUp size={15} color="#21c44c" />
  //       </div>
  //     );
  //   },
  // },

  // {
  //   name: "Usage Plan",
  //   minWidth: "180px",
  //   sortable: (row: any) => row.usage_plane_name,
  //   selector: (row: any) => row.usage_plane_name,
  //   cell: (row: any) => {
  //     return (
  //       <div className="d-flex">
  //         {row.usage_plane_name ? row.usage_plane_name : "-"}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   name: "Tax Code",
  //   minWidth: "150px",
  //   sortable: (row: any) => row.tax_code,
  //   selector: (row: any) => row.tax_code,
  // },
  // {
  //   name: "Location",
  //   minWidth: "140px",
  //   sortable: (row: any) => row.location_name,
  //   selector: (row: any) => row.location_name,
  // },
  {
    name: "Location",
    sortable: true,
    minWidth: "170px",
    selector: (row: any) => row.locations,
    cell: (row: any) => {
      const locations = row.locations;
      return (
        <div className="d-flex justify-content-center  align-items-center">
          {locations && locations.length > 0 ? (
            <React.Fragment>
              <span style={{ marginRight: "3px" }}>{locations[0].name}</span>
              {locations.length > 1 && (
                <Badge pill color="primary">
                  {`${"+"}${locations.length - 1}`}
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
  // {
  //   name: "Last log date",
  //   minWidth: "170px",
  //   sortable: (row: any) => row.modification_date,
  //   selector: (row: any) => row.modification_date,
  //   cell: (row: any) => {
  //     // const navigate = useNavigate();
  //     return (
  //       <div className="d-flex">{getCustomDate(row.modification_date)}</div>
  //     );
  //   },
  // },
  {
    name: "Creation Date",
    sortable: true,
    minWidth: "190px",
    selector: (row: any) => row.creation_date,
    cell: (row: any) => {
      return <span>{getCustomDate(row.creation_date)}</span>;
    },
  },
  // {
  //   name: "Status",
  //   width: "125px",
  //   sortable: (row: any) => row.status,
  //   selector: (row: any) => row.status,
  //   cell: (row: any) => {
  //     return (
  //       // color={status[row.status].color} pill>
  //       <Badge color={row.published ? "light-success" : "light-danger"} pill>
  //         {row.published ? "Published" : "Unpublished"}
  //       </Badge>
  //     );
  //   },
  // },
  {
    name: "Status",
    width: "125px",
    sortable: (row: any) => row.published,
    selector: (row: any) => row.published,
    cell: (row: any) => {
      return (
        // color={status[row.status].color} pill>
        <Badge color={row.published ? "light-success" : "light-danger"} pill>
          {row.published ? "Published" : "Unpublished"}
        </Badge>
      );
    },
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row: any) => {
      const navigate = useNavigate();

      const remove = useDeletePackage();

      const dispatch = useDispatch();

      const onRemove = (idDoc: number) => {
        showQuestionAlert(
          "Are you sure?",
          "Delete the package?",
          (val) => {},
          "Yes",
          true,
          true,
          async (val) => {
            try {
              const result = await remove.mutateAsync({
                id: idDoc,
              });
              if (result.data.is_success) {
                showSuccessAlert(
                  "Success!",
                  "Package removed!",
                  () => {
                    dispatch(handleRefresh("packages"));
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
                  navigate("/packages/" + row.id);
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
                  navigate("/packages/duplicate/" + row.id);
                }}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Duplicate</span>
              </DropdownItem>

              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(+row.id);
                }}
              >
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenuPortal>
          </UncontrolledDropdown>
          <Edit
            size={15}
            onClick={(e) => {
              e.preventDefault();
              navigate("/packages/edit/" + row.id);
            }}
          />
        </div>
      );
    },
  },
];
