import DropdownMenuPortal from "@src/components/common/DropdownMenuPortal";
import React from "react";
import { Edit, FileText, MoreVertical, Trash } from "react-feather";
import { DropdownItem, DropdownToggle, UncontrolledDropdown } from "reactstrap";

const NotifMore = () => {
  return (
    <div className="d-flex">
      <UncontrolledDropdown>
        <DropdownToggle className="pe-1" tag="span">
          <MoreVertical size={15} />
        </DropdownToggle>
        <DropdownMenuPortal>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={(e) => {
              e.preventDefault();
              //   navigate("/packages/" + row.id);
            }}
          >
            <FileText size={15} />
            <span className="align-middle ms-50">Details</span>
          </DropdownItem>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={(e) => {
              e.preventDefault();
              //   onRemove(+row.id);
            }}
          >
            <Trash size={15} />
            <span className="align-middle ms-50">Delete</span>
          </DropdownItem>
        </DropdownMenuPortal>
      </UncontrolledDropdown>
      {/* <Edit
        size={17}
        onClick={(e) => {
          e.preventDefault();
          //   navigate("/packages/edit/" + row.id);
        }}
      /> */}
    </div>
  );
};

export default NotifMore;
