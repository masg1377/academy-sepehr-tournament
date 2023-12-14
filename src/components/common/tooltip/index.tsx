import { Placement } from "@popperjs/core";
import React, { FC, ReactNode, useState } from "react";
import { Tooltip } from "reactstrap";

interface ICustomTooltipProp {
  target: string;
  placement?: Placement | undefined;
  children: ReactNode;
  style?: any;
}

const CustomTooltip: FC<ICustomTooltipProp> = ({
  placement = "bottom",
  target,
  children,
  style,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Tooltip
      style={style}
      placement={placement}
      isOpen={isOpen}
      target={target}
      toggle={() => setIsOpen((old) => !old)}
    >
      {children}
    </Tooltip>
  );
};

export { CustomTooltip };
