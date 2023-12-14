import {
  Bell,
  Edit,
  Eye,
  EyeOff,
  FileText,
  MoreVertical,
  Trash,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import BttIcon from "@assets/images/icons/btt.png";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { TBttBoostTypes, TBttTypesNumber } from "@src/core/data/btt.data";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { useDeleteBtt } from "@src/core/services/api/btt/btt.api";
import { useDispatch } from "react-redux";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import { CustomTooltip } from "../common/tooltip";
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
    name: "MLS Grid",
    hidden: "No",
    type: "Badge",
    targetType: "User",
    boostType: "User",
    location: "Global",
    id: 1,
    createUser: "Natan",
    creationDate: "14 Sep 2021",
    status: 2,
    expireDate: "2022-10-10",
  },
  {
    name: "MLS Grid",
    hidden: "No",
    type: "Badge",
    targetType: "User",
    boostType: "User",
    location: "Global",
    id: 2,
    createUser: "Natan",
    creationDate: "14 Sep 2021",
    status: 2,
    expireDate: "2022-10-10",
  },
  {
    name: "MLS Grid",
    hidden: "No",
    type: "Badge",
    targetType: "User",
    boostType: "User",
    location: "Global",
    id: 3,
    createUser: "Natan",
    creationDate: "14 Sep 2021",
    status: 2,
    expireDate: "2022-10-10",
  },
  {
    name: "MLS Grid",
    hidden: "No",
    type: "Badge",
    targetType: "User",
    boostType: "User",
    location: "Global",
    id: 4,
    createUser: "Natan",
    creationDate: "14 Sep 2021",
    status: 2,
    expireDate: "2022-10-10",
  },
];

export const columns: any = [
  // {
  //   name: "#",
  //   width: "50px",
  //   // sortable: (row: any) => row.id,
  //   selector: (row: any) => row.id,
  // },
  {
    name: "Name",
    minWidth: "170px",
    sortable: true,
    selector: (row: any) => row.name,
    cell: (row: any) => (
      <>
        <CustomTooltip placement="bottom" target={"bttName" + row.id}>
          {row.name}
        </CustomTooltip>
        <span
          id={"bttName" + row.id}
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
  {
    name: "BTT id",
    sortable: true,
    minWidth: "130px",
    selector: (row: any) => row.id,
  },
  {
    name: "Type",
    sortable: true,
    minWidth: "180px",
    selector: (row: any) => row.type,
    cell: (row: any) => {
      const types = TBttTypesNumber;
      let currentType = types.filter((i) => i.value === row.type);
      return (
        <div>{row.type && currentType[0] ? currentType[0].label : "-"}</div>
      );
    },
  },
  {
    name: "Boost Type",
    minWidth: "140px",
    sortable: true,
    selector: (row: any) => row.boost_type,
    cell: (row: any) => {
      const types = TBttBoostTypes;
      let currentType = types.filter((i) => i.id === row.boost_type);
      return (
        <div>
          {row.boost_type && currentType[0] ? currentType[0].label : "-"}
        </div>
      );
    },
  },
  {
    name: "Location",
    minWidth: "160px",
    sortable: true,
    selector: (row: any) => row.locations,
    cell: (row: any) => (
      <div>
        {row.locations
          ? Array.isArray(row.locations)
            ? row.locations.length === 1
              ? row.locations[0].name
              : row.locations.map((acc: any, ind: number) =>
                  ind === row.locations.length - 1 ? acc.name : acc.name + ", "
                )
            : row.locations.name
          : "-"}
      </div>
    ),
  },
  {
    name: "Visibility",
    minWidth: "140px",
    sortable: true,
    selector: (row: any) => row.is_hidden,
    cell: (row: any) =>
      row.is_hidden ? <EyeOff size={18} /> : <Eye size={18} />,
  },
  {
    name: "Creation Date",
    minWidth: "160px",
    sortable: true,
    selector: (row: any) => row.creation_date,
    cell: (row: any) => (
      <div>{row.creation_date ? getCustomDate(row.creation_date) : "-"}</div>
    ),
  },
  {
    name: "Expiry date",
    minWidth: "160px",
    sortable: true,
    selector: (row: any) => row.expiry_date,
    cell: (row: any) => (
      <div>{row.expiry_date ? getCustomDate(row.expiry_date) : "-"}</div>
    ),
  },
  {
    name: "Created by",
    minWidth: "160px",
    sortable: true,
    selector: (row: any) => row.creator_id,
    cell: (row: any) => {
      const { allStaff } = useSelector((state: RootState) => state.staff);
      let currentStaff: {
        id: number;
        first_name: "string";
        last_name: "string";
      }[] = allStaff.filter((i: any) => i.id === row.creator_id);
      return (
        <div>
          <div>
            {row.creator_id
              ? currentStaff[0]
                ? currentStaff[0]?.first_name
                : row.creator_id
              : "-"}
          </div>
        </div>
      );
    },
  },

  // {
  //   name: "Status",
  //   // allowOverflow: true,
  //   minWidth: "140px",
  //   cell: (row: any) => {
  //     // const navigate = useNavigate();
  //     return (
  //       <Badge color={status[2].color} pill>
  //         {status[2].title}
  //       </Badge>
  //     );
  //   },
  // },
  // {
  //   name: "Is Hidden",
  //   // allowOverflow: true,
  //   minWidth: "140px",
  //   sortable: true,
  //   selector: (row: any) => row.is_hidden,
  //   cell: (row: any) => {
  //     return (
  //       <Badge color={row.is_hidden ? status[3].color : status[2].color} pill>
  //         {row.is_hidden ? "Yes" : "No"}
  //       </Badge>
  //     );
  //   },
  // },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row: any) => {
      const navigate = useNavigate();

      const remove = useDeleteBtt();

      const dispatch = useDispatch();

      const onRemove = () => {
        showQuestionAlert(
          "Are you sure?",
          "Delete the BTT?",
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
                  "BTT removed!",
                  () => {
                    dispatch(handleRefresh("btt"));
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
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/btt-list/" + row.id);
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
            onClick={() => navigate("/btt-list/edit/" + row.id)}
          />
        </div>
      );
    },
  },
];
