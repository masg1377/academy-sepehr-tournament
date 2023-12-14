import React, { FC, useState, useEffect, useRef } from "react";
import { ListTable } from "@src/components/common/ListTable/ListTable";

import { Columns } from "./data";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetRequest } from "@src/core/services/api/mls/type";
import { useGetClientRequest } from "@src/core/services/api/mls/mls.api";
import { iteratorSymbol } from "immer/dist/internal";

interface IPropPackagesList {
  dataa?: any[];
  loading?: boolean;
  onAdd?: () => void;
  onReload?: () => void;
  startFlag?: boolean;
}

const MlsAccessList: FC<IPropPackagesList> = ({
  dataa,
  loading,
  onAdd,
  onReload,
  startFlag,
}): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<any>([]);

  const [entryCounter, setEntryCounter] = useState<number>(5);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showYay, setShowYay] = useState<boolean>(true);
  const [moreCounter, setMoreCounter] = useState<number>(10);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [firstloading, setFirstloading] = useState<boolean>(true);
  const [oneLoad, setOneLoad] = useState<boolean>(true);

  const getMlsAccess = useGetClientRequest();
  const getListInfinite = useGetClientRequest();

  //console.log(data);
  // const getMlsAccessDetail = () => {
  //   getMlsAccess.mutate(
  //     {
  //       entity: "mls_access_customer_request",
  //       data: {
  //         list_filter: {
  //           limit: 1000000,
  //           offset: 0,
  //           // filters: [
  //           //   { field: "owner_id", operator: "=", value: id ? +id : 0 },
  //           // ],
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
  //     getMlsAccessDetail();
  //     setLoadFlag(false);
  //   }, 500);
  // }, []);

  const [filterList, setFilterList] = useState<any>({
    entity: "mls_access_customer_request",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: 1000000,
        offset: 0,
      },
    },
  });

  const loadFirstData = () => {
    setShowYay(true);
    setHasMore(true);
    setMoreCounter(10);

    const firstFilter: any = {
      entity: "mls_access_customer_request",
      data: {
        list_filter: {
          ...filterList.data.list_filter,
          limit: 1000000,
          offset: 0,
        },
      },
    };
    setFilterList(firstFilter);
    getMlsAccess.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          result = result.filter((item: any) => item.owner_id === Number(id));
          setTotalLength(result.length);
          // if (result.length < entryCounter) {
          //   setHasMore(false);
          //   setShowYay(false);
          // } else if (!result) {
          //   setHasMore(false);
          // } else {
          //   setHasMore(true);
          // }
          if (result.length < entryCounter) {
            setHasMore(false);
            setShowYay(false);
          } else if (!result) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setData((old: any) => [
            ...result.slice(0, 5).map((o: any, index: number) => ({
              ...o,
              row_id: index + 1,
            })),
          ]);
          // setMlsDataId(
          //   result.map((i: any, index: number) => ({
          //     mlsId: i.mls_id,
          //   }))
          // );
          //setMlsDataId(result.map((i: any, index: number) => i.mls_id));
          //setHasMore(true);
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
    if (!startFlag && oneLoad) {
      loadFirstData();
      setFirstloading(false);
      setOneLoad(false);
    }
  }, [startFlag]);

  // const onShowMore = () => {
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
  //         } else {
  //           if (result && !Array.isArray(result)) result = [result];
  //           result = result.filter((item: any) => item.owner_id === Number(id));
  //           setData((e: any) => [
  //             ...e,
  //             ...result.map((o: any, index: number) => ({
  //               ...o,
  //               row_id: e.length + index + 1,
  //             })),
  //           ]);
  //           //setMlsDataId(result.map((i: any, index: number) => i.mls_id));

  //           if (!result || result.length < entryCounter) {
  //             setHasMore(false);
  //             setShowYay(false);
  //           }
  //         }
  //       } else {
  //       }
  //     },
  //   });
  // };

  const onShowMore = () => {
    getListInfinite.mutate(filterList, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          result = result.filter((item: any) => item.owner_id === Number(id));

          if (!result) {
          } else {
            if (result && !Array.isArray(result)) result = [result];
            if (data.length < totalLength) {
              setData((e: any) => [
                ...result
                  .slice(0, moreCounter)
                  .map((o: any, index: number) => ({
                    ...o,
                    //row_id: e.length + index + 1,
                    row_id: index + 1,
                  })),
              ]);
              setMoreCounter((old: number) => old + 5);
            } else {
              setHasMore(false);
              setShowYay(false);
            }

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
    <ListTable
      columns={Columns}
      data={data}
      headerTitle="MLS Access Requests"
      hasMore={false}
      onReload={loadFirstData}
      isLoading={firstloading ? firstloading : getMlsAccess.isLoading}
      noSearch
      handleShowMore={onShowMore}
      showMore={
        getMlsAccess.isLoading ? false : data.length === 0 ? false : hasMore
      }
      yayShowHide={showYay}
      showMoreLoading={getListInfinite.isLoading}
    />
  );
};

export default MlsAccessList;
