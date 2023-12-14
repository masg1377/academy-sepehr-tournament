import { Avatar } from "@src/components/common/avatar";
import {
  Activity,
  Archive,
  ArrowUp,
  ChevronUp,
  Edit,
  FileText,
  MoreVertical,
  Trash,
  Triangle,
} from "react-feather";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleModalSit, handlePaymentId } from "@src/redux/packageModal";

// ** Vars

const status: any = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Active", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

export const data = [
  {
    nickname: "Treb",
    unitAmount: 122,
    paymentType: {
      value: 1,
      label: "recurring",
    },
    usageType: {
      value: 1,
      label: "usageType",
    },

    billingSchema: {
      value: 1,
      label: "billingSchema",
    },
    trialPeriodDays: 12,
    id: 1,
    oneTimeValidDays: 6,
  },
];

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
    width: "100px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Nickname",
    minWidth: "150px",
    // sortable: (row: any) => row.nickname,
    selector: (row: any) =>
      row.nickname && row.nickname !== "" ? row.nickname : "-",
  },

  {
    name: "Unit amount",
    // sortable: true,
    minWidth: "130px",
    cell: (row: any) => (
      <div>{row.unit_amount ? row.unit_amount : row.unit_amount_decimal}</div>
    ),
  },
  {
    name: "Tax Behavior",
    sortable: true,
    minWidth: "145px",
    selector: (row: any) => row.tax_behavior,
  },

  {
    name: "Trial period days",
    sortable: true,
    minWidth: "100px",
    selector: (row: any) =>
      row.trial_period_days ? row.trial_period_days : "-",
  },
  {
    name: "One time valid days",
    minWidth: "100px",
    selector: (row: any) => row.one_time_valid_days,
    cell: (row: any) => (
      <p>{row.one_time_valid_days ? row.one_time_valid_days : "-"}</p>
    ),
  },
  {
    name: <Edit size={17} />,
    allowOverflow: true,
    width: "90px",
    cell: (row: any) => {
      const dispatch = useDispatch();

      const navigate = useNavigate();
      return (
        <div
          onClick={() => {
            dispatch(handlePaymentId(row.id));
            dispatch(handleModalSit(true));
          }}
          // className={`d-flex text-primary cursor-pointer ${
          //   !row?.edit_flag && "disbaled-content d-none"
          // }`}
          className={`d-flex text-primary cursor-pointer`}
        >
          {/* {row?.edit_flag ? "Edit" : "-"} */}Edit
        </div>
      );
    },
  },
];
