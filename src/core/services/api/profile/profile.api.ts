import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";

const updateProfile = (obj: any): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/rf-backend/profile-setup", obj);

const getProfile = (): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/rf-backend/profile-detail");
const getProfessionList = (): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/profile-setup/professions-list/");
export const useUpdateProfile = () => useMutation(updateProfile);
export const useGetProfile = () => useQuery(["useGetProfile"], getProfile);
export const useGetProfessionList = () =>
  useQuery(["useGetProfessionList"], getProfessionList);
