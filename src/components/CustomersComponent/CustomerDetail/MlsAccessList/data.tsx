import { useDeletePackage } from "@src/core/services/api/package/package.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import {
  Edit,
  FileText,
  MoreVertical,
  Trash,
  Triangle,
  File,
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
  invoiceTypeNumber,
  requestStatusTypesString,
} from "@src/core/data/mls.data";
import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";
// ** Vars

const status: any = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Active", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

const states: any = [
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "primary",
  "secondary",
];

export const Columns: any = [
  {
    name: "#",
    width: "80px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "MLS",
    width: "170px",
    sortable: (row: any) => row.mls_name,
    selector: (row: any) => row.mls_name,
    cell: (row: any) => {
      return (
        <div className="text-truncate">{row.mls_name ? row.mls_name : "-"}</div>
      );
    },
  },
  {
    name: "Feed Type",
    minWidth: "150px",
    sortable: (row: any) => row.receipt_number,
    selector: (row: any) => row.receipt_number,
    cell: (row: any) => {
      return (
        <div className="">
          {row.receipt_number ? "#" + row.receipt_number : "-"}
        </div>
      );
    },
  },
  {
    name: "Contract Type",
    minWidth: "190px",
    sortable: (row: any) => row.amount_paid,
    selector: (row: any) => row.amount_paid,
    cell: (row: any) => {
      return (
        <div className="d-flex text-truncate">
          {row.amount_paid ? row.amount_paid + " $" : "-"}
        </div>
      );
    },
  },
  {
    name: "Request Id",
    minWidth: "160px",
    sortable: (row: any) => row.id,
    selector: (row: any) => row.id,
    cell: (row: any) => {
      return (
        <div className="d-flex text-truncate">{row.id ? row.id : "-"}</div>
      );
    },
  },
  {
    name: "Handler",
    minWidth: "185px",
    sortable: (row: any) => row.handler_name,
    selector: (row: any) => row.handler_name,
    cell: (row: any) => {
      return (
        <div className="d-flex text-truncate">
          {row.handler_name ? row.handler_name : "-"}
        </div>
      );
    },
  },
  {
    name: "Date",
    minWidth: "130px",
    sortable: (row: any) => row.creation_date,
    selector: (row: any) => row.creation_date,
    cell: (row: any) => {
      return <div className="d-flex">{getCustomDate(row.creation_date)}</div>;
    },
  },
  {
    name: "Status",
    minWidth: "115px",
    sortable: (row: any) => row.status,
    selector: (row: any) => row.status,
    cell: (row: any) => {
      const types = requestStatusTypesString;
      let currentType = types.filter((i) => i.value === row.status);
      return (
        <Badge color={row.status && currentType[0] && currentType[0]?.color}>
          {row.status && currentType[0] ? currentType[0].label : "-"}
        </Badge>
      );
    },
  },
  {
    name: <Edit size={17} />,
    allowOverflow: true,
    cell: (row: any) => {
      const navigate = useNavigate();

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
                  navigate("/alerts/" + row.id);
                }}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              {/* <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(+row.id);
                }}
              >
                <Trash size={15} />
                <span className="align-middle ms-50">Remove</span>
              </DropdownItem> */}
            </DropdownMenuPortal>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
