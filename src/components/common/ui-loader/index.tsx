// ** React Imports
import { FC, Fragment } from "react";

// ** Third Party Components
import Proptypes from "prop-types";
import classnames from "classnames";

// ** Reactstrap Imports
import { Spinner } from "reactstrap";

// ** Styles
import "./ui-loader.scss";

interface IUILoaderProp {
  tag?: string;
  loader?: any;
  className?: string;
  overlayColor?: string;
  blocking?: boolean;
  children?: any;
}

const UILoader: FC<IUILoaderProp> = ({
  children,
  blocking = false,
  loader = <Spinner color="primary" />,
  className,
  tag = "div",
  overlayColor,
}): JSX.Element => {
  const Tag: any = tag;

  return (
    <Tag
      className={classnames("ui-loader", {
        [className || ""]: className,
        show: blocking,
      })}
    >
      {children}
      {blocking ? (
        <Fragment>
          <div
            className="overlay" /*eslint-disable */
            {...(blocking && overlayColor
              ? { style: { backgroundColor: overlayColor } }
              : {})}
            /*eslint-enable */
          ></div>
          <div className="loader">{loader}</div>
        </Fragment>
      ) : null}
    </Tag>
  );
};

export { UILoader };
