// ** Import from react
import { FC, useState } from "react";

// ** Import general components
import { Modal } from "@src/components/common/Modal";
import { FormWrapper } from "@src/components/common/form/FormWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import { FilterItems } from "./FilterModalItems/FilterModalItems";

interface IAddConfigModalProp {
  isOpen: boolean;
  onToggle: () => void;
  setItemShow: (val: any) => void;
  initialValuesShow: any;
  fieldData: any;
}
const AddFilterModal: FC<IAddConfigModalProp> = ({
  isOpen,
  onToggle,
  setItemShow,
  initialValuesShow,
  fieldData,
}): JSX.Element => {
  const onSubmit = (values: any) => {
    setItemShow(values);
    setTimeout(() => {
      onToggle();
    }, 80);
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onToggle={() => {
        onToggle();
      }}
      //unmountOnClose
      modalTitle="Customize Filters"
      bodyClassName="overflow-hidden pb-2"
    >
      {{
        wrapper: (props: any) => (
          <FormWrapper
            initialValues={initialValuesShow}
            onSubmit={onSubmit}
            enableReinitialize
            //validationSchema={}
          >
            {props.children}
          </FormWrapper>
        ),
        main: (
          <>
            {fieldData.map((item: any, index: number) => (
              <FilterItems
                key={index}
                index={index}
                name={item?.name}
                label={item?.label}
              />
            ))}
          </>
        ),
        footer: (
          <SubmitButton
            type={"submit"}
            color="light"
            className="btn-next w-100 text-dark"
          >
            Save
          </SubmitButton>
        ),
      }}
    </Modal>
  );
};

export { AddFilterModal };
