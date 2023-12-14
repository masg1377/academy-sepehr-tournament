export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Name",
    minWidth: "180px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name,
  },
];
