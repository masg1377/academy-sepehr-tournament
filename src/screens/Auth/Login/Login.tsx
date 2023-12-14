import { FC } from "react";

import { Login as LoginComponent } from "@src/components/auth/Login";

import "@styles/react/pages/page-authentication.scss";

const Login: FC = (): JSX.Element => {
  return <LoginComponent />;
};

export { Login };
