import { FC, Fragment, useEffect } from "react";
// ** React Imports
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import { VerticalLayout as Layout } from "@src/components/common/layouts/VerticalLayout";

// ** Menu Items Array
import navigation from "@src/configs/navigation/vertical";
import { profileSetupStatus } from "@src/core/services/common/authentication.services";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { useDispatch } from "react-redux";
import { handleProfileSetupStatus } from "@src/redux/user";

const VerticalLayout: FC<any> = (props): JSX.Element => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  return (
    <CheckProfileSetupStatus>
      <Layout menuData={navigation} {...props}>
        <Outlet />
      </Layout>
    </CheckProfileSetupStatus>
  );
};

interface ICheckProfileSetupStatus {
  children: any;
}

const CheckProfileSetupStatus: FC<ICheckProfileSetupStatus> = ({
  children,
}): JSX.Element => {
  const history = useNavigate();

  // const { profileSetupStatus } = useSelector(
  //   (state: RootState) => state.user
  // );

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const getProfileSetupStatus = async () => {
      const status = await profileSetupStatus();

      dispatch(handleProfileSetupStatus(status));
      if (!status) {
        history("/profilesetup");
      }
    };
    // if (ref.current === false) ref.current = true;
    // else
    getProfileSetupStatus();
  }, [location.pathname]);

  return <Fragment>{children}</Fragment>;
};

export { VerticalLayout };
