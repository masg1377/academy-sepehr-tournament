import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";
import { Modal } from "@src/components/common/Modal/Modal";
import { Typography } from "@src/components/common/Typography";
import React, { FC } from "react";
import { MoreVertical, Edit, Copy } from "react-feather";
import { DropdownItem, DropdownToggle, UncontrolledDropdown } from "reactstrap";

const DeleteButtonRC: FC<{ id?: number }> = ({ id }): JSX.Element => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="span">
        <MoreVertical size={15} />
      </DropdownToggle>
      <DropdownMenuPortal>
        <DropdownItem
          tag="a"
          href="/"
          className="w-100 justify-content-center align-items-center"
          onClick={(e) => {
            e.preventDefault();
            //   setRegenerateClientModal(true);
          }}
        >
          <Edit size={15} />
          <Typography
            className="ms-0/5"
            size={14}
            style={{ color: "#7d7f80b3" }}
          >
            Edit
          </Typography>
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="/"
          className="w-100 justify-content-center align-items-center"
          onClick={(e) => {
            e.preventDefault();
            //   setRegenerateClientModal(true);
          }}
        >
          <Copy size={15} />
          <Typography
            className="ms-0/5"
            size={14}
            style={{ color: "#7d7f80b3" }}
          >
            Duplicate
          </Typography>
        </DropdownItem>
      </DropdownMenuPortal>
    </UncontrolledDropdown>
  );
};

export default DeleteButtonRC;
