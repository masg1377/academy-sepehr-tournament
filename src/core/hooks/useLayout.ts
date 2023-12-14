//** React Imports
import { useEffect } from "react";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";
import { handleLayout, handleLastLayout } from "@store/layout";
import { RootState } from "@src/redux/store";

export const useLayout = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  const setLayout = (value: any) => {
    dispatch(handleLayout(value));
  };

  const setLastLayout = (value: any) => {
    dispatch(handleLastLayout(value));
  };

  if (window) {
    const breakpoint = 1200;

    useEffect(() => {
      if (window.innerWidth < breakpoint) {
        setLayout("vertical");
      }

      window.addEventListener(
        "resize",
        () => {
          if (
            window.innerWidth <= breakpoint &&
            store.lastLayout !== "vertical" &&
            store.layout !== "vertical"
          ) {
            setLayout("vertical");
          }
          if (
            window.innerWidth >= breakpoint &&
            store.lastLayout !== store.layout
          ) {
            setLayout(store.lastLayout);
          }
        },
        { passive: true }
      );
    }, [store.layout]);
  }

  return {
    layout: store.layout,
    setLayout,
    lastLayout: store.lastLayout,
    setLastLayout,
  };
};
