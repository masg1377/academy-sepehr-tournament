import { FC } from "react";
// ** Vertical Menu Components
import { VerticalNavMenuLink } from "../VerticalNavMenuLink";
import { VerticalNavMenuGroup } from "../VerticalNavMenuGroup/VerticalNavMenuGroup";
import { VerticalNavMenuSectionHeader } from "../VerticalNavMenuSectionHeader";

// ** Utils
import {
  canViewMenuGroup,
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent,
} from "@src/components/common/layouts/utils";
import { PermissionWrapper } from "@src/components/common/PermissionWrapper/PermissionWrapper";

const VerticalMenuNavItems: FC<any> = (props): JSX.Element => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader,
  };

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item: any, index: number) => {
    const TagName = Components[resolveNavItemComponent(item)];
    if (item.children) {
      return (
        // canViewMenuGroup(item) && (
        <PermissionWrapper key={index + 10} roles={item.permissions}>
          <TagName item={item} index={index} key={item.id} {...props} />
        </PermissionWrapper>
        // )
      );
    }
    return (
      <PermissionWrapper key={index + 10} roles={item.permissions}>
        <TagName key={item.id || item.header} item={item} {...props} />
      </PermissionWrapper>
    );
  });

  return RenderNavItems;
};

export { VerticalMenuNavItems };
