import { RouteObject } from "react-router-dom";

import { BlankLayout } from "@src/components/common/layouts/BlankLayout";
import { VerticalLayout } from "@src/App/layouts/VerticalLayout";
import { HorizontalLayout } from "@src/App/layouts/HorizontalLayout";
import { TGetLayout, TRoute } from "../model/routes.model";
import { canRole, isObjEmpty } from "@src/core/utils/Utils";
import { Routes } from "@src/configs/router";
import { PublicRoute } from "@src/components/common/routes/PublicRoute";
import { LayoutWrapper } from "@src/components/LayoutWrapper";
import { Fragment } from "react";
import { BreadCrumbs } from "@src/components/common/breadcrumbs";
import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";
import { PermissionWrapper } from "@src/components/common/PermissionWrapper/PermissionWrapper";

export const getLayout: TGetLayout | any = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

const getRouteMeta = (
  route: TRoute
): { routeMeta?: { layout: string } } | undefined => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (
  layout: string,
  defaultLayout: string,
  authStatus?: boolean
): TRoute[] => {
  const LayoutRoutes: TRoute[] = [];

  // const { roles } = useSelector((state: RootState) => state.user);

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        ((route.meta && route.meta.layout && route.meta.layout === layout) ||
          ((route.meta === undefined || route.meta.layout === undefined) &&
            defaultLayout === layout)) &&
        route.auth === authStatus
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            // <PermissionWrapper roles={route.permissions} redirect>
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              {route.breadCrumb && (
                <BreadCrumbs
                  title={route.breadCrumb.main.title}
                  data={route.breadCrumb.secondary} //{[{ title: "Charts" }, { title: "Apex" }]}
                  miniBord={route.miniBord}
                  hasBack={route.hasBack}
                />
              )}
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
            // </PermissionWrapper>
          );
          route.breadCrumb = undefined;
          route.permissions = route.permissions;
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

export const getRoutes = (
  layout: string,
  authStatus?: boolean
): RouteObject[] => {
  const defaultLayout: string = layout || "vertical";
  const layouts: string[] = ["vertical", "horizontal", "blank"];

  const { roles } = useSelector((state: RootState) => state.roles);

  const AllRoutes: RouteObject[] | any = [];

  layouts.forEach((layoutItem: string) => {
    const LayoutRoutes = MergeLayoutRoutes(
      layoutItem,
      defaultLayout,
      authStatus
    );

    // console.log(LayoutRoutes);

    if (LayoutRoutes.length > 0)
      AllRoutes.push({
        path: "/",
        element: getLayout[layoutItem] || getLayout[defaultLayout],
        children: LayoutRoutes,
      });
  });

  const filteredRoutes = AllRoutes.map((route: any) => {
    let routeContainer = { ...route };
    let routes = route.children ? [...route.children] : null;
    if (routes) {
      routes = routes.filter((r) => canRole(r.permissions, roles));
      routeContainer.children = routes;
    }

    return routeContainer;
  });

  // console.log("AllRoutes", filteredRoutes);

  return filteredRoutes;
};
