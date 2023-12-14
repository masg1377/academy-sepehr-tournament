import { InputText } from "@src/components/common/form/common/InputText/InputText";
import React, { useState } from "react";
import { Copy, Edit, FileText, MoreVertical, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Standard name",
    width: "500px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
    cell: (row: any) => {
      console.log(row);
      return (
        <InputText
          type="text"
          name={`items[${row.row_id - 1}].propertyTitle`}
          placeholder="Property title"
          id={`items[${row.row_id - 1}].propertyTitle`}
          customeLabelClass="searchFilterLabelGeneral"
          noColor
        />
      );
    },
  },
  {
    name: "Translation",
    width: "500px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "attribute type",
    width: "500px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  // {
  //   name: "Usecase",
  //   minWidth: "150px",
  //   sortable: (row: any) => row.usecase,
  //   selector: (row: any) => row.usecase,
  // },
  // {
  //   name: "Language id",
  //   sortable: true,
  //   minWidth: "80px",
  //   selector: (row: any) => row.id,
  // },
  // {
  //   name: "Language",
  //   minWidth: "160px",
  //   selector: (row: any) => row.language,
  // },

  // {
  //   name: "Version",
  //   sortable: true,
  //   minWidth: "140px",
  //   selector: (row: any) => row.version,
  // },
  // {
  //   name: "Modified by",
  //   sortable: true,
  //   width: "125px",
  //   selector: (row: any) => row.modified_by,
  // },
  // // {
  // //   name: "Payments",
  // //   sortable: true,
  // //   minWidth: "140px",
  // //   selector: (row: any) => row.payments,
  // // },
  // // {
  // //   name: "Benefit",
  // //   sortable: true,
  // //   width: "125px",
  // //   selector: (row: any) => row.benefit,
  // //   cell: (row: any) => {
  // //     return (
  // //       <div className="d-flex justify-content-center  align-items-center">
  // //         <div className="user-info text-truncate ">
  // //           <small>{row.benefit}</small>
  // //         </div>
  // //         <ChevronUp size={15} color="#21c44c" />
  // //       </div>
  // //     );
  // //   },
  // // },
  // // {
  // //   name: "Handler",
  // //   minWidth: "140px",
  // //   sortable: (row: any) => row.handler,
  // //   selector: (row: any) => row.handler,
  // //   // cell: (row: any) => {
  // //   //   return (
  // //   //     <Badge color={status[row.status].color} pill>
  // //   //       {status[row.status].title}
  // //   //     </Badge>
  // //   //   );
  // //   // },
  // // },
  // {
  //   name: "Creation Date",
  //   minWidth: "150px",
  //   sortable: (row: any) => row.creation_date,
  //   selector: (row: any) => row.creation_date,
  // },
  // {
  //   name: "Status",
  //   width: "115px",
  //   sortable: (row: any) => row.status,
  //   selector: (row: any) => row.status,
  //   cell: (row: any) => {
  //     return (
  //       <Badge color={row.status ? "light-success" : "light-danger"} pill>
  //         {row.status ? "Published" : "Inactive"}
  //       </Badge>
  //     );
  //   },
  // },
];
