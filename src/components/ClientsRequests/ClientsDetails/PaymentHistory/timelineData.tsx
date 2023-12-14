import { Check, DollarSign, RefreshCw, Send } from "react-feather";

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
