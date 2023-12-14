import { useGetPlatform } from "@src/core/services/api/platform/platform.api";
import { TGetPlatformList } from "@src/core/services/api/platform/type";
import { RootState } from "@src/redux/store";
import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ListTable } from "../common/ListTable/ListTable";
import { columns } from "./data";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";

interface IClientsRequestsProp {
  children?: JSX.Element;
}

const Platform: FC<IClientsRequestsProp> = ({ children }): JSX.Element => {
  const navigate = useNavigate();

  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [filterList, setFilterList] = useState<TGetPlatformList>({
    entity: "platform",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
      },
    },
  });
  const [data, setData] = useState<any>([]);

  const { platform } = useSelector((state: RootState) => state.refresh);

  const getList = useGetPlatform();
  const getListInfinite = useGetPlatform();

  const loadFirstData = () => {
    const firstFilter: TGetPlatformList = {
      entity: "platform",
      data: {
        list_filter: {
          order_by: "creation_date DESC",
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
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              row_id: index + 1,
            })),
          ]);

          // if (result && result.length < entryCounter) setHasMore(false);
        }
        //  else setHasMore(false);
        res.data.result_count && setTotalCount(res.data.result_count);
      },
      onError: (err: any) => {
        setData([]);
        // setHasMore(false);
      },
    });
  };

  useEffect(() => {
    loadFirstData();
  }, [entryCounter, platform]);

  const onLoadPage = (page: number = 0) => {
    let filter = { ...filterList };
    if (filter.data.list_filter)
      filter.data.list_filter.offset = page * filter.data.list_filter.limit;
    setFilterList(filter);
    setCurrentPage(page);
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
              row_id: page * entryCounter + index + 1,
            })),
          ]);
          // if (!result || result.length < entryCounter) setHasMore(false);
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
      entity: "platform",
      data: {
        list_filter: {
          order_by: "creation_date DESC",
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
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              row_id: index + 1,
            })),
          ]);
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
    <ListTablePaginate
      columns={columns}
      data={data}
      isLoading={getList.isLoading || getListInfinite.isLoading}
      headerTitle="Platform List"
      addBtnText="Add Platform"
      onReload={loadFirstData}
      onAddBtn={() => navigate("/platforms/add")}
      // hasMore={hasMore}
      loadFunc={onLoadPage}
      filterListShow
      fullSearch
      activeFullSearch
      fullSearchComponent={FullSearchComponent}
      handleFullFilter={handleFilter}
      limit={entryCounter}
      setLimit={setEntryCounter}
      currentPage={currentPage}
      totalCount={totalCount}
    />
    // <ListTable
    //   columns={columns}
    //   data={data}
    //   isLoading={getList.isLoading}
    //   headerTitle="Platform List"
    //   addBtnText="Add Platform"
    //   onReload={loadFirstData}
    //   onAddBtn={() => navigate("/platforms/add")}
    //   hasMore={hasMore}
    //   loadFunc={onLoadScroll}
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

export { Platform };
