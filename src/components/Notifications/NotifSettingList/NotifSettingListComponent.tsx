import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullSearchComponent } from "./FullSearchComponent";
import { notifSettingColumns, notifSettingData } from "./data";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { InputText } from "@src/components/common/form/common/InputText/InputText";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";
import { Modal } from "@src/components/common/Modal/Modal";

const NotifSettingListComponent = () => {
  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  // Hooks
  const navigate = useNavigate();

  return (
    <>
      <ListTablePaginate
        columns={notifSettingColumns}
        data={notifSettingData}
        headerTitle="Notification settings list"
        addBtnText="Add"
        //   onAddBtn={() => navigate("/add-usage-plan")}
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
    </>
  );
};

export { NotifSettingListComponent };
