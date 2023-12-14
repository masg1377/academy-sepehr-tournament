// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect, FC } from "react";

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux";
import { handleMenuHidden, handleContentWidth } from "@store/layout";

// ** Third Party Components
import classnames from "classnames";
import { ArrowUp } from "react-feather";

// ** Reactstrap Imports
import { Navbar, NavItem, Button } from "reactstrap";

// ** Configs
import themeConfig from "@configs/themeConfig";

// ** Custom Components

import { Customizer } from "@src/components/common/customizer";
import { ScrollTop as ScrollToTop } from "@src/components/common/scrolltop";
import { ThemeNavbar as NavbarComponent } from "../../../Navbar/Navbar";
import { Footer as FooterComponent } from "../../../Footer/Footer";
import { HorizontalMenu as MenuComponent } from "../../../Menu/HorizontalMenu/HorizontalMenu";

// ** Custom Hooks
import { useRTL } from "@src/core/hooks/useRTL";
import { useSkin } from "@src/core/hooks/useSkin";
import { useLayout } from "@src/core/hooks/useLayout";
import { useNavbarType } from "@src/core/hooks/useNavbarType";
import { useFooterType } from "@src/core/hooks/useFooterType";
import { useNavbarColor } from "@src/core/hooks/useNavbarColor";

// ** Styles
import "@styles/base/core/menu/menu-types/horizontal-menu.scss";
import { RootState } from "@src/redux/store";

interface IHorizontalLayoutProp {
  navbar: any;
  menuData: any;
  footer: any;
  children: any;
  menu: any;
}

const HorizontalLayout: FC<IHorizontalLayoutProp> = ({
  navbar,
  menuData,
  footer,
  children,
  menu,
}): JSX.Element => {
  // ** Props

  // ** Hooks
  const { skin, setSkin } = useSkin();
  const [isRtl, setIsRtl] = useRTL();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();
  const { navbarColor, setNavbarColor } = useNavbarColor();
  const { layout, setLayout, setLastLayout } = useLayout();

  // ** States
  const [isMounted, setIsMounted] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const layoutStore = useSelector((state: RootState) => state.layout);

  // ** Vars
  const contentWidth = layoutStore.contentWidth;
  const isHidden = layoutStore.menuHidden;

  // ** Handles Content Width
  const setContentWidth: any = (val: any) => dispatch(handleContentWidth(val));

  // ** Handles Content Width
  const setIsHidden = (val: any) => dispatch(handleMenuHidden(val));

  // ** UseEffect Cleanup
  const cleanup = () => {
    setIsMounted(false);
    setNavbarScrolled(false);
  };

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    window.addEventListener(
      "scroll",
      function () {
        if (window.pageYOffset > 65 && navbarScrolled === false) {
          setNavbarScrolled(true);
        }
        if (window.pageYOffset < 65) {
          setNavbarScrolled(false);
        }
      },
      { passive: true }
    );
    return () => cleanup();
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
  };

  const navbarClasses: any = {
    floating:
      contentWidth === "boxed" ? "floating-nav container-xxl" : "floating-nav",
    sticky: "fixed-top",
  };

  const bgColorCondition =
    navbarColor !== "" && navbarColor !== "light" && navbarColor !== "white";

  if (!isMounted) {
    return <></>;
  }

  return (
    <div
      className={classnames(
        `wrapper horizontal-layout horizontal-menu ${
          navbarWrapperClasses[navbarType] || "navbar-floating"
        } ${footerClasses[footerType] || "footer-static"} menu-expanded`
      )}
      {...(isHidden ? { "data-col": "1-column" } : {})}
    >
      <Navbar
        expand="lg"
        container={false}
        className={classnames(
          "header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center",
          {
            "navbar-scrolled": navbarScrolled,
          }
        )}
      >
        {!navbar && (
          <div className="navbar-header d-xl-block d-none">
            <ul className="nav navbar-nav">
              <NavItem>
                <Link to="/" className="navbar-brand">
                  <span className="brand-logo">
                    <img src={themeConfig.app.appLogoImage} alt="logo" />
                  </span>
                  <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2>
                </Link>
              </NavItem>
            </ul>
          </div>
        )}

        <div className="navbar-container d-flex content">
          {navbar ? (
            navbar({ skin, setSkin })
          ) : (
            <NavbarComponent skin={skin} setSkin={setSkin} />
          )}
        </div>
      </Navbar>
      {!isHidden ? (
        <div className="horizontal-menu-wrapper">
          <Navbar
            tag="div"
            expand="sm"
            light={skin !== "dark"}
            dark={skin === "dark" || bgColorCondition}
            className={classnames(
              `header-navbar navbar-horizontal navbar-shadow menu-border`,
              {
                [navbarClasses[navbarType]]: navbarType !== "static",
                "floating-nav":
                  (!navbarClasses[navbarType] && navbarType !== "static") ||
                  navbarType === "floating",
              }
            )}
          >
            {menu ? menu({ menuData }) : <MenuComponent menuData={menuData} />}
          </Navbar>
        </div>
      ) : null}

      {children}
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
          setNavbarColor={setNavbarColor}
          setContentWidth={setContentWidth}
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
          {/* @ts-ignore */}
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
export { HorizontalLayout };
