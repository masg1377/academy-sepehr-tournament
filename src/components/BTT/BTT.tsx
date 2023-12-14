// ** Import from react
import React, { FC, useEffect, useState, useRef } from "react";

// ** General components
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { TGetEntities } from "@src/core/services/api/entities/type";
import { useNavigate } from "react-router-dom";
import { ListTable } from "../common/ListTable/ListTable";
import { columns, data } from "./data";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { useDispatch } from "react-redux";
import { handleStaffList } from "@src/redux/staff";
import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";

interface IClientsRequestsProp {
  children?: JSX.Element;
}

const BTT: FC<IClientsRequestsProp> = ({ children }): JSX.Element => {
  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [listFilter, setListFilter] = useState<TGetEntities>({
    entity: "btt_type_items",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: entryCounter,
        offset: 0,
        filters: [
          { field: "type", operator: "=", value: 3 },
          "or",
          { field: "type", operator: "=", value: 4 },
          "or",
          { field: "type", operator: "=", value: 5 },
        ],
      },
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState<any>([]);
  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchValueData, setSearchvalueData] = useState<any>();

  const getUser = useGetListOfEntity();
  const getList = useGetListOfEntity();
  const getListInfinite = useGetListOfEntity();

  const { btt } = useSelector((state: RootState) => state.refresh);

  const getUsers = () => {
    getUser.mutate(
      {
        entity: "users",
        data: {
          list_filter: {
            limit: 1000,
            offset: 0,
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            let result = res.data.result;
            if (result && !Array.isArray(result)) result = [result];
            dispatch(
              handleStaffList(
                result.map((i: any) => ({
                  id: i.id,
                  first_name: i.first_name,
                  last_name: i.last_name,
                }))
              )
            );
          }
        },
        onError: () => {},
      }
    );
  };

  useEffect(() => {
    if (!getList.isLoading) getUsers();
  }, [getList.isLoading]);

  const loadFirstData = () => {
    setCurrentPage(0);
    setTotalCount(0);
    const firstFilter: TGetEntities = {
      entity: "btt_type_items",
      data: {
        list_filter: {
          ...listFilter.data.list_filter,
          limit: entryCounter,
          offset: 0,
        },
      },
    };
    // setHasMore(true);
    setListFilter(firstFilter);
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
  }, [entryCounter, btt]);

  const onLoadPage = (page: number = 0) => {
    let filter = { ...listFilter };
    if (filter.data.list_filter)
      filter.data.list_filter.offset = page * filter.data.list_filter.limit;
    setListFilter(filter);
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
          res.data.result_count && setTotalCount(res.data.result_count);
          // if (!result || result.length < entryCounter) setHasMore(false);
        }
        // } else setHasMore(false);
      },
    });
  };
  // const onLoadScroll = () => {
  //   let filter = { ...listFilter };
  //   if (filter.data.list_filter)
  //     filter.data.list_filter.offset =
  //       filter.data.list_filter.offset + filter.data.list_filter.limit;
  //   setListFilter(filter);
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
  //               row_id: index + 1,
  //             })),
  //           ]);
  //           res.data.result_count && setTotalCount(res.data.result_count);
  //           if (!result || result.length < entryCounter) setHasMore(false);
  //         }
  //       } else setHasMore(false);
  //     },
  //   });
  // };

  // const onDoubleClick = (data: any) => {
  //   console.log(data);
  // };

  const handleFilter = (val: any) => {
    setCurrentPage(0);
    setTotalCount(0);
    console.log(val);
    const obj: any = {
      entity: "btt_type_items",
      data: {
        list_filter: {
          order_by: "creation_date DESC",
          limit: entryCounter,
          offset: 0,
          filters: val,
        },
      },
    };
    setListFilter(obj);
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
    <React.Fragment>
      <ListTablePaginate
        columns={columns}
        data={data}
        headerTitle="BTT List"
        addBtnText="BTT"
        onAddBtn={() => navigate("/btt-list/add")}
        selectebaleRows
        isLoading={getList.isLoading || getListInfinite.isLoading}
        onReload={loadFirstData}
        loadFunc={onLoadPage}
        filterListShow
        fullSearch
        activeFullSearch
        fullSearchComponent={FullSearchComponent}
        handleFullFilter={handleFilter}
        //onDoubleClick={onDoubleClick}
        setSearchvalueData={setSearchvalueData}
        limit={entryCounter}
        setLimit={setEntryCounter}
        totalCount={totalCount}
        currentPage={currentPage}
      />
      {/* <ListTable
        columns={columns}
        data={data}
        headerTitle="BTT List"
        addBtnText="BTT"
        onAddBtn={() => navigate("/btt-list/add")}
        selectebaleRows
        isLoading={getList.isLoading}
        onReload={loadFirstData}
        loadFunc={onLoadScroll}
        hasMore={hasMore}
        filterListShow
        fullSearch
        activeFullSearch
        fullSearchComponent={FullSearchComponent}
        handleFullFilter={handleFilter}
        //onDoubleClick={onDoubleClick}
        setSearchvalueData={setSearchvalueData}
        limit={entryCounter}
        setLimit={setEntryCounter}
        totalCount={totalCount}
      /> */}
    </React.Fragment>
  );
};

export { BTT };
