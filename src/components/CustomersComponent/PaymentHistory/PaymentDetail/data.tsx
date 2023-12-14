import { Avatar } from "@src/components/common/avatar";
import { DollarSign, Check } from "react-feather";

import { useNavigate } from "react-router-dom";
import { RippleButton } from "@src/components/common/ripple-button";

// ** Vars

export const customStyles = {
  cells: {
    style: {
      //minHeight: "100px",
      paddingLeft: "15px !important",
      paddingRight: "px",
      color: "#2e2e33",
      fontWeight: "600",
    },
  },
  headCells: {
    style: {
      paddingLeft: "6px !important",
    },
  },
};

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

export const columns: any = [
  {
    name: "",
    width: "40px",
    //sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
    cell: (row: any) => {
      return <div>{row.row_id}</div>;
    },
  },
  {
    name: "Final invoice",
    minWidth: "500px",
    //sortable: (row: any) => row.id,
    selector: (row: any) => row.name,
    cell: (row: any) => {
      return <div>{row?.package?.name ? row?.package?.name : "Not Set"}</div>;
    },
  },
  {
    name: "QTY",
    width: "150px",
    //sortable: (row: any) => row.id,
    selector: (row: any) => row.quantity,
    cell: (row: any) => {
      return <div>{row.quantity ? row?.quantity : "-"}</div>;
    },
  },
  {
    name: "Unit price",
    width: "150px",
    //sortable: (row: any) => row.id,
    selector: (row: any) => row.price_befor_discount,
    cell: (row: any) => {
      return (
        <div>
          {row.price_befor_discount
            ? row?.price_befor_discount / 100 + "$"
            : "-"}
        </div>
      );
    },
  },
  {
    name: "Discount amount",
    width: "190px",
    //sortable: (row: any) => row.id,
    selector: (row: any) => row.price_discount,
    cell: (row: any) => {
      return <div>{row.price_discount ? row?.price_discount + "%" : "-"}</div>;
    },
  },
  {
    name: "Amount",
    width: "210px",
    //sortable: (row: any) => "",
    selector: (row: any) => row.selected_unit_amount,
    cell: (row: any) => {
      return (
        <div className="">
          {row.selected_unit_amount
            ? row?.selected_unit_amount / 100 + "$"
            : "-"}
        </div>
      );
    },
  },
];
