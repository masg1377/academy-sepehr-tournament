import { AxiosResponse } from "axios";
import HttpAccess from "../../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";

const getTournament = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.get("/Tournament/GetTournament");

const getCheckLists = (): Promise<AxiosResponse<any>> =>
  HttpAccess.get("/Tournament/MainCheckLists");

const getListOfTurnamentReferes = (obj: {
  TournamentId: string;
  refeerUserId?: number;
}): Promise<AxiosResponse<any>> =>
  HttpAccess.get("/Tournament/ListOfTurnamentReferes", { params: obj });
const getListAvrageCheckListAdmin = (obj: {
  TournamentId: string;
  UserId?: number;
  GroupId?: number;
}): Promise<AxiosResponse<any>> =>
  HttpAccess.get("/Tournament/ListAvrageCheckListAdmin", { params: obj });

const getTournamentGroupList = (obj: {
  TournamentId: string;
}): Promise<AxiosResponse<any>> =>
  HttpAccess.get("/Tournament/TournamentGroupList", { params: obj });

const getListOfReferesUser = (): Promise<AxiosResponse<any>> =>
  HttpAccess.get("/Tournament/ListOfReferesUser");

const getTournamentCheckLists = (id: string): Promise<AxiosResponse<any>> =>
  HttpAccess.get("/Tournament/TournamentCheckLists", {
    params: { TournamentId: id },
  });

const addMlsServer = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.post("/Tournament/AddTournament", obj);

const addTournamentCheckListCommand = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.post("/Tournament/AddTournamentCheckListCommand", obj);

const listSetAvrageForGroupCheckList = (
  obj: any
): Promise<AxiosResponse<any>> =>
  HttpAccess.post("/Tournament/ListSetAvrageForGroupCheckList", obj);

const addReferee = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.post("/Tournament/AddReferee", obj);

const addTournamentGroup = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.post("/Tournament/AddTournamentGroup", obj);

const deleteTournamentCheckList = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.delete("/Tournament/DeleteTournamentCheckList", { data: obj });

const deleteTournamentGroup = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.delete("/Tournament/DeleteTournamentGroup", { data: obj });

const deleteTurnamentReferes = (obj: any): Promise<AxiosResponse<any>> =>
  HttpAccess.delete("/Tournament/DeleteTurnamentReferes", { data: obj });

export const useGetTournament = () =>
  useQuery(["getTournament"], getTournament, {});

export const useGetCheckLists = () =>
  useQuery(["getCheckLists"], getCheckLists);

export const useGetListOfReferesUser = () =>
  useQuery(["getListOfReferesUser"], getListOfReferesUser);

export const useGetListOfTurnamentReferes = () =>
  useMutation(getListOfTurnamentReferes);
export const useGetListAvrageCheckListAdmin = () =>
  useMutation(getListAvrageCheckListAdmin);

export const useAddTournament = () => useMutation(addMlsServer);

export const useGetTournamentCheckLists = () =>
  useMutation(getTournamentCheckLists);

export const useAddTournamentCheckListCommand = () =>
  useMutation(addTournamentCheckListCommand);

export const useDeleteTournamentCheckList = () =>
  useMutation(deleteTournamentCheckList);

export const useDeleteTurnamentReferes = () =>
  useMutation(deleteTurnamentReferes);

export const useDeleteTournamentGroup = () =>
  useMutation(deleteTournamentGroup);

export const useAddReferee = () => useMutation(addReferee);

export const useGetTournamentGroupList = () =>
  useMutation(getTournamentGroupList);

export const useAddTournamentGroup = () => useMutation(addTournamentGroup);

export const useListSetAvrageForGroupCheckList = () =>
  useMutation(listSetAvrageForGroupCheckList);
