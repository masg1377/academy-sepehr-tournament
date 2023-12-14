import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

interface ICardWrapperProp {
  title?: string;
  children: ReactNode | JSX.Element;
  headerChild?: ReactNode | JSX.Element;
  borderBottom?: boolean;
  borderBottomStyle?: string;
  bodyClassName?: string;
  bodyStyle?: any;
}

const CardWrapper: FC<ICardWrapperProp> = ({
  title,
  children,
  headerChild,
  borderBottom,
  borderBottomStyle,
  bodyClassName,
  bodyStyle,
}): JSX.Element => {
  return (
    <Card>
      {title && headerChild ? (
        <CardHeader
          className={classNames(
            "d-flex justify-between p-1",
            borderBottom ? "border-bottom" : "",
            borderBottom ? borderBottomStyle || "border-bottom-light" : ""
          )}
        >
          <CardTitle>{title}</CardTitle>
          {headerChild}
        </CardHeader>
      ) : headerChild ? (
        headerChild
      ) : (
        <></>
      )}
      <CardBody className={bodyClassName} style={bodyStyle}>
        {children}
      </CardBody>
    </Card>
  );
};

export { CardWrapper };
