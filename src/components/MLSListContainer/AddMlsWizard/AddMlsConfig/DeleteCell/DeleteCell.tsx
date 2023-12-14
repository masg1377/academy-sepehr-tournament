import { useRemoveMls } from "@src/core/services/api/mls/mls.api";
import {
  showErrorAlert,
  showQuestionAlert,
  showSuccessAlert,
} from "@src/core/utils/Utils";
import { handleRefresh } from "@src/redux/refresh";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

const DeleteCell: FC<any> = ({ id, onChangeData, setRefetch }): JSX.Element => {
  const remove = useRemoveMls();

  const dispatch = useDispatch();

  const onRemove = () => {
    showQuestionAlert(
      "Are you sure?",
      "Delete the Mls Config?",
      (val) => {},
      "Yes",
      true,
      true,
      async (val) => {
        try {
          const result = await remove.mutateAsync({
            entity: "mls_config",
            data: { id: +id },
          });
          if (result.data.is_success) {
            showSuccessAlert(
              "Success!",
              "Mls config removed!",
              () => {
                // dispatch(handleRefresh("mlsConfig"));
                setRefetch((old: any) => !old);
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
