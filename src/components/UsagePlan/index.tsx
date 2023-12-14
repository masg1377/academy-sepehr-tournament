import React, { useEffect, useState } from "react";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";
import { usagePlanColumns } from "./data";
import { FullSearchComponent } from "./FullSearchComponent";
import { useNavigate } from "react-router-dom";
import { useGetApiUsages } from "@src/core/services/api/usage-plan/usage-plan.api";
import {
  TGetUsagePlanParams,
  TUsagePlanItem,
} from "@src/core/services/api/usage-plan/type";

const UsagePlanList = () => {
  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [data, setData] = useState<TUsagePlanItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<TGetUsagePlanParams>({
    limit: entryCounter,
    offset: 0,
    asc: false,
    orderby: "creation_date",
  });
  // Hooks
  const navigate = useNavigate();

  const getList = useGetApiUsages();

  const getFirstList = () => {
    const filter = { ...filterList, limit: entryCounter };

    setFilterList(filter);

    getList.mutate(filter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          const result = res.data.result;

          console.log(result);
          if (result)
            setData(
              result.map((it, index) => ({
                ...it,
                row_id: index + 1,
                setRefetch: setRefetch,
              }))
            );

          if (res.data?.total_count) setTotalCount(res.data?.total_count);
        }
      },
    });
  };

  useEffect(() => {
    getFirstList();
  }, [entryCounter, refetch]);

  const onLoadPage = (page: number = 0) => {
    let filter = { ...filterList };

    filter.offset = page * filter.limit;
    setFilterList(filter);
    setCurrentPage(page);

    getList.mutate(filter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          // if (!result) {
          //   setHasMore(false);
          // } else {
          if (result && !Array.isArray(result)) result = [result];
          setData((e: any) => [
            // ...e,
            ...(result
              ? result.map((o: any, index: number) => ({
                  ...o,
                  row_id: page * entryCounter + index + 1,
                  setRefetch: setRefetch,
                }))
              : []),
          ]);
          // @ts-ignore
          res.data?.total_count && setTotalCount(res.data.total_count);
          // if (!result || result.length < entryCounter) setHasMore(false);
        }
        // } else setHasMore(false);
      },
    });
  };

  return (
    <ListTablePaginate
      columns={usagePlanColumns}
      data={data}
      headerTitle="Usage plan list"
      addBtnText="Add"
      onAddBtn={() => navigate("/add-usage-plan")}
      isLoading={getList.isLoading}
      loadFunc={onLoadPage}
      onReload={getFirstList}
      filterListShow
      fullSearch
      activeFullSearch
      fullSearchComponent={FullSearchComponent}
      //   handleFullFilter={handleFilter}
      limit={entryCounter}
      setLimit={setEntryCounter}
      totalCount={totalCount}
      currentPage={currentPage}
    />
  );
};

export { UsagePlanList };
