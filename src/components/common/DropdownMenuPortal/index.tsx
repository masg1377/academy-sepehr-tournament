import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { DropdownMenu } from "reactstrap";

interface IDropdownMenuPortalProp {
  children: ReactNode;
  className?: string;
  tag?: React.ElementType<any>;
  style?: React.CSSProperties;
}

const DropdownMenuPortal: FC<IDropdownMenuPortalProp> = ({
  children,
  className,
  tag,
  style,
}) => {
  return createPortal(
    <DropdownMenu style={style} className={className} end tag={tag}>
      {children}
    </DropdownMenu>,
    document.getElementById("portal") || document.body
  );
};

export default DropdownMenuPortal;
