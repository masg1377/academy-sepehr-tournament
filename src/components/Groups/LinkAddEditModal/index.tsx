import { Modal } from "@src/components/common/Modal/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { useAddEditLinkToGroup } from "@src/core/services/api/group/group.api";
import { TAddEditLinkGroup } from "@src/core/services/api/group/type";
import { groupAddEditLinkValidation } from "@src/core/validations/group.validation";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface ILinkAddEditModalProp {
  isOpen: boolean;
  onToggle: () => void;
  selected: any;
}

const LinkAddEditModal: FC<ILinkAddEditModalProp> = ({
  isOpen,
  onToggle,
  selected,
}): JSX.Element => {
  const { id } = useParams();

  console.log("selected", selected);

  const addEditLink = useAddEditLinkToGroup();

  const onSubmit = (values: any) => {
    const obj: {
      group_id: number;
      body: TAddEditLinkGroup;
      isEdit?: boolean;
    } = {
      group_id: id ? +id : 0,
      isEdit: selected ? true : false,
      body: {
        title: values?.title,
        category: values?.category,
        url: values?.url,
      },
    };

    addEditLink.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          toast.success(res.data?.message || "");
          onToggle();
        }
      },
    });
  };

  return (
    <FormWrapper
      initialValues={{
        title: selected?.title || "",
        category: selected?.category || "",
        url: selected?.url || "",
      }}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={groupAddEditLinkValidation}
    >
      {({ submitForm }) => (
        <Modal isOpen={isOpen} onToggle={onToggle} modalTitle="Add Link">
          {{
            main: (
              <>
                <InputText
                  name="title"
                  placeholder="Please enter..."
                  label="Link Title"
                  wrapperClassName="mb-1"
                  disabled={selected ? true : false}
                />

                <InputText
                  name="category"
                  placeholder="Please enter..."
                  label="Category"
                  wrapperClassName="mb-1"
                />

                <InputText
                  name="url"
                  placeholder="Please enter..."
                  label="URL"
                  wrapperClassName="mb-1"
                />
              </>
            ),
            footer: (
              <div className="w-100 d-flex">
                <SubmitButton
                  type="button"
                  onClick={onToggle}
                  color="link"
                  className="flex-1"
                  disabled={addEditLink.isLoading}
                >
                  Cancel
                </SubmitButton>
                <SubmitButton
                  type="submit"
                  onClick={submitForm}
                  color="info"
                  className="flex-1"
                  isLoading={addEditLink.isLoading}
                  schema={groupAddEditLinkValidation}
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

export { LinkAddEditModal };
