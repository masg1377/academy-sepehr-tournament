import { RippleButton } from "@src/components/common/ripple-button";
import { useDeletePlatformCredential } from "@src/core/services/api/platform/platform.api";
import { TDeletePlatform } from "@src/core/services/api/platform/type";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import { useState } from "react";
import { Edit3 } from "react-feather";
import { useDispatch } from "react-redux";
import { AddCredentialModal } from "../../AddPlatform/AddCredentialModal/AddCredentialModal";

// ** Vars

const status: any = {
  1: { title: "Current", color: "light-primary" },
  2: { title: "Active", color: "light-success" },
  3: { title: "Rejected", color: "light-danger" },
  4: { title: "Resigned", color: "light-warning" },
  5: { title: "Applied", color: "light-info" },
};

const states: any = [
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "primary",
  "secondary",
];

export const columns: any = [
  {
    name: "#",
    width: "50px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "Name",
    minWidth: "160px",
    selector: (row: any) => row.name,
  },

  {
    name: "Feed type connection",
    minWidth: "210px",
    selector: (row: any) => row.feedTypeConnection,
  },
  {
    name: "Client ID",
    minWidth: "150px",
    selector: (row: any) => row.client_id,
  },
  {
    name: "Access Token",
    minWidth: "150px",
    selector: (row: any) => row.access_token,
  },
  {
    name: "",
    minWidth: "91px",
    cell: (row: any) => {
      const deleteRow = useDeletePlatformCredential();
      const dispatch = useDispatch();
      return (
        <RippleButton
          color="link"
          className="text-danger p-0"
          size="sm"
          onClick={() =>
            showQuestionAlert(
              "Are you sure?",
              "Delete the Platform Credential?",
              (val) => {},
              "Yes",
              true,
              true,
              async (val) => {
                const obj: TDeletePlatform = {
                  entity: "platform_credential",
                  data: { id: row.id },
                };
                const result = await deleteRow.mutateAsync(obj);
                if (result.data.is_success) {
                  showSuccessAlert(
                    "Success!",
                    "Platform credential removed!",
                    () => {
                      dispatch(handleRefresh("platformCredential"));
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
              }
            )
          }
        >
          Delete
        </RippleButton>
      );
    },
  },
  {
    name: <Edit3 size={17} />,
    minWidth: "91px",
    cell: (row: any) => {
      const [isOpen, setIsOpen] = useState<boolean>(false);
      return (
        <>
          {isOpen && (
            <AddCredentialModal
              isOpen={isOpen}
              onToggle={() => setIsOpen((old) => !old)}
              idDetail={row.id}
            />
          )}
          <RippleButton
            color="link"
            className="p-0"
            size="sm"
            onClick={() => setIsOpen(true)}
          >
            Edit
          </RippleButton>
        </>
      );
    },
  },
];
