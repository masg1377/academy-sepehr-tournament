import { useDeletePlatform } from "@src/core/services/api/platform/platform.api";
import {
  useActiveUser,
  useDeactiveUser,
} from "@src/core/services/api/user/user.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import {
  Bell,
  Edit,
  FileText,
  MoreVertical,
  Trash,
  Grid,
  Check,
  Sliders,
} from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import DropdownMenuPortal from "../common/DropdownMenuPortal";

// ** Vars

const status: any = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Active", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Full Name",
    minWidth: "180px",
    selector: (row: any) => row.first_name,
    cell: (row: any) => (
      <div className="text-truncate">
        {row.first_name} {row.last_name}
        {!row.first_name && !row.last_nam && "-"}
      </div>
    ),
  },

  {
    name: "User id",
    sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.id,
  },
  {
    name: "Username",
    sortable: true,
    width: "180px",
    selector: (row: any) => row.username,
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "210px",
    selector: (row: any) => row.email,
  },
  {
    name: "Member Since",
    sortable: true,
    minWidth: "180px",
    selector: (row: any) => row.creation_date,
    cell: (row: any) => <>{getCustomDate(row.creation_date)}</>,
  },
  {
    name: "Joined type",
    sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.joined_type,
    cell: (row: any) => (
      <>
        {row.joined_type === 1
          ? "User invitation"
          : row.joined_type === 2
          ? "Group invitation"
          : "Group whitelist"}
      </>
    ),
  },
  {
    name: "Profile setup status",
    minWidth: "210px",
    //sortable: (row: any) => row.handler,
    selector: (row: any) => row.profile_setup_status,
    cell: (row: any) => {
      return (
        <>
          {row.profile_setup_status === 1 ? (
            "Incomplete"
          ) : (
            <>
              <Check color="green" /> Done
            </>
          )}
        </>
      );
    },
  },

  {
    name: "Action",
    allowOverflow: true,
    width: "100px",
    cell: (row: any) => {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const activate = useActiveUser();
      const deactive = useDeactiveUser();

      const onActivityUser = () => {
        showQuestionAlert(
          "Are you sure?",
          `${row.status === 1 ? "Deactive" : "Active"} the User?`,
          (val) => {},
          "Yes",
          true,
          true,
          async (val) => {
            try {
              let result;
              if (row.status === 1)
                result = await deactive.mutateAsync({ user_id: row.id });
              else result = await activate.mutateAsync({ user_id: row.id });
              if (result.data.is_success) {
                showSuccessAlert(
                  "Success!",
                  `User ${row.status === 1 ? "deactivated" : "activated"}`,
                  () => {
                    dispatch(handleRefresh("user"));
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

      const onRemove = () => {
        showQuestionAlert(
          "Are you sure?",
          "Delete the User?",
          (val) => {},
          "Yes",
          true,
          true
          // async (val) => {
          //   const result = await remove.mutateAsync({
          //     entity: "platform",
          //     data: { id: row.id ? +row.id : 0 },
          //   });
          //   if (result.data.is_success) {
          //     showSuccessAlert(
          //       "Success!",
          //       "Plaform removed!",
          //       () => {
          //         dispatch(handleRefresh("platform"));
          //       },
          //       "Ok"
          //     );
          //     return result.data.is_success;
          //   } else {
          //     showErrorAlert(
          //       "Error!",
          //       "Something went wrong!",
          //       undefined,
          //       "Ok"
          //     );
          //   }
          // }
        );
      };

      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenuPortal>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/users/detail/" + row.id);
                }}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  onActivityUser();
                }}
              >
                <Sliders size={15} />
                <span className="align-middle ms-50">
                  {row.status === 1 ? "Deactivate" : "Activate"}
                </span>
              </DropdownItem>

              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove();
                }}
              >
                <Trash size={15} />
                <span className="align-middle ms-50">Remove</span>
              </DropdownItem>
            </DropdownMenuPortal>
            {/* <Edit size={15} /> */}
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
