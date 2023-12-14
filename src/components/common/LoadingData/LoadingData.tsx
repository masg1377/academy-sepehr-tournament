import React, { FC } from "react";
import { ComponentSpinner } from "../spinner/Loading-spinner";

interface ILoadingDataProp {
  loadingLabel?: string;
  wrapperStyle?: string;
  hideLabel?: boolean;
}

const LoadingData: FC<ILoadingDataProp> = ({
  loadingLabel,
  wrapperStyle,
  hideLabel,
}): JSX.Element => {
  return (
    <div className={wrapperStyle ? wrapperStyle : "pb-5 pt-4"}>
      <ComponentSpinner />
      {!hideLabel && (
        <span className="d-block fs-5 fw-bolder text-center mt-1">
          {loadingLabel ? loadingLabel : "Loading..."}
        </span>
      )}
    </div>
  );
};

export { LoadingData };
