// import pdf from "@src/assets/images/icons/file-icons/pdf.png";

import { FileText, RefreshCw, Send, DollarSign, Check } from "react-feather";
import { RippleButton } from "@src/components/common/ripple-button";

export const docData = [
  {
    title: "Filename",
    content: "file descroption show here",
    icon: <FileText size={35} />,
    meta: (
      <RippleButton color="pending" className="pending text-white" size="sm">
        Pending
        <RefreshCw size={15} className="ms-1" />
      </RippleButton>
    ),
    metaClassName: "mb-1",
    customIcon: true,
    className: "border-start-0",
    customContent: (
      <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
        <div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Type: </span>
            <span className="fs-6 lh-base">Contract</span>
          </div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Source: </span>
            <span className="fs-6 lh-base">Realtyna</span>
          </div>
        </div>
        <span className="fs-6 lh-base">12 Jun 2021</span>
      </div>
    ),
  },
  {
    title: "Filename",
    content: "file descroption show here",
    icon: <FileText size={35} />,
    meta: (
      <RippleButton color="primary" size="sm">
        Sent to MLS
        <Send size={15} className="ms-1" />
      </RippleButton>
    ),
    metaClassName: "mb-1",
    customIcon: true,
    className: "border-start-0",
    customContent: (
      <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
        <div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Type: </span>
            <span className="fs-6 lh-base">Contract</span>
          </div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Source: </span>
            <span className="fs-6 lh-base">Realtyna</span>
          </div>
        </div>
        <span className="fs-6 lh-base">12 Jun 2021</span>
      </div>
    ),
  },
  {
    title: "Filename",
    content: "file descroption show here",
    icon: <FileText size={35} />,
    className: "border-start-0",
    customIcon: true,
    customContent: (
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Type: </span>
            <span className="fs-6 lh-base">Contract</span>
          </div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Source: </span>
            <span className="fs-6 lh-base">Realtyna</span>
          </div>
        </div>
        <span className="fs-6 lh-base">12 Jun 2021</span>
      </div>
    ),
  },
];

export const paymentData = [
  {
    title: "Invoice #558556",
    // content: "file descroption show here",
    icon: <DollarSign size={15} />,
    meta: (
      <span className="fs-6 text-success">
        Paid <Check size={15} color="#21c44c" />
      </span>
    ),
    className: "border-start-0",
    customContent: (
      <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
        <div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Request: </span>
            <span className="fs-6 lh-base">Rqs-122-45689</span>
          </div>
          <div>
            <span className="fs-6 fw-bolder lh-base text-primary">
              Paid By:{" "}
            </span>
            <span className="fs-6 lh-base">card **** **** **** 5583</span>
          </div>
          <div>
            <span className="fs-6 lh-base">$8,400.00</span>
          </div>
        </div>
        <span className="fs-6 lh-base">12 Jun 2021</span>
      </div>
    ),
  },
  {
    title: "Invoice #558556",
    // content: "file descroption show here",
    icon: <DollarSign size={15} />,
    meta: (
      <span className="fs-6 text-success">
        Paid <Check size={15} color="#21c44c" />
      </span>
    ),
    className: "border-start-0",
    customContent: (
      <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
        <div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Request: </span>
            <span className="fs-6 lh-base">Rqs-122-45689</span>
          </div>
          <div>
            <span className="fs-6 fw-bolder lh-base text-primary">
              Paid By:{" "}
            </span>
            <span className="fs-6 lh-base">card **** **** **** 5583</span>
          </div>
          <div>
            <span className="fs-6 lh-base">$8,400.00</span>
          </div>
        </div>
        <span className="fs-6 lh-base">12 Jun 2021</span>
      </div>
    ),
  },
  {
    title: "Invoice #558556",
    // content: "file descroption show here",
    icon: <DollarSign size={15} />,
    meta: (
      <span className="fs-6 text-info">
        Paid <Send size={15} color="#04cad0" />
      </span>
    ),
    className: "border-start-0",
    customContent: (
      <div className="d-flex justify-content-between align-items-end border-bottom pb-1">
        <div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Request: </span>
            <span className="fs-6 lh-base">Rqs-122-45689</span>
          </div>

          <div>
            <span className="fs-6 lh-base">$8,400.00</span>
          </div>
        </div>
        <span className="fs-6 lh-base">12 Jun 2021</span>
      </div>
    ),
  },
  {
    title: "Invoice #558556",
    // content: "file descroption show here",
    icon: <DollarSign size={15} />,
    meta: (
      <span className="fs-6 pending">
        Pending <RefreshCw size={15} color="#e7c415" />
      </span>
    ),
    className: "border-start-0",
    customContent: (
      <div className="d-flex justify-content-between align-items-end pb-1">
        <div>
          <div>
            <span className="fs-6 fw-bolder lh-base">Request: </span>
            <span className="fs-6 lh-base">Rqs-122-45689</span>
          </div>

          <div>
            <span className="fs-6 lh-base">$8,400.00</span>
          </div>
        </div>
        <span className="fs-6 lh-base">12 Jun 2021</span>
      </div>
    ),
  },
];
