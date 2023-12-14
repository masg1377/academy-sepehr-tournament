import { FC } from "react";
// ** Menu Components Imports
import { HorizontalNavMenuLink } from "../HorizontalNavMenuLink";
import { HorizontalNavMenuGroup } from "../HorizontalNavMenuGroup/HorizontalNavMenuGroup";
import {
  canViewMenuGroup,
  resolveHorizontalNavMenuItemComponent as resolveNavItemComponent,
} from "@src/components/common/layouts/utils";

const HorizontalNavMenuItems: FC<any> = (props): JSX.Element => {
  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
  };

  // ** Render Nav Items
  const RenderNavItems = props.items.map((item: any, index: number) => {
    const TagName = Components[resolveNavItemComponent(item)];
    if (item.children) {
      return (
        canViewMenuGroup(item) && (
          <TagName item={item} index={index} key={item.id} {...props} />
        )
      );
    }
    return <TagName item={item} index={index} key={item.id} {...props} />;
  });

  return RenderNavItems;
};

export { HorizontalNavMenuItems };
