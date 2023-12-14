import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";
import {
  capitalizeFirstLetter,
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { useState } from "react";
import { Grid, MoreVertical } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { MemberChangeRole } from "../MemberChangeRole";
import { useRemoveMemberFromGroup } from "@src/core/services/api/group/group.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";

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
  // Group Name
  {
    name: "Email",
    // minWidth: "200px",
    sortable: (row: any) => row.email,
    selector: (row: any) => (row.email ? row.email : "-"),
  },
  // Group Type
  {
    name: "Invited by",
    sortable: true,
    // minWidth: "160px",
    selector: (row: any) =>
      row.join_reason ? capitalizeFirstLetter(row.join_reason) : "-",
  },

  {
    name: "Invitation date",
    sortable: true,
    // minWidth: "160px",
    selector: (row: any) =>
      row.creation_date ? getCustomDate(row.creation_date) : "-",
    // cell: (row: any) => {
    //   const phone = row.phone_number;
    // },
  },
  {
    name: "Role",
    sortable: true,
    minWidth: "160px",
    selector: (row: any) => row.role,
    cell: (row: any) => {
      const role = row.role;
      return (
        <Badge color={"light-success"} pill>
          {role ? capitalizeFirstLetter(role) : "-"}
        </Badge>
      );
    },
  },

  {
    name: <Grid size={17} />,
    allowOverflow: true,
    width: "200px",
    cell: (row: any) => {
      const { group_id } = useParams();

      const [changeRole, setChangeRole] = useState<boolean>(false);
      // const [isApprove, setIsApprove] = useState<boolean>(false);
      // // const navigate = useNavigate();

      const remove = useRemoveMemberFromGroup();

      const onRemove = () => {
        showQuestionAlert(
          "Are you sure?",
          "Remove the member from whitelist?",
          (val) => {},
          "Yes",
          true,
          true,
          async (val) => {
            try {
              const result: any = await remove.mutateAsync({
                whitelist_id: row.id,
                group_id: group_id ? +group_id : 0,
              });
              if (result.data.is_success || result.data.success) {
                showSuccessAlert(
                  "Success!",
                  "Member removed!",
                  () => {
                    // dispatch(handleRefresh("btt"));
                    row.setRefresh((old: any) => !old);
                  },
                  "Ok"
                );
                return result.data.is_success || result.data.success;
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

      // const onShowModal = (approve: boolean) => {
      //   setAcceptModal(true);
      //   setIsApprove(approve);
      // };

      return (
        <>
          {changeRole && (
            <MemberChangeRole
              isOpen={changeRole}
              onToggle={(refresh) => {
                setChangeRole(false);
                if (refresh) row.setRefresh((old: boolean) => !old);
              }}
              user={row}
            />
          )}
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenuPortal>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100 text-danger"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove();
                }}
              >
                <span className="align-middle">Remove</span>
              </DropdownItem>
            </DropdownMenuPortal>
          </UncontrolledDropdown>
        </>
      );
    },
  },
];
