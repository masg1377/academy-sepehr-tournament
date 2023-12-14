import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import React, { FC } from "react";

interface IAddCategoryModalProp {
  isOpen: boolean;
  onToggle: () => void;
}

const AddCategoryModal: FC<IAddCategoryModalProp> = ({
  isOpen,
  onToggle,
}): JSX.Element => {
  return (
    <FormWrapper initialValues={{ name: "" }} onSubmit={() => {}}>
      {({ submitForm }) => (
        <Modal isOpen={isOpen} modalTitle="Add Category" onToggle={onToggle}>
          {{
            main: (
              <>
                <InputText
                  name="name"
                  placeholder="Please write name ..."
                  label="Category Name"
                  wrapperClassName="my-1"
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

export { AddCategoryModal };
