import React, { FC, ReactNode } from "react";
import { NavItem } from "reactstrap";

interface IChildFormProp {
  className?: string;
  headerIcon: JSX.Element;
  headerTitle: string;
  children?: JSX.Element | ReactNode;
  customWrapper?: any;
}

const ChildForm: FC<IChildFormProp> = ({
  className,
  headerIcon,
  headerTitle,
  children,
  customWrapper: CustomWrapper = NavItem,
}): JSX.Element => {
  return (
    <CustomWrapper className={className}>
      <div className="d-flex align-items-center">
        <span
          className="rounded-1 bg-primary d-flex justify-content-center align-items-center"
          style={{ width: 20, height: 20 }}
        >
          {headerIcon}
        </span>

        <span className="text-darker h5 mb-0 ms-1 fw-bolder">
          {headerTitle}
        </span>
      </div>

      {children}
    </CustomWrapper>
  );
};

export { ChildForm };
