import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resourceListColumns, resourceListData } from "./data";
import { FullSearchComponent } from "../FullSearchComponent";
import { Modal } from "@src/components/common/Modal/Modal";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton/SubmitButton";
import { RowWrappers } from "@src/components/common/RowWrappers/RowWrappers";
import { Col } from "reactstrap";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";

const ResourcesListComponent = () => {
  // States
  const [modalBox, setModalBox] = useState<boolean>(false);
  // Hooks
  const navigate = useNavigate();
  return (
    <>
      <ListTablePaginate
        columns={resourceListColumns}
        data={resourceListData}
        headerTitle="Package List"
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
        limit={5}
        //   setLimit={setEntryCounter}
        totalCount={10}
        currentPage={1}
      />
      <FormWrapper initialValues={{}} onSubmit={() => {}}>
        <Modal
          isOpen={modalBox}
          onToggle={() => setModalBox((prev) => !prev)}
          modalTitle="Add Resource"
        >
          {{
            main: (
              <>
                <InputText
                  name="Name"
                  label="Name"
                  placeholder="Please write name ..."
                />
                <SelectOption
                wrapperClassName="mt-1"
                  name="Resource"
                  placeholder="Please Select"
                  label="Resource"
                  options={[
                    { value: 1, label: "item 1" },
                    { value: 2, label: "item 2" },
                  ]}
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

export { ResourcesListComponent };
