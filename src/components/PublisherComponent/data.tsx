import React, { useState } from "react";
import {
  Copy,
  Delete,
  Edit,
  Eye,
  FileText,
  Loader,
  MoreVertical,
  Trash,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { CustomTooltip } from "../common/tooltip";
// import { DuplicateModal } from "./DuplicateModal/DuplicateModal";
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
import { TGetAPIKeyResponseObj } from "@src/core/services/api/api-key/type";
import { RowWrappers } from "../common/RowWrappers/RowWrappers";
import { RippleButton } from "../common/ripple-button";
import { useGetAPIMgmtCredential } from "@src/core/services/api/api-key";
import toast from "react-hot-toast";
import { getCustomDate } from "@src/core/utils/date-helper.utils";

export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Name",
    minWidth: "160px",
    sortable: (row: any) => row.name,
    selector: (row: any) => row.name,
    cell: (row: any) => {
      return <div>{row.name || "-"}</div>;
    },
  },
  {
    name: "Punlisher name",
    minWidth: "160px",
    selector: (row: any) => row.publisher_name,
    cell: (row: any) => {
      return <div>{row.publisher_name || "-"}</div>;
    },
  },
  {
    name: "Locations",
    minWidth: "200px",
    selector: (row: any) => row.locations,
    cell: (row: any) => {
      const locations = row.locations;
      return (
        <div className="d-flex justify-content-center  align-items-center">
          {locations && locations.length > 0 ? (
            <React.Fragment>
              <Badge
                color="light"
                className="text-secondary text-truncate"
                style={{ marginRight: 5, marginBottom: 5, maxWidth: 125 }}
              >
                {locations[0].name}
              </Badge>
              {locations.length > 1 && (
                <Badge pill color="primary">
                  {`${"+"}${locations.length - 1}`}
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
    name: "API Key ID",
    minWidth: "160px",
    selector: (row: TGetAPIKeyResponseObj) => row.api_key_aws_id,
    cell: (row: any) => {
      return <div>{row.api_key_aws_id || "-"}</div>;
    },
  },
  {
    name: "Creation date",
    minWidth: "160px",
    selector: (row: any) => row.creation_date,
    cell: (row: any) => {
      return (
        <div>{row.creation_date ? getCustomDate(row.creation_date) : "-"}</div>
      );
    },
  },

  {
    name: "Status",
    minWidth: "160px",
    selector: (row: any) => row.is_active,
    cell: (row: any) => {
      return (
        <Badge color={row.is_active ? "light-success" : "light-warning"} pill>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },

  {
    name: "Actions",
    allowOverflow: true,
    cell: (row: any) => {
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
                  // navigate("/discounts-list/detail/" + row.id);
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
                  // onRemove();
                }}
              >
                <Delete size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenuPortal>
            <Edit
              size={15}
              onClick={(e) => {
                e.preventDefault();
                // navigate("/discounts-list/edit/" + row.id);
              }}
            />
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
