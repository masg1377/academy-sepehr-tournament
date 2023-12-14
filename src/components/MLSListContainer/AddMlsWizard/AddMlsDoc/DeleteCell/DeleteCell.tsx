import { useRemoveMls } from "@src/core/services/api/mls/mls.api";
import { TRemoveMls } from "@src/core/services/api/mls/type";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

const DeleteCell: FC<any> = ({ id, onChangeData }): JSX.Element => {
  const remove = useRemoveMls();

  const dispatch = useDispatch();

  const onRemove = () => {
    showQuestionAlert(
      "Are you sure?",
      "Delete the Mls Document?",
      (val) => {},
      "Yes",
      true,
      true,
      async (val) => {
        try {
          const result = await remove.mutateAsync({
            entity: "mls_document",
            data: { id: +id },
          });
          if (result.data.is_success) {
            showSuccessAlert(
              "Success!",
              "Mls document removed!",
              () => {
                dispatch(handleRefresh("mlsDoc"));
              },
              "Ok"
            );
            return result.data.is_success;
          } else {
            showErrorAlert("Error!", "Something went wrong!", undefined, "Ok");
          }
        } catch (error) {
          showErrorAlert("Error!", "Something went wrong!", undefined, "Ok");
        }
      }
    );
  };

  return (
    <div className="d-flex">
      <Button color="link text-danger" onClick={() => onRemove()}>
        Delete
      </Button>
    </div>
  );
};

export { DeleteCell };
