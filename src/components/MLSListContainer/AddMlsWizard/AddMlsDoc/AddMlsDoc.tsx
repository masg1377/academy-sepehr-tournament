import React, { FC, useState, useEffect } from "react";
import { ListTable } from "@src/components/common/ListTable";
import { Card, Col } from "reactstrap";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { columns } from "./columns";
import useWindowDimensions from "@src/core/utils/Utils";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import { AddDocModal } from "./AddDocModal";
import { useGetMlsList } from "@src/core/services/api/mls/mls.api";
import { TGetMlsList } from "@src/core/services/api/mls/type";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";

interface IAddMlsConfigProp {
  stepper: any;
  type?: string;
}

const AddMlsDoc: FC<IAddMlsConfigProp> = ({ stepper, type }): JSX.Element => {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editCellData, setEditCellData] = useState<any>();
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filterList, setFilterList] = useState<TGetMlsList>({
    entity: "mls_document",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: 10,
        offset: 0,
        filters: [{ field: "mls_id", operator: "=", value: id ? +id : "" }],
      },
    },
  });

  const { mlsDoc } = useSelector((state: RootState) => state.refresh);

  const getList = useGetMlsList();
  const getListInfinite = useGetMlsList();

  const loadFirstData = () => {
    const firstFilter: any = {
      entity: "mls_document",
      data: {
        list_filter: {
          ...filterList.data.list_filter,
          limit: 10,
          offset: 0,
        },
      },
    };
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
  }, [isOpen, mlsDoc]);

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

  return (
    <FormStepsWrapper
      hasPrev
      stepper={stepper}
      stepNum={3}
      stepName="Add MLS Document"
      onNext={() => stepper.next()}
    >
      <Col xxl={12} className="mt-1">
        <Card className="overflow-hidden ">
          <ListTablePaginate
            columns={columns}
            data={data.map((d: any) => ({
              ...d,
              onChangeData: setData,
              setEditCellData: setEditCellData,
            }))}
            noSearch
            noReload
            addBtnText="Add Document"
            // noHeader
            isLoading={getList.isLoading || getListInfinite.isLoading}
            headerTitle="Document List"
            loadFunc={onLoadPage}
            currentPage={currentPage}
            totalCount={totalCount}
            onReload={loadFirstData}
            limit={10}
            // hasMore={hasMore}
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
            addBtnText="Add Document"
            // noHeader
            isLoading={getList.isLoading}
            headerTitle="Document List"
            loadFunc={onLoadScroll}
            onReload={loadFirstData}
            hasMore={hasMore}
            onAddBtn={() => setIsOpen((old) => !old)}
          /> */}
        </Card>

        {isOpen && (
          <AddDocModal
            isOpen={isOpen}
            onToggle={() => {
              setIsOpen((old) => !old);
              setEditCellData(null);
            }}
            onAddData={(d) => setData((old: any) => [...old, d])}
            data={data}
            editCellData={editCellData}
            setEditCellData={setEditCellData}
          />
        )}
      </Col>
    </FormStepsWrapper>
  );
};

export { AddMlsDoc };
