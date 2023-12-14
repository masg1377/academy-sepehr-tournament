import { Modal } from "@src/components/common/Modal/Modal";
import { Typography } from "@src/components/common/Typography";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useApproveGroupInviteMember } from "@src/core/services/api/group/group.api";
import React, { Dispatch, FC, SetStateAction } from "react";
import { AlertTriangle } from "react-feather";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface IApproveMemberModalProp {
  isOpen: boolean;
  onToggle: () => void;
  name: string;
  request_id: number;
  isApprove: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

const ApproveMemberModal: FC<IApproveMemberModalProp> = ({
  isOpen,
  onToggle,
  name,
  request_id,
  isApprove,
  setRefresh,
}): JSX.Element => {
  const { group_id } = useParams();

  const approve = useApproveGroupInviteMember();

  const onApprove = () => {
    approve.mutate(
      {
        group_id: group_id ? +group_id : 0,
        body: { approve: isApprove, request_id },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            //@ts-ignore
            toast.success(res.data.message);
            onToggle();
            setRefresh((old) => !old);
          }
        },
      }
    );
  };

  return (
    <Modal
      hasFooter={false}
      isOpen={isOpen}
      modalTitle="Accept member"
      onToggle={onToggle}
    >
      {{
        main: (
          <>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
              <AlertTriangle
                size={60}
                color={isApprove ? "#21c44c" : "#e8c92f"}
                className="my-2"
              />
              <Typography
                size={4}
                className="text-center px-5"
                style={{ color: "#797a80" }}
              >
                Are you sure to {isApprove ? "Approve" : "reject"}{" "}
                <Typography
                  size={4}
                  className="fw-bold"
                  style={{ color: "#182d49" }}
                >
                  {name}
                </Typography>{" "}
                join request?
              </Typography>

              <div className="w-100 d-flex mt-2">
                <SubmitButton
                  onClick={onToggle}
                  noForm
                  color="link"
                  className="flex-1"
                  disabled={approve.isLoading}
                  block
                >
                  No
                </SubmitButton>
                <SubmitButton
                  block
                  className="flex-1"
                  noForm
                  isLoading={approve.isLoading}
                  color="info"
                  onClick={onApprove}
                >
                  Yes
                </SubmitButton>
              </div>
            </div>
          </>
        ),
      }}
    </Modal>
  );
};

export { ApproveMemberModal };
