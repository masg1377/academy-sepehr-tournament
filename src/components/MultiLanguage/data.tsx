import React, { useState } from "react";
import { Copy, Edit, FileText, MoreVertical, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { CustomTooltip } from "../common/tooltip";
import { DuplicateModal } from "./DuplicateModal/DuplicateModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { useDispatch } from "react-redux";
import { useRemoveMls } from "@src/core/services/api/mls/mls.api";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import { useDeleteMultiLang } from "@src/core/services/api/multilang/multilang.api";
import DropdownMenuPortal from "../common/DropdownMenuPortal";

export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Usecase",
    minWidth: "150px",
    sortable: (row: any) => row.usecase,
    selector: (row: any) => row.usecase,
    cell: (row: any) => {
      return <div>{row.usecase || "-"}</div>;
    },
  },
  {
    name: "Language",
    minWidth: "160px",
    selector: (row: any) => row.locale,
  },

  {
    name: "Version",
    sortable: true,
    minWidth: "140px",
    selector: (row: any) => row.version,
    cell: (row: any) => {
      // const useCaseName = row?.usecase_version?.split("#v")[0];
      // const versionName = row?.usecase_version?.split("#v")[1];
      return <div>{row.version || row.version === 0 ? row.version : "-"}</div>;
    },
  },
  {
    name: "Modified by",
    sortable: true,
    width: "185px",
    //selector: (row: any) => (row.modified_by ? row.modified_by : "-"),
    selector: (row: any) => row.modified_by,
    // cell: (row: any) => {
    //   return (
    //     <div>
    //       <div>
    //         {Number(row.modified_by)
    //           ? currentStaff[0]
    //             ? currentStaff[0]?.first_name
    //             : Number(row.modified_by)
    //           : "-"}
    //       </div>
    //     </div>
    //   );
    // },
  },

  {
    name: "Creation Date",
    minWidth: "190px",
    sortable: (row: any) => row.creation_date,
    selector: (row: any) => row.creation_date,
    cell: (row: any) => {
      const useCaseName = row?.creation_date?.split(" ")[0];
      return <div>{useCaseName ? useCaseName : "-"}</div>;
    },
  },
  {
    name: "Status",
    width: "115px",
    sortable: (row: any) => row.is_published,
    selector: (row: any) => row.is_published,
    cell: (row: any) => {
      return (
        <Badge
          color={row.is_published ? "light-success" : "light-warning"}
          pill
        >
          {row.is_published ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row: any) => {
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const navigate = useNavigate();

      const dispatch = useDispatch();

      const remove = useDeleteMultiLang();

      const onRemove = () => {
        showQuestionAlert(
          "Are you sure?",
          "Delete the language?",
          (val) => {},
          "Yes",
          true,
          true,
          async (val) => {
            try {
              const result = await remove.mutateAsync({
                action: !row.is_published ? "delete_draft" : "delete_published",
                id: row.id,
              });
              if (result.data.is_success) {
                showSuccessAlert(
                  "Success!",
                  "Language removed!",
                  () => {
                    dispatch(handleRefresh("multiLang"));
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
            } catch (error) {}
          }
        );
      };

      return (
        <div className="d-flex">
          {isOpen && (
            <DuplicateModal
              isOpen={isOpen}
              onToggle={() => setIsOpen(false)}
              item={row}
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
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  // onRemove();
                  setIsOpen(true);
                }}
              >
                <Copy size={15} />
                <span className="align-middle ms-50">Duplicate</span>
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
          {/* <FileText
            size={15}
            className="me-1"
            onClick={() => navigate("/mls-list/" + row.id)}
          />*/}
          <Edit
            size={15}
            onClick={() => navigate("/multilang/edit/" + row.id)}
          />
        </div>
      );
    },
  },
];
