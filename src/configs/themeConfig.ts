// You can customize the template with the help of this file

import { ToastPosition } from "react-hot-toast";

export type TThemeConfig = {
  app: {
    appName: string;
    appLogoImage: any;
    appLogoImage_r: any;
  };
  layout: {
    isRTL: boolean;
    skin: string; // light, dark, bordered, semi-dark
    type: string; // vertical, horizontal
    contentWidth: string; // full, boxed
    menu: {
      isHidden: boolean;
      isCollapsed: boolean;
    };
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: string; // static , sticky , floating, hidden
      backgroundColor: string; // BS color options [primary, success, etc]
    };
    footer: {
      type: string; // static, sticky, hidden
    };
    customizer: boolean;
    scrollTop: boolean; // Enable scroll to top button
    toastPosition: ToastPosition; // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  };
};

//Template config options
const themeConfig: TThemeConfig = {
  app: {
    appName: "Vuexy",
    appLogoImage: require("@src/assets/images/logo/logo-side-new.png").default,
    appLogoImage_r: require("@src/assets/images/logo/logo-web-responsive.svg").default,
  },
  layout: {
    isRTL: false,
    skin: "light", // light, dark, bordered, semi-dark
    type: "vertical", // vertical, horizontal
    contentWidth: "boxed", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "sticky", // static , sticky , floating, hidden
      backgroundColor: "white", // BS color options [primary, success, etc]
    },
    footer: {
      type: "sticky", // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true, // Enable scroll to top button
    toastPosition: "top-right", // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  },
};

export default themeConfig;
