import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import {
  TCreateDiscount,
  TDeleteDiscount,
  TEditDiscount,
  TGetDiscountList,
} from "./type";

const createDiscount = (
  obj: TCreateDiscount
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/membership/admin/discounts", obj);

const editDiscount = (
  obj: TEditDiscount
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/membership/admin/discounts", obj);

const getDiscountList = (
  obj: TGetDiscountList
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/membership/admin/discounts", { params: obj });

const removeDiscount = (
  obj: TDeleteDiscount
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/membership/admin/discounts", { data: obj });

export const useCreateDiscount = () => useMutation(createDiscount);

export const useGetDiscountList = () => useMutation(getDiscountList);

export const useRemoveDiscount = () => useMutation(removeDiscount);

export const useEditDiscount = () => useMutation(editDiscount);
