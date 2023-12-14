import { Avatar } from "@src/components/common/avatar";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
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
import { useNavigate } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { CustomTooltip } from "../common/tooltip";

// ** Vars

export const requestStatus: any = {
  "in progress": { title: "In Progress", color: "light-primary" },
  active: { title: "Active", color: "light-success" },
  rejected: { title: "Rejected", color: "light-danger" },
  pending: { title: "Pending", color: "light-warning" },
  canceled: { title: "Canceled", color: "light-secondary" },
};

export const data = [
  {
    mls: "Treb",
    feedtype: "IDX, RETS",
    source: "realtyna.com",
    requestId: "Rqs-122-45689",
    clientToken: "***************6BvQ",
    last_payments: "13 Jun 2021",
    id: 1,
    handler: "Natan",
    date: "11/20/2021",
    ticketOnRets: "Txe-122-45689",
    salary: "$23896.35",
    start_date: "09/23/2016",
    status: 2,
  },
  {
    mls: "Treb",
    feedtype: "IDX, RETS",
    source: "realtyna.com",
    requestId: "Rqs-122-45689",
    clientToken: "***************6BvQ",
    last_payments: "13 Jun 2021",
    id: 2,
    handler: "Natan",
    date: "11/20/2021",
    ticketOnRets: "Txe-122-45689",
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
    name: "MLS",
    minWidth: "150px",
    selector: (row: any) => row.mls_name,
    cell: (row: any) => (
      <>
        <CustomTooltip placement="bottom" target={"mlsName" + row.id}>
          {row.mls_name}
        </CustomTooltip>
        <span
          id={"mlsName" + row.id}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.mls_name}
        </span>
      </>
    ),
  },

  {
    name: "Request id",
    sortable: true,
    minWidth: "130px",
    selector: (row: any) => row.id,
  },
  // {
  //   name: "Feedtype",
  //   sortable: true,
  //   minWidth: "140px",
  //   selector: (row: any) => row.feedtype,
  // },
  {
    name: "Source",
    sortable: true,
    width: "215px",
    selector: (row: any) => (row.client_source ? row.client_source : "-"),
  },
  // {
  //   name: "Request id",
  //   sortable: true,
  //   minWidth: "140px",
  //   selector: (row: any) => row.requestId,
  // },
  // {
  //   name: "Client token",
  //   sortable: true,
  //   width: "175px",
  //   selector: (row: any) => row.clientToken,
  // },
  {
    name: "Handler",
    minWidth: "140px",
    sortable: (row: any) => row.handler_name,
    selector: (row: any) => (row.handler_name ? row.handler_name : "-"),
    // cell: (row: any) => {
    //   return (
    //     <Badge color={status[row.status].color} pill>
    //       {status[row.status].title}
    //     </Badge>
    //   );
    // },
  },
  {
    name: "Date",
    minWidth: "140px",
    sortable: (row: any) => row.creation_date,
    selector: (row: any) => row.creation_date,
    cell: (row: any) => (
      <span>{row.creation_date ? getCustomDate(row.creation_date) : "-"}</span>
    ),
  },
  {
    name: "Ticket on RETS",
    minWidth: "160px",
    // sortable: (row: any) => row.ticketOnRets,
    selector: (row: any) => (row.ticket_number ? row.ticket_number : "-"),
  },

  {
    name: "Status",
    width: "115px",
    sortable: (row: any) => row.status,
    selector: (row: any) => row.status,
    cell: (row: any) => {
      return (
        <Badge color={requestStatus[row.status?.toLowerCase()]?.color} pill>
          {requestStatus[row.status?.toLowerCase()]?.title}
        </Badge>
      );
    },
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row: any) => {
      const navigate = useNavigate();
      return (
        <div className="d-flex">
          <FileText
            size={16}
            onClick={() => navigate("/alerts/" + row.id)}
            className="cursor-pointer me-1"
          />
          <Edit size={16} onClick={() => navigate("/alerts/edit/" + row.id)} />
        </div>
      );
    },
  },
];
