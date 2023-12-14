// ** Import from React
import { FC } from "react";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { Register as RegisterComp } from "@src/components/auth/Register";

const Register: FC = (): JSX.Element => {
  return <RegisterComp />;
};

export { Register };
