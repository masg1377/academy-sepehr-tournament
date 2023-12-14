import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.idtoken.interceptor";
import HttpAccess from "../../interceptors/http.interceptor";

const SuggestionHashtag = (obj: {
  hashtag_name: string;
  hashtag_category_type?: "user_expertise" | "user_interests" | "listing_view";
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/suggestion/hashtag/normal/", obj);

export const useSuggestionHashtag = () => useMutation(SuggestionHashtag);

const GetLocationSuggest = (obj: {
  q: string;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/location/suggest?q=" + obj.q);

const GetCountrySuggest = (obj: {
  q: string;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  HttpAccess.get("/admin/system-country-list");

const getLocationDetail = (obj: {
  q: string;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.get("/location/get?q=" + obj.q);

const getListOfZipCodes = (obj: {
  zipcode: string;
  limit?: number;
  offset?: number;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/location/zipcode", obj);

export const useGetLocationSuggest = () => useMutation(GetLocationSuggest);

export const useGetLocationDetail = () => useMutation(getLocationDetail);

export const useGetListOfZipCodes = () => useMutation(getListOfZipCodes);

export const useGetCountrySuggest = () => useMutation(GetCountrySuggest);
