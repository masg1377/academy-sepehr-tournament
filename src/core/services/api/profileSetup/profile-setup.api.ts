import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.idtoken.interceptor";
import HttpAccess from "../../interceptors/http.interceptor";

const getProfileDetails = (
  obj: string[]
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/profile-setup/profile-detail?keys=" + obj.join(","));

const getProfileDetailsById = (obj: {
  keys: string[];
  user_id: number;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  HttpAccess.get(
    `/rf-backend/profile-detail/${obj.user_id}?keys=` + obj.keys.join(",")
  );

export const useGetProfileDetails = () => useMutation(getProfileDetails);
export const useGetProfileDetailsById = () =>
  useMutation(getProfileDetailsById);
