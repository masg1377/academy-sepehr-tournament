import React, { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ListTable } from "@src/components/common/ListTable/ListTable";
import { useParams } from "react-router-dom";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { Columns } from "./data";

interface IPropPackagesList {
  dataa?: any[];
  loading?: boolean;
  onAdd?: () => void;
  onReload?: () => void;
  startFlag?: boolean;
}

const PackageList: FC<IPropPackagesList> = ({
  dataa,
  loading,
  onAdd,
  onReload,
  startFlag,
}): JSX.Element => {
  const [data, setData] = useState<any>([]);
  const [entryCounter, setEntryCounter] = useState<number>(5);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showYay, setShowYay] = useState<boolean>(true);
  const [moreCounter, setMoreCounter] = useState<number>(10);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [firstloading, setFirstloading] = useState<boolean>(true);
  const [oneLoad, setOneLoad] = useState<boolean>(true);

  const navigate = useNavigate();
  const { id } = useParams();
  const getStaff = useGetListOfEntity();
  const getListInfinite = useGetListOfEntity();

  // const getStaffDetailSingle = () => {
  //   getStaff.mutate(
  //     {
  //       entity: "customers",
  //       data: { id: id ? +id : 0 },
  //     },
  //     // {
  //     //   entity: "customers",
  //     //   data: {
  //     //     list_filter: {
  //     //       order_by: "creation_date DESC",
  //     //       limit: 1000000,
  //     //       offset: 0,
  //     //       filters: [{ field: "id", operator: "=", value: id ? +id : 0 }],
  //     //     },
  //     //   },
  //     // },
  //     {
  //       onSuccess: (res) => {
  //         if (res.data.is_success) {
  //           let result = res.data.result;
  //           setData(
  //             result
  //               ? result.packages
  //                   .slice(0, 4)
  //                   .map((item: any, index: number) => ({
  //                     ...item,
  //                     row_id: index + 1,
  //                   }))
  //               : []
  //           );
  //         }
  //       },
  //       onError: () => {
  //         setData([]);
  //       },
  //     }
  //   );
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     getStaffDetailSingle();
  //     setLoadFlag(false);
  //   }, 500);
  // }, []);

  const [filterList, setFilterList] = useState<any>({
    entity: "customers",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
        filters: [{ field: "id", operator: "=", value: id ? +id : 0 }],
      },
    },
  });

  const loadFirstData = () => {
    setShowYay(true);
    setHasMore(true);
    setMoreCounter(10);

    const firstFilter: any = {
      entity: "customers",
      data: {
        list_filter: {
          ...filterList.data.list_filter,
          limit: entryCounter,
          offset: 0,
        },
      },
    };
    setFilterList(firstFilter);
    getStaff.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result.packages;
          if (result && !Array.isArray(result)) result = [result];
          setTotalLength(result.length);

          if (result.length < entryCounter) {
            setHasMore(false);
            setShowYay(false);
          } else if (!result) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setData(
            result &&
              result.slice(0, 5).map((o: any, index: number) => ({
                ...o,
                row_id: index + 1,
                userId: id ? +id : 0,
              }))
          );
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

  // const loadFirstData = () => {
  //   setShowYay(true);
  //   setHasMore(true);

  //   const firstFilter: any = {
  //     entity: "customers",
  //     data: {
  //       list_filter: {
  //         ...filterList.data.list_filter,
  //         limit: entryCounter,
  //         offset: 0,
  //       },
  //     },
  //   };
  //   setFilterList(firstFilter);
  //   getStaff.mutate(firstFilter, {
  //     onSuccess: (res) => {
  //       if (res.data.is_success) {
  //         let result = res.data.result.packages;
  //         if (result && !Array.isArray(result)) result = [result];
  //         console.log(result);

  //         if (result.length < entryCounter) {
  //           setHasMore(false);
  //           setShowYay(false);
  //         } else if (!result) {
  //           setHasMore(false);
  //         } else {
  //           setHasMore(true);
  //         }
  //         setData(
  //           result &&
  //             result.map((o: any, index: number) => ({
  //               ...o,
  //               row_id: index + 1,
  //             }))
  //         );
  //         //setHasMore(true);
  //       } else {
  //         setHasMore(false);
  //       }
  //     },
  //     onError: (err: any) => {
  //       setData([]);
  //       setHasMore(false);
  //     },
  //   });
  // };

  const onShowMore = () => {
    getListInfinite.mutate(filterList, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result.packages;

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
                    userId: id ? +id : 0,
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

  // const onShowMore = () => {
  //   let filter = { ...filterList };
  //   if (filter.data.list_filter)
  //     filter.data.list_filter.offset =
  //       filter.data.list_filter.offset + filter.data.list_filter.limit;
  //   setFilterList(filter);
  //   getListInfinite.mutate(filter, {
  //     onSuccess: (res) => {
  //       if (res.data.is_success) {
  //         let result = res.data.result.packages;
  //         if (!result) {
  //         } else {
  //           if (result && !Array.isArray(result)) result = [result];
  //           setData((e: any) => [
  //             ...e,
  //             ...result.map((o: any, index: number) => ({
  //               ...o,
  //               row_id: e.length + index + 1,
  //             })),
  //           ]);
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

  return (
    // <ListTable
    //   columns={Columns}
    //   data={data}
    //   headerTitle="Packages"
    //   onReload={getStaffDetailSingle}
    //   //addBtnText="Add Package"
    //   isLoading={loadFlag ? loadFlag : getStaff.isLoading}
    //   noSearch
    //   //onAddBtn={() => navigate("/packages/add")}
    // />

    <ListTable
      columns={Columns}
      data={data}
      headerTitle="Packages"
      hasMore={false}
      onReload={loadFirstData}
      isLoading={firstloading ? firstloading : getStaff.isLoading}
      noSearch
      handleShowMore={onShowMore}
      showMore={
        getStaff.isLoading ? false : data.length === 0 ? false : hasMore
      }
      yayShowHide={showYay}
      showMoreLoading={getListInfinite.isLoading}
    />
  );
};

export default PackageList;
