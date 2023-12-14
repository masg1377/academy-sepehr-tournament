// ** React Imports
import { FC, Fragment } from "react";

// ** Third Party Components
import Proptypes from "prop-types";
import classnames from "classnames";

// ** Reactstrap Imports
import { UncontrolledTooltip } from "reactstrap";

// ** Custom Components Imports
import { Avatar } from "@src/components/common/avatar";

interface IAvatarGroupProp {
  data: any;
  tag: string;
  className: string;
}

const AvatarGroup: FC<IAvatarGroupProp> = ({
  data,
  tag,
  className,
}): JSX.Element => {
  // ** Conditional Tag
  const Tag: any = tag ? tag : "div";

  // ** Render Data
  const renderData = () => {
    return data.map((item: any, i: number) => {
      const ItemTag = item.tag ? item.tag : "div";
      return (
        <Fragment key={i}>
          {item.title ? (
            <UncontrolledTooltip
              placement={item.placement}
              target={item.title.split(" ").join("-")}
            >
              {item.title}
            </UncontrolledTooltip>
          ) : null}
          {!item.meta ? (
            <Avatar
              tag={ItemTag}
              className={classnames("pull-up", {
                [item.className]: item.className,
              })}
              {...(item.title ? { id: item.title.split(" ").join("-") } : {})}
              {...item}
              title={undefined}
              meta={undefined}
            />
          ) : null}
          {item.meta ? (
            <ItemTag className="d-flex align-items-center ps-1">
              {item.meta}
            </ItemTag>
          ) : null}
        </Fragment>
      );
    });
  };

  return (
    <Tag
      className={classnames("avatar-group", {
        [className]: className,
      })}
    >
      {renderData()}
    </Tag>
  );
};

export { AvatarGroup };
