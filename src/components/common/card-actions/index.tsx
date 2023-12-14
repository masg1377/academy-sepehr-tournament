// ** React Imports
import { Fragment, useState, useEffect, FC, ReactNode } from "react";

// ** Third Party Components
import classnames from "classnames";
import { UILoader } from "@src/components/common/ui-loader";
import { ChevronDown, RotateCw, X } from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Collapse } from "reactstrap";

interface ICardActionsProp {
  removeIcon?: any;
  reloadIcon?: any;
  collapseIcon?: any;
  title: string;
  actions: string | string[];
  children?: ReactNode;
  endReload: any;
  noShadow?: boolean;
  headerClassName?: string;
  noBottom?: boolean;
  titleClassName?: string;
}

const CardActions: FC<ICardActionsProp> = (props) => {
  // ** Props
  const {
    title,
    actions,
    children,
    collapseIcon,
    reloadIcon,
    removeIcon,
    endReload,
    noShadow,
    headerClassName,
    noBottom,
    titleClassName,
  } = props;

  // ** States
  const [reload, setReload] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [visibility, setVisibility] = useState(true);

  /**
   ** If custom icon is defined then consider that else default icons
   */
  const Icons = {
    collapse: collapseIcon ? collapseIcon : ChevronDown,
    remove: removeIcon ? removeIcon : X,
    reload: reloadIcon ? reloadIcon : RotateCw,
  };

  // ** Action to call
  const callAction = (action: any) => {
    switch (action) {
      case "collapse":
        return setCollapse(!collapse);
      case "remove":
        return setVisibility(false);
      case "reload":
        return setReload(true);
      default:
    }
  };

  // ** Renders card actions
  const renderIcons = () => {
    /**
     ** IF: user passes array of actions then loop through them & render all of the actions
     ** ELSE: render single action
     */

    if (Array.isArray(actions)) {
      return actions.map((action, i) => {
        //@ts-ignore
        const Tag = Icons[action];
        return (
          <Tag
            key={i}
            className={classnames("cursor-pointer", {
              "me-50": i < actions.length - 1,
            })}
            size={15}
            onClick={() => callAction(action)}
          />
        );
      });
    } else {
      //@ts-ignore
      const Tag = Icons[actions];
      return (
        <Tag
          className="cursor-pointer"
          size={15}
          onClick={() => callAction(actions)}
        />
      );
    }
  };

  // ** Ends reload
  const removeReload = () => {
    setReload(false);
  };

  // ** If user passes endReload function call it.
  useEffect(() => {
    if (reload) {
      endReload(removeReload);
    }
  });

  // ** If user passes collapse action then return <Collapse> as Wrapper else return <Fragment>
  const CollapseWrapper =
    actions === "collapse" || (actions && actions.includes("collapse"))
      ? Collapse
      : Fragment;

  // ** If user passes reload action then return <BlockUi> as Wrapper else return <Fragment>
  const BlockUiWrapper =
    actions === "reload" || (actions && actions.includes("reload"))
      ? UILoader
      : Fragment;

  return (
    <BlockUiWrapper
      {...(actions === "reload" || (actions && actions.includes("reload"))
        ? {
            blocking: reload,
          }
        : {})}
    >
      <Card
        className={classnames("card-action", {
          "d-none": !visibility,
          "shadow-none": noShadow,
          "mb-0": noBottom,
        })}
      >
        <CardHeader className={headerClassName}>
          <CardTitle tag="h4" className={titleClassName}>
            {title}
          </CardTitle>
          <div className="action-icons">{renderIcons()}</div>
        </CardHeader>
        <CollapseWrapper
          {...(actions === "collapse" ||
          (actions && actions.includes("collapse"))
            ? { isOpen: collapse }
            : {})}
        >
          {children}
        </CollapseWrapper>
      </Card>
    </BlockUiWrapper>
  );
};

export { CardActions };
