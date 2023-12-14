import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import { TAssignRoleToStaff } from "./type";

const assignRoleToStaff = (
  obj: TAssignRoleToStaff
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/rf-backend/assign-role", obj);

export const useAssignRoleToStaff = () => useMutation(assignRoleToStaff);
