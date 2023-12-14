// ** React Imports
import { FC, forwardRef } from "react";

// ** Third Party Components
import Proptypes from "prop-types";
import classnames from "classnames";

// ** Reactstrap Imports
import { Badge } from "reactstrap";

const Avatar: FC<any> = forwardRef((props, ref) => {
  // ** Props
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content,
    tag: Tag = "div",
    initials,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props;

  // ** Function to extract initials from content
  const getInitials = (str: any) => {
    const results: any = [];
    const wordArray = str.split(" ");
    wordArray.forEach((e: any) => {
      results.push(e[0]);
    });
    return results.join("");
  };

  return (
    <Tag
      className={classnames("avatar", {
        [className]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
      ref={ref}
      {...rest}
    >
      {img === false || img === undefined ? (
        <span
          className={classnames("avatar-content", {
            "position-relative": badgeUp,
          })}
          style={contentStyles}
        >
          {initials ? getInitials(content) : content}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge
              color={badgeColor ? badgeColor : "primary"}
              className="badge-sm badge-up"
              pill
            >
              {badgeText ? badgeText : "0"}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames({
            [imgClassName]: imgClassName,
          })}
          src={img}
          alt="avatarImg"
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        ></span>
      ) : null}
    </Tag>
  );
});

export { Avatar };
