import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosResult } from "../../../model/axios-result.model";
import Http from "../../interceptors/http.idtoken.interceptor";

const loadImage = (image: string) => Http.get(image);

const uploadedFile = ({
  data,
  onUploadProgress,
}: {
  data: any;
  onUploadProgress?: (num: number, size: number) => void;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/uploader", data, {
    onUploadProgress: (progressEvent) =>
      onUploadProgress
        ? onUploadProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total),
            progressEvent.loaded
          )
        : {},
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const useFileUploader = () => useMutation(uploadedFile);
export const useLoadImage = () => useMutation(loadImage);
