import { Avatar } from "@src/components/common/avatar";
import { DollarSign, Check } from "react-feather";

import { useNavigate } from "react-router-dom";
import { RippleButton } from "@src/components/common/ripple-button";

// ** Vars

export const customStyles = {
  cells: {
    style: {
      minHeight: "100px",
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
    name: "Invoice Num",
    minWidth: "700px",
    sortable: (row: any) => row.id,
    selector: (row: any) => row.id,
    cell: (row: any) => {
      return (
        <div className="d-flex align-items-start">
          <RippleButton color="light" size="sm" className="me-1">
            <DollarSign size={19} color="#92969a" />
          </RippleButton>
          <div>
            <span className="fs-6 fw-bolder d-block lh-base">
              Invoice {row.id}
            </span>
            <div>
              <span className="fs-6 fw-bold lh-base">Request: </span>
              <span className="fs-6 lh-base text-secondary">{row.request}</span>
            </div>
            <div>
              <span className="fs-6 fw-bold lh-base text-primary">
                Paid By:{" "}
              </span>
              <span className="fs-6 lh-base text-secondary">{row.paidBy}</span>
            </div>
            <div>
              <span className="fs-6 lh-base text-secondary">
                {row.withdraw}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    name: "Status",
    minWidth: "130px",
    sortable: (row: any) => row.request,
    selector: (row: any) => row.request,
    cell: (row: any) => {
      return (
        <div className="d-flex flex-column align-items-end justify-content-between h-100">
          <span className="fs-6 text-success d-block">
            Paid <Check size={15} color="#21c44c" />
          </span>
          <span className="fs-6 text-secondary">{row.date}</span>
        </div>
      );
    },
  },
];
