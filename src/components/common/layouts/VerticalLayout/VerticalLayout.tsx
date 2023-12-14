// ** React Imports
import { useState, useEffect, FC } from "react";
import { useLocation } from "react-router-dom";

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux";
import {
  handleMenuCollapsed,
  handleContentWidth,
  handleMenuHidden,
} from "@store/layout";

// ** Third Party Components
import classnames from "classnames";
import { ArrowUp } from "react-feather";

// ** Reactstrap Imports
import { Navbar, Button } from "reactstrap";

// ** Configs
import themeConfig from "@configs/themeConfig";

// ** Custom Components

import { Customizer } from "@src/components/common/customizer";
import { ScrollTop as ScrollToTop } from "@src/components/common/scrolltop";
import { Footer as FooterComponent } from "../../../Footer/Footer";
import { ThemeNavbar as NavbarComponent } from "../../../Navbar/Navbar";
import { Sidebar as SidebarComponent } from "../../../Menu/VerticalMenu/VerticalMenu";

// ** Custom Hooks
import { useRTL } from "@src/core/hooks/useRTL";
import { useSkin } from "@src/core/hooks/useSkin";
import { useLayout } from "@src/core/hooks/useLayout";
import { useNavbarType } from "@src/core/hooks/useNavbarType";
import { useFooterType } from "@src/core/hooks/useFooterType";
import { useNavbarColor } from "@src/core/hooks/useNavbarColor";

// ** Styles
import "@styles/base/core/menu/menu-types/vertical-menu.scss";
import "@styles/base/core/menu/menu-types/vertical-overlay-menu.scss";
// import { BreadCrumbs } from "@src/components/common/breadcrumbs";
import { RootState } from "@src/redux/store";

interface IVerticalLayoutProp {
  navbar: any;
  menuData: any;
  footer: any;
  children: any;
  menu: any;
}

const VerticalLayout: FC<IVerticalLayoutProp> = ({
  navbar,
  menuData,
  footer,
  children,
  menu,
}): JSX.Element => {
  // ** Props

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL();
  const { skin, setSkin } = useSkin();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();
  const { navbarColor, setNavbarColor } = useNavbarColor();
  const { layout, setLayout, setLastLayout } = useLayout();

  // ** States
  const [isMounted, setIsMounted] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // ** Vars
  const dispatch = useDispatch();
  const layoutStore = useSelector((state: RootState) => state.layout);

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // ** Vars
  const location = useLocation();
  const isHidden = layoutStore.menuHidden;
  const contentWidth = layoutStore.contentWidth;
  const menuCollapsed = layoutStore.menuCollapsed;

  // ** Toggles Menu Collapsed
  const setMenuCollapsed = (val: any) => dispatch(handleMenuCollapsed(val));

  // ** Handles Content Width
  const setContentWidth = (val: any) => dispatch(handleContentWidth(val));

  // ** Handles Content Width
  const setIsHidden = (val: any) => dispatch(handleMenuHidden(val));

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false);
    }
  }, [location]);

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", handleWindowWidth, { passive: true });
    }
  }, [windowWidth]);

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // ** Vars
  const footerClasses: any = {
    static: "footer-static",
    sticky: "footer-fixed",
    hidden: "footer-hidden",
  };

  const navbarWrapperClasses: any = {
    floating: "navbar-floating",
    sticky: "navbar-sticky",
    static: "navbar-static",
    hidden: "navbar-hidden",
  };

  const navbarClasses: any = {
    floating:
      contentWidth === "boxed" ? "floating-nav container-xxl" : "floating-nav",
    sticky: "fixed-top",
    static: "navbar-static-top",
    hidden: "d-none",
  };

  const bgColorCondition =
    navbarColor !== "" && navbarColor !== "light" && navbarColor !== "white";

  if (!isMounted) {
    return <></>;
  }
  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${
          navbarWrapperClasses[navbarType] || "navbar-floating"
        } ${footerClasses[footerType] || "footer-static"}`,
        {
          // Modern Menu
          "vertical-menu-modern": windowWidth >= 1200,
          "menu-collapsed": menuCollapsed && windowWidth >= 1200,
          "menu-expanded": !menuCollapsed && windowWidth > 1200,

          // Overlay Menu
          "vertical-overlay-menu": windowWidth < 1200,
          "menu-hide": !menuVisibility && windowWidth < 1200,
          "menu-open": menuVisibility && windowWidth < 1200,
        }
      )}
      {...(isHidden ? { "data-col": "1-column" } : {})}
    >
      {!isHidden ? (
        <SidebarComponent
          skin={skin}
          menu={menu}
          menuData={menuData}
          menuCollapsed={menuCollapsed}
          menuVisibility={menuVisibility}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
        />
      ) : null}

      <Navbar
        expand="lg"
        container={false}
        light={skin !== "dark"}
        dark={skin === "dark" || bgColorCondition}
        color={bgColorCondition ? navbarColor : undefined}
        className={classnames(
          `header-navbar navbar align-items-center ${
            navbarClasses[navbarType] || "floating-nav"
          } navbar-shadow`
        )}
      >
        <div className="navbar-container d-flex content">
          {navbar ? (
            navbar({ skin, setSkin, setMenuVisibility })
          ) : (
            <NavbarComponent
              setMenuVisibility={setMenuVisibility}
              skin={skin}
              setSkin={setSkin}
              setMenuCollapsed={setMenuCollapsed}
              menuCollapsed={windowWidth < 1200}
            />
          )}
        </div>
      </Navbar>

      {children}

      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames("sidenav-overlay", {
          show: menuVisibility,
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Vertical Nav Menu Overlay */}

      {themeConfig.layout.customizer === true ? (
        <Customizer
          skin={skin}
          isRtl={isRtl}
          layout={layout}
          setSkin={setSkin}
          setIsRtl={setIsRtl}
          isHidden={isHidden}
          setLayout={setLayout}
          footerType={footerType}
          navbarType={navbarType}
          setIsHidden={setIsHidden}
          themeConfig={themeConfig}
          navbarColor={navbarColor}
          contentWidth={contentWidth}
          setFooterType={setFooterType}
          setNavbarType={setNavbarType}
          setLastLayout={setLastLayout}
          menuCollapsed={menuCollapsed}
          setNavbarColor={setNavbarColor}
          setContentWidth={setContentWidth}
          setMenuCollapsed={setMenuCollapsed}
        />
      ) : null}
      <footer
        className={classnames(
          `footer footer-light ${footerClasses[footerType] || "footer-static"}`,
          {
            "d-none": footerType === "hidden",
          }
        )}
      >
        {footer ? (
          footer
        ) : (
          <FooterComponent
            //@ts-ignore
            footerType={footerType}
            footerClasses={footerClasses}
          />
        )}
      </footer>

      {themeConfig.layout.scrollTop === true ? (
        <div className="scroll-to-top">
          {/*@ts-ignore*/}
          <ScrollToTop showOffset={300} className="scroll-top d-block">
            <Button className="btn-icon" color="primary">
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  );
};

export { VerticalLayout };
