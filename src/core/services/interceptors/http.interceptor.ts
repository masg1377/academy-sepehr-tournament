import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IsIncludes } from "../../utils/Utils";
import { getClientTokens } from "../common/authentication.services";
import toast from "react-hot-toast";
import { RunModeEnum } from "@src/core/enum/run-modes.enum";
import { clearStorage, getItem } from "../common/storage.service";

const MainUrl: string | undefined = process.env.REACT_APP_PUBLIC_PATH;

const RUN_MODE: string | undefined = process.env.REACT_APP_RUN_MODE;
const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

const instance: AxiosInstance = axios.create({
  baseURL: MainUrl,
  // withCredentials: false,
});

let status = true;

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    try {
      // } catch (error) {}
      const errorStatus = error.response.status;
      // console.log(error);
      console.log("----errorr----", error.response, error.response.status);
      // if (!originalRequest?.headers?.Authorization) {
      //   toast.loading("Logging out...");
      //   setTimeout(() => {
      //     clearStorage();
      //     window.location.pathname = "/";
      //   }, 1000);
      // }
      if (
        errorStatus === 401 &&
        // (errorStatus === 0 && error.message === "Network Error")) &&
        status
      ) {
        status = false;
        if (IsIncludes(error.config.url, "uploader")) {
        }
        // showToast(["Failed to upload..."], ToastTypes.error);
        else {
          // showToast(["Logging out..."], ToastTypes.error);
          setTimeout(() => {
            // Logout();
          }, 1000);
        }
      }

      // toast.error("Error occured! Please try again");
      const expectedError: boolean =
        error.response &&
        error.response.state >= 400 &&
        error.response.status < 500;
      if (!expectedError) {
        try {
        } catch (er) {}
      }
    } catch (er) {
      console.log(er);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    if (config.headers) {
      const user: any = getItem("user");
      const token = user ? JSON.parse(user)?.token : null;
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  }
);

const methods = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};

export default methods;
