import React, { FC, Suspense, useEffect } from "react";
import { useRoutes } from "react-router-dom";

import { useLayout } from "@src/core/hooks/useLayout";
import { getRoutes } from "@src/core/utils/route.utils";
import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";
import { getPermissionList } from "@src/core/services/common/authentication.services";
import { useDispatch } from "react-redux";
import { useGetProfileDetails } from "@src/core/services/api/profileSetup/profile-setup.api";
import { handleRoles } from "@src/redux/roles";
import { handleProfile } from "@src/redux/profile";

const App: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { profile: profileRefresh } = useSelector(
    (state: RootState) => state.refresh
  );

  useEffect(() => {
    const loadRoles = async () => {
      const userRoles = await getPermissionList();
      dispatch(handleRoles(userRoles));
    };
    loadRoles();
  }, [isAuth]);

  // const getDetail = useGetProfileDetails();

  // useEffect(() => {
  //   if ((!profile && isAuth) || !(!profile && !profileRefresh))
  //     getDetail.mutate(
  //       [
  //         "expertise",
  //         " profile_picture",
  //         " bio",
  //         " professional_email",
  //         " skype_id",
  //         " personal_phone",
  //       ],
  //       {
  //         onSuccess: (res) => {
  //           if (res.data.is_success) {
  //             const result = res.data.result;
  //             // console.log(result);
  //             dispatch(handleProfile(result));
  //           }
  //         },
  //       }
  //     );
  // }, [isAuth, profileRefresh]);

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

const Router: FC = (): React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
> | null => {
  // ** Hooks
  const { layout } = useLayout();
  const userStore = useSelector((state: RootState) => state.user);

  const allRoutes = getRoutes(layout, userStore.isAuth);

  const routes = useRoutes([...allRoutes]);

  return routes;
};

export { App };
