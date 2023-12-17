import { handleRefresh } from "@src/redux/refresh";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { AddDocModal } from "../AddDocModal/AddDocModal";

const EditCell: FC<any> = ({
  setEditCellData,
  onChangeData,
  ...rest
}): JSX.Element => {
  return (
    <div className="d-flex">
      <Button color="link" onClick={() => setEditCellData(rest)}>
        Edit
      </Button>
    </div>
  );
};

export { EditCell };
