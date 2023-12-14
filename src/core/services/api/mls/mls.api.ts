import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import {
  TAddMlsAccessCredential,
  TAddMlsAccessPaymentFlatRateItems,
  TAddMlsAccessPaymentMethod,
  TAddMlsAccessPaymentRangeRateItems,
  TAddMlsAcess,
  TAddMlsConfig,
  TAddMlsDoc,
  TAddMlsServer,
  TAddRequest,
  TCreateRequestDocument,
  TDeleteRequestDocument,
  TEditMlsAccessCredential,
  TEditMlsAccessPaymentFlatRateItems,
  TEditMlsAccessPaymentMethod,
  TEditMlsAccessPaymentRangeRateItems,
  TEditMlsAcess,
  TEditMlsDoc,
  TEditMlsServer,
  TEditRequest,
  TEditRequestDocument,
  TGetMlsList,
  TGetRequest,
  TGetRequestDetail,
  TRemoveMls,
} from "./type";

const addMlsServer = (
  obj: TAddMlsServer
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const editMlsServer = (
  obj: TEditMlsServer
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const addClientRequest = (
  obj: TAddRequest
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-access-customer-requests/" + obj.entity, {
    data: obj.data,
  });

const editClientRequest = (
  obj: TEditRequest
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-access-customer-requests/" + obj.entity, {
    data: obj.data,
  });

const addClientRequestDoc = (
  obj: TCreateRequestDocument
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-access-customer-requests/" + obj.entity, {
    data: obj.data,
  });

const editClientRequestDoc = (
  obj: TEditRequestDocument
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-access-customer-requests/" + obj.entity, {
    data: obj.data,
  });

const removeClientRequestDoc = (
  obj: TDeleteRequestDocument
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/providers/mls/mls-access-customer-requests/" + obj.entity, {
    data: { data: obj.data },
  });

const getClientRequest = (
  obj: TGetRequest
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/providers/mls/mls-access-customer-requests/" + obj.entity, {
    params: { data: obj.data },
  });

const getClientRequestDetail = (
  obj: TGetRequestDetail
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/providers/mls/mls-access-customer-requests/" + obj.entity, {
    params: { data: obj.data },
  });

const addMlsAccessPaymentMethod = (
  obj: TAddMlsAccessPaymentMethod
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const addMlsAccessPaymentFlatRateItem = (
  obj: TAddMlsAccessPaymentFlatRateItems
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const editMlsAccessPaymentFlatRateItem = (
  obj: TEditMlsAccessPaymentFlatRateItems
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const addMlsAccessPaymentRangeRateItem = (
  obj: TAddMlsAccessPaymentRangeRateItems
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const editMlsAccessPaymentRangeRateItem = (
  obj: TEditMlsAccessPaymentRangeRateItems
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const editMlsAccessPaymentMethod = (
  obj: TEditMlsAccessPaymentMethod
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const getMlsServer = (
  obj: TGetMlsList
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/providers/mls/mls-servers/" + obj.entity, {
    params: { data: obj.data },
  });

const addMlsConfig = (
  obj: TAddMlsConfig
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const editMlsConfig = (
  obj: TAddMlsConfig
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const addMlsDoc = (
  obj: TAddMlsDoc
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const addMlsAccess = (
  obj: TAddMlsAcess
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const editMlsAccess = (
  obj: TEditMlsAcess
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const addMlsAccessCredential = (
  obj: TAddMlsAccessCredential
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const editMlsAccessCredential = (
  obj: TEditMlsAccessCredential
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const editMlsDoc = (
  obj: TEditMlsDoc
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/mls/mls-servers/" + obj.entity, { data: obj.data });

const getMls = (obj: TGetMlsList): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/providers/mls/mls-servers/" + obj.entity, {
    params: { data: obj.data },
  });

const removeMls = (
  obj: TRemoveMls
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/providers/mls/mls-servers/" + obj.entity, {
    data: { data: obj.data },
  });

export const useEditMlsServer = () => useMutation(editMlsServer);

export const useEditClientRequest = () => useMutation(editClientRequest);

export const useAddMlsServer = () => useMutation(addMlsServer);
export const useGetMlsList = () => useMutation(getMls);
export const useAddMlsDoc = () => useMutation(addMlsDoc);
export const useRemoveMls = () => useMutation(removeMls);
export const useAddMlsConfig = () => useMutation(addMlsConfig);
export const useEditMlsConfig = () => useMutation(editMlsConfig);
export const useEditMlsDoc = () => useMutation(editMlsDoc);
export const useGetMlsServer = () => useMutation(getMlsServer);
export const useAddMlsAccess = () => useMutation(addMlsAccess);
export const useAddMlsAccessCredential = () =>
  useMutation(addMlsAccessCredential);
export const useEditMlsAccess = () => useMutation(editMlsAccess);
export const useEditMlsAccessCredential = () =>
  useMutation(editMlsAccessCredential);
export const useAddMlsAccessPaymentMethod = () =>
  useMutation(addMlsAccessPaymentMethod);
export const useEditMlsAccessPaymentMethod = () =>
  useMutation(editMlsAccessPaymentMethod);
export const useAddMlsAccessPaymentFlatRateItem = () =>
  useMutation(addMlsAccessPaymentFlatRateItem);
export const useAddMlsAccessPaymentRangeRateItem = () =>
  useMutation(addMlsAccessPaymentRangeRateItem);
export const useAddClientRequest = () => useMutation(addClientRequest);
export const useGetClientRequest = () => useMutation(getClientRequest);
export const useGetClientRequestDetail = () =>
  useMutation(getClientRequestDetail);
export const useRemoveClientRequestDoc = () =>
  useMutation(removeClientRequestDoc);
export const useAddClientRequestDoc = () => useMutation(addClientRequestDoc);
export const useEditClientRequestDoc = () => useMutation(editClientRequestDoc);
export const useEditMlsAccessPaymentFlatRateItem = () =>
  useMutation(editMlsAccessPaymentFlatRateItem);
export const useEditMlsAccessPaymentRangeRateItem = () =>
  useMutation(editMlsAccessPaymentRangeRateItem);
