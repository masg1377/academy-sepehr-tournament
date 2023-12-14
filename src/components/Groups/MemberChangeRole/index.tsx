import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useModifyGroupMemberRole } from "@src/core/services/api/group/group.api";
import { capitalizeFirstLetter } from "@src/core/utils/Utils";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { TUser } from "../Detail/GroupMembers";
import toast from "react-hot-toast";

interface IMemberChangeRoleProp {
  onToggle: (refresh?: boolean) => void;
  isOpen: boolean;
  user?: TUser;
}

const MemberChangeRole: FC<IMemberChangeRoleProp> = ({
  isOpen,
  onToggle,
  user,
}): JSX.Element => {
  const { id, group_id } = useParams();

  const changeRole = useModifyGroupMemberRole();

  const onSubmit = (values: any) => {
    changeRole.mutate(
      {
        group_id: id ? +id : group_id ? +group_id : 0,
        body: { member_id: user?.id || 0, role: values?.role?.value },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            toast.success(res.data.message || "");
            onToggle(true);
          }
        },
      }
    );
  };

  return (
    <FormWrapper
      initialValues={{
        role: user?.role
          ? {
              value: user?.role.toLowerCase(),
              label: capitalizeFirstLetter(user?.role),
            }
          : null,
      }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ submitForm }) => (
        <Modal isOpen={isOpen} modalTitle="Change Role" onToggle={onToggle}>
          {{
            main: (
              <>
                <span className="d-block fs-5 text-darker">
                  Change the role of{" "}
                  <span className="fw-bolder">
                    {user?.first_name} {user?.last_name}
                  </span>
                </span>

                <SelectOption
                  name="role"
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "member", label: "Member" },
                    { value: "moderator", label: "Moderator" },
                    { value: "owner", label: "Owner" },
                  ]}
                  placeholder="Please select..."
                  label="Role"
                  wrapperClassName="my-1"
                  customeLabelClass="fs-7 text-darker"
                />
              </>
            ),
            footer: (
              <div className="d-flex w-100">
                <SubmitButton
                  color="link"
                  type="button"
                  className="flex-1"
                  onClick={onToggle}
                  disabled={changeRole.isLoading}
                >
                  Cancel
                </SubmitButton>
                <SubmitButton
                  onClick={submitForm}
                  className="flex-1"
                  isLoading={changeRole.isLoading}
                >
                  Save
                </SubmitButton>
              </div>
            ),
          }}
        </Modal>
      )}
    </FormWrapper>
  );
};

export { MemberChangeRole };
