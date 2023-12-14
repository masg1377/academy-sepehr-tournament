import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.interceptor";
import HttpId from "../../interceptors/http.idtoken.interceptor";
import {
  TAddMultiLang,
  TDeleteMultiLang,
  TEditMultiLang,
  TEditPublishMultiLang,
  TMultiLang,
} from "./type";

const getListOfMultiLang = (
  obj: TMultiLang
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  HttpId.get("/multilanguage/dictionaries/" + obj.action, { params: obj });

const getMultiLangDetail = (
  obj: TMultiLang
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  HttpId.get("/multilanguage/dictionaries/" + obj.action, { params: obj });

const addMultiLang = (
  obj: TAddMultiLang
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/multilanguage/dictionaries/add", obj);

const editMultiLangPublished = (
  obj: TEditPublishMultiLang
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/multilanguage/dictionaries/publish", obj);

const editMultiLang = (
  obj: TEditMultiLang
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.put("/multilanguage/dictionaries/edit", obj);

const deleteMultiLang = (
  obj: TDeleteMultiLang
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.delete("/multilanguage/dictionaries/" + obj.action, {
    data: {
      id: obj.id,
    },
  });

export const useGetListOfMultiLang = () => useMutation(getListOfMultiLang);

export const useGetMultiLangDetail = () => useMutation(getMultiLangDetail);

export const useAddMultiLang = () => useMutation(addMultiLang);

export const useEditMultiLangPublished = () =>
  useMutation(editMultiLangPublished);

export const useEditMultiLang = () => useMutation(editMultiLang);

export const useDeleteMultiLang = () => useMutation(deleteMultiLang);
