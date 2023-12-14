import { ListTable } from "@src/components/common/ListTable";
import { useGetMlsList } from "@src/core/services/api/mls/mls.api";
import { TGetMlsList } from "@src/core/services/api/mls/type";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col } from "reactstrap";
import { FormStepsWrapper } from "../FormStepsWrapper";
import { AddAccessModal } from "./AddAccessModal";
import { columns } from "./columns";
import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";
import { AddAccessForm } from "./AddAccessForm/AddAccessForm";

const listItems = [
  { value: 1, label: "IDX/RETS" },
  { value: 2, label: "IDX/RESO_WEB_API" },
  { value: 3, label: "IDX_PLUS/RETS" },
  { value: 4, label: "IDX_PLUS/RESO_WEB_API" },
  { value: 5, label: "VOW/RETS" },
  { value: 6, label: "VOW/RESO_WEB_API" },
  { value: 7, label: "IDX" },
  { value: 8, label: "IDX_PLUS" },
  { value: 9, label: "VOW" },
  { value: 10, label: "RETS" },
  { value: 11, label: "ALL/ALL" },
  { value: 12, label: "--/RESO_WEB_API" },
  { value: 13, label: "ALL Feed Type" },
  { value: 14, label: "ALL Connection Type" },
];

interface IAddMlsAccessProp {
  stepper: any;
  type?: string;
  isDetail?: boolean;
}

const AddMlsAccess: FC<IAddMlsAccessProp> = ({
  stepper,
  type,
  isDetail,
}): JSX.Element => {
  const { id } = useParams();

  const [filterList, setFilterList] = useState<TGetMlsList>({
    entity: "mls_access",
    data: {
      list_filter: {
        order_by: "creation_date DESC",
        limit: 10,
        offset: 0,
        filters: [{ field: "mls_id", operator: "=", value: id ? +id : "" }],
      },
    },
  });
  const [editCellData, setEditCellData] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getList = useGetMlsList();
  const getListInfinite = useGetMlsList();

  const loadFirstData = () => {
    const firstFilter: any = {
      entity: "mls_access",
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
    // setHasMore(true);
    setFilterList(firstFilter);
    getList.mutate(firstFilter, {
      onSuccess: (res) => {
        if (res.data.is_success) {
          let result = res.data.result;
          if (result && !Array.isArray(result)) result = [result];
          setData((old: any) =>
            result.map((item: any, index: number) => ({
              ...item,
              row_id: index + 1,
              feedtype: listItems.find(
                (o) => o.value === item.feed_type_connection_type_id
              )?.label,
              setEditCellData: (val: any) => {
                setEditCellData(val);
                setIsOpen(true);
              },
              isDetail: isDetail,
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
  }, [isOpen]);

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
            ...result.map((item: any, index: number) => ({
              ...item,
              row_id: page * 10 + index + 1,
              feedtype: listItems.find(
                (o) => o.value === item.feed_type_connection_type_id
              )?.label,
              setEditCellData: (val: any) => {
                setEditCellData(val);
                setIsOpen(true);
              },
              isDetail: isDetail,
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
  //             ...result.map((item: any, index: number) => ({
  //               ...item,
  //               row_id: index + 1,
  //               feedtype: listItems.find(
  //                 (o) => o.value === item.feed_type_connection_type_id
  //               )?.label,
  //               setEditCellData: (val: any) => {
  //                 setEditCellData(val);
  //                 setIsOpen(true);
  //               },
  //               isDetail: isDetail,
  //             })),
  //           ]);
  //         }
  //       } else setHasMore(false);
  //     },
  //   });
  // };

  const navigate = useNavigate();

  return !isDetail ? (
    <FormStepsWrapper
      hasPrev
      stepper={stepper}
      stepNum={4}
      stepName="Add MLS Access"
      nextLabel="Finish"
      onNext={() => navigate("/mls-list/" + id)}
    >
      <Col xxl={12} className="mt-1">
        {/* {!isOpen && ( */}
        <Card className="overflow-hidden">
          <ListTablePaginate
            columns={columns}
            data={data}
            noSearch
            noReload
            addBtnText="Add Access"
            // noHeader
            isLoading={getList.isLoading || getListInfinite.isLoading}
            headerTitle="Access List"
            // hasMore={hasMore}
            loadFunc={onLoadPage}
            onReload={loadFirstData}
            onAddBtn={() => setIsOpen((old) => !old)}
            currentPage={currentPage}
            totalCount={totalCount}
            limit={10}
          />
          {/* <ListTable
            columns={columns}
            data={data}
            noSearch
            noReload
            addBtnText="Add Access"
            // noHeader
            isLoading={getList.isLoading}
            headerTitle="Access List"
            hasMore={hasMore}
            loadFunc={onLoadScroll}
            onReload={loadFirstData}
            onAddBtn={() => setIsOpen((old) => !old)}
          /> */}
        </Card>
        {/* )} */}

        {/* {isOpen && <AddAccessForm />} */}

        {isOpen && (
          <AddAccessModal
            isOpen={isOpen}
            onToggle={() => {
              setIsOpen((old) => !old);
              setEditCellData(null);
            }}
            editCellData={editCellData}
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
        {/* <ListTable
          columns={columns}
          data={data}
          noSearch
          noReload
          addBtnText="Add Access"
          // noHeader
          isLoading={getList.isLoading}
          headerTitle="Access List"
          hasMore={hasMore}
          loadFunc={onLoadScroll}
          onReload={loadFirstData}
          onAddBtn={() => setIsOpen((old) => !old)}
        /> */}
        <ListTablePaginate
          columns={columns}
          data={data}
          noSearch
          noReload
          addBtnText="Add Access"
          // noHeader
          isLoading={getList.isLoading || getListInfinite.isLoading}
          headerTitle="Access List"
          // hasMore={hasMore}
          loadFunc={onLoadPage}
          onReload={loadFirstData}
          onAddBtn={() => setIsOpen((old) => !old)}
          currentPage={currentPage}
          totalCount={totalCount}
          limit={10}
        />
      </Card>

      {isOpen && (
        <AddAccessModal
          isOpen={isOpen}
          onToggle={() => {
            setIsOpen((old) => !old);
            setEditCellData(null);
          }}
          editCellData={editCellData}
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

export { AddMlsAccess };
