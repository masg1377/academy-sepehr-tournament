import React from "react";
import { useRemoveMls } from "@src/core/services/api/mls/mls.api";
import { useDeletePlatform } from "@src/core/services/api/platform/platform.api";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import { Edit, FileText, MoreVertical, Trash } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { CustomTooltip } from "../common/tooltip";

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
  {
    abbreviated: "Treb",
    feedtype: "IDX, RETS",
    clients: "125",
    payments: "$8,400",
    benefit: "50%",
    last_payments: "13 Jun 2021",
    id: 3,
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
    id: 4,
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
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "abbreviated",
    minWidth: "170px",
    sortable: (row: any) => row.short_name,
    selector: (row: any) => row.short_name,
    cell: (row: any) => (
      <>
        <CustomTooltip placement="bottom" target={"mlsShortName" + row.id}>
          {row.short_name}
        </CustomTooltip>
        <span
          id={"mlsShortName" + row.id}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.short_name}
        </span>
      </>
    ),
  },
  {
    name: "MLS id",
    sortable: true,
    minWidth: "80px",
    selector: (row: any) => row.id,
  },
  {
    name: "Feed Type",
    minWidth: "210px",
    selector: (row: any) => row.feed_types,
    cell: (row: any) => {
      const feed_types = row.feed_types;
      return (
        <div className="d-flex justify-content-center  align-items-center">
          {feed_types && feed_types[0] !== null && feed_types.length > 0 ? (
            <React.Fragment>
              <Badge
                color="light"
                className="text-secondary text-truncate"
                style={{ marginRight: 5, marginBottom: 5, maxWidth: 125 }}
              >
                {feed_types[0]?.feed_type}
              </Badge>
              {feed_types?.length > 1 && (
                <Badge pill color="primary">
                  {`${"+"}${feed_types.length - 1}`}
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
    name: "Report Interval",
    sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.report_interval,
  },
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
  //   name: "Handler",
  //   minWidth: "140px",
  //   sortable: (row: any) => row.handler,
  //   selector: (row: any) => row.handler,
  //   // cell: (row: any) => {
  //   //   return (
  //   //     <Badge color={status[row.status].color} pill>
  //   //       {status[row.status].title}
  //   //     </Badge>
  //   //   );
  //   // },
  // },
  {
    name: "Last log date",
    minWidth: "150px",
    sortable: (row: any) => row.last_log_date,
    selector: (row: any) => row.last_log_date,
  },
  {
    name: "Status",
    width: "115px",
    sortable: (row: any) => row.status,
    selector: (row: any) => row.status,
    cell: (row: any) => {
      return (
        <Badge color={row.status ? "light-success" : "light-danger"} pill>
          {row.status ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row: any) => {
      const navigate = useNavigate();

      // const dispatch = useDispatch();

      // const remove = useRemoveMls();

      // const onRemove = () => {
      //   showQuestionAlert(
      //     "Are you sure?",
      //     "Delete the MLS?",
      //     (val) => {},
      //     "Yes",
      //     true,
      //     true,
      //     async (val) => {
      //       const result = await remove.mutateAsync({
      //         entity: "mls_server",
      //         data: { id: row.id ? +row.id : 0 },
      //       });
      //       if (result.data.is_success) {
      //         showSuccessAlert(
      //           "Success!",
      //           "MLS removed!",
      //           () => {
      //             dispatch(handleRefresh("mlsServer"));
      //           },
      //           "Ok"
      //         );
      //         return result.data.is_success;
      //       } else {
      //         showErrorAlert(
      //           "Error!",
      //           "Something went wrong!",
      //           undefined,
      //           "Ok"
      //         );
      //       }
      //     }
      //   );
      // };

      return (
        <div className="d-flex">
          {/* <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/mls-list/" + row.id);
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
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          <FileText
            size={15}
            className="me-1"
            onClick={() => navigate("/mls-list/" + row.id)}
          />
          <Edit
            size={15}
            onClick={() => navigate("/mls-list/edit/" + row.id)}
          />
        </div>
      );
    },
  },
];
