import { Auth } from "aws-amplify";
import decode from "jwt-decode";
// import Logout from "../../../components/common/Logout/Logout";
// import Config from "../../../configs/config";
// import { sendAsyncRequest } from "./old-api-call.services";
import {
  getItem,
  getItemGeneric,
  removeItem,
  setItem,
  setItemGeneric,
} from "./storage.service";
import axios from "axios";
import Http from "../interceptors/http.interceptor";

type TClientTokens = {
  idToken: string;
  accessToken: string;
  refreshToken: any;
};

export const getClientTokens = async (): Promise<TClientTokens | null> => {
  try {
    const clientTokens = await Auth.currentSession();
    return {
      idToken: clientTokens.getIdToken().getJwtToken(),
      accessToken: clientTokens.getAccessToken().getJwtToken(),
      refreshToken: clientTokens.getRefreshToken(),
    };
  } catch (error) {
    return null;
  }
};

type TAuthenticateStatus = {
  isAuth: boolean;
  // isInvKey: boolean;
  serverError?: boolean;
};

export const getAuthenticateStatus = async (): Promise<TAuthenticateStatus> => {
  try {
    const authUser = await Auth.currentAuthenticatedUser();

    return {
      isAuth: !!authUser["signInUserSession"],
      // isInvKey: await userHasInvitationKey(),
    };
  } catch (e) {
    return {
      isAuth: false,
      // isInvKey: false,
    };
  }
};

// export const userHasInvitationKey = async (): Promise<boolean> => {
//   try {
//     const user = await sendAsyncRequest("/user", "get", {});
//     if (user.status === 500) {
//       return false;
//     }
//     return !!user.body.body.invite_code;
//   } catch (e) {
//     return false;
//   }
// };

export const getCurrentUser = async () => {
  try {
    const clientTokens = await Auth.currentSession();
    return {
      ...clientTokens.getIdToken().decodePayload(),
    };
  } catch (e) {
    return null;
  }
};

export const publicRouteRule = async (that: any): Promise<void> => {
  const authObj = await getAuthenticateStatus();
  if (authObj.serverError) {
    // that.props.history(Config.ROUTES.serverError);
  }
  if (authObj.isAuth) {
    that.props.history("/dashboard");
  }
};

export const publicRouteRuleNew = async (history: any): Promise<void> => {
  const authObj = await getAuthenticateStatus();
  if (authObj.serverError) {
    // history(Config.ROUTES.serverError);
  }
  if (authObj.isAuth) {
    history("/dashboard");
  }
};

export const forgotPassword = async (email: string) =>
  await Auth.forgotPassword(email);

export const forgotPasswordSubmit = async (
  email: string,
  validationCode: string,
  newPass: string
) => await Auth.forgotPasswordSubmit(email, validationCode, newPass);

export const signinUser = async (username: string, password: string) =>
  await Http.post("/Sign/Login", {
    phoneOrGmail: username,
    password,
    rememberMe: true,
  });

const MainUrl: string | undefined = process.env.REACT_APP_PUBLIC_DEV_PATH;

// export const getUserServer = async (): Promise<any> => {
//   try {
//     await Auth.currentAuthenticatedUser();
//     const user = await sendAsyncRequest(MainUrl + "/user", "get", {});
//     if (user.status === 500) {
//       return false;
//     }
//     return user.body;
//   } catch (e) {
//     return false;
//   }
// };

export const refreshTokenCallback = (
  requestStatus: number,
  responseJson: any
) => {
  if (requestStatus === 200) {
    setItemGeneric("clientKey", responseJson.AuthenticationResult.IdToken);
    setItem("clientTokens", {
      accessToken: responseJson.AuthenticationResult.AccessToken,
      refreshToken: responseJson.AuthenticationResult.RefreshToken,
    });
  } else {
    removeItem("clientKey");
    removeItem("clientTokens");
    removeItem("userData");
    window.location.href = "/";
  }
};
// export const getUserInfo = () => {
//   let userInfo: string | boolean | null = getItem(Config.USER_INFO);
//   if (userInfo)
//     return Promise.resolve(
//       JSON.parse(typeof userInfo === "string" ? userInfo : "{}")
//     );
//   else {
//     return new Promise((resolve, reject) => {
//       sendAsyncRequest("/user/get-name-pic", "GET", {}).then((result) => {
//         if (!result.body.result) reject();
//         else {
//           userInfo = result.body.result;
//           setItem(Config.USER_INFO, userInfo);
//           resolve(userInfo);
//         }
//       });
//     });
//   }
// };

export const getCurrentUserData = (): any | boolean => {
  const data = getItem("userData");
  if (data) {
    return JSON.parse(typeof data === "string" ? data : "");
  }
  return false;
};

/**
 * Check if clientKey exist or not
 *
 * @return clientKey or false
 * @public
 */
export const getClientKey = (): string | boolean | null => {
  const clientKey = getItemGeneric("clientKey");
  if (clientKey) {
    return clientKey;
  }
  return false;
};

export const profileSetupStatus = async (): Promise<boolean> => {
  const token: TClientTokens | null = await getClientTokens();
  const decoded_token: any = token ? decode(token ? token.idToken : "") : null;
  // console.log(decoded_token.profile_setup_status);
  return decoded_token
    ? decoded_token.profile_setup_status === "incomplete"
      ? false
      : true
    : true;
};

export const getPermissionList = async (): Promise<any> => {
  const token: TClientTokens | null = await getClientTokens();
  const decoded_token: any = token ? decode(token ? token.idToken : "") : null;
  // console.log(decoded_token.profile_setup_status);
  return decoded_token && decoded_token.permissions
    ? JSON.parse(decoded_token.permissions)
    : [];
};

export const signUpUser = async (data: any) => {
  return await Auth.signUp(data);
};

export const confirmSignUpUser = async (
  username: any,
  fields: any,
  options: any
) => {
  return await Auth.confirmSignUp(username, fields, options);
};
export const getCurrentAuthenticatedUser = async () => {
  return await Auth.currentAuthenticatedUser();
};
export const getCurrentUserSession = async () => {
  return await Auth.currentSession();
};

export const resendCode = async (username: string) =>
  Auth.resendSignUp(username);

export const changePassword = async (
  user: any,
  obj: { currentPass: string; newPass: string }
) => Auth.changePassword(user, obj.currentPass, obj.newPass);
