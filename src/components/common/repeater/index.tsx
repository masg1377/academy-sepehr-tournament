// ** Third Party Components
import { FC } from "react";

const Repeater: FC<any> = (props): JSX.Element => {
  // ** Props
  const { count, tag = "div", children, ...rest } = props;

  // ** Custom Tag
  const Tag = tag;

  // ** Default Items
  const items = [];

  // ** Loop passed count times and push it in items Array
  for (let i = 0; i < count; i++) {
    items.push(children(i));
  }

  return <Tag {...rest}>{items}</Tag>;
};

export { Repeater };
