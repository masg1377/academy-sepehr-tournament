import { Edit } from "react-feather";
import { Badge, Button } from "reactstrap";
import { DeleteCell } from "./DeleteCell";
import { EditCell } from "./EditCell";

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
    width: "100px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Name",
    width: "190px",
    // sortable: (row: any) => row.platform,
    selector: (row: any) => row.name,
  },

  {
    name: "Resource",
    sortable: false,
    minWidth: "250px",
    selector: (row: any) => row.resource,
  },
  {
    name: "Status",
    sortable: false,
    width: "110px",
    selector: (row: any) => row.status,
    cell: (row: any) => {
      return (
        <Badge color={row.status ? "light-success" : "light-danger"} pill>
          {row.status ? "Active" : "Disabled"}
        </Badge>
      );
    },
  },
  {
    name: "",
    // allowOverflow: true,
    width: "135px",
    cell: DeleteCell,
  },
  {
    name: "",
    allowOverflow: false,
    width: "120px",
    cell: EditCell,
  },
];
