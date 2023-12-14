import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import {
  useGroupInviteMemberList,
  useModifyGroupMemberRole,
} from "@src/core/services/api/group/group.api";
import { capitalizeFirstLetter } from "@src/core/utils/Utils";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { TUser } from "../Detail/GroupMembers";
import toast from "react-hot-toast";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { groupInviteMemberValidation } from "@src/core/validations/group.validation";

interface IGroupMemberInviteModalProp {
  onToggle: (refresh?: boolean) => void;
  isOpen: boolean;
  user?: TUser;
}

const GroupMemberInviteModal: FC<IGroupMemberInviteModalProp> = ({
  isOpen,
  onToggle,
  user,
}): JSX.Element => {
  const { id, group_id } = useParams();

  const changeRole = useGroupInviteMemberList();

  const onSubmit = (values: any) => {
    changeRole.mutate(
      {
        group_id: id ? +id : group_id ? +group_id : 0,
        body: {
          invitation_list: [
            { email: values?.email, role: values?.role?.value },
          ],
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            toast.success(res.data.message || "");
            onToggle();
          }
        },
      }
    );
  };

  return (
    <FormWrapper
      initialValues={{
        role: null,
        email: "",
      }}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={groupInviteMemberValidation}
    >
      {({ submitForm }) => (
        <Modal isOpen={isOpen} modalTitle="Invite Member" onToggle={onToggle}>
          {{
            main: (
              <>
                <InputText
                  name="email"
                  placeholder="Please enter..."
                  label="Email"
                  wrapperClassName="mb-1"
                />

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
                  schema={groupInviteMemberValidation}
                  type="submit"
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

export { GroupMemberInviteModal };
