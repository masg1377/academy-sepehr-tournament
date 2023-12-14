import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import {
  TChangeAPIKeyStatus,
  TDiagnosticClientCredentials,
  TGetAPIKey,
  TGetAPIKeyResponse,
  TGetClientCredentials,
  TRegenerateAPIKey,
  TResetApiKey,
} from "./type";

const getAPIMgmtList = (
  obj: TGetAPIKey
): Promise<AxiosResponse<IAxiosResult<TGetAPIKeyResponse>>> =>
  Http.post("/admin/apikey-manager/list", obj);

const getAPIMgmtCredential = (
  obj: TGetClientCredentials
): Promise<AxiosResponse<IAxiosResult<string>>> =>
  Http.post("/admin/client-credentials", obj);

const resetAPIKeyQuota = (
  obj: TResetApiKey
): Promise<AxiosResponse<IAxiosResult<string>>> =>
  Http.post("/admin/api-quota", obj);

const regenerateAPIKey = (
  obj: TRegenerateAPIKey
): Promise<AxiosResponse<IAxiosResult<{ api_key: string }>>> =>
  Http.post("/admin/api-key", obj);

const regenerateClientId = (
  obj: TRegenerateAPIKey
): Promise<AxiosResponse<IAxiosResult<{ client_id: string }>>> =>
  Http.post("/admin/rotate-client-id", obj);

const changeApiKeyStatus = (
  obj: TChangeAPIKeyStatus
): Promise<AxiosResponse<IAxiosResult<string>>> =>
  Http.put("/admin/api-key", obj);

const diagnosticAPIMgmt = (
  obj: TDiagnosticClientCredentials
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/admin/diagnostic", { params: obj });

export const useGetAPIMgmtList = () => useMutation(getAPIMgmtList);

export const useResetAPIKeyQuota = () => useMutation(resetAPIKeyQuota);

export const useGetAPIMgmtCredential = () => useMutation(getAPIMgmtCredential);

export const useRegenerateAPIKey = () => useMutation(regenerateAPIKey);

export const useRegenerateClientId = () => useMutation(regenerateClientId);

export const useChangeApiKeyStatus = () => useMutation(changeApiKeyStatus);
export const useDiagnosticAPIMgmt = () => useMutation(diagnosticAPIMgmt);
