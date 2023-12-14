import React, { FC, useState } from "react";
import { CustomIcon } from "@src/components/common/CustomIcon";
import { Typography } from "@src/components/common/Typography";
import { Divider } from "@src/components/common/divider/Divider";
import union from "@assets/images/icons/Union.png";
import { CollapserItem } from "@src/components/common/CollapserItem/CollapserItem";

interface IContentWrapperProp {
  children: JSX.Element;
  title: string;
}

const ContentWrapper: FC<IContentWrapperProp> = ({ children, title }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <CollapserItem
      state={open}
      setState={setOpen}
      wrapperStyles={{ borderRadius: "6px", border: "solid 1px #e1e0ea" }}
      wrapperClasses="my-1"
      text={title}
    >
      <div className="py-1 px-2">{children}</div>
    </CollapserItem>
  );
};

export default ContentWrapper;
