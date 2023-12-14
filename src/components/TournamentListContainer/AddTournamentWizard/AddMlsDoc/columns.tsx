import { Download, Edit } from "react-feather";
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
    name: "Document Name",
    sortable: false,
    minWidth: "190px",
    selector: (row: any) => row.name,
    cell: (row: any) => (
      <div className="d-flex gap-1">
        <Download
          size={18}
          className="cursor-pointer"
          onClick={() => {
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.download = row.name;
            a.href = row.url;
            a.target = "_blank";
            a.click();
          }}
        />{" "}
        <span>{row.name}</span>
      </div>
    ),
  },
  {
    name: "Document Type",
    width: "190px",
    // sortable: (row: any) => row.platform,
    selector: (row: any) => row.document_type,
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
