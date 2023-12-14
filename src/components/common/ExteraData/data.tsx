import { Avatar } from "@src/components/common/avatar";
import {
  Activity,
  Archive,
  ArrowUp,
  ChevronUp,
  Edit,
  Edit2,
  Edit3,
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
    key: "Provider",
    id: 1,
  },
  {
    description: "Lorem ipsum dolor sit amet, …",
    key: "Provider",
    id: 2,
  },
  {
    description: "Lorem ipsum dolor sit amet, …",
    key: "Provider",
    id: 3,
  },
  {
    description: "Lorem ipsum dolor sit amet, …",
    key: "Provider",
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
    name: "key",
    minWidth: "140px",
    sortable: (row: any) => row.key,
    selector: (row: any) => row.key,
  },

  {
    name: "description",
    sortable: true,
    minWidth: "500px",
    selector: (row: any) => row.description,
  },
  // {
  //   name: <Edit3 size={17} />,
  //   minWidth: "115px",
  //   cell: (row: any) => {
  //     return (
  //       <RippleButton type="button" color="link" className="p-0">
  //         Edit
  //       </RippleButton>
  //     );
  //   },
  // },
];
