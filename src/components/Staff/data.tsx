import React from "react";
import { useDeletePlatform } from "@src/core/services/api/platform/platform.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import { Bell, Edit, FileText, MoreVertical, Trash, Grid } from "react-feather";
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
    minWidth: "200px",
    sortable: (row: any) => row.first_name,
    selector: (row: any) => row.first_name,
    cell: (row: any) => (
      <div className="text-truncate m-0 p-0">
        {row.first_name && row.first_name} {row.last_name && row.last_name}
        {!row.first_name && !row.last_nam && "-"}
      </div>
    ),
  },

  {
    name: "Staff id",
    sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.id,
  },

  {
    name: "Roles",
    sortable: true,
    minWidth: "190px",
    selector: (row: any) => row.btt_type_items,
    cell: (row: any) => {
      let btt_type_items = row.btt_type_items;
      btt_type_items = btt_type_items.filter(
        (f: any) => f.type === 1 && f.status === "available"
      );
      return (
        <div className="d-flex justify-content-center  align-items-center">
          {btt_type_items && btt_type_items.length > 0 ? (
            <React.Fragment>
              <Badge
                color="light"
                className="text-secondary text-truncate"
                style={{ marginRight: 5, marginBottom: 5, maxWidth: 125 }}
              >
                {btt_type_items[0].name}
              </Badge>
              {btt_type_items.length > 1 && (
                <Badge pill color="primary">
                  {`${"+"}${btt_type_items.length - 1}`}
                </Badge>
              )}
            </React.Fragment>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    name: "Email",
    sortable: true,
    width: "270px",
    selector: (row: any) => row.email,
  },
  {
    name: "Phone",
    sortable: true,
    minWidth: "160px",
    selector: (row: any) => "-",
    // cell: (row: any) => {
    //   const phone = row.phone_number;
    // },
  },
  {
    name: "Creation Date",
    sortable: true,
    minWidth: "180px",
    selector: (row: any) => row.creation_date,
    cell: (row: any) => {
      return <span>{getCustomDate(row.creation_date)}</span>;
    },
  },

  {
    name: "Status",
    minWidth: "70px",
    //sortable: (row: any) => row.status,
    selector: (row: any) => row.status,
    cell: (row: any) => {
      const statuss = row.status;
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
            navigate("/staff/" + row.id);
          }}
          className="d-flex text-primary cursor-pointer"
        >
          Edit
        </div>
      );
    },
  },
  // {
  //   name: <Grid size={17} />,
  //   allowOverflow: true,
  //   width: "70px",
  //   cell: (row: any) => {
  //     const navigate = useNavigate();
  //     const dispatch = useDispatch();

  //     const remove = useDeletePlatform();

  //     const onRemove = () => {
  //       showQuestionAlert(
  //         "Are you sure?",
  //         "Delete the Staff?",
  //         (val) => {},
  //         "Yes",
  //         true,
  //         true,
  //         async (val) => {
  //           // const result = await remove.mutateAsync({
  //           //   entity: "staff",
  //           //   data: { id: row.id ? +row.id : 0 },
  //           // });
  //           // if (result.data.is_success) {
  //           //   showSuccessAlert(
  //           //     "Success!",
  //           //     "Staff removed!",
  //           //     () => {
  //           //       dispatch(handleRefresh("Staff"));
  //           //     },
  //           //     "Ok"
  //           //   );
  //           //   return result.data.is_success;
  //           // } else {
  //           //   showErrorAlert(
  //           //     "Error!",
  //           //     "Something went wrong!",
  //           //     undefined,
  //           //     "Ok"
  //           //   );
  //           // }
  //         }
  //       );
  //     };

  //     return (
  //       <div className="d-flex">
  //         <UncontrolledDropdown>
  //           <DropdownToggle className="pe-1" tag="span">
  //             <MoreVertical size={15} />
  //           </DropdownToggle>
  //           <DropdownMenuPortal>
  //             {/* <DropdownItem
  //               tag="a"
  //               href="/"
  //               className="w-100"
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 navigate("/staff/" + row.id);
  //               }}
  //             >
  //               <FileText size={15} />
  //               <span className="align-middle ms-50">Details</span>
  //             </DropdownItem> */}

  //             <DropdownItem
  //               tag="a"
  //               href="/"
  //               className="w-100"
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 onRemove();
  //               }}
  //             >
  //               <Trash size={15} />
  //               <span className="align-middle ms-50">Remove</span>
  //             </DropdownItem>
  //           </DropdownMenuPortal>
  //         </UncontrolledDropdown>
  //       </div>
  //     );
  //   },
  // },
];
