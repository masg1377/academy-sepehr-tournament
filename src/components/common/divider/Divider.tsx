import React, { FC } from "react";

type ITextPosition = "start" | "start-center" | "end" | "end-center" | "center";
export enum ETextPosition {
  START = "start",
  START_CENTER = "start-center",
  END = "end",
  END_CENTER = "end-center",
  CENTER = "center",
}
interface IDivider {
  title?: string;
  textClassName?: string;
  wrapperClassName?: string;
  textPosition?: ITextPosition;
}

const Divider: FC<IDivider> = ({
  title,
  textClassName,
  wrapperClassName,
  textPosition = ETextPosition.START,
}) => {
  return (
    <>
      {title ? (
        <div className={`divider divider-${textPosition} ${wrapperClassName}`}>
          <div className={`divider-text ${textClassName}`}>{title}</div>
        </div>
      ) : (
        <div className={`border-bottom ${wrapperClassName}`}></div>
      )}
    </>
  );
};

export { Divider };
