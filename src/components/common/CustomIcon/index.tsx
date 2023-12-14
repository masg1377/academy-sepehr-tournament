import { FC } from "react";

interface ICustomIconProp {
  src: string;
  height?: string;
  width?: string;
  imageStyle?: any;
  imageClasses?: any;
  wrapperStyle?: any;
  wrapperClasses?: string;
  onClickHandler?: () => void;
  inlineHeight?: boolean;
}

const CustomIcon: FC<ICustomIconProp> = ({
  height,
  width,
  src,
  imageStyle,
  imageClasses,
  wrapperStyle,
  wrapperClasses,
  onClickHandler,
  inlineHeight = false,
}) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${wrapperClasses}`}
      style={wrapperStyle ? wrapperStyle : { width: width, height: height }}
      onClick={onClickHandler}
    >
      <img
        style={imageStyle ? imageStyle : {}}
        className={`${
          !inlineHeight && "w-100 h-100"
        } d-flex justify-content-center align-items-center ${imageClasses}`}
        src={src}
        alt="Icon"
      />
    </div>
  );
};

export { CustomIcon };
