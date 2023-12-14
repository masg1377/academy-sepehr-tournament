import { getCustomDate } from "@src/core/utils/date-helper.utils";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "./data";
import { useDispatch } from "react-redux";
import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";
import { useGetAPIMgmtList } from "@src/core/services/api/api-key";
import { TGetAPIKey } from "@src/core/services/api/api-key/type";

const PublisherComponent: FC = (): JSX.Element => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [addModal, setAddModal] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  //   const [onEntryChangeFlag, setOnEntryChangeFlag] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);

  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [filterList, setFilterList] = useState<TGetAPIKey>({
    data: {
      list_filter: {
        limit: entryCounter,
        offset: 0,
        order_by: "id DESC",
        //filters: [{ field: "locale", operator: "=", value: "us-en" }],
      },
    },
  });

  const { multiLang } = useSelector((state: RootState) => state.refresh);

  const getList = useGetAPIMgmtList();
  const getListInfinite = useGetAPIMgmtList();

  const loadFirstData = () => {
    const firstFilter: TGetAPIKey = {
      data: {
        list_filter: {
          ...filterList.data.list_filter,
          limit: entryCounter,
          offset: 0,
        },
      },
    };
    // setHasMore(true);
    setCurrentPage(0);
    setTotalCount(0);
    setFilterList(firstFilter);
    getList.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result || [];
          if (result && !Array.isArray(result)) result = [result];
          // if (!result || result.length < entryCounter) {
          //   setHasMore(false);
          // }
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              //row_id: old.length + index + 1,
              row_id: index + 1,
              setRefetch: setRefetch,
              isLoading: getList.isLoading,
            })),
          ]);
          res.data.result_count && setTotalCount(res.data.result_count);
        }
        // else setHasMore(false);
      },
      onError: (err: any) => {
        setData([]);
        // setHasMore(false);
      },
    });
  };

  useEffect(() => {
    // loadFirstData();
  }, [entryCounter, multiLang, refetch]);

  const onLoadPage = (page: number = 0) => {
    let filter = { ...filterList };
    if (filter.data.list_filter)
      filter.data.list_filter.offset = page * filter.data.list_filter.limit;
    setCurrentPage(page);
    setFilterList(filter);
    getListInfinite.mutate(filter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result || [];
          // if (!result) {
          //   setHasMore(false);
          // } else {
          if (result && !Array.isArray(result)) result = [result];
          setData((e: any) => [
            // ...e,
            ...result.map((o: any, index: number) => ({
              ...o,
              row_id: page * entryCounter + index + 1,
              setRefetch: setRefetch,
              isLoading: getListInfinite.isLoading,
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
    const obj = {
      data: {
        list_filter: {
          order_by: "id DESC",
          limit: entryCounter,
          offset: 0,
          filters: val,
        },
      },
    };
    setFilterList(obj);
    // setHasMore(false);
    setCurrentPage(0);
    setTotalCount(0);
    getList.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result || [];
          if (result && !Array.isArray(result)) result = [result];
          if (!result) result = [];
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              row_id: index + 1,
              setRefetch: setRefetch,
              isLoading: getList.isLoading,
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
      <ListTablePaginate
        columns={columns}
        data={data}
        headerTitle="Publishers"
        addBtnText="Add publishers"
        isLoading={getList.isLoading || getListInfinite.isLoading}
        onAddBtn={() => navigate("/publisher-list/add")}
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

export { PublisherComponent };
