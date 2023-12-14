import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { Edit, Grid, MoreVertical } from "react-feather";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import DropdownMenuPortal from "../common/DropdownMenuPortal";
import { CustomTooltip } from "../common/tooltip";
import { capitalizeFirstLetter } from "@src/core/utils/Utils";

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
    name: "Group Name",
    minWidth: "200px",
    sortable: (row: any) => row.name,
    selector: (row: any) => (row.name ? row.name : "-"),
    cell: (row: any) => (
      <>
        <CustomTooltip placement="bottom" target={"groupName" + row.id}>
          {row.name}
        </CustomTooltip>
        <span
          id={"groupName" + row.id}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.name}
        </span>
      </>
    ),
  },
  // Group Type
  {
    name: "Group Type",
    sortable: true,
    minWidth: "160px",
    selector: (row: any) =>
      row.group_type ? capitalizeFirstLetter(row.group_type) : "-",
  },
  // Members
  {
    name: "Members",
    sortable: true,
    minWidth: "160px",
    selector: (row: any) => (row.members ? row.members : "0"),
    // cell: (row: any) => {
    //   const phone = row.phone_number;
    // },
  },
  // Phone
  {
    name: "Phone",
    sortable: true,
    minWidth: "160px",
    selector: (row: any) => (row.contact_number ? row.contact_number : "-"),
    // cell: (row: any) => {
    //   const phone = row.phone_number;
    // },
  },
  // Creation Date
  {
    name: "Creation Date",
    sortable: true,
    minWidth: "180px",
    selector: (row: any) => row.creation_date,
    cell: (row: any) => {
      return <span>{getCustomDate(row.creation_date)}</span>;
    },
  },
  // Status
  {
    name: "Status",
    minWidth: "70px",
    //sortable: (row: any) => row.publish_status,
    selector: (row: any) => row.publish_status,
    cell: (row: any) => {
      const statuss = row.is_published;
      return (
        <>
          {statuss && statuss === 1 ? (
            <Badge color={status[2].color} pill>
              {"Active"}
            </Badge>
          ) : (
            <Badge color={status[3].color} pill>
              {"Inactive"}
            </Badge>
          )}
        </>
      );
    },
  },

  {
    name: <Edit size={17} />,
    allowOverflow: true,
    width: "80px",
    cell: (row: any) => {
      const navigate = useNavigate();
      return (
        <div
          onClick={() => {
            //console.log(row.id);
            navigate("/groups-list/edit-group/" + row.id);
          }}
          className="d-flex text-primary cursor-pointer"
        >
          Edit
        </div>
      );
    },
  },
  {
    name: <Grid size={17} />,
    allowOverflow: true,
    width: "70px",
    cell: (row: any) => {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      return (
        <div className="d-flex">
          <UncontrolledDropdown>
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
                tag={Link}
                to={"/groups-list/join-requests/" + row.id}
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                //   //onRemove();
                // }}
              >
                <span className="align-middle">View Join Request</span>
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to={"/groups-list/members/" + row.id}
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                // }}
              >
                <span className="align-middle">Invite Member</span>
              </DropdownItem>
              {/* <DropdownItem
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                // }}
              >
                <span className="align-middle">Invite Group</span>
              </DropdownItem> */}
              {/* <DropdownItem
                className="w-100"
                // onClick={(e) => {
                //   e.preventDefault();
                // }}
              >
                <span className="align-middle">Album</span>
              </DropdownItem> */}
            </DropdownMenuPortal>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
