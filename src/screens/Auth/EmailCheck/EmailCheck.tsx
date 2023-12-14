import { FC } from "react";

import { EmailCheck as EmailCheckComp } from "@src/components/auth/EmailCheck";

import "@styles/react/pages/page-authentication.scss";

const EmailCheck: FC = (): JSX.Element => {
  return <EmailCheckComp />;
};

export { EmailCheck };
