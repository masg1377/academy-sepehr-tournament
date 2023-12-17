import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { useGetMlsServer } from "@src/core/services/api/mls/mls.api";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import { AddMlsAccess } from "../AddTournamentWizard/AddMlsAccess/AddMlsAccess";
import { AddMlsConfig } from "../AddTournamentWizard/AddMlsConfig/AddMlsConfig";
import { ClientPayments } from "./ClientPayments/ClientPayments";
import { ComplianceRequirments } from "./ComplianceRequirments/ComplianceRequirments";
import { CostBenefit } from "./CostBenefit/CostBenefit";
import { MlsInformation } from "./MlsInformation/MlsInformation";
import { PaymentDocumnets } from "./PaymentDocumnets/PaymentDocumnets";
import { PaymentInfo } from "./PaymentInfo/PaymentInfo";
import { Workflow } from "./Workflow/Workflow";
import { TournamentInformation } from "./TournamentInformation";
import { AddCheckList } from "../AddTournamentWizard/AddCheckList";
import { ListTablePaginate } from "@src/components/common/ListTablePaginate/ListTablePaginate";
import { columns } from "../AddTournamentWizard/AddCheckList/columns";
import { columns as groupCol } from "../AddTournamentWizard/AddGroupList/columns";
import { columns as refereeCol } from "../AddTournamentWizard/AddReffere/columns";
import {
  useGetListAvrageCheckListAdmin,
  useGetListOfTurnamentReferes,
  useGetTournament,
  useGetTournamentCheckLists,
  useGetTournamentGroupList,
} from "@src/core/services/api/tournament";

const TournamentDetail: FC = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [groupData, setGroupData] = useState<any>([]);
  const [refereeData, setRefereeData] = useState<any>([]);
  const [avrageData, setAvrageData] = useState<any>([]);
  const [tournamentDetail, setTournamentDetail] = useState<any>([]);

  const getTournamentList = useGetTournament();
  const getListOfTournamentCheckList = useGetTournamentCheckLists();
  const getListOfTournamentGroupList = useGetTournamentGroupList();
  const getListOfTournamentRefereeList = useGetListOfTurnamentReferes();
  const getListAvrageCheckListAdmin = useGetListAvrageCheckListAdmin();

  const onLoadAvrageData = () => {
    if (id)
      getListAvrageCheckListAdmin.mutate(
        { TournamentId: id },
        {
          onSuccess: (res) => {
            const result = res.data;
            console.log(result);
            setAvrageData(
              result?.map((m: any, ind: number) => ({
                ...m,
                row_id: ind + 1,
              }))
            );
          },
        }
      );
  };
  const onLoadRefereeData = () => {
    if (id)
      getListOfTournamentRefereeList.mutate(
        { TournamentId: id },
        {
          onSuccess: (res) => {
            const result = res.data;
            console.log(result);
            setRefereeData(
              result?.map((m: any, ind: number) => ({
                ...m,
                row_id: ind + 1,
              }))
            );
          },
        }
      );
  };
  const onLoadGroupData = () => {
    if (id) {
      getListOfTournamentGroupList.mutate(
        { TournamentId: id },
        {
          onSuccess: (res) => {
            const result = res.data;
            console.log(result);
            setGroupData(
              result?.map((m: any, ind: number) => ({
                ...m,
                row_id: ind + 1,
              }))
            );
          },
        }
      );
    }
  };
  const onLoadData = () => {
    if (id)
      getListOfTournamentCheckList.mutate(id, {
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
      });
  };
  useEffect(() => {
    if (id && getTournamentList.isSuccess) {
      console.log("tr", getTournamentList?.data?.data, id);

      const filteredTournament = getTournamentList?.data?.data?.find(
        (tournament: any) => tournament.id === id
      );
      console.log("tr", filteredTournament, id);
      filteredTournament && setTournamentDetail(filteredTournament);
      onLoadData();
      onLoadGroupData();
      onLoadRefereeData();
      onLoadAvrageData();
    }
  }, [id, getTournamentList.isSuccess]);

  return (
    <Row>
      <Col xxl={9} xl={12} md={12}>
        <TournamentInformation
          isLoading={getTournamentList?.isLoading}
          data={tournamentDetail ? tournamentDetail : null}
        />
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
            addBtnText="Add Check List"
            // noHeader
            isLoading={getListOfTournamentCheckList.isLoading}
            headerTitle="Tournament Check List"
            // hasMore={hasMore}
            loadFunc={() => {}}
            onReload={() => {}}
            totalCount={0}
            currentPage={0}
            limit={1000}
            onAddBtn={() => {}}
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
        <Card className="overflow-hidden">
          <ListTablePaginate
            columns={groupCol}
            data={groupData.map((d: any) => ({
              ...d,
              onChangeData: setData,
              onLoadData: onLoadData,
            }))}
            noSearch
            noReload
            addBtnText="Add Group"
            // noHeader
            isLoading={getListOfTournamentGroupList.isLoading}
            headerTitle="Group List"
            // hasMore={hasMore}
            loadFunc={() => {}}
            onReload={() => {}}
            totalCount={0}
            currentPage={0}
            limit={1000}
            onAddBtn={() => {}}
          />
        </Card>
        <Card className="overflow-hidden">
          <ListTablePaginate
            columns={refereeCol}
            data={refereeData.map((d: any) => ({
              ...d,
              onChangeData: setData,
              onLoadData: onLoadData,
            }))}
            noSearch
            noReload
            addBtnText="Add Referee"
            // noHeader
            isLoading={getListOfTournamentRefereeList.isLoading}
            headerTitle="Referee List"
            // hasMore={hasMore}
            loadFunc={() => {}}
            onReload={() => {}}
            totalCount={0}
            currentPage={0}
            limit={1000}
            onAddBtn={() => {}}
          />
        </Card>
        <Card className="overflow-hidden">
          <ListTablePaginate
            columns={refereeCol}
            data={avrageData.map((d: any) => ({
              ...d,
              onChangeData: setData,
              onLoadData: onLoadData,
            }))}
            noSearch
            noReload
            addBtnText="Add Avg"
            // noHeader
            isLoading={getListAvrageCheckListAdmin.isLoading}
            headerTitle="Avrage List"
            // hasMore={hasMore}
            loadFunc={() => {}}
            onReload={() => {}}
            totalCount={0}
            currentPage={0}
            limit={1000}
            onAddBtn={() => navigate("/tournament-detail/add-avg/" + id)}
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
        {/* <ComplianceRequirments /> */}
        {/* <PaymentInfo /> */}
        {/* <AddMlsAccess stepper={null} isDetail />
        <AddMlsConfig stepper={null} isDetail />
        <PaymentDocumnets /> */}
      </Col>
      {/* <Col xxl={3} xl={4} md={12}> */}
      {/* <CostBenefit /> */}
      {/* <Workflow /> */}
      {/* <ClientPayments /> */}
      {/* </Col> */}
    </Row>
  );
};

export { TournamentDetail };
