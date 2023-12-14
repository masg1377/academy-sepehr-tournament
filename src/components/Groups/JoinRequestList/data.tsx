import { capitalizeFirstLetter } from "@src/core/utils/Utils";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomTooltip } from "../../common/tooltip";
import { ApproveMemberModal } from "./ApproveMemberModal";
import { Badge } from "reactstrap";

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
    name: "Name",
    // minWidth: "200px",
    sortable: (row: any) => row.name,
    selector: (row: any) =>
      row.request_type === "brokerage_group"
        ? row.group_name
        : row.first_name + " " + row.last_name,
    cell: (row: any) => {
      const name =
        row.request_type === "brokerage_group"
          ? row.group_name
          : row.first_name + " " + row.last_name;
      return (
        <>
          <CustomTooltip placement="bottom" target={"joinGroupName" + row.id}>
            {name}
          </CustomTooltip>
          <span
            id={"joinGroupName" + row.id}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        </>
      );
    },
  },
  // Group Type
  {
    name: "Requested via",
    sortable: true,
    // minWidth: "160px",
    selector: (row: any) =>
      row.request_type ? capitalizeFirstLetter(row.request_type) : "-",
  },
  // Members
  {
    name: "Request Date",
    sortable: true,
    minWidth: "160px",
    selector: (row: any) =>
      row.modification_date ? getCustomDate(row.modification_date) : "0",
    // cell: (row: any) => {
    //   const phone = row.phone_number;
    // },
  },
  {
    name: "Status",
    sortable: true,
    minWidth: "160px",
    selector: (row: any) =>
      row.modification_date ? getCustomDate(row.modification_date) : "0",
    cell: (row: any) => {
      const phone = row.phone_number;
      return (
        <Badge color={row?.is_rejected ? "light-danger" : "light-info"} pill>
          {row?.is_rejected ? "Rejected" : "Pending"}
        </Badge>
      );
    },
  },

  {
    name: "Operations",
    allowOverflow: true,
    width: "200px",
    cell: (row: any) => {
      const [acceptModal, setAcceptModal] = useState<boolean>(false);
      const [isApprove, setIsApprove] = useState<boolean>(false);
      // const navigate = useNavigate();

      const onShowModal = (approve: boolean) => {
        setAcceptModal(true);
        setIsApprove(approve);
      };

      return row.is_rejected ? (
        <>-</>
      ) : (
        <div className="d-flex gap-1">
          {acceptModal && (
            <ApproveMemberModal
              isOpen={acceptModal}
              name={row.first_name + " " + row.last_name}
              onToggle={() => setAcceptModal(false)}
              request_id={row.join_request_id}
              isApprove={isApprove}
              setRefresh={row?.setRefresh}
            />
          )}
          <div
            onClick={() => {
              onShowModal(true);
              //console.log(row.id);
              // navigate("/groups-list/edit-group/" + row.id);
            }}
            className="d-flex text-success cursor-pointer"
          >
            Accept
          </div>
          <div
            onClick={() => {
              onShowModal(false);
              //console.log(row.id);
              // navigate("/groups-list/edit-group/" + row.id);
            }}
            className="d-flex text-danger cursor-pointer"
          >
            Reject
          </div>
        </div>
      );
    },
  },
  {
    name: <></>,
    allowOverflow: true,
    width: "140px",
    cell: (row: any) => {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      return row.request_type !== "brokerage_group" ? (
        <div
          className="d-flex text-primary cursor-pointer"
          onClick={() => navigate("/users/detail/" + row?.user_id)}
        >
          View Profile
          {/* <UncontrolledDropdown>
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
                  navigate("/groups-list/" + row.id);
                }}
              >
                <span className="align-middle">Details</span>
              </DropdownItem>

              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  //onRemove();
                }}
              >
                <span className="align-middle">View Join Request</span>
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to={"/groups-list/invite-member/" + row.id}
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                // }}
              >
                <span className="align-middle">Invite Member</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                // }}
              >
                <span className="align-middle">Invite Group</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                // }}
              >
                <span className="align-middle">Album</span>
              </DropdownItem>
            </DropdownMenuPortal>
          </UncontrolledDropdown> */}
        </div>
      ) : (
        <></>
      );
    },
  },
];
