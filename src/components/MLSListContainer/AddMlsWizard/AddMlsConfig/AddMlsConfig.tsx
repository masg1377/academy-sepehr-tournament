import { ListTable } from "@src/components/common/ListTable";
import { useGetMlsList } from "@src/core/services/api/mls/mls.api";
import { TGetMlsList } from "@src/core/services/api/mls/type";
import { RootState } from "@src/redux/store";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Col } from "reactstrap";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { AddConfigModal } from "./AddConfigModal";
import { columns } from "./columns";
import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";

interface IAddMlsConfigProp {
  stepper: any;
  type?: string;
  isDetail?: boolean;
}

const AddMlsConfig: FC<IAddMlsConfigProp> = ({
  stepper,
  type,
  isDetail,
}): JSX.Element => {
  const { id } = useParams();

  const { mlsConfig } = useSelector((state: RootState) => state.refresh);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [editCellData, setEditCellData] = useState<any>();
  const [data, setData] = useState<any>((e: any) => []);
  const [filterList, setFilterList] = useState<TGetMlsList>({
    entity: "mls_config",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: 10,
        offset: 0,
        filters: [{ field: "mls_id", operator: "=", value: id ? +id : "" }],
      },
    },
  });

  const getList = useGetMlsList();
  const getListInfinite = useGetMlsList();

  const loadFirstData = () => {
    const firstFilter: any = {
      entity: "mls_config",
      data: {
        list_filter: {
          ...filterList.data.list_filter,
          limit: 10,
          offset: 0,
        },
      },
    };
    // setHasMore(true);
    setCurrentPage(0);
    setTotalCount(0);
    setFilterList(firstFilter);
    getList.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          setData((old: any) =>
            result.map((o: any, index: number) => ({
              ...o,
              row_id: index + 1,
              setRefetch: setRefetch,
            }))
          );
          // if (result && result.length < 10) setHasMore(false);
          // else if (!result) setHasMore(false);
          res.data.result_count && setTotalCount(res.data.result_count);
        }
      },
    });
  };

  useEffect(() => {
    if (!isOpen && id) loadFirstData();
  }, [isOpen, mlsConfig, refetch]);

  const onLoadPage = (page: number = 0) => {
    if (!id) return;
    let filter = { ...filterList };
    if (filter.data.list_filter)
      filter.data.list_filter.offset = page * filter.data.list_filter.limit;
    setFilterList(filter);
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
              row_id: page * 10 + index + 1,
            })),
          ]);
        }
        // } else setHasMore(false);
      },
    });
  };
  // const onLoadScroll = () => {
  //   if (!id) return;
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
  //               row_id: e.length + index + 1,
  //             })),
  //           ]);
  //         }
  //       } else setHasMore(false);
  //     },
  //   });
  // };

  useEffect(() => {
    if (editCellData) {
      setIsOpen(true);
    }
  }, [editCellData]);

  return !isDetail ? (
    <FormStepsWrapper
      hasPrev
      stepper={stepper}
      stepNum={3}
      onNext={() => stepper.next()}
      stepName="Add MLS Config"
    >
      <Col xxl={12} className="mt-1">
        <Card className="overflow-hidden">
          <ListTablePaginate
            columns={columns}
            data={data.map((d: any) => ({
              ...d,
              onChangeData: setData,
              setEditCellData: setEditCellData,
            }))}
            noSearch
            noReload
            addBtnText="Add Config"
            // noHeader
            isLoading={getList.isLoading || getListInfinite.isLoading}
            headerTitle="Config List"
            // hasMore={hasMore}
            loadFunc={onLoadPage}
            onReload={loadFirstData}
            totalCount={totalCount}
            currentPage={currentPage}
            limit={10}
            onAddBtn={() => setIsOpen((old) => !old)}
          />
          {/* <ListTable
            columns={columns}
            data={data.map((d: any) => ({
              ...d,
              onChangeData: setData,
              setEditCellData: setEditCellData,
            }))}
            noSearch
            noReload
            addBtnText="Add Config"
            // noHeader
            isLoading={getList.isLoading}
            headerTitle="Config List"
            hasMore={hasMore}
            loadFunc={onLoadScroll}
            onReload={onLoadScroll}
            onAddBtn={() => setIsOpen((old) => !old)}
          /> */}
        </Card>

        {isOpen && (
          <AddConfigModal
            isOpen={isOpen}
            onToggle={() => setIsOpen((old) => !old)}
            onAddData={(d) => setData((old: any) => [...old, d])}
            editCellData={editCellData}
            setEditCellData={setEditCellData}
          />
        )}

        {/* <SubmitButton
          size="md"
          type="button"
          color="primary"
          className="mt-1 d-block me-0 ms-auto"
          onClick={() => setIsOpen((old) => !old)}
        >
          + Add Access
        </SubmitButton> */}
      </Col>
    </FormStepsWrapper>
  ) : (
    <Col xxl={12} className="mt-1">
      <Card className="overflow-hidden">
        <ListTablePaginate
          columns={columns}
          data={data.map((d: any) => ({
            ...d,
            onChangeData: setData,
            setEditCellData: setEditCellData,
          }))}
          noSearch
          noReload
          addBtnText="Add Config"
          // noHeader
          isLoading={getList.isLoading || getListInfinite.isLoading}
          headerTitle="Config List"
          // hasMore={hasMore}
          loadFunc={onLoadPage}
          onReload={loadFirstData}
          totalCount={totalCount}
          currentPage={currentPage}
          limit={10}
          onAddBtn={() => setIsOpen((old) => !old)}
        />
        {/* <ListTable
          columns={columns}
          data={data.map((d: any) => ({
            ...d,
            onChangeData: setData,
            setEditCellData: setEditCellData,
          }))}
          noSearch
          noReload
          addBtnText="Add Config"
          // noHeader
          isLoading={getList.isLoading}
          headerTitle="Config List"
          hasMore={hasMore}
          loadFunc={onLoadScroll}
          onReload={onLoadScroll}
          onAddBtn={() => setIsOpen((old) => !old)}
        /> */}
      </Card>

      {isOpen && (
        <AddConfigModal
          isOpen={isOpen}
          onToggle={() => setIsOpen((old) => !old)}
          onAddData={(d) => setData((old: any) => [...old, d])}
          editCellData={editCellData}
          setEditCellData={setEditCellData}
        />
      )}

      {/* <SubmitButton
          size="md"
          type="button"
          color="primary"
          className="mt-1 d-block me-0 ms-auto"
          onClick={() => setIsOpen((old) => !old)}
        >
          + Add Access
        </SubmitButton> */}
    </Col>
  );
};

export { AddMlsConfig };
