import { useDeletePlatform } from "@src/core/services/api/platform/platform.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import { Bell, Edit, FileText, MoreVertical, Trash } from "react-feather";
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

export const data = [
  {
    abbreviated: "Treb",
    username: "Consultant",
    dashboardAccessUrl: "IDX, RETS",
    lastLogDate: "Today",
    id: 1,
    handler: "Natan",
  },
  {
    abbreviated: "Treb",
    username: "Consultant",
    dashboardAccessUrl: "IDX, RETS",
    lastLogDate: "Today",
    id: 2,
    handler: "Natan",
  },
  {
    abbreviated: "Treb",
    username: "Consultant",
    dashboardAccessUrl: "IDX, RETS",
    lastLogDate: "Today",
    id: 3,
    handler: "Natan",
  },
];

export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Abbreviated",
    minWidth: "150px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name,
  },
  {
    name: "Platform id",
    sortable: true,
    minWidth: "130px",
    selector: (row: any) => row.id,
  },
  {
    name: "Username",
    sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.username,
  },
  {
    name: "Dashboard Access url",
    sortable: true,
    width: "255px",
    selector: (row: any) => row.dashboard_access_url,
  },
  // {
  //   name: "Handler",
  //   minWidth: "140px",
  //   sortable: (row: any) => row.handler,
  //   selector: (row: any) => row.handler,
  //   // cell: (row: any) => {
  //   //   return (
  //   //     <Badge color={status[row.status].color} pill>
  //   //       {status[row.status].title}
  //   //     </Badge>
  //   //   );
  //   // },
  // },
  {
    name: "Last log date",
    minWidth: "140px",
    sortable: (row: any) => row.modification_date,
    selector: (row: any) => row.modification_date,
    cell: (row: any) => {
      // const navigate = useNavigate();
      return (
        <div className="d-flex">{getCustomDate(row.modification_date)}</div>
      );
    },
  },
  {
    name: <Bell size={17} />,
    allowOverflow: true,
    width: "100px",
    selector: (row: any) => "-",
    // cell: (row: any) => {
    //   return <div className="d-flex"></div>;
    // },
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row: any) => {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const remove = useDeletePlatform();

      const onRemove = () => {
        showQuestionAlert(
          "Are you sure?",
          "Delete the Package?",
          (val) => {},
          "Yes",
          true,
          true,
          async (val) => {
            try {
              const result = await remove.mutateAsync({
                entity: "platform",
                data: { id: row.id ? +row.id : 0 },
              });
              if (result.data.is_success) {
                showSuccessAlert(
                  "Success!",
                  "Plaform removed!",
                  () => {
                    dispatch(handleRefresh("platform"));
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
                  navigate("/platforms/" + row.id);
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
                  onRemove();
                }}
              >
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenuPortal>
          </UncontrolledDropdown>
          <Edit
            size={15}
            onClick={() => navigate("/platforms/edit/" + row.id + "/1")}
          />
        </div>
      );
    },
  },
];
