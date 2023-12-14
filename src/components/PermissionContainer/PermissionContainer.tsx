// ** React Imports
import { FC } from "react";

import { ListTable } from "@src/components/common/ListTable";
import { columns } from "./data";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";

const PermissionContainer: FC = (): JSX.Element => {
  const [data, setData] = useState<any>([]);
  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const getList = useGetListOfEntity();
  const getListInfinite = useGetListOfEntity();

  const navigate = useNavigate();

  const { permission } = useSelector((state: RootState) => state.refresh);

  const [filterList, setFilterList] = useState<TGetEntities>({
    entity: "btt_permission_advantages",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
      },
    },
  });

  const loadFirstData = () => {
    const firstFilter: TGetEntities = {
      entity: "btt_permission_advantages",
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
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          // if (!result || result.length < entryCounter) {
          //   setHasMore(false);
          // }
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              //row_id: old.length + index + 1,
              row_id: index + 1,
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
    loadFirstData();
  }, [entryCounter, permission]);

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
    console.log(val);
    const obj: any = {
      entity: "btt_permission_advantages",
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
    <ListTablePaginate
      columns={columns}
      data={data}
      isLoading={getList.isLoading || getListInfinite.isLoading}
      headerTitle="Permission List"
      addBtnText="Add Permission"
      onReload={loadFirstData}
      onAddBtn={() => navigate("/permissions/add")}
      loadFunc={onLoadPage}
      noSearch={false}
      noHeader={false}
      filterListShow
      fullSearch
      activeFullSearch
      fullSearchComponent={FullSearchComponent}
      handleFullFilter={handleFilter}
      limit={entryCounter}
      setLimit={setEntryCounter}
      totalCount={totalCount}
      currentPage={currentPage}
    />
    // <ListTable
    //   columns={columns}
    //   data={data}
    //   isLoading={getList.isLoading}
    //   headerTitle="Permission List"
    //   addBtnText="Add Permission"
    //   onReload={loadFirstData}
    //   onAddBtn={() => navigate("/permissions/add")}
    //   hasMore={hasMore}
    //   loadFunc={onLoadScroll}
    //   noSearch={false}
    //   noHeader={false}
    //   filterListShow
    //   fullSearch
    //   activeFullSearch
    //   fullSearchComponent={FullSearchComponent}
    //   handleFullFilter={handleFilter}
    //   limit={entryCounter}
    //   setLimit={setEntryCounter}
    //   totalCount={totalCount}
    // />
  );
};

export { PermissionContainer };
