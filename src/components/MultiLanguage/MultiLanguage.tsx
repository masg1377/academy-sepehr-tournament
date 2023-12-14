import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useGetListOfMultiLang } from "@src/core/services/api/multilang/multilang.api";
import { TMultiLang } from "@src/core/services/api/multilang/type";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListTable } from "../common/ListTable/ListTable";
import { AddLangModal } from "./AddLangModal/AddLangModal";
import { columns } from "./data";
import { useDispatch } from "react-redux";
import { handleStaffList } from "@src/redux/staff";
import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";

const MultiLanguage: FC = (): JSX.Element => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [addModal, setAddModal] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  //   const [onEntryChangeFlag, setOnEntryChangeFlag] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);

  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [filterList, setFilterList] = useState<TMultiLang>({
    action: "GET_LIST",
    list_filter: {
      limit: entryCounter,
      offset: 0,
      order_by: "creation_date DESC",
      //filters: [{ field: "locale", operator: "=", value: "us-en" }],
    },
  });

  const { multiLang } = useSelector((state: RootState) => state.refresh);

  const getList = useGetListOfMultiLang();
  const getListInfinite = useGetListOfMultiLang();

  const loadFirstData = () => {
    setCurrentPage(0);
    setTotalCount(0);
    //setHasMore(false);
    getList.mutate(filterList, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          if (!result) result = [];
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              row_id: index + 1,
              creation_date: getCustomDate(o.creation_date),
            })),
          ]);
          // if (result && result.length < entryCounter) setHasMore(false);
          // else if (!result) setHasMore(false);
          setTotalCount(res.data.result_count || 0);
        }
        //  else setHasMore(false);
      },
      onError: (err: any) => {
        setData([]);
        // setHasMore(false);
      },
    });
  };

  useEffect(() => {
    loadFirstData();
  }, [entryCounter, multiLang, refetch]);

  const onLoadPage = (page: number = 0) => {
    let filter = { ...filterList };
    if (filter.list_filter)
      filter.list_filter.offset = page * filter.list_filter.limit;
    setCurrentPage(page);
    setFilterList(filter);
    getListInfinite.mutate(filter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          // if (!result) {
          //   setHasMore(false);
          // } else {
          if (result && !Array.isArray(result)) result = [result];
          setData((e: any) => [
            // ...e,
            ...result.map((o: any, index: number) => ({
              ...o,
              creation_date: getCustomDate(o.creation_date),
              row_id: page * entryCounter + index + 1,
            })),
          ]);
          res.data.result_count && setTotalCount(res.data.result_count);
          // if (!result || result.length < entryCounter) setHasMore(false);
        }
        // } else setHasMore(false);
      },
    });
  };

  const handleFilter = (val: any) => {
    //console.log(val);
    const obj: any = {
      action: "GET_LIST",
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
        filters: val,
      },
    };
    setFilterList(obj);
    // setHasMore(false);
    setCurrentPage(0);
    setTotalCount(0);
    getList.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          if (!result) result = [];
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              creation_date: getCustomDate(o.creation_date),
              row_id: index + 1,
            })),
          ]);
          res.data.result_count && setTotalCount(res.data.result_count);
          // if (result.length === entryCounter) setHasMore(true);
        }
        // else {
        //   setHasMore(false);
        // }
      },
      onError: (err: any) => {
        setData([]);
        // setHasMore(false);
      },
    });
  };

  return (
    <>
      {addModal && (
        <AddLangModal
          isOpen={addModal}
          onToggle={() => {
            setAddModal(false);
            setRefetch((old) => !old);
          }}
        />
      )}
      <ListTablePaginate
        columns={columns}
        data={data}
        headerTitle="Multi language list"
        addBtnText="Add"
        isLoading={getList.isLoading || getListInfinite.isLoading}
        onAddBtn={() => setAddModal(true)}
        loadFunc={onLoadPage}
        // hasMore={hasMore}
        onReload={loadFirstData}
        filterListShow
        fullSearch
        activeFullSearch
        fullSearchComponent={FullSearchComponent}
        handleFullFilter={handleFilter}
        limit={entryCounter}
        totalCount={totalCount}
        setLimit={setEntryCounter}
        currentPage={currentPage}
      />
    </>
  );
};

export { MultiLanguage };
