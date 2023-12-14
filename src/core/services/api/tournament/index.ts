import { AxiosResponse } from "axios";
import HttpAccess from "../../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";

const getTournament = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.get("/Tournament/GetTournament");

const addMlsServer = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.post("/Tournament/AddTournament", obj);

export const useGetTournament = () =>
  useQuery(["getTournament"], getTournament);

export const useAddTournament = () => useMutation(addMlsServer);
