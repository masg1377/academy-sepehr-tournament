import { IAxiosResult } from "@src/core/model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

const getListOfGroupsV2 = (
  obj?: any
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/membership/admin/packages_v2?source=realtyfeed");

export const useGetListOfGroupsV2 = () => useMutation(getListOfGroupsV2);
