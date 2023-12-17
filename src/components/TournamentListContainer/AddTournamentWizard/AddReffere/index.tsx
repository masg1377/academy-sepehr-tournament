import React, { FC, useState, useEffect } from "react";
import { ListTable } from "@src/components/common/ListTable";
import { Card, Col } from "reactstrap";
import { FormStepsWrapper } from "../FormStepsWrapper/FormStepsWrapper";
import { columns } from "./columns";
import useWindowDimensions from "@src/core/utils/Utils";
import { SubmitButton } from "@src/components/common/form/common/SubmitButton";
import { AddDocModal } from "./AddDocModal/AddDocModal";
import { useGetMlsList } from "@src/core/services/api/mls/mls.api";
import { TGetMlsList } from "@src/core/services/api/mls/type";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";
import {
  useGetCheckLists,
  useGetListOfTurnamentReferes,
  useGetTournament,
  useGetTournamentCheckLists,
} from "@src/core/services/api/tournament";
import { FormWrapper } from "@src/components/common/form/FormWrapper/FormWrapper";
import { SelectOption } from "@src/components/common/form/common/SelectOption/SelectOption";

interface IAddMlsConfigProp {
  stepper: any;
  type?: string;
}

const AddReffere: FC<IAddMlsConfigProp> = ({ stepper, type }): JSX.Element => {
  const { id } = useParams();

  useEffect(() => {}, []);
  const [data, setData] = useState<any>([]);
  const [tournamentId, setTournamentId] = useState<any>();
  // const [data, setData] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getListOfTournament = useGetTournament();
  const getListOfTournamentCheckList = useGetListOfTurnamentReferes();

  const onLoadData = () => {
    getListOfTournamentCheckList.mutate(
      { TournamentId: tournamentId },
      {
        onSuccess: (res) => {
          const result = res.data;
          console.log(result);
          setData(
            result?.map((m: any, ind: number) => ({
              ...m,
              row_id: ind + 1,
            }))
          );
        },
      }
    );
  };

  useEffect(() => {
    if (!isOpen && tournamentId) {
      // getListOfTournament.refetch();
      onLoadData();
    }
  }, [isOpen]);

  // useEffect(() => {
  //   if (getList.isSuccess) {
  //     const result = getList.data.data;
  //     console.log(result);
  //     setData(
  //       result?.map((data: any, ind: number) => ({ ...data, row_id: ind + 1 }))
  //     );
  //   }
  // }, [getList.isSuccess]);

  // const onLoadPage = (page: number = 0) => {
  //   if (!id) return;
  //   let filter = { ...filterList };
  //   if (filter.data.list_filter)
  //     filter.data.list_filter.offset = page * filter.data.list_filter.limit;
  //   setFilterList(filter);
  //   setCurrentPage(page);
  //   getListInfinite.mutate(filter, {
  //     onSuccess: (res) => {
  //       if (res.data.is_success) {
  //         let result = res.data.result;
  //         // if (!result) {
  //         //   setHasMore(false);
  //         // } else {
  //         if (result && !Array.isArray(result)) result = [result];
  //         setData((e: any) => [
  //           // ...e,
  //           ...result.map((o: any, index: number) => ({
  //             ...o,
  //             row_id: page * 10 + index + 1,
  //           })),
  //         ]);
  //       }
  //       // } else setHasMore(false);
  //     },
  //   });
  // };
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

  return (
    <FormStepsWrapper
      hasPrev
      stepper={stepper}
      stepNum={3}
      stepName="Add Referee"
      onNext={() => stepper.next()}
    >
      <Col xxl={12} className="mt-1">
        <FormWrapper initialValues={{}} onSubmit={() => {}}>
          {({ setFieldValue }) => (
            <>
              <Col md={4}>
                <SelectOption
                  name="tournament"
                  placeholder="Please select ..."
                  label={"Tournament"}
                  id="tournament"
                  options={getListOfTournament?.data?.data?.map((m: any) => ({
                    value: m?.id,
                    label: m?.tournamentName,
                  }))}
                  wrapperClassName="mb-1"
                  isClearable
                  onChange={(opt) => {
                    setFieldValue("tournament", opt);
                    if (opt) {
                      setTournamentId(opt?.value);
                      getListOfTournamentCheckList.mutate(
                        { TournamentId: opt?.value },
                        {
                          onSuccess: (res) => {
                            const result = res.data;
                            console.log(result);
                            setData(
                              result?.map((m: any, ind: number) => ({
                                ...m,
                                row_id: ind + 1,
                              }))
                            );
                          },
                        }
                      );
                    }
                  }}
                />
              </Col>
              <Card className="overflow-hidden">
                <ListTablePaginate
                  columns={columns}
                  data={data.map((d: any) => ({
                    ...d,
                    onChangeData: setData,
                    onLoadData: onLoadData,
                  }))}
                  noSearch
                  noReload
                  addBtnText="Add Referee"
                  // noHeader
                  isLoading={getListOfTournamentCheckList.isLoading}
                  headerTitle="Referee List"
                  // hasMore={hasMore}
                  loadFunc={() => {}}
                  onReload={() => {}}
                  totalCount={0}
                  currentPage={0}
                  limit={1000}
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
            </>
          )}
        </FormWrapper>

        {isOpen && (
          <AddDocModal
            isOpen={isOpen}
            onToggle={() => setIsOpen((old) => !old)}
            onAddData={(d) => setData((old: any) => [...old, d])}
            editCellData={undefined}
            setEditCellData={() => {}}
            tournamentId={tournamentId}
          />
        )}
      </Col>
    </FormStepsWrapper>
  );
};

export { AddReffere };
