import { Grid } from "react-feather";
import DeleteButtonRC from "./DeleteButtonRC";

export const resourceListData = [
  {
    id: 1,
    resourceId: 2523,
    name: "Source #1",
    resource: "Sample #1",
    date: "2022-01-06",
  },
  {
    id: 2,
    resourceId: 4411,
    name: "Source #2",
    resource: "Sample #2",
    date: "2022-03-04",
  },
  {
    id: 3,
    resourceId: 3366,
    name: "Source #3",
    resource: "Sample #3",
    date: "2022-03-04",
  },
  {
    id: 4,
    resourceId: 1252,
    name: "Source #4",
    resource: "Sample #4",
    date: "2022-03-04",
  },
  {
    id: 5,
    resourceId: 9669,
    name: "Source #5",
    resource: "Sample #5",
    date: "2022-03-04",
  },
];

export const resourceListColumns = [
  {
    name: "#",
    width: "50px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.id,
  },
  {
    name: "ID",
    minWidth: "120px",
    // sortable: (row: any) => row.usageId,
    selector: (row: any) => row.resourceId,
  },
  {
    name: "Name",
    minWidth: "120px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name,
  },
  {
    name: "Resources",
    sortable: true,
    minWidth: "120px",
    selector: (row: any) => row.resource,
  },
  {
    name: "Modification Date",
    minWidth: "120px",
    selector: (row: any) => row.date,
  },
  {
    name: <Grid size={15} />,
    minWidth: "120px",
    cell: (row: any) => <DeleteButtonRC id={row.id} />,
  },
];
