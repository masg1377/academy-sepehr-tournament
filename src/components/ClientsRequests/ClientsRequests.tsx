import { FC, useEffect, useState } from "react";

import { useGetClientRequest } from "@src/core/services/api/mls/mls.api";
import { TGetRequest } from "@src/core/services/api/mls/type";
import { useNavigate } from "react-router-dom";
import { ListTable } from "../common/ListTable/ListTable";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { columns } from "./data";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";

interface IClientsRequestsProp {
  children?: JSX.Element;
}

const ClientsRequests: FC<IClientsRequestsProp> = ({
  children,
}): JSX.Element => {
  const navigate = useNavigate();

  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [filterState, setfilterState] = useState<TGetRequest>({
    entity: "mls_access_customer_request",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
        //filters: [{ field: "owner_id", operator: "=", value: 284 }],
      },
    },
  });

  const getList = useGetClientRequest();
  const getListInfinite = useGetClientRequest();

  const loadFirstData = () => {
    const firstFilter: TGetRequest = {
      entity: "mls_access_customer_request",
      data: {
        list_filter: {
          ...filterState.data.list_filter,
          limit: entryCounter,
          offset: 0,
        },
      },
    };
    // setHasMore(true);
    setCurrentPage(0);
    setTotalCount(0);
    setfilterState(firstFilter);
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
          else setData([]);
          res.data.result_count && setTotalCount(res.data.result_count);
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
  }, [entryCounter]);

  const onLoadPage = (page: number = 0) => {
    let filter = { ...filterState };
    if (filter.data.list_filter)
      filter.data.list_filter.offset = page * filter.data.list_filter.limit;
    setfilterState(filter);
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
      },
      //  else setHasMore(false);
    });
  };
  // const onLoadScroll = () => {
  //   let filter = { ...filterState };
  //   if (filter.data.list_filter)
  //     filter.data.list_filter.offset =
  //       filter.data.list_filter.offset + filter.data.list_filter.limit;
  //   setfilterState(filter);
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
      entity: "mls_access_customer_request",
      data: {
        list_filter: {
          order_by: "creation_date DESC",
          limit: entryCounter,
          offset: 0,
          filters: val,
        },
      },
    };
    setfilterState(obj);
    setCurrentPage(0);
    setTotalCount(0);
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
      headerTitle="Clients Requests List"
      loadFunc={onLoadPage}
      onReload={loadFirstData}
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
    //   headerTitle="Clients Requests List"
    //   loadFunc={onLoadScroll}
    //   hasMore={hasMore}
    //   onReload={loadFirstData}
    //   // addBtnText="Add Request"
    //   // onAddBtn={() => navigate("/alerts/add")}
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

export { ClientsRequests };
