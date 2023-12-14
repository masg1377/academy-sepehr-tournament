import { useGetPromotionList } from "@src/core/services/api/promotion/promotion.api";
import { TGetPromotionList } from "@src/core/services/api/promotion/type";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useGetListOfEntity } from "./../../../core/services/api/entities/entities.api";
import { RootState } from "@src/redux/store";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ListTable } from "../../common/ListTable/ListTable";
import { columns, data } from "./data";
import { FullSearchComponent } from "../FullSearchComponent/FullSearchComponent";
import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";

interface IMLSListContainerProp {
  children?: JSX.Element;
}

const duration = [
  { value: 1, label: "Forever" },
  { value: 2, label: "Once" },
  { value: 3, label: "Repeating" },
];

const ListContainer: FC<IMLSListContainerProp> = ({
  children,
}): JSX.Element => {
  const navigate = useNavigate();

  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [filterState, setFilterState] = useState<TGetEntities>({
    entity: "promotions",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
      },
    },
  });

  const { promotion } = useSelector((state: RootState) => state.refresh);

  const getList = useGetListOfEntity();
  const getListInfinite = useGetListOfEntity();

  const loadFirstData = () => {
    setCurrentPage(0);
    setTotalCount(0);
    let firstFilter: TGetEntities = {
      entity: "promotions",
      data: {
        list_filter: {
          ...filterState.data.list_filter,
          limit: entryCounter,
          offset: 0,
        },
      },
    };
    // setHasMore(true);
    setFilterState(firstFilter);
    getList.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          // if (result && result.length < entryCounter) setHasMore(false);
          if (result) {
            setData(
              result.map((o: any, index: number) => ({
                ...o,
                row_id: index + 1,
              }))
            );
            res.data.result_count && setTotalCount(res.data.result_count);
          } else setData([]);
        }
        // else setHasMore(false);
      },
      onError: () => {
        setData([]);
        // setHasMore(false);
      },
    });
  };

  useEffect(() => {
    loadFirstData();
  }, [entryCounter, promotion]);

  // const onLoadScroll = () => {
  //   let filter = { ...filterState };
  //   //@ts-ignore
  //   filter.data.list_filter["offset"] += filter.data.list_filter["limit"];

  //   setFilterState(filter);
  //   getListInfinite.mutate(filter, {
  //     onSuccess: (res) => {
  //       if (
  //         res.data.is_success &&
  //         res.data.result &&
  //         res.data.result.length > 0
  //       ) {
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
  //           res.data.result_count && setTotalCount(res.data.result_count);
  //           if (!result || result.length < entryCounter) setHasMore(false);
  //         }
  //       } else setHasMore(false);
  //     },
  //   });
  // };

  const onLoadPage = (page: number = 0) => {
    let filter = { ...filterState };
    //@ts-ignore
    filter.data.list_filter["offset"] = page * filter.data.list_filter["limit"];
    setCurrentPage(page);
    setFilterState(filter);
    getListInfinite.mutate(filter, {
      onSuccess: (res) => {
        if (
          res.data.is_success &&
          res.data.result &&
          res.data.result.length > 0
        ) {
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
          // }
        }
        //  else setHasMore(false);
      },
    });
  };

  const handleFilter = (val: any) => {
    setCurrentPage(0);
    setTotalCount(0);
    console.log(val);
    const obj: any = {
      entity: "promotions",
      data: {
        list_filter: {
          order_by: "creation_date DESC",
          limit: entryCounter,
          offset: 0,
          filters: val,
        },
      },
    };
    setFilterState(obj);
    // setHasMore(false);
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
      headerTitle="Promotions "
      addBtnText="Add Promotions"
      isLoading={getList.isLoading || getListInfinite.isLoading}
      onAddBtn={() => navigate("/promotion-list/add")}
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
    //   headerTitle="Promotions "
    //   addBtnText="Add Promotions"
    //   isLoading={getList.isLoading}
    //   onAddBtn={() => navigate("/promotion-list/add")}
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

export { ListContainer };
