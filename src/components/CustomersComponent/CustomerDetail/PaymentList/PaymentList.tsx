import React, { FC, useState, useEffect, useRef } from "react";
import { ListTable } from "@src/components/common/ListTable/ListTable";

import { Columns } from "./data";
import { useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { DetailRow } from "./DetailRow";

interface IPropPackagesList {
  dataa?: any[];
  loading?: boolean;
  onAdd?: () => void;
  onReload?: () => void;
  startFlag?: boolean;
  userId?: any;
}

const PaymentList: FC<IPropPackagesList> = ({
  dataa,
  loading,
  onAdd,
  onReload,
  startFlag,
  userId,
}): JSX.Element => {
  const [data, setData] = useState<any>([]);
  const [entryCounter, setEntryCounter] = useState<number>(5);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showYay, setShowYay] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { id } = useParams();
  const getInvoices = useGetListOfEntity();
  const getListInfinite = useGetListOfEntity();

  // const getInvoceDetail = () => {
  //   getInvoices.mutate(
  //     {
  //       entity: "invoices",
  //       data: {
  //         list_filter: {
  //           limit: 10000,
  //           offset: 0,
  //           filters: [{ field: "user_id", operator: "=", value: id ? +id : 0 }],
  //         },
  //       },
  //     },
  //     {
  //       onSuccess: (res) => {
  //         if (res.data.is_success) {
  //           let result = res.data.result;
  //           if (result && !Array.isArray(result)) result = [result];
  //           setData(
  //             result
  //               ? result.slice(0, 4).map((item: any, index: number) => ({
  //                   ...item,
  //                   row_id: index + 1,
  //                   userId: userId ? userId : 0,
  //                 }))
  //               : []
  //           );
  //         } else setData([]);
  //       },
  //     }
  //   );
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     getInvoceDetail();
  //     setLoadFlag(false);
  //   }, 500);
  // }, []);

  const [filterList, setFilterList] = useState<any>({
    entity: "invoices",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
        filters: [{ field: "user_id", operator: "=", value: id ? +id : 0 }],
      },
    },
  });

  const loadFirstData = () => {
    setShowYay(true);
    setHasMore(true);

    const firstFilter: any = {
      entity: "invoices",
      data: {
        list_filter: {
          ...filterList.data.list_filter,
          limit: entryCounter,
          offset: 0,
        },
      },
    };
    setFilterList(firstFilter);
    getInvoices.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          if (result.length < entryCounter) {
            setHasMore(false);
            setShowYay(false);
          } else if (!result) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              row_id: index + 1,
              userId: userId ? userId : 0,
            })),
          ]);
          res.data.result_count && setTotalCount(res.data.result_count);
        } else {
          setHasMore(false);
        }
      },
      onError: (err: any) => {
        setData([]);
        setHasMore(false);
      },
    });
  };

  useEffect(() => {
    if (!startFlag) {
      loadFirstData();
    }
  }, [startFlag]);

  const onShowMore = () => {
    let filter = { ...filterList };
    if (filter.data.list_filter)
      filter.data.list_filter.offset =
        filter.data.list_filter.offset + filter.data.list_filter.limit;
    setFilterList(filter);
    getListInfinite.mutate(filter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (!result) {
          } else {
            if (result && !Array.isArray(result)) result = [result];
            setData((e: any) => [
              ...e,
              ...result.map((o: any, index: number) => ({
                ...o,
                row_id: e.length + index + 1,
                userId: userId ? userId : 0,
              })),
            ]);
            res.data.result_count && setTotalCount(res.data.result_count);
            if (!result || result.length < entryCounter) {
              setHasMore(false);
              setShowYay(false);
            }
          }
        } else {
        }
      },
    });
  };

  return (
    // <ListTable
    //   columns={Columns}
    //   data={data}
    //   headerTitle="Payment History"
    //   onReload={getInvoceDetail}
    //   //addBtnText="Add Payment"
    //   isLoading={loadFlag ? loadFlag : getInvoices.isLoading}
    //   noSearch
    //   //onAddBtn={onAdd}
    //   expandableRows={true}
    //   ExpandedComponent={DetailRow}
    // />
    <ListTable
      columns={Columns}
      data={data}
      headerTitle="Payment History"
      hasMore={false}
      onReload={loadFirstData}
      isLoading={getInvoices.isLoading}
      noSearch
      handleShowMore={onShowMore}
      showMore={
        getInvoices.isLoading ? false : data.length === 0 ? false : hasMore
      }
      yayShowHide={showYay}
      showMoreLoading={getListInfinite.isLoading}
      expandableRows={true}
      ExpandedComponent={DetailRow}
      totalCount={totalCount}
    />
  );
};

export default PaymentList;
