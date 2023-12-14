import { getPermissionList } from "@src/core/services/common/authentication.services";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface IPermissionWrapperProp {
  children: JSX.Element | ReactNode;
  roles?: string[];
  redirect?: boolean;
}

const PermissionWrapper: FC<IPermissionWrapperProp> = ({
  children,
  roles,
  redirect,
}): JSX.Element => {
  const [status, setStatus] = useState<boolean>(true);

  const checkRoles = async () => {
    const userRoles = await getPermissionList();
    console.log("userRoles", userRoles);
    const isExist = roles ? roles.some((role: any) => userRoles[role]) : true;
    // const isExist = userRoles.some((r) => roles?.includes(r));
    setStatus(isExist);
  };

  useEffect(() => {
    if (roles) {
      checkRoles();
    }
  }, []);

  return status ? <>{children}</> : redirect ? <Navigate to="/" /> : <></>;
};

export { PermissionWrapper };
