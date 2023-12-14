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

export const columns: any = [
  // {
  //   name: "#",
  //   width: "100px",
  //   // sortable: (row: any) => row.id,
  //   selector: (row: any) => row.row_id,
  // },
  {
    name: "Interval",
    sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.interval,
  },
  {
    name: "Contract type",
    minWidth: "155px",
    selector: (row: any) => row.contract_type,
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
    name: "From",
    minWidth: "90px",
    selector: (row: any) => row.from_number,
    // cell: (row: any) => {
    //   // const navigate = useNavigate();
    //   return <div className="d-flex">{getCustomDate(row.start_date)}</div>;
    // },
  },
  {
    name: "To",
    minWidth: "90px",
    selector: (row: any) => row.to_number,
    // cell: (row: any) => {
    //   // const navigate = useNavigate();
    //   return <div className="d-flex">{getCustomDate(row.start_date)}</div>;
    // },
  },
  {
    name: "Fee",
    minWidth: "90px",
    selector: (row: any) => row.fee,
    cell: (row: any) => {
      // const navigate = useNavigate();
      return <div className="d-flex">{row.fee}$</div>;
    },
  },
  {
    name: "Per type",
    minWidth: "140px",
    selector: (row: any) => row.per_type,
  },
  {
    name: "Target",
    minWidth: "100px",
    selector: (row: any) => row.target,
  },
  {
    name: "Payment day",
    minWidth: "140px",
    selector: (row: any) => row.payment_day_of_month,
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
          "Delete the Flat range item?",
          (val) => {},
          "Yes",
          true,
          true,
          async (val) => {
            try {
              const result = await remove.mutateAsync({
                entity: "mls_access_payment_method_range_rate_item",
                data: {
                  id: row.id,
                },
              });
              if (result.data.is_success) {
                showSuccessAlert(
                  "Success!",
                  "Range rate item removed!",
                  () => {
                    row.setRefetch((old: boolean) => !old);
                    // dispatch(handleRefresh("rangeRate"));
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
