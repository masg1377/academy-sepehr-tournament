import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";
import { useGetGroupMembers } from "@src/core/services/api/group/group.api";
import {
  TGetGroupJoinList,
  TGetGroupMembers,
} from "@src/core/services/api/group/type";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FullSearchComponent } from "./FullSearchComponent/FullSearchComponent";
import { columns } from "./data";

const MemberList: FC = (): JSX.Element => {
  const { group_id } = useParams();

  const [data, setData] = useState<any>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [entryCounter, setEntryCounter] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filterList, setFilterList] = useState<TGetGroupMembers>({
    limit: entryCounter,
    skip: 0,
    group_id: group_id ? +group_id : 0,
  });

  const getList = useGetGroupMembers();
  const getListInfinite = useGetGroupMembers();

  const navigate = useNavigate();

  const loadFirstData = (filter?: TGetGroupMembers) => {
    const firstFilter = { ...filterList, limit: entryCounter };
    setCurrentPage(0);
    setTotalCount(0);
    // setHasMore(true);
    setFilterList(filter || firstFilter);
    getList.mutate(filter || filterList, {
      onSuccess: (res: any) => {
        if (res.data.is_success) {
          let result = res.data.result?.result_members;

          if (result) {
            setData(
              result?.map((group: any, index: number) => ({
                ...group,
                row_id: index + 1,
                setRefresh: setRefresh,
              }))
            );
          } else setData([]);
          res?.data?.pagination && setTotalCount(res.data?.pagination?.total);
        }
      },
      onError: (err: any) => {
        setData([]);
      },
    });
  };

  useEffect(() => {
    loadFirstData();
  }, [entryCounter, refresh]);

  const handleFullFilter = (values: any) => {
    console.log(values);
    const load: TGetGroupMembers = {
      ...filterList,
      name: values?.name,
      end_date: values?.end_date,
      role: values?.role?.value,
      join_reason: values?.join_reason?.value,
      start_date: values?.start_date,
    };

    setFilterList(load);

    loadFirstData(load);
  };

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
      headerTitle="Members"
      addBtnText="Invite Memeber"
      onAddBtn={() => navigate("/groups-list/invite-member/" + group_id)}
      onReload={loadFirstData}
      // hasMore={hasMore}
      loadFunc={onLoadPage}
      noSearch={false}
      noHeader={false}
      activeFullSearch
      fullSearch
      fullSearchComponent={FullSearchComponent}
      handleFullFilter={handleFullFilter}
      limit={entryCounter}
      setLimit={setEntryCounter}
      totalCount={totalCount}
      currentPage={currentPage}
    />
  );
};

export { MemberList };
