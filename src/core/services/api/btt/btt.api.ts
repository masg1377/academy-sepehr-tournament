import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import { TAddBtt, TEditBtt } from "./type";

const createBtt = (obj: TAddBtt): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/btt/add-edit", obj);

const editBtt = (obj: TEditBtt): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/btt/add-edit", obj);

const addPermission = (
  obj: {
    type: string;
    name: string;
    is_boolean: boolean;
  }[]
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/permission/add", obj);

const deleteBtt = (obj: {
  id: number;
}): Promise<AxiosResponse<IAxiosResult<any>>> => Http.post("/btt/delete", obj);

const assignPermission = (obj: {
  assign_data?: { btt_id: number; data: { id: number; value: string }[] };
  discharge_data?: number[];
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/permission/assign", obj);

const deletePermission = (obj: {
  id: number;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/permission/delete", obj);

export const useCreateBtt = () => useMutation(createBtt);

export const useAddPermission = () => useMutation(addPermission);

export const useEditBtt = () => useMutation(editBtt);

export const useAssignPermission = () => useMutation(assignPermission);

export const useDeleteBtt = () => useMutation(deleteBtt);

export const useDeletePermission = () => useMutation(deletePermission);
