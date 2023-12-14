import { CardWrapper } from "@src/components/common/CardWrapper/CardWrapper";
import React, { FC, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { BasicDetails } from "./BasicDetails";
import { MlsToRfPaymentPlan } from "./MlsToRfPaymentPlan";
import { useGetListOfEntity } from "@src/core/services/api/entities/entities.api";
import { useParams } from "react-router-dom";
import { GroupMembershipPaymentPlan } from "./GroupMembershipPaymentPlan";
import { Documents } from "./Documents";
import { Links } from "./Links";
import { GroupActions } from "./GroupActions";
import { useGetGroupItem } from "@src/core/services/api/group/group.api";
import { LoadingData } from "@src/components/common/LoadingData/LoadingData";
import { GroupMembers } from "./GroupMembers";

const Detail: FC = (): JSX.Element => {
  const { id } = useParams();

  const [detail, setDetail] = useState<any>();
  const [links, setLinks] = useState<{
    [key: string]: { category: string; title: string; url: string };
  }>({});
  const [documents, setDocuments] = useState<{
    [key: string]: { category: string; file_name: string; doc_url: string };
  }>({});

  const getDetail = useGetGroupItem();

  const loadData = () => {
    getDetail.mutate(
      { group_id: id ? +id : 0 },
      {
        onSuccess: (res) => {
          if (res.data.is_success) {
            setDetail(res.data.result);
            setLinks(res.data.result?.links);
            setDocuments(res.data.result?.documents);
          }
        },
      }
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Row>
      <Col xxl={8}>
        <BasicDetails detail={detail} isLoading={getDetail.isLoading} />

        <Row>
          <Col md={6}>
            <MlsToRfPaymentPlan />
            <Documents
              docs={documents}
              isLoading={getDetail.isLoading}
              refetch={loadData}
            />
          </Col>
          <Col md={6}>
            <GroupMembershipPaymentPlan />
            <Links
              links={links}
              isLoading={getDetail.isLoading}
              refetch={loadData}
            />
          </Col>
        </Row>
      </Col>

      <Col xxl={4}>
        <GroupActions />
        <GroupMembers />
      </Col>
    </Row>
  );
};

export { Detail };
