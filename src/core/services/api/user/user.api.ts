import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import { TActivateUser } from "./type";

const activeUser = (
  obj: TActivateUser
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/user/activate", obj);

const deactiveUser = (
  obj: TActivateUser
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/user/deactivate", obj);

export const useActiveUser = () => useMutation(activeUser);

export const useDeactiveUser = () => useMutation(deactiveUser);
