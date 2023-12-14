// ** Store Imports
import { RootState } from "@src/redux/store";
import { handleNavbarType } from "@store/layout";
import { useDispatch, useSelector } from "react-redux";

export const useNavbarType = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  const setNavbarType = (type: any) => {
    dispatch(handleNavbarType(type));
  };

  return { navbarType: store.navbarType, setNavbarType };
};
