import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import {
  TCreatePlatform,
  TCreatePlatformCredential,
  TDeletePlatform,
  TEditPlatform,
  TEditPlatformCredential,
  TGetPlatform,
  TGetPlatformList,
} from "./type";

const getPlatformCredential = (
  obj: TGetPlatformList
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/providers/platforms/" + obj.entity, {
    params: { data: obj.data },
  });

const getPlatform = (
  obj: TGetPlatformList
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/providers/platforms/" + obj.entity, {
    params: { data: obj.data },
  });

const getPlatformDetail = (obj: TGetPlatform) =>
  Http.get("/providers/platforms/" + obj.entity, {
    params: { data: obj.data },
  });

const createPlatform = (
  obj: TCreatePlatform
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/platforms/" + obj.entity, { data: obj.data });

const editPlatform = (
  obj: TEditPlatform
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/platforms/" + obj.entity, { data: obj.data });

const editPlatformCredential = (
  obj: TEditPlatformCredential
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/providers/platforms/" + obj.entity, { data: obj.data });

const createPlatformCredential = (
  obj: TCreatePlatformCredential
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/providers/platforms/" + obj.entity, { data: obj.data });

const deletePlatformCredential = (
  obj: TDeletePlatform
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/providers/platforms/" + obj.entity, {
    data: { data: obj.data },
  });

const deletePlatform = (
  obj: TDeletePlatform
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/providers/platforms/" + obj.entity, {
    data: { data: obj.data },
  });

export const useCreatePlatform = () => useMutation(createPlatform);
export const useEditPlatform = () => useMutation(editPlatform);
export const useCreatePlatformCredential = () =>
  useMutation(createPlatformCredential);

export const useGetPlatformCredential = () =>
  useMutation(getPlatformCredential);

export const useEditPlatformCredential = () =>
  useMutation(editPlatformCredential);

export const useDeletePlatformCredential = () =>
  useMutation(deletePlatformCredential);

export const useGetPlatform = () => useMutation(getPlatform);

export const useDeletePlatform = () => useMutation(deletePlatform);

export const useGetPlatformDetail = (obj: TGetPlatform) =>
  useQuery("getPlatformDetail", () => getPlatformDetail(obj));

export const useGetPlatformDetailMutation = () =>
  useMutation(getPlatformDetail);
