import React, { FC } from "react";
import { Button } from "reactstrap";

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
