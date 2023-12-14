import { useState } from "react";
import { useDeletePackage } from "@src/core/services/api/package/package.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import {
  Edit,
  FileText,
  MoreVertical,
  Trash,
  Triangle,
  File,
} from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { invoiceTypeNumber } from "@src/core/data/mls.data";
import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";
// ** Vars

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
    name: "#",
    width: "80px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Invoice",
    minWidth: "190px",
    sortable: (row: any) => row.number,
    selector: (row: any) => row.number,
    cell: (row: any) => {
      return (
        <div className="d-flex text-truncate">
          {row.number ? "#" + row.number : "-"}
        </div>
      );
    },
  },
  {
    name: "Receipt Number",
    minWidth: "220px",
    sortable: (row: any) => row.receipt_number,
    selector: (row: any) => row.receipt_number,
    cell: (row: any) => {
      return (
        <div className="d-flex text-truncate">
          {row.receipt_number ? "#" + row.receipt_number : "-"}
        </div>
      );
    },
  },
  {
    name: "Amount Paid",
    minWidth: "190px",
    sortable: (row: any) => row.amount_paid,
    selector: (row: any) => row.amount_paid,
    cell: (row: any) => {
      return (
        <div className="d-flex text-truncate">
          {row.amount_paid ? row.amount_paid / 100 + " $" : "-"}
        </div>
      );
    },
  },
  {
    name: "Last Update",
    minWidth: "180px",
    sortable: (row: any) => row.status_price_locked_at,
    selector: (row: any) => row.status_price_locked_at,
    cell: (row: any) => {
      return (
        <div className="d-flex">
          {getCustomDate(row.status_price_locked_at)}
        </div>
      );
    },
  },
  {
    name: "Status",
    minWidth: "115px",
    sortable: (row: any) => row.status,
    selector: (row: any) => row.status,
    cell: (row: any) => {
      const types = invoiceTypeNumber;
      let currentType = types.filter((i) => i.value === row.status);
      return (
        <Badge color={currentType[0].color}>
          {row.status && currentType[0] ? currentType[0].label : "-"}
        </Badge>
      );
    },
  },
  {
    name: <Edit size={17} />,
    //minWidth: "100px",
    allowOverflow: true,
    cell: (row: any) => {
      const navigate = useNavigate();

      return (
        <div className="d-flex">
          <a
            style={{ width: "32px", marginRight: "3px" }}
            className=""
            href={
              row.invoice_pdf && row.invoice_pdf !== "" ? row.invoice_pdf : "#"
            }
            target={
              row.invoice_pdf && row.invoice_pdf !== "" ? "_blank" : "_self"
            }
          >
            PDF
          </a>
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenuPortal>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(
                    "/customer-list/payment/detail/" + row.userId + "/" + row.id
                  );
                }}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              {/* <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(+row.id);
                }}
              >
                <Trash size={15} />
                <span className="align-middle ms-50">Remove</span>
              </DropdownItem> */}
            </DropdownMenuPortal>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
