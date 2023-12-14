// ** React Imports
import { FC, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";

// ** Reactstrap Imports
import { Badge } from "reactstrap";
import classNames from "classnames";

interface IVerticalNavMenuLinkProp {
  item: any;
  activeItem: any;
  menuCollapsed: boolean;
  menuHover: boolean;
  setActiveItem: (val: string) => void;
}

const VerticalNavMenuLink: FC<IVerticalNavMenuLinkProp> = ({
  item,
  activeItem,
  menuCollapsed,
  menuHover,
  setActiveItem,
}): JSX.Element => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag: any = item.externalLink ? "a" : NavLink;
  const location = useLocation();
  // ** Hooks
  useEffect(() => {
    // console.log(item.navLink);
    setActiveItem(location.pathname);
  }, [location.pathname]);
  return (
    <li
      className={classnames({
        "nav-item": !item.children,
        disabled: item.disabled,
        active:
          item.navLink === activeItem ||
          (activeItem && activeItem.includes(item.navLink)),
      })}
    >
      <LinkTag
        className="d-flex align-items-center"
        target={item.newTab ? "_blank" : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || "/",
            }
          : {
              to: item.navLink || "/",
              className: ({ isActive }: { isActive: boolean }) => {
                if (isActive && !item.disabled) {
                  return "d-flex align-items-center active";
                }
              },
            })}
        onClick={(e: any) => {
          // if (
          //   item.navLink.length === 0 ||
          //   item.navLink === "#" ||
          //   item.disabled === true
          // ) {
          //   e.preventDefault();
          // }
        }}
      >
        {/* {item.icon} */}
        {typeof item.icon === "string" ? (
          <img
            src={
              item.navLink === activeItem ||
              (activeItem && activeItem.includes(item.navLink))
                ? item.icon_l
                : item.icon
            }
            style={{ width: "22px", height: "22px" }}
            alt={item.title}
          />
        ) : item.navLink === activeItem ||
          (activeItem && activeItem.includes(item.navLink)) ? (
          item.icon_l
        ) : (
          item.icon
        )}
        <span
          className={classNames(
            "menu-item text-truncate",
            typeof item.icon !== "string" && "ms-1"
          )}
          style={{
            marginTop: 5,
            fontSize: 16,
            marginLeft: menuCollapsed && !menuHover ? "2.5rem" : "0",
          }}
        >
          {item.title}
        </span>

        {item.badge && item.badgeText ? (
          <Badge className="ms-auto me-1" color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  );
};

export { VerticalNavMenuLink };
