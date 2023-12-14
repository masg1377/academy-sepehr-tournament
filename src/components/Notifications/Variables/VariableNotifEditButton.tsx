import { Typography } from "@src/components/common/Typography";
import React, { FC } from "react";

const VariableNotifEditButton: FC<{ onToggle: () => void }> = ({
  onToggle,
}) => {
  return (
    <Typography
      onClick={onToggle}
      size={15}
      className="text-primary cursor-pointer"
    >
      Edit
    </Typography>
  );
};

export default VariableNotifEditButton;
