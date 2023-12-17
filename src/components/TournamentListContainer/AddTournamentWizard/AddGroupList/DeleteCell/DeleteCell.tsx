import { useRemoveMls } from "@src/core/services/api/mls/mls.api";
import { TRemoveMls } from "@src/core/services/api/mls/type";
import {
  useDeleteTournamentCheckList,
  useDeleteTournamentGroup,
  useDeleteTurnamentReferes,
} from "@src/core/services/api/tournament";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

const DeleteCell: FC<any> = (row): JSX.Element => {
  const remove = useDeleteTournamentGroup();

  const onRemove = () => {
    showQuestionAlert(
      "Are you sure?",
      "Delete the Group?",
      (val) => {},
      "Yes",
      true,
      true,
      async (val) => {
        try {
          const result = await remove.mutateAsync({
            deleteEntityId: row.id,
          });
          if (result.data.success) {
            showSuccessAlert(
              "Success!",
              "Group removed!",
              () => {
                row?.onLoadData();
              },
              "Ok"
            );

            return result.data.success;
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
