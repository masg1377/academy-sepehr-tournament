// ** React Imports
import { FC, useEffect } from "react";

// ** Redux Imports
import { useDispatch } from "react-redux";
import { handleLogout } from "@src/redux/user";

const LogOut: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("logOut");
    dispatch(handleLogout());
  }, []);

  return <div>Logging Out ...</div>;
};

export { LogOut };
