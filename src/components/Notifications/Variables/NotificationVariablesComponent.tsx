import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullSearchComponent } from "./FullSearchComponent";
import {
  notificationVariablesColumns,
  notificationVariablesData,
} from "./data";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { Modal } from "@src/components/common/Modal/Modal";

const NotificationVariablesComponent = () => {
  // States
  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [modalBox, setModalBox] = useState<boolean>(false);

  return (
    <>
      <ListTablePaginate
        columns={notificationVariablesColumns}
        data={notificationVariablesData}
        headerTitle="Notification settings list"
        addBtnText="Add"
        onAddBtn={() => setModalBox((prev) => !prev)}
        //   isLoading={getList.isLoading || getListInfinite.isLoading}
        //   loadFunc={onLoadPage}
        //   onReload={loadFirstData}
        filterListShow
        fullSearch
        activeFullSearch
        fullSearchComponent={FullSearchComponent}
        //   handleFullFilter={handleFilter}
        limit={entryCounter}
        //   setLimit={setEntryCounter}
        totalCount={totalCount}
        currentPage={currentPage}
      />
      <FormWrapper initialValues={{}} onSubmit={() => {}}>
        <Modal
          isOpen={modalBox}
          onToggle={() => setModalBox((prev) => !prev)}
          modalTitle="Add Notif Setting"
        >
          {{
            main: (
              <>
                <InputText
                  name="VariableName"
                  label="Variable Name"
                  placeholder="Please write name ..."
                />
                <SelectOption
                  wrapperClassName="mt-1"
                  name="ObjectType"
                  placeholder="Please Select"
                  label="Object type"
                  options={[
                    { value: 1, label: "item 1" },
                    { value: 2, label: "item 2" },
                  ]}
                />
                <SelectOption
                  wrapperClassName="mt-1"
                  name="ObjectField"
                  placeholder="Please Select"
                  label="Object field"
                  options={[
                    { value: 1, label: "item 1" },
                    { value: 2, label: "item 2" },
                  ]}
                />
                <InputText
                  customStyle={{
                    maxHeight: "120px",
                    minHeight: "120px",
                  }}
                  wrapperClassName="mt-1"
                  name="Description"
                  label="Description"
                  type="textarea"
                  placeholder="Please write Description ..."
                />
                <div className="w-100 d-flex gap-2 mt-2">
                  <SubmitButton outline className="flex-1">
                    Cancel
                  </SubmitButton>
                  <SubmitButton className="flex-1">Save</SubmitButton>
                </div>
              </>
            ),
          }}
        </Modal>
      </FormWrapper>
    </>
  );
};

export { NotificationVariablesComponent };
