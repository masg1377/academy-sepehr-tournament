// ** React Imports
import { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";

// ** Icons Imports
import { Disc, X, Circle } from "react-feather";

// ** Config
import themeConfig from "@configs/themeConfig";

// ** Utils
import {
  getUserData,
  getHomeRouteForLoggedInUser,
} from "@src/core/utils/Utils";

interface IVerticalMenuHeaderProp {
  menuCollapsed?: boolean;
  setMenuCollapsed: (val: boolean) => void;
  setMenuVisibility: (val: boolean) => void;
  setGroupOpen: (val: any) => void;
  menuHover: boolean;
}

const VerticalMenuHeader: FC<IVerticalMenuHeaderProp> = (
  props
): JSX.Element => {
  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;

  // ** Vars
  const user = getUserData();

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(true)}
        />
      );
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      );
    }
  };

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item me-auto">
          <NavLink
            to={user ? getHomeRouteForLoggedInUser(user.role) : "/"}
            className="navbar-brand"
          >
            <span className="brand-logo">
              <img
                style={{
                  maxWidth: menuCollapsed && !menuHover ? "60px" : "160px",
                }}
                src={
                  menuCollapsed && !menuHover
                    ? themeConfig.app.appLogoImage_r
                    : themeConfig.app.appLogoImage
                }
                alt="logo"
              />
            </span>
            {/* <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2> */}
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
            <Toggler />
            <X
              onClick={() => setMenuVisibility(false)}
              className="toggle-icon icon-x d-block d-xl-none"
              size={20}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export { VerticalMenuHeader };
