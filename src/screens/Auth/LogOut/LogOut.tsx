import { FC } from "react";

import { LogOut as LogOutComponent } from "@src/components/auth/LogOut";

import "@styles/react/pages/page-authentication.scss";

const LogOut: FC = (): JSX.Element => {
  return <LogOutComponent />;
};

export { LogOut };
