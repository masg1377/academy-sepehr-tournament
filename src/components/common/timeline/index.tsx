import { FC } from "react";
// ** Third Party Components
import classnames from "classnames";

interface ITimelineProp {
  tag?: string;
  className?: string;
  data: any[];
  wide?: boolean;
}

const Timeline: FC<ITimelineProp> = ({
  data,
  tag,
  className,
  wide,
}): JSX.Element => {
  // ** Custom Tagg
  const Tag: any = tag ? tag : "ul";

  return (
    <Tag
      className={classnames("timeline", {
        [className ? className : ""]: className,
      })}
    >
      {data.map((item, i) => {
        const ItemTag = item.tag ? item.tag : "li";

        return (
          <ItemTag
            key={i}
            className={classnames("timeline-item", {
              [item.className]: className,
            })}
          >
            <span
              className={classnames("timeline-point", {
                [`timeline-point-${item.color}`]: item.color,
                "timeline-point-indicator": !item.icon,
                "border-0": item.customIcon,
              })}
            >
              {item.icon ? item.icon : null}
            </span>
            <div className="timeline-event">
              <div
                className={classnames(
                  !wide
                    ? "d-flex justify-content-between flex-sm-row flex-column"
                    : "d-flex justify-content-between",
                  {
                    "mb-sm-0 mb-1": item.meta,
                  }
                )}
              >
                <h6>{item.title}</h6>
                {item.meta ? (
                  <span
                    className={classnames("timeline-event-time", {
                      [item.metaClassName]: item.metaClassName,
                    })}
                  >
                    {item.meta}
                  </span>
                ) : null}
              </div>
              <p
                className={classnames({
                  "mb-0": i === data.length - 1 && !item.customContent,
                })}
              >
                {item.content}
              </p>
              {item.customContent ? item.customContent : null}
            </div>
          </ItemTag>
        );
      })}
    </Tag>
  );
};

export { Timeline };
