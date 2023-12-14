import { FC } from "react";
// ** Logo
import logo from "@src/assets/images/logo/logo.png";
import themeConfig from "@src/configs/themeConfig";

const SpinnerComponent: FC = (): JSX.Element => {
  return (
    <div className="fallback-spinner app-loader">
      <img
        className="fallback-logo"
        src={themeConfig.app.appLogoImage_r}
        alt="logo"
      />
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export { SpinnerComponent };
