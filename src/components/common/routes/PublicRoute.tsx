// ** React Imports
import { FC, ReactNode, Suspense } from "react";
import { Navigate } from "react-router-dom";

// ** Utils
import {
  getUserData,
  getHomeRouteForLoggedInUser,
} from "@src/core/utils/Utils";

interface IPublicRouteProp {
  children: ReactNode | JSX.Element;
  route: any;
}

const PublicRoute: FC<IPublicRouteProp> = ({
  children,
  route,
}): JSX.Element => {
  if (route) {
    const user = getUserData();

    const restrictedRoute = route.meta && route.meta.restricted;

    if (user && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser(user.role)} />;
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export { PublicRoute };
