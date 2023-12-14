import React, { FC, useEffect, useRef, useState } from "react";

import { ListTable } from "../common/ListTable";
import { columns, data } from "./data";
import { useNavigate } from "react-router-dom";
import { TGetMlsList } from "@src/core/services/api/mls/type";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";

interface IMLSListContainerProp {
  children?: JSX.Element;
}

const MLSListContainer: FC<IMLSListContainerProp> = ({
  children,
}): JSX.Element => {
  const navigate = useNavigate();

  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [data, setData] = useState<any>([]);
  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [filterList, setFilterList] = useState<TGetMlsList>({
    entity: "mls_server",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
      },
    },
  });

  const { mlsServer } = useSelector((state: RootState) => state.refresh);

  const getList = useGetMlsServer();
  const getListInfinite = useGetMlsServer();

  const loadFirstData = () => {
    let firstFilter: any = {
      entity: "mls_server",
      data: {
        list_filter: {
          ...filterList.data.list_filter,
          limit: entryCounter,
          offset: 0,
        },
      },
    };
    setCurrentPage(0);
    setTotalCount(0);
    // setHasMore(true);
    setFilterList(firstFilter);
    getList.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          setData((old: any) =>
            result.map((o: any, index: number) => ({
              ...o,
              last_log_date: getCustomDate(o.modification_date),
              row_id: index + 1,
            }))
          );
          // if (result && result.length < entryCounter) setHasMore(false);
          // else if (!result) setHasMore(false);
          res.data.result_count && setTotalCount(res.data.result_count);
        }
        // else setHasMore(false);
      },
    });
  };

  useEffect(() => {
    loadFirstData();
  }, [entryCounter, mlsServer]);

  const onLoadPage = (page: number = 0) => {
    let filter = { ...filterList };
    if (filter.data.list_filter)
      filter.data.list_filter.offset = page * filter.data.list_filter.limit;

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
              last_log_date: getCustomDate(o.modification_date),
              row_id: page * entryCounter + index + 1,
            })),
          ]);
          // if (!result || result.length < entryCounter) setHasMore(false);
          // res.data.result_count && setTotalCount(res.data.result_count);
        }
        // } else setHasMore(false);
      },
    });
  };
  // const onLoadScroll = () => {
  //   let filter = { ...filterList };
  //   if (filter.data.list_filter)
  //     filter.data.list_filter.offset =
  //       filter.data.list_filter.offset + filter.data.list_filter.limit;
  //   setFilterList(filter);
  //   getListInfinite.mutate(filter, {
  //     onSuccess: (res) => {
  //       if (res.data.is_success) {
  //         let result = res.data.result;
  //         if (!result) {
  //           setHasMore(false);
  //         } else {
  //           if (result && !Array.isArray(result)) result = [result];
  //           setData((e: any) => [
  //             ...e,
  //             ...result.map((o: any, index: number) => ({
  //               ...o,
  //               last_log_date: getCustomDate(o.modification_date),
  //               row_id: e.length + index + 1,
  //             })),
  //           ]);
  //           if (!result || result.length < entryCounter) setHasMore(false);
  //         }
  //       } else setHasMore(false);
  //     },
  //   });
  // };

  const handleFilter = (val: any) => {
    console.log(val);
    const obj: any = {
      entity: "mls_server",
      data: {
        list_filter: {
          order_by: "creation_date DESC",
          limit: entryCounter,
          offset: 0,
          filters: val,
        },
      },
    };
    setCurrentPage(0);
    setTotalCount(0);
    setFilterList(obj);
    // setHasMore(false);
    getList.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              last_log_date: getCustomDate(o.modification_date),
              row_id: index + 1,
            })),
          ]);
          // if (result.length === entryCounter) setHasMore(true);
        }
        // else {
        // setHasMore(false);
        // }
      },
      onError: (err: any) => {
        setData([]);
        // setHasMore(false);
      },
    });
  };

  return (
    <ListTablePaginate
      columns={columns}
      data={data}
      headerTitle="MLS List"
      addBtnText="Add MLS"
      isLoading={getList.isLoading || getListInfinite.isLoading}
      onAddBtn={() => navigate("/mls-list/add")}
      loadFunc={onLoadPage}
      currentPage={currentPage}
      totalCount={totalCount}
      onReload={loadFirstData}
      filterListShow
      fullSearch
      activeFullSearch
      fullSearchComponent={FullSearchComponent}
      handleFullFilter={handleFilter}
      limit={entryCounter}
      setLimit={setEntryCounter}
    />
    // <ListTable
    //   columns={columns}
    //   data={data}
    //   headerTitle="MLS List"
    //   addBtnText="Add MLS"
    //   isLoading={getList.isLoading}
    //   onAddBtn={() => navigate("/mls-list/add")}
    //   loadFunc={onLoadScroll}
    //   hasMore={hasMore}
    //   onReload={loadFirstData}
    //   filterListShow
    //   fullSearch
    //   activeFullSearch
    //   fullSearchComponent={FullSearchComponent}
    //   handleFullFilter={handleFilter}
    //   limit={entryCounter}
    //   setLimit={setEntryCounter}
    // />
  );
};

export { MLSListContainer };
