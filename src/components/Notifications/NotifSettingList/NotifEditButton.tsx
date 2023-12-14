import { Typography } from "@src/components/common/Typography";
import React, { FC } from "react";

const NotifEditButton: FC<{ onToggle: () => void }> = ({ onToggle }) => {
  console.log('first',onToggle)
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

export default NotifEditButton;
