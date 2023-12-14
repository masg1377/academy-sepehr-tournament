export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Name",
    width: "300px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name,
  },
  {
    name: "Type",
    width: "140px",
    sortable: (row: any) => row.type,
    selector: (row: any) => row.type,
  },
  {
    name: "Location",
    minWidth: "180px",
    sortable: (row: any) => row.location,
    selector: (row: any) => row.location,
  },
];
