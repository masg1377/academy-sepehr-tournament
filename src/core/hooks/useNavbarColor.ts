// ** Store Imports
import { RootState } from "@src/redux/store";
import { handleNavbarColor } from "@store/layout";
import { useDispatch, useSelector } from "react-redux";

export const useNavbarColor = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  // ** Return a wrapped version of useState's setter function
  const setNavbarColor = (value: any) => {
    dispatch(handleNavbarColor(value));
  };

  return { navbarColor: store.navbarColor, setNavbarColor };
};
