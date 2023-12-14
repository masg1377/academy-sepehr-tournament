import { Avatar } from "@src/components/common/avatar";
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
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { RippleButton } from "@src/components/common/ripple-button";

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
    description: "Lorem ipsum dolor sit amet, …",
    periority: "1",
    id: 1,
  },
  {
    description: "Lorem ipsum dolor sit amet, …",
    periority: "2",
    id: 2,
  },
  {
    description: "Lorem ipsum dolor sit amet, …",
    periority: "3",
    id: 3,
  },
  {
    description: "Lorem ipsum dolor sit amet, …",
    periority: "4",
    id: 4,
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
    width: "50px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.id,
  },
  {
    name: "periority",
    minWidth: "140px",
    sortable: (row: any) => row.periority,
    selector: (row: any) => row.periority,
  },

  {
    name: "description",
    sortable: true,
    minWidth: "500px",
    selector: (row: any) => row.description,
  },
  {
    name: "Action",
    minWidth: "115px",
    cell: (row: any) => {
      return (
        <RippleButton type="button" color="link">
          Edit
        </RippleButton>
      );
    },
  },
];
