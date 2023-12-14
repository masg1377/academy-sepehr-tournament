import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosEntityResult } from "./../../../model/axios-result.model";
//import Http from "../../interceptors/http.interceptor";
import Http from "../../interceptors/http.interceptor";
import { TGetEntities } from "./type";

// const getListOfEntity = async (
//   obj: TGetEntities
// ): Promise<AxiosResponse<IAxiosResult<any>>> => {
//   const clientTokens: any = await getClientTokens();
//   return axios.post(
//     "https://2dyp3kylcc.execute-api.us-east-1.amazonaws.com/Development/admin/entities/" + obj.entity,
//     { data: obj.data },
//     { headers: { Authorization: clientTokens ? clientTokens.accessToken : "" } }
//   );
// };

const getListOfEntity = (
  obj: TGetEntities
): Promise<AxiosResponse<IAxiosEntityResult<any>>> =>
  Http.post("/admin/entities/" + obj.entity, { data: obj.data });

export const useGetListOfEntity = () => useMutation(getListOfEntity);
