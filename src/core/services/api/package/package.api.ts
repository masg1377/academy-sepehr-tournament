import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import { TAddPackage, TAddPaymentMethod, TEditPaymentMethod } from "./type";

const createPackage = (
  obj: TAddPackage
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/membership/admin/packages", obj);

const deletePackage = (obj: {
  id: number;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/membership/admin/packages", { data: obj });

const editPackage = (
  obj: TEditPaymentMethod
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/membership/admin/packages", obj);

const createPackagePaymentInfo = (
  obj: TAddPaymentMethod
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/membership/admin/payment-methods", obj);

const editPackagePaymentInfo = (
  obj: TAddPaymentMethod
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/membership/admin/payment-methods", obj);

export const useCreatePackage = () => useMutation(createPackage);

export const useEditPackage = () => useMutation(editPackage);

export const useCreatePackagePaymentInfo = () =>
  useMutation(createPackagePaymentInfo);

export const useEditPackagePaymentInfo = () =>
  useMutation(editPackagePaymentInfo);

export const useDeletePackage = () => useMutation(deletePackage);
