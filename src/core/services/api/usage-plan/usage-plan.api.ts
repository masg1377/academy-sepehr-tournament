import { IAxiosResult } from "@src/core/model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import { AxiosResponse } from "axios";
import {
  TCreateUsagePlan,
  TDeleteUsagePlan,
  TEditUsagePlan,
  TGetUsagePlanParams,
  TUsagePlanItem,
} from "./type";
import { useMutation } from "react-query";

const getApiUsages = (
  obj: TGetUsagePlanParams
): Promise<AxiosResponse<IAxiosResult<TUsagePlanItem[]>>> =>
  Http.get("/admin/usage_plans", { params: obj });

const createUsagePlan = (
  obj: TCreateUsagePlan
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/admin/usage_plans", obj);

const deleteUsagePlan = (
  obj: TDeleteUsagePlan
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/admin/usage_plans", obj);

const editUsagePlan = (
  obj: TEditUsagePlan
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/admin/usage_plans", obj);

export const useGetApiUsages = () => useMutation(getApiUsages);
export const useCreateUsagePlan = () => useMutation(createUsagePlan);
export const useDeleteUsagePlan = () => useMutation(deleteUsagePlan);
export const useEditUsagePlan = () => useMutation(editUsagePlan);
