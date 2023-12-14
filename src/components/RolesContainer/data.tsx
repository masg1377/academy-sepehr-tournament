import { useDeleteBtt } from "@src/core/services/api/btt/btt.api";
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
    name: "Name",
    minWidth: "180px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name,
    cell: (row: any) => (
      <div className="text-truncate m-0 p-0">
        {row.name && row.name}
        {!row.name && "-"}
      </div>
    ),
  },

  {
    name: "Role id",
    sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.id,
  },
  // {
  //   name: "Status",
  //   minWidth: "60px",
  //   //sortable: (row: any) => row.handler,
  //   selector: (row: any) => row.handler,
  //   cell: (row: any) => {
  //     return (
  //       <Badge color={status[2].color} pill>
  //         {"Active"}
  //       </Badge>
  //     );
  //   },
  // },
  {
    name: "Is Hidden",
    // allowOverflow: true,
    minWidth: "140px",
    selector: (row: any) => row.is_hidden,
    cell: (row: any) => {
      return (
        <Badge color={row.is_hidden ? status[3].color : status[2].color} pill>
          {row.is_hidden ? "Yes" : "No"}
        </Badge>
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
            navigate("/roles/edit/" + row.id);
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

      const remove = useDeleteBtt();

      const onRemove = () => {
        showQuestionAlert(
          "Are you sure?",
          "Delete the role?",
          (val) => {},
          "Yes",
          true,
          true,
          async (val) => {
            try {
              const result: any = await remove.mutateAsync({
                id: row.id,
              });
              if (result.data.is_success || result.data.success) {
                showSuccessAlert(
                  "Success!",
                  "Role removed!",
                  () => {
                    dispatch(handleRefresh("role"));
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

      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenuPortal>
              {/* <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/Staff/" + row.id);
                }}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem> */}

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
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
