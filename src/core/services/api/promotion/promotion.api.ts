import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import {
  TCreatePromotion,
  TDeletePromotion,
  TEditPromotion,
  TGetPromotionList,
} from "./type";

const createPromotion = (
  obj: TCreatePromotion
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/membership/admin/promotions", obj);

const editPromotion = (
  obj: TEditPromotion
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/membership/admin/promotions", obj);

const getPromotionList = (
  obj: TGetPromotionList
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/membership/admin/promotions", { params: obj });

const removePromotion = (
  obj: TDeletePromotion
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/membership/admin/promotions", { data: obj });

export const useCreatePromotion = () => useMutation(createPromotion);

export const useGetPromotionList = () => useMutation(getPromotionList);

export const useRemovePromotion = () => useMutation(removePromotion);

export const useEditPromotion = () => useMutation(editPromotion);
