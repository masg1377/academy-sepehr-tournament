// ** React Imports
import { FC } from "react";
import { useParams } from "react-router-dom";

import { ListTable } from "@src/components/common/ListTable";
import { columns } from "./data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";

const PackageInvoice = () => {
  const { id, userId, packageName } = useParams();

  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [onEntryChangeFlag, setOnEntryChangeFlag] = useState<boolean>(false);
  const getList = useGetListOfEntity();
  const getListInfinite = useGetListOfEntity();

  const navigate = useNavigate();

  const [filterList, setFilterList] = useState<TGetEntities>({
    entity: "invoices",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: 100000,
        offset: 0,
        filters: [{ field: "package_id", operator: "=", value: id ? +id : 0 }],
      },
    },
  });

  const loadFirstData = () => {
    const firstFilter: TGetEntities = {
      entity: "invoices",
      data: {
        list_filter: {
          ...filterList.data.list_filter,
          limit: entryCounter,
          offset: 0,
        },
      },
    };
    setHasMore(true);
    setFilterList(firstFilter);
    getList.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          if (!result || result.length < entryCounter) {
            setHasMore(false);
          }
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              row_id: index + 1,
              userId: userId ? +userId : 0,
            })),
          ]);
        } else setHasMore(false);
      },
      onError: (err: any) => {
        setData([]);
        setHasMore(false);
      },
    });
  };

  useEffect(() => {
    loadFirstData();
  }, [entryCounter]);

  const onLoadScroll = () => {
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
            setHasMore(false);
          } else {
            if (result && !Array.isArray(result)) result = [result];
            setData((e: any) => [
              ...e,
              ...result.map((o: any, index: number) => ({
                ...o,
                row_id: e.length + index + 1,
                userId: userId ? +userId : 0,
              })),
            ]);
            if (!result || result.length < entryCounter) setHasMore(false);
          }
        } else setHasMore(false);
      },
    });
  };

  const handleFilter = (val: any) => {
    console.log(val);
    const obj: any = {
      entity: "invoices",
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
    setHasMore(false);
    getList.mutate(obj, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          setData((old: any) => [
            ...result.map((o: any, index: number) => ({
              ...o,
              row_id: index + 1,
              userId: userId ? +userId : 0,
            })),
          ]);
          if (result.length === entryCounter) setHasMore(true);
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

  return (
    <ListTable
      columns={columns}
      data={data}
      isLoading={getList.isLoading}
      headerTitle={packageName ? packageName + " invoices" : "Not Set"}
      //addBtnText=""
      onReload={loadFirstData}
      //onAddBtn={() => navigate("/")}
      hasMore={hasMore}
      loadFunc={onLoadScroll}
      noSearch={false}
      noHeader={false}
      filterListShow
      fullSearch
      activeFullSearch
      fullSearchComponent={FullSearchComponent}
      handleFullFilter={handleFilter}
      limit={entryCounter}
      setLimit={setEntryCounter}
    />
  );
};

export { PackageInvoice };
