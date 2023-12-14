import { useDeletePackage } from "@src/core/services/api/package/package.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import { Edit, FileText, MoreVertical, Trash, Triangle } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { packageGetTypeData } from "@src/core/data/package.data";
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
    width: "70px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Package Name",
    width: "260px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name,
    cell: (row: any) => {
      return <div className="text-truncate">{row.name ? row.name : "-"}</div>;
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
        <div>{row.type && currentType[0] ? currentType[0].label : "-"}</div>
      );
    },
  },
  {
    name: "Payment",
    sortable: true,
    minWidth: "150px",
    selector: (row: any) => row.payment,
    cell: (row: any) => {
      return (
        <div className="d-flex text-truncate">
          {row.payment ? row.payment : "-"}
        </div>
      );
    },
  },

  {
    name: "Date",
    minWidth: "150px",
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
      return (
        // color={status[row.status].color} pill>
        <Badge
          color={
            row.status && row.status.toLowerCase() === "active"
              ? "light-success"
              : "light-warning"
          }
          pill
        >
          {row.status ? row.status : "-"}
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
                  navigate(
                    "/customer-list/package-invoice/" +
                      row.id +
                      "/" +
                      row.userId +
                      "/" +
                      row.name
                  );
                }}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Invoice Details</span>
              </DropdownItem>
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
                <span className="align-middle ms-50">Package Details</span>
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
