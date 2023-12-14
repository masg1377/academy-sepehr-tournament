// ** Third Party Components
import { FC } from "react";
import { MoreHorizontal } from "react-feather";

interface IVerticalNavMenuSectionHeaderProp {
  item: any;
}

const VerticalNavMenuSectionHeader: FC<IVerticalNavMenuSectionHeaderProp> = ({
  item,
}): JSX.Element => {
  return (
    <li className="navigation-header">
      <span>{item.header}</span>
      <MoreHorizontal className="feather-more-horizontal" />
    </li>
  );
};

export { VerticalNavMenuSectionHeader };
