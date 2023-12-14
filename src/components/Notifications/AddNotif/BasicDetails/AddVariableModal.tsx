import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import React, { FC } from "react";

interface IAddVariableModalProp {
  isOpen: boolean;
  onToggle: () => void;
}

const AddVariableModal: FC<IAddVariableModalProp> = ({
  isOpen,
  onToggle,
}): JSX.Element => {
  return (
    <FormWrapper
      initialValues={{
        variableName: "",
        objectType: null,
        objectField: null,
        description: "",
      }}
      onSubmit={() => {}}
    >
      {({ submitForm }) => (
        <Modal isOpen={isOpen} modalTitle="Add variable" onToggle={onToggle}>
          {{
            main: (
              <>
                <InputText
                  name="variableName"
                  placeholder="Please write name ..."
                  label="Variable Name"
                  wrapperClassName="my-1"
                />

                <SelectOption
                  name="objectType"
                  options={[]}
                  placeholder="Please select"
                  label="Object type"
                  wrapperClassName="mb-1"
                />

                <SelectOption
                  name="objectField"
                  options={[]}
                  placeholder="Please select"
                  label="Object field"
                  wrapperClassName="mb-1"
                />

                <InputText
                  name="description"
                  placeholder="Please write Description ..."
                  label="Description"
                  type="textarea"
                  wrapperClassName="mb-1"
                />
              </>
            ),
            footer: (
              <div className="w-100 d-flex">
                <SubmitButton
                  type="button"
                  color="link"
                  className="flex-fill"
                  onClick={onToggle}
                >
                  Cancel
                </SubmitButton>
                <SubmitButton className="flex-fill" onClick={submitForm}>
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

export { AddVariableModal };
