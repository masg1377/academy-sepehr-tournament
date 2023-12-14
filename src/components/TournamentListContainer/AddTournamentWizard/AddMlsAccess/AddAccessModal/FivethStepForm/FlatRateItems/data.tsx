import { Avatar } from "@src/components/common/avatar";
import { useRemoveMls } from "@src/core/services/api/mls/mls.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

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
    abbreviated: "Treb",
    feedtype: "IDX, RETS",
    clients: "125",
    payments: "$8,400",
    benefit: "50%",
    last_payments: "13 Jun 2021",
    id: 1,
    handler: "Natan",
    last_log_date: "Today",
    salary: "$23896.35",
    start_date: "09/23/2016",
    status: 2,
  },
  {
    abbreviated: "Treb",
    feedtype: "IDX, RETS",
    clients: "125",
    payments: "$8,400",
    benefit: "50%",
    last_payments: "13 Jun 2021",
    id: 2,
    handler: "Natan",
    last_log_date: "Today",
    salary: "$23896.35",
    start_date: "09/23/2016",
    status: 2,
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
    name: "Target",
    minWidth: "140px",
    selector: (row: any) => row.target,
  },

  {
    name: "Interval",
    sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.interval,
  },
  // {
  //   name: "Clients",
  //   sortable: true,
  //   width: "125px",
  //   selector: (row: any) => row.clients,
  // },
  // {
  //   name: "Payments",
  //   sortable: true,
  //   minWidth: "140px",
  //   selector: (row: any) => row.payments,
  // },
  // {
  //   name: "Benefit",
  //   sortable: true,
  //   width: "125px",
  //   selector: (row: any) => row.benefit,
  //   cell: (row: any) => {
  //     return (
  //       <div className="d-flex justify-content-center  align-items-center">
  //         <div className="user-info text-truncate ">
  //           <small>{row.benefit}</small>
  //         </div>
  //         <ChevronUp size={15} color="#21c44c" />
  //       </div>
  //     );
  //   },
  // },

  {
    name: "Fee",
    minWidth: "140px",
    selector: (row: any) => row.fee,
    cell: (row: any) => {
      // const navigate = useNavigate();
      return <div className="d-flex">{row.fee}$</div>;
    },
  },
  {
    name: "Payment day of month",
    minWidth: "140px",
    selector: (row: any) => row.payment_day_of_month,
  },

  {
    name: "Start Date",
    minWidth: "150px",
    selector: (row: any) => row.start_date,
    cell: (row: any) => {
      // const navigate = useNavigate();
      return <div className="d-flex">{getCustomDate(row.start_date)}</div>;
    },
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row: any) => {
      const navigate = useNavigate();

      const remove = useRemoveMls();

      const dispatch = useDispatch();

      const onRemove = () => {
        showQuestionAlert(
          "Are you sure?",
          "Delete the Flat rate item?",
          (val) => {},
          "Yes",
          true,
          true,
          async (val) => {
            try {
              const result = await remove.mutateAsync({
                entity: "mls_access_payment_method_flat_rate_item",
                data: {
                  id: row.id,
                },
              });
              if (result.data.is_success) {
                showSuccessAlert(
                  "Success!",
                  "Flat rate item removed!",
                  () => {
                    row.setRefetch((old: boolean) => !old);
                    // dispatch(handleRefresh("flatRate"));
                  },
                  "Ok"
                );
                return result.data.is_success;
              } else {
                showErrorAlert(
                  "Error!",
                  "Something went wrong!",
                  undefined,
                  "Ok"
                );
              }
            } catch (error) {
              showErrorAlert(
                "Error!",
                "Something went wrong!",
                undefined,
                "Ok"
              );
            }
          }
        );
      };

      return (
        <div className="d-flex">
          <Trash size={15} className="me-1" onClick={onRemove} />
          <Edit
            size={15}
            onClick={(e) => {
              e.preventDefault();
              row.setIsOpen(row);
            }}
          />
        </div>
      );
    },
  },
];
