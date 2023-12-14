import { Typography } from "@src/components/common/Typography";
import React, { FC } from "react";
import { Check } from "react-feather";

interface IGroupAdvantageItemProp {
  text: string;
}

const GroupAdvantageItem: FC<IGroupAdvantageItemProp> = ({
  text,
}): JSX.Element => {
  return (
    <div className="d-flex flex-row justify-content-start align-items-center mt-0/5">
      <Check size={18} color="#2cbc63" />
      <Typography size={18} className="text-secondary ms-0/5">
        {text}
      </Typography>
    </div>
  );
};

export { GroupAdvantageItem };
