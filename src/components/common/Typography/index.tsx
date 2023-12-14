import { EFonts } from "@src/core/enum/fonts.enum";
import { getFontFamily, getFontSize } from "@src/core/utils/Utils";
import React, { CSSProperties, FC, ReactNode } from "react";

interface ITypographyProp {
  tag?: React.ElementType;
  block?: boolean;
  size?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 18
    | 20
    | 22;
  className?: string;
  children?: ReactNode;
  font?: EFonts;
  style?: CSSProperties;
  onClick?: any;
  id?: string;
  refItem?: React.LegacyRef<any>;
}

const Typography: FC<ITypographyProp> = ({
  tag,
  block,
  size,
  className,
  children,
  font,
  style,
  onClick,
  id,
  refItem,
}): JSX.Element => {
  const Tag = tag || "span";

  const fontSize = getFontSize(size);
  const fontFamily = getFontFamily(font);

  return (
    <Tag
      className={`${
        block ? "d-block" : ""
      } ${fontFamily} ${fontSize} ${className}`}
      // } ${fontSize} ${className}`}
      style={style}
      onClick={onClick}
      id={id}
      ref={refItem}
    >
      {children}
    </Tag>
  );
};

export { Typography };

