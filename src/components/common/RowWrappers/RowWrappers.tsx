import classNames from "classnames";
import React, { FC } from "react";
import { Col, Row } from "reactstrap";

interface IRowWrappersProp {
  //children: JSX.Element[] | JSX.Element;
  children: any;
  sm?: number;
  md?: number;
  rowClassName?: string;
  colClassName?: string;
  xl?: number;
  xxl?: number;
}

const RowWrappers: FC<IRowWrappersProp> = ({
  children,
  rowClassName,
  colClassName,
  sm,
  md,
  xl,
  xxl,
}): JSX.Element => {
  const child = Array.isArray(children) ? children : [children];
  return (
    <Row
      className={classNames(
        rowClassName,
        rowClassName?.includes("mt") ? "" : "mt-1",
        rowClassName?.includes("mb") ? "" : "mb-1"
      )}
    >
      {child.map((Item, index) => (
        <Col
          key={index}
          sm={sm ? sm : 12 / child.length}
          md={md ? md : 12 / (child.length + 1)}
          xxl={xxl}
          xl={xl}
          className={colClassName}
        >
          {Item}
        </Col>
      ))}
    </Row>
  );
};

export { RowWrappers };
