import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";
import { Edit, MoreVertical, FileText } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const status: any = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Active", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

export const columns: any = [
  {
    name: "#",
    width: "50px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Platform",
    minWidth: "110px",
    // sortable: (row: any) => row.platform,
    selector: (row: any) => row.platform_name,
  },

  {
    name: "Feedtype/Connection-Type",
    sortable: false,
    minWidth: "100px",
    selector: (row: any) => row.feedtype,
  },
  // {
  //   name: "Connection Type",
  //   sortable: false,
  //   width: "175px",
  //   selector: (row: any) => row.connectionType,
  // },
  {
    name: "Contract Type",
    sortable: false,
    minWidth: "170px",
    selector: (row: any) => row.contract_type,
  },
  {
    name: "Accounting Status",
    sortable: false,
    width: "190px",
    selector: (row: any) => row.accounting_status,
    cell: (row: any) => {
      return (
        <Badge
          color={row.accounting_status ? "light-success" : "light-danger"}
          pill
        >
          {row.accounting_status ? "Active" : "Disable"}
        </Badge>
      );
    },
  },
  {
    name: "Connection Status",
    minWidth: "190px",
    // sortable: (row: any) => row.connectionStatus,
    selector: (row: any) => row.connection_status,
    cell: (row: any) => {
      return (
        <Badge
          color={row.connection_status ? "light-success" : "light-danger"}
          pill
        >
          {row.connection_status ? "Active" : "Disable"}
        </Badge>
      );
    },
  },
  {
    name: "",
    allowOverflow: true,
    cell: (row: any) => {
      const { id } = useParams();
      const navigate = useNavigate();

      return (
        <div className="d-flex align-items-center">
          <Button color="link" onClick={() => row.setEditCellData(row)}>
            Edit
          </Button>
          {row.isDetail && (
            <UncontrolledDropdown>
              <DropdownToggle className="pe-1 cursor-pointer" tag="span">
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenuPortal>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    // onRemove();
                    navigate(`/mls-list/access/${id}/${row.id}`);
                  }}
                >
                  <FileText size={15} />
                  <span className="align-middle ms-50">Detail</span>
                </DropdownItem>
              </DropdownMenuPortal>
            </UncontrolledDropdown>
          )}
        </div>
      );
    },
  },
];
