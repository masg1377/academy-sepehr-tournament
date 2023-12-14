import React, { useState } from "react";
import {
  Copy,
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
import { ResetApi } from "./ResetApi/ResetApi";
import { RegenerateApi } from "./RegenerateApi/RegenerateApi";
import { RegenerateClient } from "./RegenerateClient/RegenerateClient";
import { ApiChangeStatus } from "./ApiChangeStatus/ApiChangeStatus";

export const columns: any = [
  {
    name: "#",
    width: "90px",
    // sortable: (row: any) => row.id,
    selector: (row: any) => row.row_id,
  },
  {
    name: "RF User ID",
    minWidth: "160px",
    sortable: (row: TGetAPIKeyResponseObj) => row.user_id,
    selector: (row: TGetAPIKeyResponseObj) => row.user_id,
    cell: (row: any) => {
      return <div>{row.user_id || "-"}</div>;
    },
  },
  {
    name: "RF Username",
    minWidth: "160px",
    selector: (row: TGetAPIKeyResponseObj) => row.username,
    cell: (row: any) => {
      return <div>{row.username || "-"}</div>;
    },
  },
  {
    name: "Cognito username",
    minWidth: "200px",
    selector: (row: TGetAPIKeyResponseObj) => row.cognito_username,
    cell: (row: TGetAPIKeyResponseObj) => {
      return (
        <>
          <CustomTooltip placement="bottom" target={"cogUserName" + row.id}>
            {row.cognito_username}
          </CustomTooltip>
          <span
            id={"cogUserName" + row.id}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.cognito_username || "-"}
          </span>
        </>
      );
    },
  },
  {
    name: "API Key ID",
    minWidth: "160px",
    selector: (row: TGetAPIKeyResponseObj) => row.api_key_aws_id,
    cell: (row: any) => {
      return (
        <>
          <CustomTooltip placement="bottom" target={"apiName" + row.id}>
            {row.api_key_aws_id}
          </CustomTooltip>
          <span
            id={"apiName" + row.id}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.api_key_aws_id || "-"}
          </span>
        </>
      );
    },
  },
  {
    name: "API Key Name",
    minWidth: "160px",
    selector: (row: TGetAPIKeyResponseObj) => row.name,
    cell: (row: TGetAPIKeyResponseObj) => {
      return (
        <>
          <CustomTooltip placement="bottom" target={"apiName" + row.id}>
            {row.name}
          </CustomTooltip>
          <span
            id={"apiName" + row.id}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.name || "-"}
          </span>
        </>
      );
    },
  },
  {
    name: "API Key",
    minWidth: "160px",
    selector: (row: TGetAPIKeyResponseObj) => row.api_key_aws_id,
    cell: (row: TGetAPIKeyResponseObj) => {
      const [apiKey, setApiKey] = useState<string | undefined>("");
      const getCredentials = useGetAPIMgmtCredential();
      const getCredentialsCopy = useGetAPIMgmtCredential();

      const getApiKey = (copy?: boolean) => {
        const getData = copy ? getCredentialsCopy : getCredentials;
        getData.mutate(
          {
            usage_type: "api_key",
            user_api_key_id: row.id,
          },
          {
            onSuccess: (res) => {
              if (res.data.is_success) {
                setApiKey(res.data.result);
                if (copy) onCopy(res.data.result);
              }
            },
          }
        );
      };

      const onCopy = (res?: string) => {
        navigator.clipboard.writeText("" + res);
        toast.success("API Key copied successfully");
      };

      return (
        <RowWrappers md={5} sm={5}>
          <UncontrolledDropdown>
            <DropdownToggle
              tag="span"
              onClick={apiKey ? () => {} : () => getApiKey()}
            >
              <Eye className="cursor-pointer" size={19} />
            </DropdownToggle>
            <DropdownMenuPortal>
              <span className="align-middle ms-50 me-50 fs-7 text-darker">
                {getCredentials.isLoading ? "Loading..." : apiKey || "Not Set"}
              </span>
            </DropdownMenuPortal>
          </UncontrolledDropdown>
          {getCredentialsCopy.isLoading ? (
            <Loader size={19} />
          ) : (
            <Copy
              className="cursor-pointer"
              size={19}
              onClick={apiKey ? () => onCopy(apiKey) : () => getApiKey(true)}
            />
          )}
        </RowWrappers>
      );
    },
  },
  {
    name: "Usage plan",
    minWidth: "160px",
    selector: (row: TGetAPIKeyResponseObj) => row.usage_plan_name,
    cell: (row: any) => {
      return (
        <>
          <CustomTooltip placement="bottom" target={"usagePlanId" + row.id}>
            {row.usage_plan_name}
          </CustomTooltip>
          <div
            id={"usagePlanId" + row.id}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.usage_plan_name || "-"}
          </div>
        </>
      );
    },
  },
  {
    name: "Record Status",
    minWidth: "160px",
    selector: (row: TGetAPIKeyResponseObj) => row.is_active,
    cell: (row: TGetAPIKeyResponseObj) => {
      return (
        <Badge color={row.is_active ? "light-success" : "light-warning"} pill>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    name: "App Client ID",
    minWidth: "160px",
    selector: (row: TGetAPIKeyResponseObj) => row.client_id,
    cell: (row: TGetAPIKeyResponseObj) => {
      return (
        <>
          <CustomTooltip placement="bottom" target={"apiClientId" + row.id}>
            {row.client_id}
          </CustomTooltip>
          <span
            id={"apiClientId" + row.id}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.client_id || "-"}
          </span>
        </>
      );
    },
  },
  {
    name: "Invoice ID",
    minWidth: "160px",
    selector: (row: TGetAPIKeyResponseObj) => row.invoice_id,
    cell: (row: any) => {
      return <div>{row.invoice_id || "-"}</div>;
    },
  },
  {
    name: "Diagnostic",
    // allowOverflow: true,
    minWidth: "160px",
    cell: (row: any) => {
      const navigate = useNavigate();
      return (
        <div className="d-flex">
          <RippleButton
            onClick={() => {
              navigate(`/api-mgmt/${row.id}`);
            }}
            size="sm"
            color="primary"
          >
            Diagnostic
          </RippleButton>
        </div>
      );
    },
  },

  {
    name: "Actions",
    allowOverflow: true,
    cell: (row: any) => {
      const [resetAPIModal, setResetAPIModal] = useState<boolean>(false);
      const [changeApiStatus, setChangeApiStatus] = useState<boolean>(false);
      const [regenerateClientModal, setRegenerateClientModal] =
        useState<boolean>(false);
      const [regenerateAPIModal, setRegenerateAPIModal] =
        useState<boolean>(false);

      return (
        <div className="d-flex">
          {resetAPIModal && (
            <ResetApi
              isOpen={resetAPIModal}
              onToggle={() => {
                setResetAPIModal(false);
                row.setRefetch((old: boolean) => !old);
              }}
              id={row.id}
            />
          )}
          {regenerateAPIModal && (
            <RegenerateApi
              isOpen={regenerateAPIModal}
              onToggle={() => {
                setRegenerateAPIModal(false);
                row.setRefetch((old: boolean) => !old);
              }}
              id={row.id}
            />
          )}
          {regenerateClientModal && (
            <RegenerateClient
              isOpen={regenerateClientModal}
              onToggle={() => {
                setRegenerateClientModal(false);
                row.setRefetch((old: boolean) => !old);
              }}
              id={row.id}
            />
          )}
          {changeApiStatus && (
            <ApiChangeStatus
              isOpen={changeApiStatus}
              onToggle={() => {
                setChangeApiStatus(false);
                row.setRefetch((old: boolean) => !old);
              }}
              isActive={row.is_active}
              id={row.id}
            />
          )}
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenuPortal>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setRegenerateClientModal(true);
                }}
              >
                {/* <Copy size={15} /> */}
                <span className="align-middle ms-50">
                  Regenerate App Client ID
                </span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setRegenerateAPIModal(true);
                }}
              >
                {/* <Trash size={15} /> */}
                <span className="align-middle ms-50">Generate New API Key</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setResetAPIModal(true);
                }}
              >
                {/* <Trash size={15} /> */}
                <span className="align-middle ms-50">Reset API Key Quota</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setChangeApiStatus(true);
                }}
              >
                {/* <Trash size={15} /> */}
                <span className="align-middle ms-50">
                  {row.is_active ? "Deactive" : "Active"} API Key
                </span>
              </DropdownItem>
            </DropdownMenuPortal>
          </UncontrolledDropdown>
          {/* <FileText
            size={15}
            className="me-1"
            onClick={() => navigate("/mls-list/" + row.id)}
          />*/}
        </div>
      );
    },
  },
];
