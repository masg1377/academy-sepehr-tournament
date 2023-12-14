import React, { FC, useState } from "react";
import { AddNotifWrapper } from "../AddNotifWrapper";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { Plus, PlusSquare } from "react-feather";
import { AddCategoryModal } from "./AddCategoryModal";
import { AddVariableModal } from "./AddVariableModal";
import { Col, Row } from "reactstrap";
import { SwitchBox } from "@src/components/common/form/common/SwitchBox/SwitchBox";
import { ActionForm } from "./ActionForm/ActionForm";
import { useFormikContext } from "formik";

interface IBasicDetailsProp {
  stepper: any;
}

const BasicDetails: FC<IBasicDetailsProp> = ({ stepper }): JSX.Element => {
  const [addCategoryModals, setAddCategoryModal] = useState<boolean>(false);
  const [addVariableModals, setAddVariableModal] = useState<boolean>(false);

  const { values } = useFormikContext<any>();

  const addMore = (onClick: () => void) => (
    <div
      className="mt-1 d-flex gap-1 align-items-center cursor-pointer"
      onClick={() => onClick()} //setAddCategoryModal(true)}
    >
      <Plus
        size={22}
        color="white"
        style={{ padding: 3, backgroundColor: "blue", borderRadius: 5 }}
      />
      <span className="d-block text-blue-notif fs-4 fw-bold">Add</span>
    </div>
  );

  return (
    <AddNotifWrapper stepName="Basic details" stepNum={1} stepper={stepper}>
      <>
        {addCategoryModals && (
          <AddCategoryModal
            isOpen={addCategoryModals}
            onToggle={() => setAddCategoryModal(false)}
          />
        )}
        {addVariableModals && (
          <AddVariableModal
            isOpen={addVariableModals}
            onToggle={() => setAddVariableModal(false)}
          />
        )}
      </>
      <RowWrappers sm={6} md={4}>
        <div>
          <SelectOption
            name="categoryName"
            options={[]}
            placeholder="Please select..."
            label="Category name"
          />

          {addMore(() => setAddCategoryModal(true))}
        </div>

        <InputText
          name="name"
          placeholder="Please enter..."
          label="Notification name"
        />
      </RowWrappers>

      <RowWrappers sm={6} md={4}>
        <SelectOption
          name="appNames"
          options={[{ value: -1, label: "Select All" }]}
          placeholder="Please select..."
          label="App names"
          isMulti
        />
      </RowWrappers>

      <RowWrappers sm={6} md={4}>
        <div>
          <SelectOption
            name="variables"
            options={[]}
            placeholder="Please select..."
            label="Variables"
            isMulti
          />
          {addMore(() => setAddVariableModal(true))}
        </div>
      </RowWrappers>
      <Row className="py-1">
        <Col sm={12} xxl={8}>
          <div className="border-bottom"></div>
        </Col>
      </Row>

      <RowWrappers sm={12} md={12} xl={12} xxl={8}>
        <div>
          <SwitchBox name="hasAction" color="success">
            has action
          </SwitchBox>

          {values["hasAction"] && <ActionForm />}
        </div>
      </RowWrappers>
    </AddNotifWrapper>
  );
};

export { BasicDetails };
