// ** Horizontal Menu Components
import { FC } from "react";
import { HorizontalNavMenuItems } from "./HorizontalNavMenuItems";

const HorizontalMenu: FC<any> = ({ menuData }): JSX.Element => {
  return (
    <div className="navbar-container main-menu-content">
      <ul className="nav navbar-nav" id="main-menu-navigation">
        <HorizontalNavMenuItems submenu={false} items={menuData} />
      </ul>
    </div>
  );
};

export { HorizontalMenu };
