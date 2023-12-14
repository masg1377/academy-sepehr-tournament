// ** Store Imports
import { RootState } from "@src/redux/store";
import { handleFooterType } from "@store/layout";
import { useDispatch, useSelector } from "react-redux";

export const useFooterType = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  const setFooterType = (type: any) => {
    dispatch(handleFooterType(type));
  };

  return { setFooterType, footerType: store.footerType };
};
