import React, { FC, useEffect, useRef, useState } from "react";

import { ListTable } from "../common/ListTable/ListTable";
import { columns, data } from "./data";
import { useNavigate } from "react-router-dom";
import { TGetMlsList } from "@src/core/services/api/mls/type";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { getCustomDate } from "@src/core/utils/date-helper.utils";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { ListTablePaginate } from "../common/ListTablePaginate/ListTablePaginate";
import { useGetTournament } from "@src/core/services/api/tournament";

interface IMLSListContainerProp {
  children?: JSX.Element;
}

const TournamentListContainer: FC<IMLSListContainerProp> = ({
  children,
}): JSX.Element => {
  const navigate = useNavigate();

  const [entryCounter, setEntryCounter] = useState<number>(10000);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [data, setData] = useState<any>([]);

  const { user } = useSelector((state: RootState) => state.user);
  // console.log("user", user.roles);
  // const [hasMore, setHasMore] = useState<boolean>(true);

  const getList = useGetTournament();

  useEffect(() => {
    if (getList.isSuccess) {
      const result = getList.data.data;
      console.log(result);
      setData(
        result?.map((data: any, ind: number) => ({ ...data, row_id: ind + 1 }))
      );
    }
  }, [getList.isSuccess]);

  // const onLoadScroll = () => {
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
  //           setHasMore(false);
  //         } else {
  //           if (result && !Array.isArray(result)) result = [result];
  //           setData((e: any) => [
  //             ...e,
  //             ...result.map((o: any, index: number) => ({
  //               ...o,
  //               last_log_date: getCustomDate(o.modification_date),
  //               row_id: e.length + index + 1,
  //             })),
  //           ]);
  //           if (!result || result.length < entryCounter) setHasMore(false);
  //         }
  //       } else setHasMore(false);
  //     },
  //   });
  // };

  return (
    <ListTablePaginate
      columns={columns}
      data={data}
      headerTitle="Tournament List"
      addBtnText={
        user?.roles?.includes("TournamentAdmin") ? "Add Tournament" : undefined
      }
      isLoading={getList.isFetching}
      onAddBtn={() => navigate("/tournament-list/add")}
      loadFunc={() => {}}
      currentPage={currentPage}
      totalCount={totalCount}
      onReload={getList.refetch}
      filterListShow
      fullSearch
      noSearch
      activeFullSearch={false}
      // fullSearchComponent={FullSearchComponent}
      // handleFullFilter={() => {}}
      limit={entryCounter}
      setLimit={setEntryCounter}
    />
    // <ListTable
    //   columns={columns}
    //   data={data}
    //   headerTitle="MLS List"
    //   addBtnText="Add MLS"
    //   isLoading={getList.isLoading}
    //   onAddBtn={() => navigate("/mls-list/add")}
    //   loadFunc={onLoadScroll}
    //   hasMore={hasMore}
    //   onReload={loadFirstData}
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

export { TournamentListContainer };
