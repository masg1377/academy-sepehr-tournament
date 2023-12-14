import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { RootState } from "@src/redux/store";
import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";

import { ListTable } from "../common/ListTable/ListTable";
import { columns, data } from "./data";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";

interface IMLSListContainerProp {
  children?: JSX.Element;
}

const PackageContainer: FC<IMLSListContainerProp> = ({
  children,
}): JSX.Element => {
  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  // const [onEntryChangeFlag, setOnEntryChangeFlag] = useState<boolean>(false);

  const [listFilterState, setListFilterState] = useState<TGetEntities>({
    entity: "packages",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
      },
    },
  });
  const [data, setData] = useState<any>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  // const [hasMore, setHasMore] = useState<boolean>(true);

  const getList = useGetListOfEntity();
  const getListInfinite = useGetListOfEntity();

  const { packages } = useSelector((state: RootState) => state.refresh);

  const loadFirstData = () => {
    setCurrentPage(0);
    setTotalCount(0);
    let firstFilter: TGetEntities = {
      entity: "packages",
      data: {
        list_filter: {
          ...listFilterState.data.list_filter,
          limit: entryCounter,
          offset: 0,
        },
      },
    };
    // setHasMore(true);
    setListFilterState(firstFilter);
    getList.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          // if (result && result.length < entryCounter) setHasMore(false);
          if (result)
            setData(
              result.map((o: any, index: number) => ({
                ...o,
                row_id: index + 1,
              }))
            );
          else {
            setData([]);
            // setHasMore(false);
          }
        }
        // else setHasMore(false);
        res.data.result_count && setTotalCount(res.data.result_count);
      },
      onError: () => {
        setData([]);
        // setHasMore(false);
      },
    });
  };

  useEffect(() => {
    loadFirstData();
  }, [entryCounter, packages]);

  // const onLoadScroll = () => {
  //   let filter = { ...listFilterState };
  //   if (filter.data.list_filter)
  //     filter.data.list_filter.offset =
  //       filter.data.list_filter.offset + filter.data.list_filter.limit;
  //   setListFilterState(filter);
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
  //           res.data.result_count && setTotalCount(res.data.result_count);
  //         }
  //       } else setHasMore(false);
  //     },
  //   });
  // };

  const onLoadPage = (page: number = 0) => {
    setCurrentPage(page);
    let filter = { ...listFilterState };
    if (filter.data.list_filter)
      filter.data.list_filter.offset = page * filter.data.list_filter.limit;
    setListFilterState(filter);
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
              row_id: index + page * entryCounter + 1,
            })),
          ]);
          // if (!result || result.length < entryCounter) setHasMore(false);
          res.data.result_count && setTotalCount(res.data.result_count);
          // }
        }
        //else setHasMore(false);
      },
    });
  };

  const handleFilter = (val: any) => {
    setCurrentPage(0);
    setTotalCount(0);
    const obj: any = {
      entity: "packages",
      data: {
        list_filter: {
          order_by: "creation_date DESC",
          limit: entryCounter,
          offset: 0,
          filters: val,
        },
      },
    };
    setListFilterState(obj);
    // setHasMore(false);
    getList.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              //row_id: old.length + index + 1,
              row_id: index + 1,
            })),
          ]);
          // if (result.length === entryCounter) setHasMore(true);
          res.data.result_count && setTotalCount(res.data.result_count);
        } else {
          // setHasMore(false);
        }
      },
      onError: (err: any) => {
        setData([]);
        // setHasMore(false);
      },
    });
  };

  const navigate = useNavigate();
  return (
    <ListTablePaginate
      columns={columns}
      data={data}
      headerTitle="Package List"
      addBtnText="Package"
      onAddBtn={() => navigate("/packages/add")}
      isLoading={getList.isLoading || getListInfinite.isLoading}
      loadFunc={onLoadPage}
      onReload={loadFirstData}
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
    //   headerTitle="Package List"
    //   addBtnText="Package"
    //   onAddBtn={() => navigate("/packages/add")}
    //   isLoading={getList.isLoading}
    //   loadFunc={onLoadScroll}
    //   onReload={loadFirstData}
    //   hasMore={hasMore}
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

export { PackageContainer };
