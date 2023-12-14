import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";
import React, { FC, useEffect, useState } from "react";
import { columns } from "./data";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListOfGroupJoinRequest } from "@src/core/services/api/group/group.api";
import { TGetGroupJoinList } from "@src/core/services/api/group/type";

const JoinRequestList: FC = (): JSX.Element => {
  const { group_id } = useParams();

  const [data, setData] = useState<any>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filterList, setFilterList] = useState<TGetGroupJoinList>({
    limit: entryCounter,
    skip: 0,
    group_id: group_id ? +group_id : 0,
  });

  const getList = useGetListOfGroupJoinRequest();
  const getListInfinite = useGetListOfGroupJoinRequest();

  const navigate = useNavigate();

  const loadFirstData = () => {
    setCurrentPage(0);
    setTotalCount(0);
    // setHasMore(true);
    getList.mutate(filterList, {
      onSuccess: (res: any) => {
        if (res.data.is_success) {
          let result = res.data.value || res.data.result;

          console.log("res", result);
          setData(
            result?.map((group: any, index: number) => ({
              ...group,
              row_id: index + 1,
              setRefresh: setRefresh,
            }))
          );
          res?.data?.pagination && setTotalCount(res.data?.pagination?.total);
        }
        // else setHasMore(false);
      },
      onError: (err: any) => {
        setData([]);
        // setHasMore(false);
      },
    });
  };

  useEffect(() => {
    loadFirstData();
  }, [entryCounter, refresh]);

  const onLoadPage = (num: number) => {
    let filtered = { ...filterList };
    filtered.skip = num * entryCounter;
    setFilterList(filtered);
    setCurrentPage(num);
    getListInfinite.mutate(filtered, {
      onSuccess: (res: any) => {
        if (res.data.is_success) {
          let result = res.data.value || res.data.result;

          setData(
            result?.map((group: any, index: number) => ({
              ...group,
              row_id: num * entryCounter + index + 1,
              setRefresh: setRefresh,
            }))
          );
        }
      },
    });
  };

  return (
    <ListTablePaginate
      columns={columns}
      data={data}
      isLoading={getList.isLoading || getListInfinite.isLoading}
      headerTitle="Join Requests"
      addBtnText="Invite Memeber"
      onAddBtn={() => navigate("/groups-list/invite-member/" + group_id)}
      onReload={loadFirstData}
      // hasMore={hasMore}
      loadFunc={onLoadPage}
      noSearch={true}
      noHeader={false}
      filterListShow
      fullSearch={false}
      activeFullSearch={false}
      // fullSearchComponent={FullSearchComponent}
      handleFullFilter={() => {}}
      limit={entryCounter}
      setLimit={setEntryCounter}
      totalCount={totalCount}
      currentPage={currentPage}
    />
  );
};

export { JoinRequestList };
