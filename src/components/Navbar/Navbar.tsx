// ** React Imports
import { FC, Fragment } from "react";

// ** Custom Components
import { NavbarUser } from "./NavbarUser";

// ** Third Party Components
import { Sun, Moon, AlignLeft } from "react-feather";

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import useWindowDimensions from "@src/core/utils/Utils";

interface IThemeNavbarProp {
  skin: string;
  setSkin: any;
  setMenuVisibility?: any;
  setMenuCollapsed?: any;
  menuCollapsed?: boolean;
}

const ThemeNavbar: FC<IThemeNavbarProp> = ({
  skin,
  setSkin,
  setMenuVisibility,
  setMenuCollapsed,
  menuCollapsed,
}): JSX.Element => {
  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />;
    }
  };

  const layoutStore = useSelector((state: RootState) => state.layout);

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        {useWindowDimensions().width < 1200 &&  (
          <ul className="navbar-nav">
            <NavItem className="mobile-menu me-auto">
              <NavLink
                className="nav-menu-main menu-toggle is-active"
                onClick={() => {
                  if (menuCollapsed)
                    setMenuVisibility((old: boolean) => {
                      return !old;
                    });
                  else setMenuCollapsed(!layoutStore.menuCollapsed);
                }}
              >
                <AlignLeft className="ficon" />
              </NavLink>
            </NavItem>
          </ul>
        )}
        {/* <NavItem className="d-none d-lg-block">
          <NavLink className="nav-link-style">
            <ThemeToggler />
          </NavLink>
        </NavItem> */}
      </div>

      <NavbarUser
      // skin={skin} setSkin={setSkin}
      />
    </Fragment>
  );
};

export { ThemeNavbar };
