export const reportIntervalData = [
  { value: "one-time", label: "one-time" },
  { value: "monthly", label: "monthly" },
  { value: "quarterly", label: "quarterly" },
  { value: "yearly", label: "yearly" },
];

export const mlsDocumentType = [
  { value: "contract", label: "contract" },
  { value: "manual", label: "manual" },
  { value: "client", label: "client" },
];

export const mlsAuthType = [
  { value: "basic", label: "basic" },
  { value: "digest", label: "digest" },
];

export const mlsRequestMethodType = [
  { value: "post", label: "post" },
  { value: "get", label: "get" },
];

export const mlsTargetType = [
  { value: "mls", label: "mls" },
  { value: "platform", label: "platform" },
  { value: "other", label: "other" },
];

export const mlsContractTpe = [
  { value: "per agent fee", label: "per agent fee" },
  { value: "per brokerage fee", label: "per brokerage fee" },
  { value: "per user fee", label: "per user fee" },
];

export const mlsPerType = [
  { value: "per client fee", label: "per client fee" },
  { value: "flat fee", label: "flat fee" },
];

export const requestStatus = [
  { value: "pending", label: "pending" },
  { value: "in progress", label: "in progress" },
  { value: "active", label: "active" },
  { value: "rejected", label: "rejected" },
  { value: "canceled", label: "canceled" },
];

export const requestAgentTypes = [
  { value: "agent", label: "agent" },
  { value: "broker", label: "broker" },
  { value: "salesperson", label: "salesperson" },
  { value: "etc", label: "etc" },
];

export const requestDocumentStatuses = [
  { value: "sent", label: "sent" },
  { value: "approved", label: "approved" },
  { value: "rejected", label: "rejected" },
  { value: "archived", label: "archived" },
  { value: "waiting for client", label: "waiting for client" },
  { value: "waiting for mls", label: "waiting for mls" },
];

export const mlsReportIntervalType = [
  // { value: "weekly", label: "weekly" },
  { value: "monthly", label: "monthly" },
  { value: "quarterly", label: "quarterly" },
  { value: "yearly", label: "yearly" },
];

export const invoiceTypeNumber = [
  {
    value: 1,
    label: "Draft",
    color: "light-warning",
    class: "bg-warning",
    text: "text-warning",
  },
  {
    value: 2,
    label: "Open",
    color: "light-success",
    class: "bg-success",
    text: "text-success",
  },
  {
    value: 3,
    label: "Paid",
    color: "light-success",
    class: "bg-success",
    text: "text-success",
  },
  {
    value: 4,
    label: "Uncollectible",
    color: "light-info",
    class: "bg-info",
    text: "text-info",
  },
  {
    value: 5,
    label: "Void",
    color: "light-danger",
    class: "bg-danger",
    text: "text-danger",
  },
  {
    value: 6,
    label: "Price-locked",
    color: "light-info",
    class: "bg-info",
    text: "text-info",
  },
  {
    value: 7,
    label: "-",
    color: "light-warning",
    class: "bg-warning",
    text: "text-warning",
  },
  {
    value: 8,
    label: "-",
    color: "light-warning",
    class: "bg-warning",
    text: "text-warning",
  },
];

export const requestStatusTypesString = [
  { value: "active", label: "Active", color: "light-success" },
  { value: "pending", label: "Pending", color: "light-warning" },
  { value: "rejected", label: "Rejected", color: "light-danger" },
];

export const feedTypeItems = [
  { value: 1, label: "IDX/RETS" },
  { value: 2, label: "IDX/RESO_WEB_API" },
  { value: 3, label: "IDX_PLUS/RETS" },
  { value: 4, label: "IDX_PLUS/RESO_WEB_API" },
  { value: 5, label: "VOW/RETS" },
  { value: 6, label: "VOW/RESO_WEB_API" },
  { value: 7, label: "IDX" },
  { value: 8, label: "IDX_PLUS" },
  { value: 9, label: "VOW" },
  { value: 10, label: "RETS" },
  { value: 11, label: "ALL/ALL" },
  { value: 12, label: "--/RESO_WEB_API" },
  { value: 13, label: "ALL Feed Type" },
  { value: 14, label: "ALL Connection Type" },
];
