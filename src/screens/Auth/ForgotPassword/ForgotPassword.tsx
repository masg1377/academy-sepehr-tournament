import { FC } from "react";

import "@styles/react/pages/page-authentication.scss";
import { ForgotPass } from "@src/components/auth/ForgotPass/ForgotPass";

const ForgotPassword: FC = (): JSX.Element => {
  return <ForgotPass />;
};

export { ForgotPassword };
