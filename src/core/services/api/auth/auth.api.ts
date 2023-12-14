import { IAxiosResult } from "./../../../model/axios-result.model";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import {
  changePassword,
  confirmSignUpUser,
  forgotPassword,
  forgotPasswordSubmit,
  getCurrentAuthenticatedUser,
  resendCode,
  signinUser,
  signUpUser,
} from "../../common/authentication.services";
import { getCurrentUserSession } from "./../../common/authentication.services";
import Http from "../../interceptors/http.interceptor";
import { TCreateStaff, TCreateStaffUser } from "./type";

const addStaff = (
  obj: TCreateStaff
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("/rf-backend/add-staff", obj);

const signUpStaffUser = (
  obj: TCreateStaffUser
): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("rf-backend/signup", obj);

const changePasswordFunc = (obj: {
  user: string;
  currentPass: string;
  newPass: string;
}): Promise<any> =>
  changePassword(obj.user, {
    currentPass: obj.currentPass,
    newPass: obj.newPass,
  });

const emailAuthorization = (obj: {
  email: string;
}): Promise<AxiosResponse<IAxiosResult<any>>> =>
  Http.post("rf-backend/authorization", obj);

const forgotPasswordFunc = (email: string): Promise<any> =>
  forgotPassword(email);

const forgotPasswordSubmitFunc = (obj: {
  email: string;
  validationCode: string;
  newPass: string;
}): Promise<any> =>
  forgotPasswordSubmit(obj.email, obj.validationCode, obj.newPass);

const signinUserFunc = (obj: {
  username: string;
  password: string;
}): Promise<any> => signinUser(obj.username, obj.password);

const resendVerificationCode = (username: string): Promise<any> =>
  resendCode(username);

export const useResendVerificationCode = () =>
  useMutation(resendVerificationCode);

export const useSigninUser = () => useMutation(signinUserFunc);

export const useForgotPassword = () => useMutation(forgotPasswordFunc);

export const useEmailAuthorization = () => useMutation(emailAuthorization);

export const useForgotPasswordSubmit = () =>
  useMutation(forgotPasswordSubmitFunc);

const signUpUserFunc = (obj: any): Promise<any> => signUpUser(obj);

const getCurrentAuthenticatedUserFunc = (_: any = undefined): Promise<any> =>
  getCurrentAuthenticatedUser();

const getCurrentUserSessionFunc = (_: any = undefined): Promise<any> =>
  getCurrentUserSession();

export const useSignUpUser = () => useMutation(signUpUserFunc);

const confirmSignUpUserFunc = (obj: {
  username: any;
  fields: any;
  options: any;
}): Promise<any> => confirmSignUpUser(obj.username, obj.fields, obj.options);

export const useConfirmSignUpUser = () => useMutation(confirmSignUpUserFunc);

export const useGetCurrentAuthenticatedUser = () =>
  useMutation(getCurrentAuthenticatedUserFunc);

export const useGetCurrentUserSession = () =>
  useMutation(getCurrentUserSessionFunc);

export const useSignUpStaffUser = () => useMutation(signUpStaffUser);

export const useChangePassword = () => useMutation(changePasswordFunc);

export const useAddStaff = () => useMutation(addStaff);
