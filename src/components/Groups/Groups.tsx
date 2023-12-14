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
import { useGetListOfGroups } from "@src/core/services/api/group/group.api";
import { TGetGroupList } from "@src/core/services/api/group/type";

const Groups: FC = (): JSX.Element => {
  const [data, setData] = useState<any>([]);
  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getList = useGetListOfGroups();
  const getListInfinite = useGetListOfGroups();

  const navigate = useNavigate();

  const [filterList, setFilterList] = useState<TGetGroupList>({
    limit: entryCounter,
    skip: 0,
  });

  const loadFirstData = (filter?: TGetGroupList) => {
    const firstFilter: TGetGroupList = { ...filterList, limit: entryCounter };
    setCurrentPage(0);
    setTotalCount(0);
    // setHasMore(true);
    setFilterList(filter || firstFilter);
    getList.mutate(filter || firstFilter, {
      onSuccess: (res: any) => {
        if (res.data.is_success) {
          let result = res.data.value || res.data.result;
          // if (result && !Array.isArray(result)) result = [result];
          // if (!result || result.length < entryCounter) {
          //   setHasMore(false);
          // }
          // console.log("res", result);
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              //row_id: old.length + index + 1,
              row_id: index + 1,
            })),
          ]);
          res.data.pagination && setTotalCount(res.data.pagination?.total);
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
  }, [entryCounter]);

  const onLoadPage = (page: number = 0) => {
    let filter = { ...filterList };

    filter.skip = page * filter.limit;
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
          // @ts-ignore
          res.data.pagination && setTotalCount(res.data.pagination?.total);
          // if (!result || result.length < entryCounter) setHasMore(false);
        }
        // } else setHasMore(false);
      },
    });
  };

  const handleFilter = (val: any) => {
    console.log(val);

    const load: TGetGroupList = {
      ...filterList,
      group_name: val?.group_name || undefined,
      creation_date_lte: val?.creation_date_lte || undefined,
      creation_date_gte: val?.creation_date_gte || undefined,
      group_type: val?.group_type?.value || undefined,
      is_published: val?.is_published
        ? val?.is_published?.value === 1
          ? true
          : false
        : undefined,
      total_members_gte: val?.total_members_gte || undefined,
      total_members_lte: val?.total_members_lte || undefined,
    };

    setFilterList(load);

    loadFirstData(load);
  };

  return (
    <ListTablePaginate
      columns={columns}
      data={data}
      isLoading={getList.isLoading || getListInfinite.isLoading}
      headerTitle="List of Group"
      addBtnText="Create a new Group"
      onAddBtn={() => navigate("/groups-list/add-group")}
      onReload={loadFirstData}
      //onAddBtn={() => navigate("/groups/add")}
      // hasMore={hasMore}
      loadFunc={onLoadPage}
      noSearch={false}
      noHeader={false}
      // filterListShow
      fullSearch={true}
      activeFullSearch={true}
      handleFullFilter={handleFilter}
      fullSearchComponent={FullSearchComponent}
      limit={entryCounter}
      setLimit={setEntryCounter}
      totalCount={totalCount}
      currentPage={currentPage}
    />
    // <ListTable
    //   columns={columns}
    //   data={data}
    //   isLoading={getList.isLoading}
    //   headerTitle="List of Group"
    //   addBtnText="Create a new Group"
    //   onReload={loadFirstData}
    //   //onAddBtn={() => navigate("/groups/add")}
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

export { Groups };
