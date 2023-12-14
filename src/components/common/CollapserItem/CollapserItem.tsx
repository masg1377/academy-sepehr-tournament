import { CustomIcon } from "@src/components/common/CustomIcon";
import { Typography } from "@src/components/common/Typography";
import React, { FC } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { Collapse } from "reactstrap";
import union from "@assets/images/icons/Union.png";
import { Divider } from "../divider/Divider";

interface ICollapserItemProp {
  state: boolean;
  setState?: any;
  text?: string;
  wrapperClasses?: string;
  wrapperStyles?: any;
  children: React.ReactNode;
  iconWrapperClassName?: string;
  iconColor?: string;
  isLined?: boolean;
  itemsWrapperClassName?: string;
  holderClassName?: string;
  headerClassName?: string;
  titleSize?:
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
}

const CollapserItem: FC<ICollapserItemProp> = ({
  state,
  setState,
  text,
  wrapperClasses,
  wrapperStyles,
  children,
  iconWrapperClassName,
  iconColor,
  isLined,
  itemsWrapperClassName,
  titleSize,
  holderClassName,
  headerClassName,
}) => {
  return (
    <div
      style={wrapperStyles}
      className={`${wrapperClasses} ${holderClassName}`}
    >
      <div
        onClick={() => setState((prevState: any) => !prevState)}
        className={`d-flex flex-row justify-content-between align-items-center px-2 py-1 ${wrapperClasses} ${headerClassName}`}
      >
        <div className="d-flex justify-content-start align-items-center">
          <CustomIcon
            wrapperStyle={{ width: "20px", height: "18px" }}
            imageClasses="w-100 h-100"
            src={union}
          />
          <Typography size={14} className="text-black ms-1">
            {text}
          </Typography>
        </div>

        {isLined && <div className="flex-1 mx-1 border" />}

        {state && (
          <div
            className={`d-flex justify-content-center align-items-center justify-content-center cursor-pointer ${iconWrapperClassName} ? ${iconWrapperClassName} : ""`}
            style={{
              backgroundColor: "#e6e5ea",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
            }}
          >
            <ChevronUp size={13} color={iconColor ? iconColor : "#2e2e33"} />
          </div>
        )}
        {!state && (
          <div
            className={`d-flex justify-content-center align-items-center justify-content-center cursor-pointer ${iconWrapperClassName} ? ${iconWrapperClassName} : ""`}
            style={{
              backgroundColor: "#e6e5ea",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
            }}
          >
            <ChevronDown size={13} color={iconColor ? iconColor : "#2e2e33"} />
          </div>
        )}
      </div>
      <Divider wrapperClassName="w-100" />
      <Collapse isOpen={state}>
        <div className={itemsWrapperClassName ? itemsWrapperClassName : ""}>
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export { CollapserItem };
